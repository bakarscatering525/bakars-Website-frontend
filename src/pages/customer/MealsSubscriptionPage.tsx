import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate, useLocation, matchPath } from 'react-router-dom';
import { ordersAPI } from '@api';
import { menuAPI } from '@api/endpoints/menu';
import { MealSubscriptionPlan } from '@models/subscription.types';
import { MealSubscriptionEditDetails } from '@models/order.types';
import { MenuItem } from '@models/menu.types';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import Modal from '@components/common/Modal';
import LoadingScreen from '@components/common/LoadingScreen';
import { useToast } from '@components/common/Toast';
import { useAuthStore } from '@store/authStore';
import { useAuthModalStore } from '@store/authModalStore';
import { useOrderStore } from '@store/orderStore';
import { formatCurrency } from '@utils/formatters';
import type { Address } from '@models/address.types';
import {
  CalendarRange,
  CheckCircle2,
  ChevronLeft,
  Edit2,
  Info,
  Package,
  Truck,
  MapPin,
  Store as StoreIcon,
  Utensils,
  Plus,
  Minus,
  ShoppingCart,
  AlertCircle,
} from 'lucide-react';
import clsx from 'clsx';
import { useAddressStore } from '@store/addressStore';

type FulfilmentMethod = 'delivery' | 'pickup';

interface DeliveryOption {
  date: string;
  label: string;
  weekIndex: number;
}

interface ScheduledItem {
  item: MenuItem;
  quantity: number;
  variation_size?: string;
  instructions?: string;
}

type SelectedMealEntry = {
  quantity: number;
  variationSize?: string;
  instructions?: string;
};

type SelectedMealsState = Record<string, Record<string, SelectedMealEntry>>;

interface MealModalState {
  isOpen: boolean;
  date: string | null;
  item: MenuItem | null;
  quantity: number;
  variationSize?: string;
  instructions: string;
}

interface SubscriptionReviewPayload {
  plan: MealSubscriptionPlan;
  planQuantity: number;
  fulfilment: FulfilmentMethod;
  schedule: Array<{ date: string; items: ScheduledItem[]; notes?: string }>;
  includedBoxes: number;
  totalBoxes: number;
  extraBoxes: number;
  maxPerMeal?: number | null;
}

interface MenuPaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

type FlowStep = 'plans' | 'schedule' | 'menu' | 'review';

const INDEX_TO_WEEKDAY_NAME = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

const WEEKDAY_NAME_TO_INDEX: Record<string, number> =
  INDEX_TO_WEEKDAY_NAME.reduce<Record<string, number>>((acc, name, index) => {
    acc[name] = index;
    return acc;
  }, {});

const DEFAULT_DELIVERY_DAYS = ['monday', 'thursday'];

const PLAN_TAB_ORDER: MealSubscriptionPlan['tab'][] = [
  'weekly',
  'regular',
  'fortnight',
  'custom',
];

const WEEKLY_PLAN_ACK_STORAGE_KEY = 'bakars_weekly_plan_ack';
const WEEKLY_MENU_CACHE_TTL_MS = 5 * 60 * 1000;
const MEAL_MENU_PAGE_SIZE = 9;
const BUSINESS_TIMEZONE = 'Australia/Sydney';

const readWeeklyPlanAcknowledgement = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (typeof window.sessionStorage === 'undefined') {
    return false;
  }
  try {
    return window.sessionStorage.getItem(WEEKLY_PLAN_ACK_STORAGE_KEY) === 'true';
  } catch (error) {
    console.error('Failed to read weekly plan acknowledgement state', error);
    return false;
  }
};

const persistWeeklyPlanAcknowledgement = (value: boolean) => {
  if (typeof window === 'undefined') {
    return;
  }
  if (typeof window.sessionStorage === 'undefined') {
    return;
  }
  try {
    if (value) {
      window.sessionStorage.setItem(WEEKLY_PLAN_ACK_STORAGE_KEY, 'true');
    } else {
      window.sessionStorage.removeItem(WEEKLY_PLAN_ACK_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Failed to persist weekly plan acknowledgement state', error);
  }
};

const PLAN_TAB_COPY: Record<
  MealSubscriptionPlan['tab'],
  { label: string; helper: string }
> = {
  weekly: {
    label: 'Weekly 10-Meal',
    helper: 'Two deliveries per week with member savings.',
  },
  fortnight: {
    label: 'Fortnight',
    helper: 'Pick any two weeks within the next four.',
  },
  monthly: {
    label: 'Monthly',
    helper: 'Choose four weeks within a six-week window.',
  },
  regular: {
    label: 'Regular Order',
    helper:
      'Flexible pay-per-meal orders · 4-box delivery MOQ (1 for pickup) with the same delivery fees as Weekly plans.',
  },
  custom: {
    label: 'Custom',
    helper: 'Ad-hoc plans created by the admin.',
  },
};

const MIN_MEAL_OPTIONS_PER_DAY = 6;
const DISCOUNT_CAPPED_PLAN_TABS: MealSubscriptionPlan['tab'][] = [
  'weekly',
  'fortnight',
  'monthly',
];
const PLAN_DISCOUNT_BOX_CAP_PER_MEAL = 2;
const INCLUDED_MIN_PLAN_TABS: MealSubscriptionPlan['tab'][] = [
  'weekly',
  'fortnight',
  'monthly',
];

const isDiscountCappedPlan = (
  plan?: MealSubscriptionPlan | null
): plan is MealSubscriptionPlan => {
  if (!plan) return false;
  return DISCOUNT_CAPPED_PLAN_TABS.includes(plan.tab);
};

const requiresIncludedBoxMinimum = (
  plan?: MealSubscriptionPlan | null
): boolean => {
  void plan;
  return false;
};

const getMenuItemIdentifier = (
  item: Partial<MenuItem> | null | undefined
): string | undefined => {
  if (!item) {
    return undefined;
  }
  return (item as any)._id || (item as any).id || undefined;
};

const isMealPlanEligibleItem = (
  item: Partial<MenuItem> | null | undefined,
  requireExplicitFlag: boolean = false
): item is MenuItem => {
  if (!item) {
    return false;
  }
  if (requireExplicitFlag) {
    return item.is_available_for_meal_plan === true;
  }
  return item.is_available_for_meal_plan !== false;
};

const filterMealPlanEligibleItems = (
  items?: (Partial<MenuItem> | null)[],
  options?: { requireExplicitFlag?: boolean }
): MenuItem[] => {
  const requireFlag = options?.requireExplicitFlag ?? false;
  if (!Array.isArray(items)) {
    return [];
  }
  return items.filter((item): item is MenuItem =>
    isMealPlanEligibleItem(item, requireFlag)
  );
};

const mergeMealPlanMenus = (
  primary: MenuItem[],
  secondary: MenuItem[]
): MenuItem[] => {
  if (!secondary.length) {
    return primary.slice();
  }

  const merged: MenuItem[] = [];
  const seen = new Set<string>();

  const pushItem = (item: MenuItem) => {
    const identifier = getMenuItemIdentifier(item);
    if (identifier) {
      if (seen.has(identifier)) {
        return;
      }
      seen.add(identifier);
    }
    merged.push(item);
  };

  primary.forEach(pushItem);
  secondary.forEach(pushItem);

  return merged;
};
type WeeklyMenuFetchResult = {
  items: MenuItem[];
  meta: { deliveryDate?: string | null; rotation?: number | null };
  error?: string;
};

type WeeklyMenuCacheEntry = WeeklyMenuFetchResult & { fetchedAt: number };

const resolveMenuImageUrl = (menu?: Partial<MenuItem> | null): string | null => {
  if (!menu) {
    return null;
  }
  const fallbackSource = menu as Record<string, any>;
  const candidate =
    menu.image_url ||
    fallbackSource.image ||
    fallbackSource.imageUrl ||
    (Array.isArray(fallbackSource.images) ? fallbackSource.images[0] : undefined);
  return candidate || null;
};

const normalizeDeliveryDays = (days?: string[]): string[] => {
  if (!Array.isArray(days)) {
    return [];
  }
  const normalized: string[] = [];
  const seen = new Set<string>();
  for (const day of days) {
    const normalizedDay = day?.toString().toLowerCase();
    if (
      normalizedDay &&
      WEEKDAY_NAME_TO_INDEX[normalizedDay] !== undefined &&
      !seen.has(normalizedDay)
    ) {
      seen.add(normalizedDay);
      normalized.push(normalizedDay);
    }
  }
  return normalized;
};

const resolvePlanDeliveryDays = (plan?: MealSubscriptionPlan): string[] => {
  if (!plan) {
    return [];
  }
  const available = normalizeDeliveryDays(plan.available_delivery_days ?? []);
  if (available.length > 0) {
    return available;
  }
  const mappedDays = normalizeDeliveryDays(
    Object.keys(plan.menu_item_ids_by_day ?? {})
  );
  if (mappedDays.length > 0) {
    return mappedDays;
  }
  return normalizeDeliveryDays(Object.keys(plan.menu_items_by_day ?? {}));
};

const formatAddressLine = (address: Address) =>
  [address.street, address.suburb, `${address.state} ${address.postcode}`.trim()]
    .filter(Boolean)
    .join(', ');

const getDayKeyFromDate = (isoDate: string): string => {
  const parts = isoDate.split('-').map((part) => Number(part));
  if (parts.length !== 3 || parts.some((value) => Number.isNaN(value))) {
    return 'monday';
  }
  const candidate = new Date(parts[0], parts[1] - 1, parts[2]);
  if (Number.isNaN(candidate.getTime())) {
    return 'monday';
  }
  const index = candidate.getDay();
  return INDEX_TO_WEEKDAY_NAME[index] ?? 'monday';
};

const getBusinessNowParts = () => {
  const formatter = new Intl.DateTimeFormat('en-AU', {
    timeZone: BUSINESS_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(new Date());
  const lookup: Record<string, string> = {};
  parts.forEach((p) => {
    if (p.type !== 'literal') {
      lookup[p.type] = p.value;
    }
  });
  return {
    year: Number(lookup.year),
    month: Number(lookup.month),
    day: Number(lookup.day),
    hour: Number(lookup.hour),
    minute: Number(lookup.minute),
  };
};

const isDeliveryDateClosed = (isoDate: string): boolean => {
  const [year, month, day] = isoDate.split('-').map((v) => Number(v));
  if (!year || !month || !day) return true;

  const now = getBusinessNowParts();
  const dateKeyNow = now.year * 10000 + now.month * 100 + now.day;
  const dateKeyTarget = year * 10000 + month * 100 + day;

  if (dateKeyNow > dateKeyTarget) return true;
  if (dateKeyNow < dateKeyTarget) return false;

  // Same calendar day in business timezone: cutoff at 12:05 AM local time.
  if (now.hour > 0) return true;
  if (now.hour === 0 && now.minute >= 5) return true;
  return false;
};

const generateUpcomingDeliveryDates = (
  weeks: number = 6,
  allowedDays?: string[]
): DeliveryOption[] => {
  const results: DeliveryOption[] = [];
  const daysToUse = (() => {
    const normalized = normalizeDeliveryDays(allowedDays);
    if (normalized.length > 0) {
      return normalized;
    }
    return [...DEFAULT_DELIVERY_DAYS];
  })();
  const allowedIndices = daysToUse.map(
    (day) => WEEKDAY_NAME_TO_INDEX[day] ?? WEEKDAY_NAME_TO_INDEX['monday']
  );
  const allowedIndexSet = new Set(allowedIndices);

  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  const toLocalISODate = (date: Date) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().split('T')[0];
  };

  let currentWeekIndex = -1;
  const seenWeeks = new Set<string>();
  const maxIterations = weeks * 14 + 14;
  let iterations = 0;

  while (
    results.length < daysToUse.length * weeks &&
    iterations < maxIterations
  ) {
    const day = cursor.getDay();
    if (allowedIndexSet.has(day)) {
      const weekAnchor = new Date(cursor);
      weekAnchor.setHours(0, 0, 0, 0);
      weekAnchor.setDate(cursor.getDate() - day);
      const weekKey = weekAnchor.toISOString().split('T')[0];
      if (!seenWeeks.has(weekKey)) {
        seenWeeks.add(weekKey);
        currentWeekIndex += 1;
      }
      const formatted = cursor.toLocaleDateString('en-AU', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });

      const isoDate = toLocalISODate(cursor);
      if (!isDeliveryDateClosed(isoDate)) {
        results.push({
          date: isoDate,
          label: formatted,
          weekIndex: currentWeekIndex,
        });
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return results;
};

const buildDeliveryOptionsFromPlan = (
  plan?: MealSubscriptionPlan | null
): DeliveryOption[] => {
  if (!plan) return [];
  const dateKeys = Array.from(
    new Set(
      [
        ...(Object.keys(plan.menu_item_ids_by_delivery_date ?? {}) || []),
        ...(Object.keys(plan.menu_items_by_delivery_date ?? {}) || []),
      ].filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  const options: DeliveryOption[] = [];
  const weekMap = new Map<string, number>();
  let nextWeekIndex = 0;

  for (const dateKey of dateKeys) {
    const parsed = new Date(`${dateKey}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) continue;
    const day = parsed.getDay();
    if (day !== 1 && day !== 4) continue; // Monday or Thursday only

    const localized = new Date(
      parsed.getTime() - parsed.getTimezoneOffset() * 60000
    );
    const iso = localized.toISOString().split('T')[0];
    if (isDeliveryDateClosed(iso)) {
      continue;
    }

    const weekAnchor = new Date(localized);
    const diff = (weekAnchor.getDay() + 6) % 7; // Monday start
    weekAnchor.setDate(weekAnchor.getDate() - diff);
    const weekKey = weekAnchor.toISOString().split('T')[0];
    if (!weekMap.has(weekKey)) {
      weekMap.set(weekKey, nextWeekIndex);
      nextWeekIndex += 1;
    }

    options.push({
      date: iso,
      label: localized.toLocaleDateString('en-AU', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
      weekIndex: weekMap.get(weekKey) ?? 0,
    });
  }

  return options;
};

const resolveDeliveriesPerCycle = (
  plan?: MealSubscriptionPlan | null
): number => {
  if (!plan) return 0;
  const base = plan.deliveries_per_cycle ?? 0;
  if (plan.tab === 'regular') {
    return Math.max(base, 8);
  }
  return base;
};

const combineDeliveryOptions = (
  adminDates: DeliveryOption[],
  generatedDates: DeliveryOption[],
  requiredDeliveries: number
): DeliveryOption[] => {
  // If admin explicitly configured delivery dates for the plan, show ONLY those.
  if (adminDates.length > 0) {
    const deduped = new Map<string, DeliveryOption>();
    adminDates.forEach((opt) => {
      if (!deduped.has(opt.date)) deduped.set(opt.date, opt);
    });
    return Array.from(deduped.values()).sort((a, b) => a.date.localeCompare(b.date));
  }

  // Otherwise fall back to generated (Mon/Thu) dates within the desired window.
  const merged = new Map<string, DeliveryOption>();
  generatedDates.forEach((opt) => {
    if (!merged.has(opt.date)) {
      merged.set(opt.date, opt);
    }
  });
  const sorted = Array.from(merged.values()).sort((a, b) => a.date.localeCompare(b.date));
  if (requiredDeliveries > 0 && sorted.length > requiredDeliveries) {
    return sorted.slice(0, requiredDeliveries);
  }
  return sorted;
};

const MealsSubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuthStore();
  const { openModal, setPendingCartAction } = useAuthModalStore();
  const {
    addresses,
    defaultAddress,
    fetchAddresses,
    isLoading: isAddressLoading,
    error: addressError,
    validateDeliveryArea,
  } = useAddressStore();

  const [isFulfilmentModalOpen, setIsFulfilmentModalOpen] = useState(false);
  const [selectedFulfilment, setSelectedFulfilment] = useState<
    'delivery' | 'pickup' | null
  >(null);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [didPrefetchAddresses, setDidPrefetchAddresses] = useState(false);
  const [isConfirmingDelivery, setIsConfirmingDelivery] = useState(false);
  const [deliveryValidationError, setDeliveryValidationError] = useState<string | null>(
    null
  );
  const [hasConfirmedDelivery, setHasConfirmedDelivery] = useState(false);
  const [pendingPlanSelection, setPendingPlanSelection] = useState<{
    plan: MealSubscriptionPlan;
    quantity: number;
  } | null>(null);

  const [isLoadingPlans, setIsLoadingPlans] = useState<boolean>(true);
  const [plans, setPlans] = useState<MealSubscriptionPlan[]>([]);
  const flowSteps: FlowStep[] = ['plans', 'schedule', 'menu', 'review'];
  const location = useLocation();
  const stepMatch = matchPath('/menu/meals/:step', location.pathname);
  const routeStep = (stepMatch?.params?.step as FlowStep | undefined) ?? 'plans';
  const currentStep: FlowStep = flowSteps.includes(routeStep)
    ? routeStep
    : 'plans';
  const currentStepRef = useRef<FlowStep>(currentStep);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    if (
      selectedFulfilment === 'delivery' &&
      isAuthenticated &&
      !didPrefetchAddresses &&
      addresses.length === 0
    ) {
      setDidPrefetchAddresses(true);
      fetchAddresses().catch(() => setDidPrefetchAddresses(false));
    }
  }, [
    addresses.length,
    didPrefetchAddresses,
    fetchAddresses,
    isAuthenticated,
    selectedFulfilment,
  ]);

  useEffect(() => {
    if (
      selectedFulfilment === 'delivery' &&
      !selectedAddressId &&
      (defaultAddress || addresses.length > 0)
    ) {
      const preferred = defaultAddress || addresses[0];
      if (preferred?._id) {
        setSelectedAddressId(preferred._id);
      }
    }
  }, [addresses, defaultAddress, selectedAddressId, selectedFulfilment]);

  const navigateToStep = useCallback(
    (step: FlowStep) => {
      if (currentStepRef.current === step) return;
      if (step === 'plans') {
        navigate('/menu/meals');
      } else {
        navigate(`/menu/meals/${step}`);
      }
    },
    [navigate]
  );

  const [modalPlan, setModalPlan] = useState<MealSubscriptionPlan | null>(null);
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  const [modalFulfilment, setModalFulfilment] =
    useState<FulfilmentMethod>('delivery');
  const fulfilmentLabel = selectedFulfilment
    ? selectedFulfilment === 'delivery'
      ? 'Delivery'
      : 'Pickup'
    : 'Choose delivery or pickup';

  const handleFulfilmentSelect = (method: FulfilmentMethod) => {
    setSelectedFulfilment(method);
    setModalFulfilment(method);
    setDeliveryValidationError(null);
    setHasConfirmedDelivery(false);

    if (method === 'pickup') {
      setSelectedAddressId('');
      setIsFulfilmentModalOpen(false);
    }
  };

  const handleConfirmDelivery = async () => {
    if (!selectedAddressId) {
      setDeliveryValidationError('Please select an address to continue.');
      return;
    }

    setDeliveryValidationError(null);
    setIsConfirmingDelivery(true);

    try {
      const validation = await validateDeliveryArea(
        selectedAddressId,
        pendingPlanSelection?.plan?.tab || modalPlan?.tab || 'weekly'
      );
      if (validation?.is_valid) {
        setHasConfirmedDelivery(true);
        setIsFulfilmentModalOpen(false);
      } else {
        setDeliveryValidationError(
          validation?.message ||
            'You are not in the area we operate for Meal Plans.'
        );
      }
    } catch (error: any) {
      setDeliveryValidationError(
        error?.message ||
          'We could not validate your address. Please try again.'
      );
    } finally {
      setIsConfirmingDelivery(false);
    }
  };

  const handleModalClose = () => {
    if (selectedFulfilment === 'pickup' || hasConfirmedDelivery) {
      setIsFulfilmentModalOpen(false);
    }
  };

  const [selectedPlanDetails, setSelectedPlanDetails] = useState<{
    plan: MealSubscriptionPlan;
    quantity: number;
    fulfilment: FulfilmentMethod;
  } | null>(null);
  const selectedPlanDetailsRef = useRef<typeof selectedPlanDetails>(null);
  useEffect(() => {
    selectedPlanDetailsRef.current = selectedPlanDetails;
  }, [selectedPlanDetails]);
  const [activePlanTab, setActivePlanTab] =
    useState<MealSubscriptionPlan['tab']>('weekly');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [weeklyPlanAcknowledged, setWeeklyPlanAcknowledged] = useState<boolean>(
    () => readWeeklyPlanAcknowledgement()
  );
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editingDetails, setEditingDetails] =
    useState<MealSubscriptionEditDetails | null>(null);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [editHydrated, setEditHydrated] = useState(false);
  const [addOnItems, setAddOnItems] = useState<MenuItem[]>([]);
  const [addOnSelections, setAddOnSelections] = useState<Record<string, number>>({});
  const [addOnsLoading, setAddOnsLoading] = useState(false);
  const [addOnsError, setAddOnsError] = useState<string | null>(null);
  const fetchOrderHistory = useOrderStore((state) => state.fetchOrderHistory);

  const isModalRegularPlan = modalPlan?.tab === 'regular';
  const isModalWeeklyTenPlan = modalPlan?.tab === 'weekly';
  const isModalFortnightPlan = modalPlan?.tab === 'fortnight';
  const fortnightOverrides = isModalFortnightPlan
    ? {
        description:
          'Plan to select from two to four favorite days menus (out of the upcoming 8 days) and keep the savings rolling.',
        mealsIncluded: 20,
        basePrice: 189.9,
        pricePerMeal: 9.49,
        maxBoxesPerMeal: 2,
        terms: [
          'Two to four deliveries (Monday & Thursday), according to your chosen menu days.',
          'Maximum of 2 boxes per meal.',
          'If you want more than 1 Monthly meal plan, then you can unlock more boxes per meal.',
          'Please contact us at least one day prior to any queries or changes related to your order.',
          'If any customer wants to change their delivery address, then they can update their address through email to our customer support or contact via WhatsApp.',
        ],
      }
    : null;
  const modalRegularHighlights = isModalRegularPlan
    ? [
        {
          title: 'Pay per meal',
          description: 'Pick any dishes you like. No bundled pricing or plan fees.',
        },
        {
          title: 'Delivery MOQ',
          description: '4 boxes per delivery day; 1 box per pickup day.',
        },
        {
          title: 'Delivery fees',
          description: 'Same rates as the Weekly 10-Meal plan.',
        },
        {
          title: 'Unlimited combos',
          description: 'Order as many boxes per meal as you need from any menu.',
        },
      ]
    : [];

  const clearEditingState = useCallback(() => {
    setEditingOrderId(null);
    setEditingDetails(null);
    setLockedDates(new Set());
    setEditHydrated(false);
    setAddOnSelections({});
  }, []);

  const handleExitEditing = useCallback(() => {
    clearEditingState();
    setSelectedPlanDetails(null);
    setSelectedDates([]);
    setSelectedMeals({});
    setActiveDate(null);
    setTermsAccepted(false);
    navigateToStep('plans');
  }, [clearEditingState, navigateToStep]);

  const planDeliveryDays = useMemo(
    () =>
      selectedPlanDetails?.plan
        ? resolvePlanDeliveryDays(selectedPlanDetails.plan)
        : undefined,
    [selectedPlanDetails?.plan]
  );

  const addOnLookup = useMemo(() => {
    const lookup: Record<string, MenuItem> = {};
    addOnItems.forEach((item) => {
      const id = (item as any)._id || (item as any).id;
      if (id) {
        lookup[String(id)] = item;
      }
    });
    return lookup;
  }, [addOnItems]);

  const upcomingDates = useMemo(() => {
    const plan = selectedPlanDetails?.plan;
    const required = resolveDeliveriesPerCycle(plan);

    const adminDefinedDates = buildDeliveryOptionsFromPlan(plan);
    const weeksWindow = (() => {
      if (plan?.tab === 'regular') {
        return Math.max(
          plan.week_selection_rules?.available_weeks ?? 0,
          plan.weeks_in_cycle ?? 0,
          6
        );
      }
      return (
        plan?.week_selection_rules?.available_weeks ??
        plan?.weeks_in_cycle ??
        6
      );
    })();
    const generated = generateUpcomingDeliveryDates(
      Math.max(weeksWindow ?? 6, 1),
      planDeliveryDays
    );

    return combineDeliveryOptions(adminDefinedDates, generated, required);
  }, [planDeliveryDays, selectedPlanDetails?.plan]);

  const deliveryOptionsLookup = useMemo(() => {
    const lookup: Record<string, DeliveryOption> = {};
    upcomingDates.forEach((option) => {
      lookup[option.date] = option;
    });
    return lookup;
  }, [upcomingDates]);
  const loadedMenusRef = useRef<Set<string>>(new Set());

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [menusByDate, setMenusByDate] = useState<Record<string, MenuItem[]>>(
    {}
  );
  const [menuLoadingState, setMenuLoadingState] = useState<
    Record<string, boolean>
  >({});
  const [selectedMeals, setSelectedMeals] = useState<SelectedMealsState>({});
  const [lockedDates, setLockedDates] = useState<Set<string>>(new Set());
  const [menuPaginationByDate, setMenuPaginationByDate] = useState<
    Record<string, MenuPaginationState>
  >({});
  const [mealModalState, setMealModalState] = useState<MealModalState>({
    isOpen: false,
    date: null,
    item: null,
    quantity: 1,
    variationSize: undefined,
    instructions: '',
  });
  const weeklyMenuCacheRef = useRef<Record<string, WeeklyMenuCacheEntry>>({});
  const isDateLocked = useCallback(
    (date: string | null | undefined) => {
      if (!date) return false;
      return lockedDates.has(date);
    },
    [lockedDates]
  );
  const pruneSelectionsForDate = useCallback(
    (date: string, menuItems: MenuItem[]) => {
      if (isDateLocked(date)) {
        return;
      }
      setSelectedMeals((prev) => {
        const existingSelections = prev[date];
        if (!existingSelections) {
          return prev;
        }
        const allowedIds = new Set(
          menuItems
            .map((item) => getMenuItemIdentifier(item))
            .filter((id): id is string => Boolean(id))
        );
        let changed = false;
        const nextSelections: Record<string, SelectedMealEntry> = {};

        if (allowedIds.size === 0) {
          if (Object.keys(existingSelections).length === 0) {
            return prev;
          }
          changed = true;
        } else {
          for (const [itemId, selection] of Object.entries(existingSelections)) {
            if (allowedIds.has(itemId)) {
              nextSelections[itemId] = selection;
            } else {
              changed = true;
            }
          }
        }

        if (!changed) {
          return prev;
        }

        const nextState = { ...prev };
        if (allowedIds.size === 0) {
          delete nextState[date];
        } else {
          nextState[date] = nextSelections;
        }
        return nextState;
      });
    },
    [setSelectedMeals, isDateLocked]
  );

  const normalizePlanQuantity = useCallback(
    (plan: MealSubscriptionPlan, quantity: number) => {
      if (plan.tab === 'regular') {
        return 1;
      }
      if (!plan.allow_multiple) {
        return 1;
      }
      return Math.max(1, quantity || 1);
    },
    []
  );

  useEffect(() => {
    const fetchAddOns = async () => {
      setAddOnsLoading(true);
      setAddOnsError(null);
      try {
        const response = await menuAPI.getDailyMenu({ category: 'add_ons' });
        const payload = response.data?.data ?? response.data;
        let addons: MenuItem[] = [];
        if (Array.isArray(payload)) {
          addons = payload;
        } else if (payload?.items && Array.isArray(payload.items)) {
          addons = payload.items;
        }
        setAddOnItems(addons);
      } catch (error: any) {
        console.error('Failed to load add-ons', error);
        const message =
          error?.response?.data?.message ||
          error?.message ||
          'Failed to load add-ons';
        setAddOnsError(message);
      } finally {
        setAddOnsLoading(false);
      }
    };

    fetchAddOns();
  }, []);
  const fetchWeeklyMenuItems = useCallback(
    async (targetDate?: string): Promise<WeeklyMenuFetchResult> => {
      const cacheKey = targetDate || 'default';
      const cached = weeklyMenuCacheRef.current[cacheKey];
      if (cached && Date.now() - cached.fetchedAt < WEEKLY_MENU_CACHE_TTL_MS) {
        return cached;
      }

      try {
        const response = await menuAPI.getWeeklyMenu(targetDate);
        const payload = response.data?.data ?? response.data ?? {};
        const rawItems: (Partial<MenuItem> | null)[] = Array.isArray(
          payload?.items
        )
          ? payload.items
          : Array.isArray(payload)
          ? payload
          : [];
        const items = filterMealPlanEligibleItems(rawItems, {
          requireExplicitFlag: true,
        });

        const result: WeeklyMenuFetchResult = {
          items,
          meta: {
            deliveryDate: payload?.delivery_date ?? null,
            rotation: payload?.menu_rotation ?? null,
          },
        };
        weeklyMenuCacheRef.current[cacheKey] = {
          ...result,
          fetchedAt: Date.now(),
        };
        return result;
      } catch (error: any) {
        console.error(error);
        const result: WeeklyMenuFetchResult = {
          items: [],
          meta: { deliveryDate: null, rotation: null },
          error:
            error?.response?.data?.message ||
            error?.message ||
            'Unable to load meal plan menu.',
        };
        weeklyMenuCacheRef.current[cacheKey] = {
          ...result,
          fetchedAt: Date.now(),
        };
        return result;
      }
    },
    []
  );

  const updateMenuPaginationForDate = useCallback(
    (date: string, totalItems: number) => {
      setMenuPaginationByDate((prev) => ({
        ...prev,
        [date]: {
          page: 1,
          pageSize: MEAL_MENU_PAGE_SIZE,
          totalItems,
          totalPages: Math.max(1, Math.ceil(totalItems / MEAL_MENU_PAGE_SIZE)),
        },
      }));
    },
    []
  );

  const handleMenuPageChange = useCallback((date: string, nextPage: number) => {
    setMenuPaginationByDate((prev) => {
      const current = prev[date];
      if (!current) {
        return prev;
      }
      const clampedPage = Math.max(
        1,
        Math.min(nextPage, current.totalPages || 1)
      );
      if (clampedPage === current.page) {
        return prev;
      }
      return {
        ...prev,
        [date]: {
          ...current,
          page: clampedPage,
        },
      };
    });
  }, []);

  const plansByTab = useMemo(() => {
    return plans.reduce<Record<string, MealSubscriptionPlan[]>>((acc, plan) => {
      const key = plan.tab || 'custom';
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(plan);
      return acc;
    }, {});
  }, [plans]);

  const availableTabs = useMemo(
    () => PLAN_TAB_ORDER.filter((tab) => (plansByTab[tab] ?? []).length > 0),
    [plansByTab]
  );

  useEffect(() => {
    if (!availableTabs.length) {
      return;
    }
    if (!availableTabs.includes(activePlanTab)) {
      setActivePlanTab(availableTabs[0]);
    }
  }, [availableTabs, activePlanTab]);

  const loadEditingDetails = useCallback(
    async (orderId: string) => {
      try {
        setIsLoadingEdit(true);
        const response = await ordersAPI.getMealSubscriptionDetails(orderId);
        setEditingDetails(response.data.data);
      } catch (error: any) {
        console.error('Failed to load meal subscription for editing', error);
        showToast(
          error?.response?.data?.message ||
            'Unable to load that subscription for editing.',
          'error'
        );
        setEditingOrderId(null);
        setEditingDetails(null);
      } finally {
        setIsLoadingEdit(false);
      }
    },
    [showToast]
  );

  useEffect(() => {
    const state = location.state as { editOrderId?: string } | undefined;
    if (state?.editOrderId && state.editOrderId !== editingOrderId) {
      setEditingOrderId(state.editOrderId);
      loadEditingDetails(state.editOrderId);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, editingOrderId, loadEditingDetails, navigate, location.pathname]);

  useEffect(() => {
    if (
      (currentStep === 'schedule' || currentStep === 'menu' || currentStep === 'review') &&
      !selectedPlanDetails
    ) {
      navigateToStep('plans');
      return;
    }

    if (currentStep === 'menu' && selectedDates.length === 0) {
      navigateToStep('schedule');
      return;
    }

    if (
      currentStep === 'review' &&
      (!selectedPlanDetails || selectedDates.length === 0)
    ) {
      navigateToStep(selectedDates.length === 0 ? 'schedule' : 'menu');
    }
  }, [currentStep, selectedPlanDetails, selectedDates, navigateToStep]);

  const displayedPlans = plansByTab[activePlanTab] ?? [];
  const selectedPlanTab = selectedPlanDetails?.plan.tab;

  useEffect(() => {
    if (selectedPlanTab === 'weekly' && !weeklyPlanAcknowledged) {
      setWeeklyPlanAcknowledged(true);
    }
  }, [selectedPlanTab, weeklyPlanAcknowledged]);

  useEffect(() => {
    persistWeeklyPlanAcknowledgement(weeklyPlanAcknowledged);
  }, [weeklyPlanAcknowledged]);

  const regularUpsellCopy = useMemo(() => {
    if (activePlanTab !== 'regular') {
      return null;
    }

    const hasWeeklyPlanSelected = selectedPlanTab === 'weekly';
    const hasWeeklyContext = hasWeeklyPlanSelected || weeklyPlanAcknowledged;
    const hasAnyPlanSelected = Boolean(selectedPlanDetails);

    const shouldShowForCondition = (condition?: string) => {
      const normalized = condition ?? 'always';
      switch (normalized) {
        case 'hidden':
          return false;
        case 'when_plan_selected':
          return hasWeeklyContext;
        case 'when_no_plan':
          return !hasAnyPlanSelected;
        default:
          return true;
      }
    };

    const candidatePlans = [
      ...(plansByTab.regular ?? []),
      ...(plansByTab.weekly ?? []),
    ];

    for (const plan of candidatePlans) {
      const message = plan.customer_notifications?.upsell_message;
      if (!message) continue;
      if (shouldShowForCondition(plan.customer_notifications?.upsell_condition)) {
        return message;
      }
    }
    return null;
  }, [
    activePlanTab,
    plansByTab,
    selectedPlanDetails,
    selectedPlanTab,
    weeklyPlanAcknowledged,
  ]);

  useEffect(() => {
    const loadPlans = async () => {
      setIsLoadingPlans(true);
      try {
        const response = await menuAPI.getMealSubscriptionPlans();
        const payload = response.data.data || response.data;
        const activePlans = Array.isArray(payload)
          ? payload.filter((plan) => plan.is_active)
          : [];
        setPlans(
          activePlans.sort(
            (a, b) =>
              (a.display_order ?? 0) - (b.display_order ?? 0) ||
              a.name.localeCompare(b.name)
          )
        );
      } catch (error) {
        console.error(error);
        showToast('Failed to load meal subscription plans', 'error');
      } finally {
        setIsLoadingPlans(false);
      }
    };

    loadPlans();
  }, []);

const fetchMenuForDate = useCallback(
  async (date: string, planOverride?: MealSubscriptionPlan | null) => {
    if (!date) {
      return;
    }

    const plan = planOverride ?? selectedPlanDetailsRef.current?.plan ?? null;
    const dayKey = getDayKeyFromDate(date);

    setMenuLoadingState((prev) => ({ ...prev, [date]: true }));
    try {
      let itemsForDate: MenuItem[] = [];

      if (plan) {
        const dateMenus = plan.menu_items_by_delivery_date?.[date];
        if (Array.isArray(dateMenus) && dateMenus.length > 0) {
          itemsForDate = filterMealPlanEligibleItems(dateMenus, {
            requireExplicitFlag: true,
          });
        }

        if (itemsForDate.length === 0) {
          const dateMenuIds = plan.menu_item_ids_by_delivery_date?.[date];
          if (Array.isArray(dateMenuIds) && dateMenuIds.length > 0) {
            const resolvedDateItems = await Promise.all(
              dateMenuIds.map(async (id) => {
                try {
                  const response = await menuAPI.getMenuItemById(id);
                  return response.data?.data || response.data;
                } catch (error) {
                  console.error(error);
                  return null;
                }
              })
            );
            itemsForDate = filterMealPlanEligibleItems(resolvedDateItems, {
              requireExplicitFlag: true,
            });
          }
        }

        if (itemsForDate.length === 0) {
          const planMenus = plan.menu_items_by_day?.[dayKey];
          if (Array.isArray(planMenus) && planMenus.length > 0) {
            itemsForDate = filterMealPlanEligibleItems(planMenus);
          }

          if (itemsForDate.length === 0) {
            const planMenuIds = plan.menu_item_ids_by_day?.[dayKey];
            if (Array.isArray(planMenuIds) && planMenuIds.length > 0) {
              const resolvedItems = await Promise.all(
                planMenuIds.map(async (id) => {
                  try {
                    const response = await menuAPI.getMenuItemById(id);
                    return response.data?.data || response.data;
                  } catch (error) {
                    console.error(error);
                    return null;
                  }
                })
              );
              itemsForDate = filterMealPlanEligibleItems(resolvedItems);
            }
          }
        }
      }

      if (itemsForDate.length < MIN_MEAL_OPTIONS_PER_DAY && plan?.tab === 'weekly') {
        const { items: fallbackItems, error } = await fetchWeeklyMenuItems(
          date
        );
        if (fallbackItems.length) {
          itemsForDate = mergeMealPlanMenus(itemsForDate, fallbackItems);
        } else if (!itemsForDate.length) {
          showToast(
            error ||
              `Unable to load menu for ${new Date(date).toLocaleDateString()}`,
            'error'
          );
        }
      }

      setMenusByDate((prev) => ({ ...prev, [date]: itemsForDate }));
      updateMenuPaginationForDate(date, itemsForDate.length);
      pruneSelectionsForDate(date, itemsForDate);
      loadedMenusRef.current.add(date);
    } catch (error) {
      console.error(error);
      showToast(`Unable to load menu for ${date}`, 'error');
    } finally {
      setMenuLoadingState((prev) => ({ ...prev, [date]: false }));
    }
  },
  [fetchWeeklyMenuItems, pruneSelectionsForDate, showToast]
);

  useEffect(() => {
    // Reset hydration flag when switching which order is being edited.
    setEditHydrated(false);
  }, [editingOrderId]);

  useEffect(() => {
    if (!editingOrderId || !editingDetails || plans.length === 0) {
      return;
    }
    if (editHydrated) {
      return;
    }

    const selection = editingDetails.plan_selections?.[0];
    const planId = selection?.plan_id;
    if (!planId) {
      showToast('Plan information missing on this subscription.', 'error');
      setEditingOrderId(null);
      return;
    }

    const plan = plans.find((p) => (p._id || p.id) === planId);

    if (!plan) {
      showToast('The original meal plan is no longer available.', 'error');
      setEditingOrderId(null);
      return;
    }

    setSelectedPlanDetails({
      plan,
      quantity: normalizePlanQuantity(plan, selection?.quantity || 1),
      fulfilment: editingDetails.fulfilment_method || 'delivery',
    });

    const slotDates = editingDetails.delivery_slots.map(
      (slot) => slot.delivery_date
    );
    setSelectedDates(slotDates);
    const now = Date.now();
    setLockedDates(
      new Set(
        (editingDetails.delivery_slots || [])
          .filter((slot) => {
            const cutoffTs = slot.cutoff_at ? Date.parse(slot.cutoff_at) : null;
            const passedCutoff =
              cutoffTs !== null && !Number.isNaN(cutoffTs) && now >= cutoffTs;
            return slot.is_locked || passedCutoff;
          })
          .map((slot) => slot.delivery_date)
      )
    );

    const hydratedMeals: SelectedMealsState = {};
    editingDetails.delivery_slots.forEach((slot) => {
      const normalized: Record<string, SelectedMealEntry> = {};
      Object.entries(slot.menu_items || {}).forEach(([menuId, qty]) => {
        const quantity = Number(qty) || 0;
        if (quantity > 0) {
          const variationSize = (slot as any)?.variation_sizes?.[menuId];
          normalized[menuId] = {
            quantity,
            variationSize: variationSize || undefined,
          };
        }
      });
      if (Object.keys(normalized).length > 0) {
        hydratedMeals[slot.delivery_date] = normalized;
      }
    });
    setSelectedMeals(hydratedMeals);
    setActiveDate(slotDates[0] ?? null);
    setTermsAccepted(true);

    slotDates.forEach((date) => {
      fetchMenuForDate(date, plan);
    });
    if (slotDates.length > 0) {
      navigateToStep('menu');
    }
    setEditHydrated(true);
  }, [editingOrderId, editingDetails, plans, fetchMenuForDate, navigateToStep, showToast, editHydrated, normalizePlanQuantity]);

  const includedBoxes = useMemo(() => {
    if (!selectedPlanDetails) return 0;
    return (
      (selectedPlanDetails.plan.included_meals || 0) *
      selectedPlanDetails.quantity
    );
  }, [selectedPlanDetails]);

  const perMealDiscountCap = null;

  const shouldEnforceIncludedMinimum = useMemo(() => {
    return requiresIncludedBoxMinimum(selectedPlanDetails?.plan);
  }, [selectedPlanDetails]);

  const selectedBoxes = useMemo(() => {
    return Object.values(selectedMeals).reduce((total, menuMap) => {
      const perDate = Object.values(menuMap).reduce(
        (sum, entry) => sum + (entry.quantity || 0),
        0
      );
      return total + perDate;
    }, 0);
  }, [selectedMeals]);

  const discountEligibleBoxes = selectedBoxes;

  const includedShortfall = useMemo(() => {
    if (!shouldEnforceIncludedMinimum) return 0;
    const eligibleForInclusion = Math.min(discountEligibleBoxes, includedBoxes);
    return Math.max(0, includedBoxes - eligibleForInclusion);
  }, [
    discountEligibleBoxes,
    includedBoxes,
    shouldEnforceIncludedMinimum,
  ]);

  const boxesByDate = useMemo(() => {
    const map: Record<string, number> = {};
    selectedDates.forEach((date) => {
      const selections = selectedMeals[date] || {};
      map[date] = Object.values(selections).reduce(
        (sum, entry) => sum + (entry.quantity || 0),
        0
      );
    });
    return map;
  }, [selectedDates, selectedMeals]);

  const extraBoxes = useMemo(() => {
    if (!selectedPlanDetails) return 0;
    if (selectedPlanDetails.plan.tab !== 'regular') return 0;
    const includedCount = Math.min(discountEligibleBoxes, includedBoxes);
    const extras = selectedBoxes - includedCount;
    return extras > 0 ? extras : 0;
  }, [
    discountEligibleBoxes,
    includedBoxes,
    selectedBoxes,
    selectedPlanDetails,
  ]);

  const requiredDeliveries = useMemo(() => {
    if (!selectedPlanDetails) return 0;
    return resolveDeliveriesPerCycle(selectedPlanDetails.plan);
  }, [selectedPlanDetails]);

  const minBoxesRequired = useMemo(() => {
    if (!selectedPlanDetails) return 0;
    const plan = selectedPlanDetails.plan;
    if (plan.tab !== 'regular') {
      // Allow proceeding even if fewer than included boxes are selected; require at least one box overall.
      return 1;
    }
    return selectedPlanDetails.fulfilment === 'delivery'
      ? (plan.min_boxes_delivery ?? 4)
      : (plan.min_boxes_pickup ?? 1);
  }, [selectedPlanDetails]);

  const getUnderfilledDates = useCallback((): string[] => {
    if (!selectedPlanDetails) return [];
    if (selectedPlanDetails.plan.tab !== 'regular') return [];
    const minimum = minBoxesRequired || 0;
    return selectedDates.filter(
      (date) => (boxesByDate[date] ?? 0) < minimum
    );
  }, [boxesByDate, minBoxesRequired, selectedDates, selectedPlanDetails]);

  const handleOpenPlanModal = (plan: MealSubscriptionPlan) => {
    setModalPlan(plan);
    setModalQuantity(1);
    setModalFulfilment('delivery');
    setTermsAccepted(!plan.require_terms_ack);
  };

  const resetScheduleState = useCallback(
    (
      plan: MealSubscriptionPlan,
      quantity: number,
      fulfilment: FulfilmentMethod
    ) => {
    setAddOnSelections({});
    const planDays = resolvePlanDeliveryDays(plan);
    const planUpcomingDates = (() => {
      const required = resolveDeliveriesPerCycle(plan);
      const adminDates = buildDeliveryOptionsFromPlan(plan);
      const weeksWindow =
        plan.tab === 'regular'
          ? Math.max(
              plan.week_selection_rules?.available_weeks ?? 0,
              plan.weeks_in_cycle ?? 0,
              6
            )
          : plan.week_selection_rules?.available_weeks ??
            plan.weeks_in_cycle ??
          6;
      const generated = generateUpcomingDeliveryDates(
        Math.max(weeksWindow, 1),
        planDays
      );
      return combineDeliveryOptions(adminDates, generated, required);
    })();

      loadedMenusRef.current.clear();
      setMenusByDate({});
      setMenuLoadingState({});
      setSelectedMeals({});
      setLockedDates(new Set());
      setMenuPaginationByDate({});
      setSelectedDates([]);
      setActiveDate(null);

    const normalizedQuantity = normalizePlanQuantity(plan, quantity);
    setSelectedPlanDetails({ plan, quantity: normalizedQuantity, fulfilment });
    navigateToStep('schedule');

    const deliveriesNeeded =
      resolveDeliveriesPerCycle(plan) || planUpcomingDates.length;
    const deliveriesPerWeekRule =
      plan.week_selection_rules?.deliveries_per_week ||
      resolveDeliveriesPerCycle(plan) ||
      1;

      const autopopulatedDates: string[] = [];
      const weekCounts: Record<number, number> = {};
      for (const option of planUpcomingDates) {
        if (autopopulatedDates.length >= deliveriesNeeded) {
          break;
        }
        const weekIndex = option.weekIndex;
        const currentCount = weekCounts[weekIndex] ?? 0;
        if (deliveriesPerWeekRule && currentCount >= deliveriesPerWeekRule) {
          continue;
        }
        autopopulatedDates.push(option.date);
        weekCounts[weekIndex] = currentCount + 1;
      }

      if (autopopulatedDates.length > 0) {
        setSelectedDates(autopopulatedDates);
      }
    },
    [navigateToStep, normalizePlanQuantity]
  );

  const finalizePendingPlan = useCallback(() => {
    if (!pendingPlanSelection) return;
    if (!selectedFulfilment) return;
    if (selectedFulfilment === 'delivery' && !hasConfirmedDelivery) return;

    if (pendingPlanSelection.plan.tab === 'weekly') {
      setWeeklyPlanAcknowledged(true);
    }
    resetScheduleState(
      pendingPlanSelection.plan,
      pendingPlanSelection.quantity,
      selectedFulfilment
    );
    setPendingPlanSelection(null);
    setIsFulfilmentModalOpen(false);
  }, [
    pendingPlanSelection,
    selectedFulfilment,
    hasConfirmedDelivery,
    resetScheduleState,
    setWeeklyPlanAcknowledged,
  ]);

  useEffect(() => {
    finalizePendingPlan();
  }, [finalizePendingPlan]);

  const handleConfirmPlan = async () => {
    if (!modalPlan) return;
    if (modalPlan.require_terms_ack && !termsAccepted) {
      showToast('Please accept the plan terms to continue.', 'warning');
      return;
    }
    // Defer fulfilment selection until after plan modal confirmation
    const normalizedQuantity = normalizePlanQuantity(modalPlan, modalQuantity);
    setPendingPlanSelection({ plan: modalPlan, quantity: normalizedQuantity });
    setModalPlan(null);
    setTermsAccepted(false);
    setHasConfirmedDelivery(false);
    setSelectedFulfilment(null);
    setIsFulfilmentModalOpen(true);
  };

  const handleChangePlan = () => {
    setSelectedPlanDetails(null);
    setSelectedDates([]);
    setSelectedMeals({});
    setActiveDate(null);
    setMenusByDate({});
    setLockedDates(new Set());
    setMenuPaginationByDate({});
    setMenuLoadingState({});
    loadedMenusRef.current.clear();
    navigateToStep('plans');
  };

  const handleToggleDate = (date: string) => {
    if (!selectedPlanDetails) return;

    const isSelected = selectedDates.includes(date);
    if (isSelected) {
      if (isDateLocked(date)) {
        showToast(
          'This delivery date is locked after the cutoff. Please contact support to change it.',
          'info'
        );
        return;
      }
      const remaining = selectedDates.filter((d) => d !== date);
      setSelectedDates(remaining);
      setSelectedMeals((prev) => {
        const updated = { ...prev };
        delete updated[date];
        return updated;
      });
      if (activeDate === date) {
        setActiveDate(remaining[0] ?? null);
      }
      return;
    }

    const option = deliveryOptionsLookup[date];
    const weekIndex = option?.weekIndex;
    const weekRules = selectedPlanDetails.plan.week_selection_rules;

    // Treat Monday/Thursday pair as the same week even if they map to adjacent indices
    const normalizedWeekIndex = (value: number | undefined) => {
      if (value === undefined) return undefined;
      return value;
    };
    const optionWeek = normalizedWeekIndex(weekIndex);

    // For single-week plans with a Mon/Thu pair, prevent selecting two of the same weekday
    const deliveriesPerWeekRule =
      weekRules?.deliveries_per_week ||
      resolveDeliveriesPerCycle(selectedPlanDetails.plan) ||
      1;
    if (
      weekRules?.required_weeks === 1 &&
      deliveriesPerWeekRule === 2 &&
      !weekRules.allow_partial_weeks
    ) {
      const newDay = new Date(`${date}T00:00:00`).getDay();
      const existingSameWeekday = selectedDates.some((selectedDate) => {
        const existingDay = new Date(`${selectedDate}T00:00:00`).getDay();
        return existingDay === newDay;
      });
      if (existingSameWeekday) {
        showToast(
          'Pick the other delivery day (Monday or Thursday) to complete the pair.',
          'info'
        );
        return;
      }
    }

    // Do not block additional weeks; required_weeks acts as a minimum target, not a hard cap.

    if (
      weekRules?.deliveries_per_week &&
      optionWeek !== undefined &&
      !weekRules.allow_partial_weeks
    ) {
      const weekCount = selectedDates.filter(
        (selectedDate) =>
          normalizedWeekIndex(
            deliveryOptionsLookup[selectedDate]?.weekIndex
          ) === optionWeek
      ).length;
      if (weekCount >= weekRules.deliveries_per_week) {
        showToast(
          `This plan already has ${weekRules.deliveries_per_week} delivery day${
            weekRules.deliveries_per_week === 1 ? '' : 's'
          } for that week.`,
          'info'
        );
        return;
      }
    }

    if (requiredDeliveries > 0 && selectedDates.length >= requiredDeliveries) {
      showToast(
        `This plan supports up to ${requiredDeliveries} delivery day${
          requiredDeliveries > 1 ? 's' : ''
        }. Deselect another date to choose a new one.`,
        'info'
      );
      return;
    }

    const updatedDates = [...selectedDates, date].sort();
    setSelectedDates(updatedDates);
    setActiveDate(date);
  };

  const handleAdjustAddOnQuantity = (item: MenuItem, delta: number) => {
    const itemId = (item as any)._id || (item as any).id;
    if (!itemId) return;
    setAddOnSelections((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      const nextState = { ...prev };
      if (next === 0) {
        delete nextState[itemId];
      } else {
        nextState[itemId] = next;
      }
      return nextState;
    });
  };

  const addOnTotal = useMemo(() => {
    return Object.entries(addOnSelections).reduce((sum, [id, qty]) => {
      const item = addOnLookup[id];
      const price = item?.price ?? 0;
      return sum + price * qty;
    }, 0);
  }, [addOnSelections, addOnLookup]);

  const handleOpenMealModal = (date: string | null, menuItem: MenuItem) => {
    if (!date) {
      showToast('Select a delivery day before adding meals.', 'info');
      return;
    }
    if (isDateLocked(date)) {
      showToast(
        'This delivery date is locked after the cutoff. Please contact support to make changes.',
        'info'
      );
      return;
    }
    if (!selectedPlanDetails) {
      showToast('Select a meal subscription plan first', 'warning');
      return;
    }
    if (!selectedDates.includes(date)) {
      showToast('Please choose a delivery day before adding meals', 'info');
      return;
    }
    const itemId = menuItem._id || menuItem.id;
    if (!itemId) {
      showToast('Unable to identify this menu item.', 'error');
      return;
    }
    const existing = selectedMeals[date]?.[itemId];
    const defaultVariation = menuItem.variations?.find((v) => v.is_available);
    setMealModalState({
      isOpen: true,
      date,
      item: menuItem,
      quantity: existing?.quantity || 1,
      variationSize: existing?.variationSize || defaultVariation?.size,
      instructions: existing?.instructions || '',
    });
  };

  const handleCloseMealModal = () => {
    setMealModalState({
      isOpen: false,
      date: null,
      item: null,
      quantity: 1,
      variationSize: undefined,
      instructions: '',
    });
  };

  const handleMealModalQuantityChange = (delta: number) => {
    setMealModalState((prev) => {
      const nextQuantity = Math.max(1, prev.quantity + delta);
      return { ...prev, quantity: nextQuantity };
    });
  };

  const handleMealModalInstructionsChange = (value: string) => {
    setMealModalState((prev) => ({
      ...prev,
      instructions: value,
    }));
  };

  const handleMealModalVariationChange = (value: string) => {
    setMealModalState((prev) => ({
      ...prev,
      variationSize: value || undefined,
    }));
  };

  const handleSaveMealSelection = () => {
    if (!mealModalState.date || !mealModalState.item) {
      return;
    }
    const success = updateMealSelection(
      mealModalState.date,
      mealModalState.item,
      mealModalState.quantity,
      mealModalState.variationSize,
      mealModalState.instructions
    );
    if (success) {
      handleCloseMealModal();
    }
  };

  const handleRemoveMealSelection = () => {
    if (!mealModalState.date || !mealModalState.item) {
      return;
    }
    const success = updateMealSelection(
      mealModalState.date,
      mealModalState.item,
      0,
      undefined,
      ''
    );
    if (success) {
      handleCloseMealModal();
    }
  };

  const updateMealSelection = (
    date: string,
    item: MenuItem,
    desiredQuantity: number,
    variationSize?: string,
    instructions?: string
  ): boolean => {
    if (isDateLocked(date)) {
      showToast(
        'Changes for this delivery date are locked after the cutoff time.',
        'info'
      );
      return false;
    }
    if (!selectedPlanDetails) {
      showToast('Select a meal subscription plan first', 'warning');
      return false;
    }

    if (!selectedDates.includes(date)) {
      showToast('Please choose a delivery day before adding meals', 'info');
      return false;
    }

    const itemId = item._id || item.id;
    if (!itemId) {
      return false;
    }

    const normalizedQuantity = Math.max(0, desiredQuantity || 0);
    const currentEntry = selectedMeals[date]?.[itemId];
    const currentQuantity = currentEntry?.quantity || 0;
    const normalizedInstructions =
      typeof instructions === 'string'
        ? instructions
        : currentEntry?.instructions || '';

    const trimmedInstructions = normalizedInstructions.trim();
    const normalizedVariation =
      variationSize || currentEntry?.variationSize || undefined;
    if (
      normalizedQuantity === currentQuantity &&
      (trimmedInstructions || undefined) ===
        (currentEntry?.instructions?.trim() || undefined) &&
      normalizedVariation === (currentEntry?.variationSize || undefined)
    ) {
      return true;
    }

    setSelectedMeals((prev) => {
      const existingForDate = prev[date] || {};
      const updatedForDate = { ...existingForDate };
      if (normalizedQuantity === 0) {
        delete updatedForDate[itemId];
      } else {
        updatedForDate[itemId] = {
          quantity: normalizedQuantity,
          variationSize: normalizedVariation,
          instructions: trimmedInstructions || undefined,
        };
      }

      const updated = { ...prev };
      if (Object.keys(updatedForDate).length === 0) {
        delete updated[date];
      } else {
        updated[date] = updatedForDate;
      }
      return updated;
    });

    return true;
  };

  const handleAdjustMealQuantity = (
    date: string,
    item: MenuItem,
    delta: number
  ) => {
    const itemId = item._id || item.id;
    if (!itemId) {
      return;
    }
    const existing = selectedMeals[date]?.[itemId];
    const currentQuantity = existing?.quantity || 0;
    const nextQuantity = Math.max(0, currentQuantity + delta);
    updateMealSelection(
      date,
      item,
      nextQuantity,
      existing?.variationSize,
      existing?.instructions
    );
  };

  const scheduleDatesReady = useMemo(() => {
    if (!selectedPlanDetails) return false;
    return selectedDates.length > 0;
  }, [selectedPlanDetails, selectedDates]);

  const mealsReady = useMemo(() => {
    if (!scheduleDatesReady) return false;
    if (!selectedPlanDetails) return false;
    if (selectedPlanDetails.plan.tab === 'regular') {
      const minimum = minBoxesRequired || 0;
      if (!minimum) return false;
      return getUnderfilledDates().length === 0;
    }
    if (shouldEnforceIncludedMinimum) {
      return includedShortfall === 0 && selectedBoxes > 0;
    }
    return selectedBoxes >= minBoxesRequired;
  }, [
    includedShortfall,
    getUnderfilledDates,
    minBoxesRequired,
    scheduleDatesReady,
    selectedBoxes,
    selectedPlanDetails,
    shouldEnforceIncludedMinimum,
  ]);

  const ensureRegularMinimumsMet = useCallback(() => {
    if (!selectedPlanDetails) return true;
    if (selectedPlanDetails.plan.tab !== 'regular') return true;

    const underfilledDates = getUnderfilledDates();
    if (underfilledDates.length === 0) {
      return true;
    }

    const minimum = minBoxesRequired || 0;
    const minCopy = `${minimum} box${minimum === 1 ? '' : 'es'}`;
    const formattedDates = underfilledDates
      .slice(0, 2)
      .map((date) =>
        new Date(date).toLocaleDateString('en-AU', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
      )
      .join(', ');
    const suffix = underfilledDates.length > 2 ? '...' : '';
    const fulfilmentLabel =
      selectedPlanDetails.fulfilment === 'delivery'
        ? 'each delivery day'
        : 'each pickup day';

    showToast(
      `Please select at least ${minCopy} for ${fulfilmentLabel}. Add more boxes for ${formattedDates}${suffix}`,
      'info'
    );
    return false;
  }, [getUnderfilledDates, minBoxesRequired, selectedPlanDetails, showToast]);

  const ensureIncludedMinimumMet = useCallback(() => {
    if (!selectedPlanDetails) return true;
    if (!shouldEnforceIncludedMinimum) return true;
    if (includedShortfall === 0) return true;

    const message = `Please add ${includedShortfall} more box${includedShortfall === 1 ? '' : 'es'} to cover the ${includedBoxes} included box${includedBoxes === 1 ? '' : 'es'} for this plan. Extra boxes are fine but do not count toward the included amount.`;
    showToast(message, 'warning');
    return false;
  }, [
    includedBoxes,
    includedShortfall,
    selectedPlanDetails,
    shouldEnforceIncludedMinimum,
    showToast,
  ]);

  const handleProceedToReview = () => {
    if (!selectedPlanDetails) return;
    if (
      selectedPlanDetails.plan.tab === 'regular' &&
      !ensureRegularMinimumsMet()
    ) {
      return;
    }
    if (!ensureIncludedMinimumMet()) {
      return;
    }
    if (!mealsReady) {
      showToast(
        'Please complete your meal selections before continuing.',
        'info'
      );
      return;
    }
    navigateToStep('review');
  };

  const handleProceedToMeals = async () => {
    if (!scheduleDatesReady) {
      showToast('Please select the required delivery days first.', 'info');
      return;
    }
    if (!selectedPlanDetails) return;
    if (selectedDates.length === 0) {
      showToast('Select at least one delivery day to continue.', 'info');
      return;
    }
    await Promise.all(
      selectedDates.map((date) =>
        fetchMenuForDate(date, selectedPlanDetails.plan)
      )
    );
    setActiveDate(selectedDates[0]);
    navigateToStep('menu');
  };

  const handleProceedToCheckout = () => {
    if (!selectedPlanDetails) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      // Save pending action for meal subscription
      setPendingCartAction({
        type: 'meal_subscription',
        timestamp: new Date().toISOString(),
      });

      // Open auth modal
      openModal('login', '/meals-subscription');
      showToast('Please login or sign up to proceed with checkout', 'warning');
      return;
    }

    if (
      selectedPlanDetails.plan.tab === 'regular' &&
      !ensureRegularMinimumsMet()
    ) {
      return;
    }
    if (!ensureIncludedMinimumMet()) {
      return;
    }
    if (!mealsReady) {
      showToast(
        'Please complete your meal selections before continuing.',
        'info'
      );
      return;
    }

    const schedule = selectedDates.map((date) => {
      const selections = selectedMeals[date] || {};
      const items: ScheduledItem[] = Object.entries(selections)
        .map(([itemId, selection]) => {
          const quantity = selection.quantity || 0;
          if (quantity <= 0) return null;
          const menu = menusByDate[date]?.find(
            (menuItem) => (menuItem._id || menuItem.id) === itemId
          );
          if (!menu) return null;
          return {
            item: menu,
            quantity,
            variation_size: selection.variationSize,
            instructions: selection.instructions,
          };
        })
        .filter(Boolean) as ScheduledItem[];
      return {
        date,
        items,
        notes: (() => {
          const entryNotes = items
            .map((entry) =>
              entry.instructions
                ? `${entry.item.name}: ${entry.instructions.trim()}`
                : null
            )
            .filter(Boolean) as string[];
          return entryNotes.length ? entryNotes.join(' | ') : undefined;
        })(),
      };
    });

    const payload: SubscriptionReviewPayload = {
      plan: selectedPlanDetails.plan,
      planQuantity: selectedPlanDetails.quantity,
      fulfilment: selectedPlanDetails.fulfilment,
      schedule,
      includedBoxes,
      totalBoxes: selectedBoxes,
      extraBoxes,
      maxPerMeal: selectedPlanDetails.plan.max_boxes_per_meal,
    };

    navigate('/checkout', {
      state: {
        subscriptionDetails: payload,
        addOns: Object.entries(addOnSelections).map(([id, quantity]) => ({
          id,
          quantity,
          item: addOnLookup[id],
        })),
      },
    });
  };

  const buildSubscriptionUpdatePayload = () => {
    if (!selectedPlanDetails) {
      throw new Error('Please select a meal plan before continuing.');
    }

    if (selectedDates.length === 0) {
      throw new Error('Please select at least one delivery day to continue.');
    }

    const plan = selectedPlanDetails.plan;
    const planId = (plan as any)._id || (plan as any).id;
    if (!planId) {
      throw new Error('Unable to identify the selected meal plan.');
    }

    const planSelectionsPayload = [
      {
        plan_id: planId,
        quantity: selectedPlanDetails.quantity,
      },
    ];

    const deliverySlotsPayload = selectedDates.map((date) => {
      const meals = selectedMeals[date] || {};
      const normalized: Record<string, number> = {};
      const variationSizes: Record<string, string> = {};
      const slotNotes: string[] = [];
      Object.entries(meals).forEach(([itemId, selection]) => {
        const qty = Math.max(0, Number(selection.quantity) || 0);
        if (qty <= 0) {
          return;
        }
        normalized[itemId] = qty;
        if (selection.variationSize) {
          variationSizes[itemId] = selection.variationSize;
        }
        if (selection.instructions) {
          const trimmed = selection.instructions.trim();
          if (trimmed) {
            const menuName =
              menusByDate[date]?.find(
                (menuItem) => (menuItem._id || menuItem.id) === itemId
              )?.name || 'Dish';
            slotNotes.push(`${menuName}: ${trimmed}`);
          }
        }
      });
      if (!Object.keys(normalized).length) {
        throw new Error('Please assign meals to every selected delivery day.');
      }
      return {
        delivery_date: date,
        menu_items: normalized,
        variation_sizes: Object.keys(variationSizes).length ? variationSizes : undefined,
        notes: slotNotes.length ? slotNotes.join(' | ') : undefined,
      };
    });

    return {
      plan_selections: planSelectionsPayload,
      delivery_slots: deliverySlotsPayload,
      fulfilment_method: selectedPlanDetails.fulfilment,
      is_express: editingDetails?.is_express ?? false,
      delivery_address_id: editingDetails?.delivery_address_id,
      delivery_instructions: editingDetails?.delivery_instructions ?? undefined,
      notes: editingDetails?.notes ?? undefined,
      payment_method: editingDetails?.payment_method ?? 'cash',
    };
  };

  const handleSaveEdits = async () => {
    if (!editingOrderId) {
      return;
    }
    if (
      selectedPlanDetails?.plan.tab === 'regular' &&
      !ensureRegularMinimumsMet()
    ) {
      return;
    }
    if (!ensureIncludedMinimumMet()) {
      return;
    }
    try {
      const payload = buildSubscriptionUpdatePayload();
      setIsSavingEdit(true);
      await ordersAPI.updateMealSubscriptionOrder(editingOrderId, payload);
      showToast('Meal selections updated successfully.', 'success');
      if (fetchOrderHistory) {
        await fetchOrderHistory();
      }
      clearEditingState();
      navigate('/profile');
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update subscription.';
      showToast(message, 'error');
    } finally {
      setIsSavingEdit(false);
    }
  };

  const renderPlanCard = (plan: MealSubscriptionPlan) => {
    const includedMeals = plan.included_meals || 0;
    const deliveries = resolveDeliveriesPerCycle(plan);
    const planDays = resolvePlanDeliveryDays(plan);
    const formatDayLabel = (day: string) =>
      day.charAt(0).toUpperCase() + day.slice(1);
    const dayDetails = planDays.map((day) => {
      const configuredCount =
        plan.menu_item_ids_by_day?.[day]?.length ??
        plan.menu_items_by_day?.[day]?.length ??
        0;
      return {
        label: formatDayLabel(day),
        configuredCount,
      };
    });
    const isRegularPlan = plan.tab === 'regular';
    const dayLabelString =
      planDays.length > 0
        ? planDays
            .map((day) => formatDayLabel(day))
            .join(planDays.length > 1 ? ' & ' : '')
        : '';
    const regularHighlights = [
      {
        icon: Package,
        title: 'Delivery MOQ',
        description: '4 boxes per delivery day; 1 box per pickup day.',
      },
      {
        icon: Utensils,
        title: 'Any menu combo',
        description: 'Order from any menu and add as many boxes per meal as you like.',
      },
      {
        icon: Truck,
        title: 'Delivery fees',
        description: 'Same rates as the Weekly 10-Meal plan.',
      },
    ];

    const isSelected =
      selectedPlanDetails?.plan?._id &&
      plan._id &&
      selectedPlanDetails.plan._id === plan._id;

    return (
      <Card
        key={plan._id}
        hoverable
        onClick={() => handleOpenPlanModal(plan)}
        className={clsx(
          'w-full max-w-xl mx-auto md:mx-0 border border-transparent transition-all duration-200 group',
          isSelected
            ? 'ring-2 ring-primary border-primary shadow-lg'
            : 'hover:border-primary/40 hover:shadow-md'
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-heading font-semibold text-text mb-1">
              {plan.name}
            </h3>
            <p className="text-sm text-gray-500">
              {isRegularPlan
                ? 'Flexible ordering without the 10-meal commitment.'
                : plan.description ||
                  (dayLabelString
                    ? `Choose from configured delivery days: ${dayLabelString}.`
                    : 'Choose your delivery days.')}
            </p>
          </div>
          {plan.display_badge && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              {plan.display_badge}
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-3">
            <Utensils className="text-primary" size={18} />
            <div>
              <p className="font-semibold text-text">
                {isRegularPlan ? 'Pay per meal' : includedMeals}
              </p>
              <p>
                {isRegularPlan
                  ? 'Choose the dishes you want each week.'
                  : 'Meals included'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CalendarRange className="text-primary" size={18} />
            <div>
              <p className="font-semibold text-text">
                {resolveDeliveriesPerCycle(plan) || 'Flexible'}
              </p>
              <p>
                Delivery{' '}
                {resolveDeliveriesPerCycle(plan) === 1 ? 'day' : 'days'}
                {resolveDeliveriesPerCycle(plan)
                  ? ` (${resolveDeliveriesPerCycle(plan) === 1 ? '1 day' : '1–2 days'} per week)`
                  : ''}
              </p>
            </div>
          </div>
          {!isRegularPlan && (
            <div className="flex items-center space-x-3">
              <Package className="text-primary" size={18} />
              <div>
                <p className="font-semibold text-text">
                  {formatCurrency(plan.price_per_plan || 0)}
                </p>
                <p>Total plan price</p>
              </div>
            </div>
          )}
          {planDays.length > 0 && (
            <div className="flex items-center space-x-3 sm:col-span-2">
              <Truck className="text-primary" size={18} />
              <div>
                <div className="flex flex-wrap gap-2">
                  {dayDetails.map(({ label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 text-sm font-medium text-text"
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <p>
                  {dayLabelString
                    ? `Configured delivery day${dayDetails.length > 1 ? 's' : ''}`
                    : 'Configured delivery days'}
                </p>
              </div>
            </div>
          )}
          {!isRegularPlan && plan.price_per_box ? (
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="text-primary" size={18} />
              <div>
                <p className="font-semibold text-text">
                  {formatCurrency(plan.price_per_box)}
                </p>
                <p>Per meal after discount</p>
              </div>
            </div>
          ) : null}
          {isRegularPlan &&
            regularHighlights.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start space-x-3">
                <Icon className="text-primary mt-0.5" size={18} />
                <div>
                  <p className="font-semibold text-text">{title}</p>
                  <p>{description}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Click to customise this plan
          </div>
          <Button variant="outline" size="sm">
            Configure
          </Button>
        </div>
      </Card>
    );
  };

  const renderPlanSelectionStep = () => {
    const tabHelper =
      PLAN_TAB_COPY[activePlanTab]?.helper ??
      'Select the plan that best suits your schedule.';

    return (
      <div className="space-y-8 flex flex-col items-center text-center">
        <div className="flex flex-wrap gap-2 justify-center">
          {availableTabs.length === 0 && (
            <span className="text-sm text-gray-500">
              No subscription plans are available right now.
            </span>
          )}
          {availableTabs.map((tab) => (
            <button
              key={tab}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-semibold border transition-colors',
                activePlanTab === tab
                  ? 'bg-primary text-white border-primary shadow'
                  : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
              )}
              onClick={() => setActivePlanTab(tab)}
            >
              {PLAN_TAB_COPY[tab]?.label ?? tab}
                </button>
              ))}
        </div>
        <p className="text-sm text-gray-500 max-w-3xl">{tabHelper}</p>
        {regularUpsellCopy && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {regularUpsellCopy}
          </div>
        )}
        <div
          className={clsx(
            'grid grid-cols-1 gap-6 justify-items-center w-full max-w-4xl mx-auto place-items-center',
            displayedPlans.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'
          )}
        >
          {displayedPlans.length === 0 ? (
            <Card className="w-full p-6 text-center text-gray-500">
              No plans are configured for this tab yet.
            </Card>
          ) : (
            displayedPlans.map(renderPlanCard)
          )}
        </div>
      </div>
    );
  };

  const renderScheduleStep = () => {
    if (!selectedPlanDetails) return null;

    const plan = selectedPlanDetails.plan;
    const weekRules = plan.week_selection_rules;
    const reminderSettings = plan.reminder_settings;
    const reminderEnabled = reminderSettings?.enabled;
    const customerReminderCopy =
      plan.customer_notifications?.reminder_message || null;

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={handleChangePlan}
              className="inline-flex items-center text-primary text-sm font-semibold hover:underline"
            >
              <ChevronLeft size={16} className="mr-1" />
              Change plan
            </button>
            <h2 className="text-3xl font-heading font-bold text-text mt-2">
              Schedule your {plan.name}
            </h2>
            <p className="text-gray-600">
              Select delivery days. Included boxes:{' '}
              <span className="font-semibold text-text">{includedBoxes}</span>
            </p>
          </div>
          <div className="bg-primary/10 px-5 py-3 rounded-lg text-primary font-semibold">
            {formatCurrency(plan.price_per_plan || 0)} per cycle
          </div>
        </div>

        {weekRules && (
          <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            Recommended: spread your selections across{' '}
            {weekRules.required_weeks ?? weekRules.available_weeks ?? '?'} week
            {((weekRules.required_weeks ?? weekRules.available_weeks) ?? 1) === 1
              ? ''
              : 's'}{' '}
            within the next {weekRules.available_weeks ?? '?'} weeks. Each week
            supports up to{' '}
            {weekRules.deliveries_per_week ?? resolveDeliveriesPerCycle(plan) ?? '?'}{' '}
            delivery day
            {(weekRules.deliveries_per_week ?? resolveDeliveriesPerCycle(plan)) === 1
              ? ''
              : 's'}
            , but you can always concentrate your meals on fewer days if that
            suits your schedule.
          </div>
        )}

        <Card className="border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-text">
                Select delivery days
              </h3>
              <p className="text-sm text-gray-500">
                {requiredDeliveries > 0
                  ? `This plan supports up to ${requiredDeliveries} delivery day${
                      requiredDeliveries > 1 ? 's' : ''
                    } per cycle. Pick anywhere from 1 to ${requiredDeliveries}.`
                  : 'Choose the delivery days that work best for you.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {upcomingDates.map((option) => {
              const isSelected = selectedDates.includes(option.date);
              const isDisabled =
                !isSelected &&
                requiredDeliveries > 0 &&
                selectedDates.length >= requiredDeliveries;

              return (
                <button
                  key={option.date}
                  onClick={() => handleToggleDate(option.date)}
                  className={clsx(
                    'px-4 py-2 rounded-full border transition-colors text-sm font-semibold',
                    isSelected
                      ? 'bg-primary text-white border-primary shadow'
                      : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary',
                    isDisabled && 'opacity-40 cursor-not-allowed'
                  )}
                  disabled={isDisabled}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </Card>

        {(reminderEnabled || customerReminderCopy) && (
          <Card className="border border-amber-100 bg-amber-50/60">
            <div className="flex items-start space-x-3">
              <Info className="text-amber-500 mt-1" size={18} />
              <div className="space-y-1 text-sm text-amber-800">
                <div className="font-semibold text-amber-900">
                  Reminder preferences
                </div>
                {reminderEnabled ? (
                  <p>
                    We’ll send a reminder every{' '}
                    <span className="font-semibold">
                      {reminderSettings?.frequency_days ?? 7}
                    </span>{' '}
                    day(s) via{' '}
                    <span className="font-semibold">
                      {reminderSettings?.channel
                        ?.replace('_', ' ')
                        .toUpperCase() || 'IN_APP'}
                    </span>
                    {typeof reminderSettings?.threshold_unselected_boxes ===
                      'number' &&
                      reminderSettings.threshold_unselected_boxes > 0 &&
                      ` once you have more than ${
                        reminderSettings.threshold_unselected_boxes
                      } unassigned box(es).`}
                  </p>
                ) : (
                  <p>
                    Reminders are not enabled for this plan. You can review your
                    schedule anytime from your account.
                  </p>
                )}
                {customerReminderCopy && (
                  <p className="text-sm text-amber-900">
                    {customerReminderCopy}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        <Card className="border border-gray-100">
          <h3 className="text-lg font-semibold text-text mb-4">Summary</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Selected deliveries</span>
              <span className="font-semibold text-text">
                {selectedDates.length}
                {plan.tab !== 'regular' && requiredDeliveries
                  ? ` / ${requiredDeliveries} max`
                  : ''}
              </span>
            </div>
            {weekRules?.required_weeks && (
              <div className="flex items-center justify-between">
                <span>Weeks chosen</span>
                <span className="font-semibold text-text">
                  {
                    new Set(
                      selectedDates.map(
                        (date) => deliveryOptionsLookup[date]?.weekIndex
                      )
                    ).size
                  }{' '}
                  / {weekRules.required_weeks} recommended
                </span>
              </div>
            )}
            {plan.tab === 'regular' && (
              <div className="text-xs text-gray-500">
                Minimum boxes per selected day for {selectedPlanDetails.fulfilment}:{' '}
                <span className="font-semibold text-text">
                  {minBoxesRequired}
                </span>
              </div>
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <Truck size={16} className="text-primary" />
            <span>
              Delivery fees are calculated per delivery day based on your
              postcode during checkout.
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <Button variant="outline" onClick={handleChangePlan} className="w-full sm:w-auto">
              Change Plan
            </Button>
            <Button
              variant="primary"
              onClick={handleProceedToMeals}
              disabled={!scheduleDatesReady}
              className="w-full sm:w-auto"
            >
              Choose Meals
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderMealsStep = () => {
    if (!selectedPlanDetails) return null;
    if (selectedDates.length === 0) {
      return (
        <Card className="border border-gray-100">
          <div className="p-8 text-center text-gray-500">
            Select your delivery days first to unlock the meal selector.
          </div>
        </Card>
      );
    }

    const plan = selectedPlanDetails.plan;
    const underfilledDates = getUnderfilledDates();
    const formattedUnderfilled = underfilledDates
      .slice(0, 3)
      .map((date) =>
        new Date(date).toLocaleDateString('en-AU', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
      )
      .join(', ');
    const maxPerMeal =
      plan.max_boxes_per_meal && plan.max_boxes_per_meal > 0
        ? plan.max_boxes_per_meal * selectedPlanDetails.quantity
        : null;
    const discountCapPerDish = perMealDiscountCap;

    const activeMenus = activeDate ? menusByDate[activeDate] || [] : [];
    const activePagination = activeDate
      ? menuPaginationByDate[activeDate]
      : undefined;
    const effectivePageSize =
      activePagination?.pageSize ?? MEAL_MENU_PAGE_SIZE;
    const currentPage = activePagination?.page ?? 1;
    const totalItems =
      activePagination?.totalItems ?? activeMenus.length ?? 0;
    const computedTotalPages =
      activePagination?.totalPages ??
      Math.max(1, Math.ceil((activeMenus.length || 0) / effectivePageSize));
    const totalPages = Math.max(computedTotalPages, 1);
    const startIndex = (currentPage - 1) * effectivePageSize;
    const paginatedMenus = activeMenus.slice(
      startIndex,
      startIndex + effectivePageSize
    );
    const displayStart =
      totalItems === 0 ? 0 : Math.min(totalItems, startIndex + 1);
    const displayEnd =
      totalItems === 0
        ? 0
        : Math.min(totalItems, startIndex + paginatedMenus.length);

    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={() => navigateToStep('schedule')}
              className="inline-flex items-center text-primary text-sm font-semibold hover:underline"
            >
              <ChevronLeft size={16} className="mr-1" />
              Adjust delivery days
            </button>
            <h2 className="text-3xl font-heading font-bold text-text mt-2">
              Choose meals for your {plan.name}
            </h2>
            <p className="text-gray-600">
              Included boxes:{' '}
              <span className="font-semibold text-text">{includedBoxes}</span>
            </p>
          </div>
          <div className="bg-primary/10 px-5 py-3 rounded-lg text-primary font-semibold w-full sm:w-auto text-center sm:text-right">
            {formatCurrency(plan.price_per_plan || 0)} per cycle
          </div>
        </div>

        {plan.customer_notifications?.reminder_message && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {plan.customer_notifications.reminder_message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6 items-start">
          <Card className="border border-gray-100">
            <h3 className="text-lg font-semibold text-text mb-4">Summary</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Selected deliveries</span>
                <span className="font-semibold text-text">
                  {selectedDates.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total boxes selected</span>
                <span className="font-semibold text-text">{selectedBoxes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Included boxes</span>
                <span className="font-semibold text-text">{includedBoxes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Extra boxes</span>
                <span
                  className={clsx(
                    'font-semibold',
                    extraBoxes > 0 ? 'text-primary' : 'text-text'
                  )}
                >
                  {extraBoxes}
                </span>
              </div>
              {shouldEnforceIncludedMinimum && includedShortfall > 0 && (
                <div className="text-xs text-red-600">
                  Add {includedShortfall} more box{includedShortfall === 1 ? '' : 'es'} to fill the {includedBoxes} included box{includedBoxes === 1 ? '' : 'es'}. Extra boxes are charged separately and are allowed.
                </div>
              )}
              {discountCapPerDish && (
                <div className="text-xs text-amber-700">
                  Only the first {discountCapPerDish} box
                  {discountCapPerDish === 1 ? '' : 'es'} of each dish (across all selected plans) get the plan discount. Boxes beyond the included total are still counted as extras even if you repeat dishes.
                </div>
              )}
              {plan.tab === 'regular' && (
                <div className="text-xs text-gray-500">
                  Minimum boxes per selected day for {selectedPlanDetails.fulfilment}:{' '}
                  <span className="font-semibold text-text">
                    {minBoxesRequired}
                  </span>
                </div>
              )}
              {plan.tab === 'regular' && underfilledDates.length > 0 && (
                <div className="text-xs text-red-600">
                  Add at least {minBoxesRequired} box
                  {minBoxesRequired === 1 ? '' : 'es'} for {selectedPlanDetails.fulfilment} on{' '}
                  {formattedUnderfilled}
                  {underfilledDates.length > 3 ? ', ...' : ''}.
                </div>
              )}
              {maxPerMeal && !discountCapPerDish && (
                <div className="text-xs text-gray-500">
                  Maximum boxes per dish: {maxPerMeal}
                </div>
              )}
            </div>
          </Card>

          <Card className="border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text">
                {activeDate
                  ? `Meals for ${new Date(activeDate).toLocaleDateString(
                      'en-AU',
                      {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short',
                      }
                    )}`
                  : 'Select a delivery day'}
              </h3>
              {activeDate && (
                <span className="text-xs text-gray-500">
                  Click a day to switch menus
                </span>
              )}
            </div>

            {activeDate && isDateLocked(activeDate) && (
              <div className="mb-3 text-xs font-semibold text-amber-700">
                This delivery date is locked after the cutoff. Contact support if you need to change it.
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setActiveDate(date)}
                  className={clsx(
                    'px-3 py-1 rounded-full text-xs font-semibold transition-colors',
                    activeDate === date
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span>
                      {new Date(date).toLocaleDateString('en-AU', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                    {isDateLocked(date) && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold">
                        Locked
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {!activeDate && (
              <div className="py-12 text-center text-gray-500">
                Select a delivery day to view menu options.
              </div>
            )}

            {activeDate && menuLoadingState[activeDate] && (
              <LoadingScreen variant="section" message="Loading meals..." />
            )}

            {activeDate &&
              !menuLoadingState[activeDate] &&
              activeMenus.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                  Menu not available for this date yet. Please choose another
                  day.
                </div>
              )}

            {activeDate &&
              !menuLoadingState[activeDate] &&
              activeMenus.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paginatedMenus.map((item) => {
                    const itemId = item._id || item.id;
                    const currentSelection =
                      (itemId && selectedMeals[activeDate]?.[itemId]) || undefined;
                    const currentCount = currentSelection?.quantity || 0;
                    const hasNote = Boolean(
                      currentSelection?.instructions?.trim()
                    );

                    const imageUrl = resolveMenuImageUrl(item);
                    const fallbackInitial =
                      (item.name?.charAt(0) || '?').toUpperCase();

                    return (
                      <div
                        key={itemId}
                        className="border border-gray-200 rounded-lg p-4 flex flex-col space-y-4"
                      >
                        <div className="h-40 w-full overflow-hidden rounded-lg bg-gray-100">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={`${item.name} photo`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-3xl font-semibold text-gray-400">
                              {fallbackInitial}
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-text">
                            {item.name}
                          </h4>
                          {item.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{formatCurrency(item.price)}</span>
                          <span>
                            {discountCapPerDish
                              ? `Plan covers ${discountCapPerDish}`
                              : plan.max_boxes_per_meal
                                ? `Max ${plan.max_boxes_per_meal * selectedPlanDetails.quantity}`
                                : '-'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleAdjustMealQuantity(activeDate, item, -1)
                            }
                            aria-label={`Remove ${item.name}`}
                          >
                            -
                          </Button>
                          <span className="text-xl font-semibold text-text">
                            {currentCount}
                          </span>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleOpenMealModal(activeDate, item)}
                            aria-label={`Customize ${item.name}`}
                          >
                            <ShoppingCart size={16} className="mr-1" />
                            {currentCount > 0 ? 'Edit' : 'Add'}
                          </Button>
                        </div>
                        {hasNote && (
                          <div className="text-xs text-primary">
                            Special instructions added
                          </div>
                        )}
              {discountCapPerDish && currentCount > discountCapPerDish && (
                <div className="text-xs text-amber-700">
                  Boxes beyond {discountCapPerDish} for a dish are charged at regular price; they also count toward extras if you exceed the included total.
                </div>
              )}
                      </div>
                    );
                    })}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-4">
                      <p className="text-sm text-gray-500">
                        Showing {displayStart}-{displayEnd} of {totalItems} meals
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage <= 1}
                          onClick={() =>
                            activeDate &&
                            handleMenuPageChange(activeDate, currentPage - 1)
                          }
                        >
                          Previous
                        </Button>
                        <span className="text-sm font-medium text-gray-600">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage >= totalPages}
                          onClick={() =>
                            activeDate &&
                            handleMenuPageChange(activeDate, currentPage + 1)
                          }
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigateToStep('schedule')}
          >
            Adjust delivery days
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={handleProceedToReview}
            disabled={!mealsReady}
          >
            Review Selection
          </Button>
        </div>
      </div>
    );
  };

  const renderReviewStep = () => {
    if (!selectedPlanDetails) return null;

    const plan = selectedPlanDetails.plan;

    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={() => navigateToStep('schedule')}
              className="inline-flex items-center text-primary text-sm font-semibold hover:underline"
            >
              <ChevronLeft size={16} className="mr-1" />
              Edit meals
            </button>
            <h2 className="text-3xl font-heading font-bold text-text mt-2">
              Review your subscription
            </h2>
            <p className="text-gray-600">
              Confirm your schedule, selected meals, and plan details.
            </p>
          </div>
          <div className="text-center sm:text-right bg-primary/10 px-4 py-3 rounded-lg text-primary font-semibold">
            <div className="text-xs uppercase tracking-wide text-primary/80">
              Plan price
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-bold">
              {formatCurrency(plan.price_per_plan || 0)}
            </div>
          </div>
        </div>

        <Card className="border border-gray-100">
          <h3 className="text-lg font-semibold text-text mb-4">Plan summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div>
              <div className="text-xs uppercase text-gray-400">Plan</div>
              <div className="font-semibold text-text mt-1">{plan.name}</div>
              <div className="text-xs text-gray-500">
                Qty: {selectedPlanDetails.quantity}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-400">Fulfilment</div>
              <div className="font-semibold text-text mt-1 capitalize">
                {selectedPlanDetails.fulfilment}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-400">
                Included boxes
              </div>
              <div className="font-semibold text-text mt-1">
                {includedBoxes}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-400">Extra boxes</div>
              <div
                className={clsx(
                  'font-semibold mt-1',
                  extraBoxes > 0 ? 'text-primary' : 'text-text'
                )}
              >
                {extraBoxes}
              </div>
            </div>
          </div>
          {isDiscountCappedPlan(plan) && (
            <div className="mt-3 text-xs text-amber-700">
              Only the first {perMealDiscountCap} box
              {perMealDiscountCap === 1 ? '' : 'es'} of each dish (across all selected plans) are covered by your plan discount. Extra boxes are charged at regular price.
            </div>
          )}
          {Object.keys(addOnSelections).length > 0 && (
            <div className="mt-3 text-sm text-gray-700 flex items-center justify-between">
              <span className="font-semibold">Add-ons total (charged separately)</span>
              <span className="font-semibold text-text">
                {formatCurrency(addOnTotal)}
              </span>
            </div>
          )}
        </Card>

        <Card className="border border-gray-100">
          <h3 className="text-lg font-semibold text-text mb-4">
            Delivery schedule & meals
          </h3>
          <div className="text-xs text-gray-500 mb-2">
            Review what you picked for each delivery date.
          </div>
          <div className="space-y-4">
            {selectedDates.length > 0 && (
              <div className="hidden">
                {/* reserved for potential future summary */}
              </div>
            )}
            {selectedDates.map((date) => {
              const selections = selectedMeals[date] || {};
              const items: ScheduledItem[] = Object.entries(selections)
                .map(([itemId, selection]) => {
                  const quantity = selection.quantity || 0;
                  if (quantity <= 0) return null;
                  const menu = menusByDate[date]?.find(
                    (menuItem) => (menuItem._id || menuItem.id) === itemId
                  );
                  if (!menu) return null;
                  return {
                    item: menu,
                    quantity,
                    instructions: selection.instructions,
                  };
                })
                .filter(Boolean) as ScheduledItem[];

              return (
                <div
                  key={date}
                  className="border border-gray-200 rounded-lg p-4 text-sm text-gray-600"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <CalendarRange className="text-primary" size={18} />
                      <span className="font-semibold text-text">
                        {new Date(date).toLocaleDateString('en-AU', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {items.reduce((sum, entry) => sum + entry.quantity, 0)}{' '}
                      boxes
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {items.map(({ item, quantity, instructions }) => {
                      const imageUrl = resolveMenuImageUrl(item);
                      const fallbackInitial =
                        (item.name?.charAt(0) || '?').toUpperCase();

                      return (
                        <div
                          key={item._id || item.id}
                          className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-3 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 overflow-hidden rounded-md border border-white shadow-sm bg-gray-100">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={`${item.name} photo`}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-lg font-semibold text-gray-400">
                                  {fallbackInitial}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-text">
                                {item.name}
                              </p>
                              {item.category && (
                                <p className="text-xs text-gray-500">
                                  {item.category}
                                </p>
                              )}
                              {instructions && (
                                <p className="text-xs text-primary mt-1">
                                  Note: {instructions}
                                </p>
                              )}
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-gray-600">
                            x{quantity}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="border border-gray-100">
          <h3 className="text-lg font-semibold text-text mb-4">Add-ons (optional)</h3>
          <p className="text-xs text-gray-500 mb-2">
            Add-ons are charged separately from your plan price.
          </p>
          {addOnsLoading ? (
            <div className="text-sm text-gray-500">Loading add-ons...</div>
          ) : addOnsError ? (
            <div className="text-sm text-red-600">{addOnsError}</div>
          ) : addOnItems.length === 0 ? (
            <div className="text-sm text-gray-500">No add-ons available right now.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {addOnItems.map((item) => {
                const itemId = (item as any)._id || (item as any).id;
                const qty = addOnSelections[itemId] || 0;
                const imageUrl = resolveMenuImageUrl(item);
                const fallbackInitial =
                  (item.name?.charAt(0) || '?').toUpperCase();
                return (
                  <div
                    key={itemId}
                    className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-100 border border-gray-200">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={`${item.name} photo`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-lg font-semibold text-gray-400">
                            {fallbackInitial}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-text">{item.name}</p>
                        {item.description && (
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAdjustAddOnQuantity(item, -1)}
                      >
                        -
                      </Button>
                      <span className="w-6 text-center font-semibold text-text">
                        {qty}
                      </span>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAdjustAddOnQuantity(item, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {selectedDates.length > 1 && Object.keys(addOnSelections).length > 0 && (
            <p className="text-xs text-gray-500 mt-3">
              Add-ons will be packed with your first delivery date.
            </p>
          )}
          {Object.keys(addOnSelections).length > 0 && (
            <div className="mt-3 text-sm font-semibold text-text">
              Add-ons total: {formatCurrency(addOnTotal)}
            </div>
          )}
        </Card>

        <Card className="border border-gray-100">
          <div className="flex items-start space-x-3">
            <Truck className="text-primary mt-1" size={18} />
            <div className="text-sm text-gray-600">
              <p>
                Delivery charges are based on your postcode and multiplied by
                the number of delivery days selected. Pickup orders will not
                incur a delivery fee.
              </p>
              <p className="mt-2">
                You&apos;ll confirm your address and review final pricing at
                checkout.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigateToStep('schedule')}
          >
            <Edit2 size={18} className="mr-2" />
            Edit meals
          </Button>
          {editingOrderId ? (
            <Button
              variant="primary"
              fullWidth
              onClick={handleSaveEdits}
              isLoading={isSavingEdit}
            >
              Save Changes
            </Button>
          ) : (
            <Button
              variant="primary"
              fullWidth
              onClick={handleProceedToCheckout}
              disabled={!mealsReady}
            >
              Continue to Checkout
            </Button>
          )}
        </div>
      </div>
    );
  };

  const mealModalItem = mealModalState.item;
  const mealModalDateLabel = mealModalState.date
    ? new Date(mealModalState.date).toLocaleDateString('en-AU', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    : null;
  const mealModalItemId =
    mealModalItem?._id || (mealModalItem as any)?.id || null;
  const mealModalExistingSelection =
    mealModalItemId &&
    mealModalState.date &&
    selectedMeals[mealModalState.date]?.[mealModalItemId];
  const mealModalAvailableVariations =
    mealModalItem?.variations?.filter((v) => v.is_available) || [];
  const mealModalSelectedVariation =
    mealModalAvailableVariations.find(
      (v) => v.size === mealModalState.variationSize
    ) || mealModalAvailableVariations[0];
  const mealModalPricePerItem = Number(
    mealModalSelectedVariation?.price ?? mealModalItem?.price
  ) || 0;
  const mealModalTotalPrice = mealModalPricePerItem * mealModalState.quantity;
  const mealModalImageUrl = mealModalItem
    ? resolveMenuImageUrl(mealModalItem)
    : null;
  if (isLoadingPlans || (editingOrderId && isLoadingEdit)) {
    return (
      <LoadingScreen
        message={
          isLoadingPlans
            ? 'Loading meal subscriptions...'
            : 'Loading your subscription...'
        }
      />
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom space-y-12">
        {editingOrderId && (
          <div className="rounded-lg border border-primary/30 bg-white px-4 py-3 shadow-sm flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-primary font-medium">
              Editing subscription #{editingDetails?.order_number ?? editingOrderId.slice(-6)}
            </div>
            <Button variant="ghost" size="sm" onClick={handleExitEditing}>
              Exit edit mode
            </Button>
          </div>
        )}
        {/* Fulfilment preference UI removed per request */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm">
          {['plans', 'schedule', 'menu', 'review'].map((step, index) => {
            const isActive = currentStep === step;
            const stepOrder = ['plans', 'schedule', 'menu', 'review'] as FlowStep[];
            const currentIndex = stepOrder.indexOf(currentStep);
            const thisIndex = stepOrder.indexOf(step as FlowStep);
            const isCompleted = thisIndex < currentIndex;

            const label =
              step === 'plans'
                ? 'Choose Plan'
                : step === 'schedule'
                  ? 'Select Delivery Days'
                  : step === 'menu'
                    ? 'Choose Meals'
                    : 'Review';

            return (
              <div key={step} className="flex items-center">
                <button
                  type="button"
                  disabled={currentStep === 'plans' && step !== 'plans'}
                  onClick={() => navigateToStep(step as any)}
                  className={clsx(
                    'relative flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-200',
                    isActive
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-primary/40 hover:text-primary'
                  )}
                >
                  <span
                    className={clsx(
                      'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                      isActive
                        ? 'bg-white text-primary'
                        : isCompleted
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600'
                    )}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </span>
                  <span className="font-semibold whitespace-nowrap">{label}</span>
                </button>
              </div>
            );
          })}
        </div>

        {currentStep === 'plans' && renderPlanSelectionStep()}
        {currentStep === 'schedule' && renderScheduleStep()}
        {currentStep === 'menu' && renderMealsStep()}
        {currentStep === 'review' && renderReviewStep()}
      </div>

      <Modal
        isOpen={mealModalState.isOpen}
        onClose={handleCloseMealModal}
        title={
          mealModalState.item
            ? `Customize ${mealModalState.item.name}`
            : 'Customize meal'
        }
        size="md"
      >
        {mealModalItem && (
          <div className="space-y-6">
            {mealModalImageUrl ? (
              <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={mealModalImageUrl}
                  alt={mealModalItem.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <Utensils className="mr-2" size={24} />
                <span>Image unavailable</span>
              </div>
            )}

            <div className="space-y-2">
              {mealModalDateLabel && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {mealModalDateLabel}
                </span>
              )}
              <p className="text-sm text-gray-600">
                {mealModalItem.description ||
                  'Add special instructions or adjust how many boxes you need for this delivery.'}
              </p>
              {Array.isArray(mealModalItem.allergens) &&
                mealModalItem.allergens.length > 0 && (
                  <div className="flex items-start space-x-2 rounded-md bg-orange-50 p-3 text-xs text-orange-700">
                    <AlertCircle size={14} className="mt-0.5" />
                    <span>Contains: {mealModalItem.allergens.join(', ')}</span>
                  </div>
                )}
            </div>

            {mealModalAvailableVariations.length > 0 && (
              <div>
                <label className="mb-2 block text-sm font-medium text-text">
                  Size
                </label>
                <select
                  value={
                    mealModalState.variationSize ||
                    mealModalSelectedVariation?.size ||
                    ''
                  }
                  onChange={(e) => handleMealModalVariationChange(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-primary focus:border-transparent focus:ring-2 focus:ring-primary"
                >
                  {mealModalAvailableVariations.map((variation) => (
                    <option key={variation.size} value={variation.size}>
                      {variation.size.charAt(0).toUpperCase() +
                        variation.size.slice(1)}{' '}
                      - {formatCurrency(Number(variation.price) || 0)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-text">
                Quantity
              </label>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleMealModalQuantityChange(-1)}
                  className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-gray-300 transition-colors hover:border-primary"
                >
                  <Minus size={20} />
                </button>
                <span className="w-16 text-center text-2xl font-semibold">
                  {mealModalState.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleMealModalQuantityChange(1)}
                  className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-gray-300 transition-colors hover:border-primary"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-text">
                Special Instructions (Optional)
              </label>
              <textarea
                value={mealModalState.instructions}
                onChange={(e) => handleMealModalInstructionsChange(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-primary"
                placeholder="e.g., Extra spicy, no onions..."
              />
            </div>

            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Price per item</span>
                <span className="font-semibold text-text">
                  {formatCurrency(mealModalPricePerItem)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-2">
                <span className="font-semibold text-text">Total</span>
                <span className="font-heading text-2xl font-bold text-primary">
                  {formatCurrency(mealModalTotalPrice)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {mealModalExistingSelection && (
                <Button
                  type="button"
                  variant="ghost"
                  className="sm:flex-1"
                  onClick={handleRemoveMealSelection}
                >
                  Remove from day
                </Button>
              )}
              <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  className="sm:flex-1"
                  onClick={handleCloseMealModal}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  className="sm:flex-1"
                  onClick={handleSaveMealSelection}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Save selection
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isFulfilmentModalOpen}
        onClose={handleModalClose}
        title="How would you like your meals?"
        showCloseButton={selectedFulfilment === 'pickup' || hasConfirmedDelivery}
      >
        <div className="space-y-6">
          <p className="text-gray-600">
            Choose delivery if you want meals brought to your door, or pickup if you will collect them.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                value: 'delivery' as const,
                title: 'Delivery',
                description: 'We will deliver to one of your saved addresses.',
                Icon: Truck,
              },
              {
                value: 'pickup' as const,
                title: 'Pickup',
                description: 'Collect from our kitchen when it suits you.',
                Icon: StoreIcon,
              },
            ].map((option) => {
              const isActive = selectedFulfilment === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleFulfilmentSelect(option.value)}
                  className={`flex flex-col gap-3 rounded-2xl border-2 p-4 text-left transition focus:outline-none ${isActive ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/40'}`}
                >
                  <option.Icon
                    className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-gray-400'}`}
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {option.title}
                    </p>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedFulfilment === 'delivery' && (
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Select a saved address
              </h3>

              {!isAuthenticated ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-gray-600">
                  <p className="font-medium">
                    Please sign in to choose from your saved addresses.
                  </p>
                  <Button className="mt-3" onClick={() => openModal('login')}>
                    Sign in to continue
                  </Button>
                </div>
              ) : (
                <>
                  {isAddressLoading && addresses.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-500">
                      Loading your saved addresses...
                    </div>
                  ) : addresses.length > 0 ? (
                    <div className="space-y-3">
                      {addresses.map((address) => (
                        <label
                          key={address._id}
                          className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${selectedAddressId === address._id ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 hover:border-primary/40'}`}
                        >
                          <input
                            type="radio"
                            name="delivery-address"
                            className="mt-1 h-4 w-4 text-primary focus:ring-primary"
                            checked={selectedAddressId === address._id}
                            onChange={() => setSelectedAddressId(address._id)}
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                              {address.label}
                              {address.is_default && (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="flex items-start gap-2 text-sm text-gray-600">
                              <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                              {formatAddressLine(address)}
                            </p>
                            {address.delivery_instructions && (
                              <p className="text-xs text-gray-500">
                                Notes: {address.delivery_instructions}
                              </p>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-4 text-amber-800">
                      <p className="font-semibold">No saved addresses yet.</p>
                      <p className="text-sm">
                        Add an address from your profile to enable delivery.
                      </p>
                    </div>
                  )}

                  {addressError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {addressError}
                    </div>
                  )}

                  {deliveryValidationError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {deliveryValidationError}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedFulfilment(null);
                        setHasConfirmedDelivery(false);
                      }}
                    >
                      Go back
                    </Button>
                    <Button
                      onClick={handleConfirmDelivery}
                      isLoading={isConfirmingDelivery}
                      disabled={addresses.length === 0 || isConfirmingDelivery}
                    >
                      Continue with delivery
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={!!modalPlan}
        onClose={() => {
          setModalPlan(null);
          setTermsAccepted(false);
        }}
        title={modalPlan ? modalPlan.name : 'Plan Details'}
        size="lg"
      >
        {modalPlan && (
          <div className="space-y-6">
            <div className="text-sm text-gray-600 space-y-2">
              {isModalWeeklyTenPlan ? (
                <>
                  <p>
                    You can select your desired dishes from both Weekly Menus (Monday and Thursday) or just one of the menu to create your perfect 10-meal bundle.
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>10 meals included.</li>
                    <li>Deal discount: $20 off</li>
                    <li>No per-dish quantity cap.</li>
                  </ul>
                </>
              ) : isModalFortnightPlan ? (
                <>
                  <p>
                    {fortnightOverrides?.description}
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>20 meals included</li>
                    <li>Deal discount: $50 off</li>
                    <li>No per-dish quantity cap.</li>
                  </ul>
                </>
              ) : (
                <>
                  <p>
                    {isModalRegularPlan
                      ? 'Build a flexible order without the 10-meal commitment. Pay only for the dishes you choose each week.'
                      : modalPlan.description}
                  </p>
                  {isModalRegularPlan ? (
                    <ul className="list-disc list-inside space-y-1">
                      {modalRegularHighlights.map((highlight) => (
                        <li key={highlight.title}>
                          <span className="font-semibold text-text">
                            {highlight.title}:{' '}
                          </span>
                          {highlight.description}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        {modalPlan.included_meals || 0} meals included (
                        {resolveDeliveriesPerCycle(modalPlan) || 0} delivery day
                        {resolveDeliveriesPerCycle(modalPlan) === 1 ? '' : 's'}).
                      </li>
                      <li>
                        Base price:{' '}
                        <span className="font-semibold text-text">
                          {formatCurrency(modalPlan.price_per_plan || 0)}
                        </span>
                      </li>
                      {modalPlan.price_per_box && (
                        <li>
                          Per meal after discount:{' '}
                          <span className="font-semibold text-text">
                            {formatCurrency(modalPlan.price_per_box)}
                          </span>
                        </li>
                      )}
                      {modalPlan.max_boxes_per_meal && (
                        <li>
                          {modalPlan.max_boxes_per_meal} boxes per dish per plan.
                        </li>
                      )}
                    </ul>
                  )}
                </>
              )}
            </div>

            {isModalFortnightPlan ? (
              <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 space-y-2">
                <h4 className="font-semibold text-text text-base">
                  Terms & Conditions
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {fortnightOverrides?.terms.map((term) => (
                    <li key={term}>{term}</li>
                  ))}
                </ul>
              </div>
            ) : isModalWeeklyTenPlan ? (
              <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 space-y-2">
                <h4 className="font-semibold text-text text-base">
                  Terms & Conditions
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    One or two weekly deliveries (Monday & Thursday), according to your chosen menu days.
                  </li>
                  <li>
                    Maximum of 2 boxes per meal per 10-meal plan.
                  </li>
                  <li>
                    If you want more than One Weekly 10 meal plan, then you can unlock more boxes per meal.
                  </li>
                  <li>
                    Please contact us at least one day prior to any queries or changes related to your order.
                  </li>
                  <li>
                    If any customer wants to order more than 2 boxes per meal, then onward boxes will be calculated on Regular prices.
                  </li>
                  <li>
                    If any customer wants to change their delivery address, then They can update their address through email to our customer Support or They can contact via WhatsApp.
                  </li>
                </ul>
              </div>
            ) : modalPlan.terms_and_conditions?.length ? (
              <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 space-y-2">
                <h4 className="font-semibold text-text text-base">
                  Terms & Conditions
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {modalPlan.terms_and_conditions.map((term) => (
                    <li key={term}>{term}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {modalPlan.require_terms_ack && (
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span>
                  {modalPlan.acknowledgement_label ||
                    'I agree to the plan terms and conditions.'}
                </span>
              </label>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modalPlan.allow_multiple && modalPlan.tab !== 'regular' && (
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Number of plans
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={modalQuantity}
                    onChange={(e) =>
                      setModalQuantity(Math.max(1, Number(e.target.value)))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}

              {modalPlan.tab === 'regular' && (
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Fulfilment method
                  </label>
                  <div className="text-sm text-gray-600">
                    Delivery/pickup is fixed for this plan. We’ll confirm when we call.
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="ghost" onClick={() => setModalPlan(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleConfirmPlan}>
                Continue
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MealsSubscriptionPage;
