import React, { useEffect, useMemo, useState } from 'react';
import { adminAPI } from '@api';
import { useAdminStore } from '@store/adminStore';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Input from '@components/common/Input';
import Modal from '@components/common/Modal';
import LoadingScreen from '@components/common/LoadingScreen';
import Pagination from '@components/common/Pagination';
import { useToast } from '@components/common/Toast';
import AdminSidebar from '@components/admin/AdminSidebar';
import { MealSubscriptionPlan } from '@models/subscription.types';

const PLAN_TABS_AVAILABLE: MealSubscriptionPlan['tab'][] = [
  'weekly',
  // 'fortnight',
  // 'monthly',
  'regular',
];

type PlanFormState = Partial<MealSubscriptionPlan> & {
  suburbs?: string;
};

type DeliveryOption = {
  date: string;
  label: string;
  weekIndex: number;
};

const PLAN_DELIVERY_DAYS: Array<{ value: string; label: string }> = [
  { value: 'monday', label: 'Monday' },
  { value: 'thursday', label: 'Thursday' },
];

const MEAL_PLANS_PAGE_SIZE = 10;

const DAY_SEQUENCE = PLAN_DELIVERY_DAYS.map((day) => day.value);
const REQUIRED_PLAN_DAYS = DAY_SEQUENCE;

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

const normalizeAvailabilityScope = (
  scope?: unknown
): 'daily' | 'meal_plan' | 'both' | null => {
  if (typeof scope !== 'string') return null;
  const normalized = scope.toLowerCase().replace(/\s+/g, '_');
  if (normalized === 'daily') return 'daily';
  if (normalized === 'meal_plan') return 'meal_plan';
  if (
    normalized === 'both' ||
    normalized === 'both_menus' ||
    normalized === 'daily_meal_plan' ||
    normalized === 'daily_and_meal_plan'
  ) {
    return 'both';
  }
  return null;
};

const isTruthyFlag = (value: unknown) => {
  if (value === true) return true;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return false;
};

const isMealPlanAssignableItem = (item: any) => {
  if (!item) return false;
  const scope = normalizeAvailabilityScope(item.availability_scope);
  if (scope === 'daily') return false;
  if (scope === 'meal_plan' || scope === 'both') return true;
  return isTruthyFlag(item.is_available_for_meal_plan);
};

const describeMenuScope = (item: any) => {
  const scope = normalizeAvailabilityScope(item?.availability_scope);
  if (scope === 'both') return 'Daily & Meal Plan';
  if (scope === 'meal_plan') return 'Meal Plan';
  if (scope === 'daily') return 'Daily Menu';
  return null;
};

const generateUpcomingDeliveryDates = (
  weeks: number = 6,
  allowedDays?: string[]
): DeliveryOption[] => {
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
  const results: DeliveryOption[] = [];

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

      results.push({
        date: toLocalISODate(cursor),
        label: formatted,
        weekIndex: currentWeekIndex,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
    iterations += 1;
  }

  return results;
};

const resolvePlanDeliveryDays = (
  plan?: Partial<MealSubscriptionPlan>,
  fallbackDays: string[] = DEFAULT_DELIVERY_DAYS
) => {
  const available = normalizeDeliveryDays(plan?.available_delivery_days ?? []);
  if (available.length > 0) {
    return available;
  }
  const mappedDays = normalizeDeliveryDays(
    Object.keys(plan?.menu_item_ids_by_day ?? {})
  );
  if (mappedDays.length > 0) {
    return mappedDays;
  }
  const enrichedDays = normalizeDeliveryDays(
    Object.keys(plan?.menu_items_by_day ?? {})
  );
  if (enrichedDays.length > 0) {
    return enrichedDays;
  }
  return normalizeDeliveryDays(fallbackDays);
};

const defaultPlanForm: PlanFormState = {
  code: '',
  name: '',
  tab: 'weekly',
  description: '',
  included_meals: 0,
  deliveries_per_cycle: 1,
  weeks_in_cycle: 1,
  boxes_per_delivery: 1,
  max_boxes_per_meal: null,
  price_per_plan: 0,
  price_per_box: null,
  allow_multiple: true,
  min_boxes_delivery: 4,
  min_boxes_pickup: 1,
  display_badge: '',
  display_order: 0,
  highlight: false,
  require_terms_ack: false,
  acknowledgement_label: '',
  terms_and_conditions: [],
  week_selection_rules: undefined,
  customer_notifications: {
    upsell_message: '',
    reminder_message: '',
    upsell_condition: 'always',
  },
  reminder_settings: {
    enabled: false,
    frequency_days: 7,
    channel: 'in_app',
    threshold_unselected_boxes: null,
  },
  is_active: true,
  available_delivery_days: [],
  menu_item_ids_by_day: {},
  menu_item_ids_by_delivery_date: {},
  metadata: {
    menu_item_scope: 'meal_plan_only',
  },
};

type PlanTabTemplate = {
  value: MealSubscriptionPlan['tab'];
  label: string;
  helper: string;
  template: Partial<PlanFormState>;
};

const PLAN_TAB_CONFIGS: Record<string, PlanTabTemplate> = {
  regular: {
    value: 'regular',
    label: 'Regular Order',
    helper: 'No meal limit, MOQ 4 boxes for delivery / 1 for pickup.',
    template: {
      included_meals: 0,
      deliveries_per_cycle: 8,
      weeks_in_cycle: 4,
      boxes_per_delivery: 1,
      max_boxes_per_meal: null,
      price_per_plan: 0,
      price_per_box: null,
      min_boxes_delivery: 4,
      min_boxes_pickup: 1,
      require_terms_ack: false,
      acknowledgement_label: '',
      terms_and_conditions: [],
      week_selection_rules: {
        available_weeks: 6,
        required_weeks: 1,
        deliveries_per_week: 2,
        allow_partial_weeks: true,
      },
      customer_notifications: {
        upsell_message:
          'You can select the 10-meal deal offer to get a discount.',
        reminder_message: '',
        upsell_condition: 'when_plan_selected',
      },
      reminder_settings: {
        enabled: false,
        frequency_days: 7,
        channel: 'in_app',
        threshold_unselected_boxes: null,
      },
      metadata: {
        menu_item_scope: 'meal_plan_only',
      },
      available_delivery_days: ['monday', 'thursday'],
    },
  },
  weekly: {
    value: 'weekly',
    label: 'Weekly 10-Meal Plan',
    helper: 'Two deliveries every week on your chosen days.',
    template: {
      included_meals: 10,
      deliveries_per_cycle: 2,
      weeks_in_cycle: 1,
      boxes_per_delivery: 5,
      max_boxes_per_meal: 2,
      price_per_plan: 129,
      price_per_box: 12.9,
      require_terms_ack: true,
      acknowledgement_label: 'I agree to the Weekly 10-Meal Plan terms.',
      terms_and_conditions: [
        'Two deliveries per week on your chosen days.',
        'Maximum of 2 boxes per meal per 10-meal plan.',
        'Additional plans unlock more boxes per meal.',
        'Changes must be submitted before the weekly cut-off.',
      ],
      week_selection_rules: {
        available_weeks: 2,
        required_weeks: 1,
        deliveries_per_week: 2,
        allow_partial_weeks: false,
      },
      customer_notifications: {
        upsell_message: '',
        reminder_message: '',
        upsell_condition: 'hidden',
      },
      reminder_settings: {
        enabled: false,
        frequency_days: 7,
        channel: 'in_app',
        threshold_unselected_boxes: null,
      },
      metadata: {
        menu_item_scope: 'meal_plan_only',
      },
      available_delivery_days: ['monday', 'thursday'],
    },
  },
  fortnight: {
    value: 'fortnight',
    label: 'Fortnight Plan',
    helper: 'Pick any 2 weeks out of the upcoming 4.',
    template: {
      included_meals: 20,
      deliveries_per_cycle: 4,
      weeks_in_cycle: 2,
      boxes_per_delivery: 5,
      max_boxes_per_meal: 2,
      price_per_plan: 249,
      price_per_box: 12.45,
      require_terms_ack: true,
      acknowledgement_label:
        'I understand I must choose 2 weeks within the next 4.',
      terms_and_conditions: [
        'Pick any two upcoming weeks with two deliveries per week.',
        'Ten meals per selected week (two deliveries on your configured days).',
        'Changes lock 48 hours before each delivery.',
      ],
      week_selection_rules: {
        available_weeks: 4,
        required_weeks: 2,
        deliveries_per_week: 2,
        allow_partial_weeks: false,
      },
      customer_notifications: {
        upsell_message: '',
        reminder_message: '',
        upsell_condition: 'hidden',
      },
      reminder_settings: {
        enabled: false,
        frequency_days: 7,
        channel: 'in_app',
        threshold_unselected_boxes: null,
      },
      metadata: {
        menu_item_scope: 'meal_plan_only',
      },
      available_delivery_days: ['monday', 'thursday'],
    },
  },
  monthly: {
    value: 'monthly',
    label: 'Monthly Plan',
    helper: 'Select 4 weeks out of the next 6 and receive reminders.',
    template: {
      included_meals: 40,
      deliveries_per_cycle: 8,
      weeks_in_cycle: 4,
      boxes_per_delivery: 5,
      max_boxes_per_meal: 2,
      price_per_plan: 479,
      price_per_box: 11.98,
      require_terms_ack: true,
      acknowledgement_label:
        'I will complete my 4 weekly selections within 6 weeks.',
      terms_and_conditions: [
        'Select four weeks with two deliveries per week within the next six-week window.',
        'Each selected week includes ten meals (two deliveries on your configured days).',
        "We'll remind you about any remaining meal selections.",
      ],
      week_selection_rules: {
        available_weeks: 6,
        required_weeks: 4,
        deliveries_per_week: 2,
        allow_partial_weeks: false,
      },
      customer_notifications: {
        upsell_message: '',
        reminder_message:
          'Monthly plan reminder: keep an eye on how many meals are still unassigned.',
        upsell_condition: 'hidden',
      },
      reminder_settings: {
        enabled: true,
        frequency_days: 7,
        channel: 'both',
        threshold_unselected_boxes: 4,
      },
      metadata: {
        menu_item_scope: 'meal_plan_only',
      },
      available_delivery_days: ['monday', 'thursday'],
    },
  },
};

const buildDefaultPlanIdentity = (
  tab: MealSubscriptionPlan['tab']
): Pick<PlanFormState, 'code' | 'name'> => {
  const config = PLAN_TAB_CONFIGS[tab];
  if (!config) {
    return {
      code: `${tab}_plan`,
      name: tab,
    };
  }

  const normalizedName = config.label.trim();
  const normalizedCode =
    tab === 'weekly'
      ? 'weekly_10_meal'
      : normalizedName.toLowerCase().replace(/[^a-z0-9]+/g, '_');

  return {
    code: normalizedCode.replace(/^_+|_+$/g, ''),
    name: normalizedName,
  };
};

const formatCurrency = (value: number | undefined) =>
  value !== undefined
    ? new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
      }).format(value)
    : '-';

const isValidObjectId = (value: string) => /^[a-fA-F0-9]{24}$/.test(value);

const normalizeDeliveryDayOrder = (days?: string[]) => {
  const normalized: string[] = [];
  const seen = new Set<string>();
  (days ?? []).forEach((day) => {
    const normalizedDay = day?.toString().toLowerCase();
    if (
      normalizedDay &&
      DAY_SEQUENCE.includes(normalizedDay) &&
      !seen.has(normalizedDay)
    ) {
      seen.add(normalizedDay);
      normalized.push(normalizedDay);
    }
  });
  return normalized;
};

const ensureRequiredDeliveryDays = (days?: string[]) => {
  const normalized = normalizeDeliveryDayOrder(days);
  const hasAllDays = REQUIRED_PLAN_DAYS.every((day) =>
    normalized.includes(day)
  );
  if (hasAllDays && normalized.length === REQUIRED_PLAN_DAYS.length) {
    return normalized;
  }
  return [...REQUIRED_PLAN_DAYS];
};

const MealPlanManagement: React.FC = () => {
  const { showToast } = useToast();
  const {
    mealPlans,
    mealPlanPagination,
    managedMenuItems,
    fetchMealPlans,
    fetchManagedMenuItems,
    createMealPlan,
    updateMealPlan,
    isLoading,
    isUpdating,
    error,
    clearError,
  } = useAdminStore();

  const [activePlanTab, setActivePlanTab] =
    useState<MealSubscriptionPlan['tab']>('weekly');
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MealSubscriptionPlan | null>(
    null
  );
  const [planForm, setPlanForm] = useState<PlanFormState>(defaultPlanForm);
  const [selectedDays, setSelectedDays] = useState<string[]>([
    ...REQUIRED_PLAN_DAYS,
  ]);
  const [dayMenuSelections, setDayMenuSelections] = useState<
    Record<string, string[]>
  >({
    monday: [],
    thursday: [],
  });
  const [dateMenuSelections, setDateMenuSelections] = useState<
    Record<string, string[]>
  >({});
  const [newDeliveryDate, setNewDeliveryDate] = useState('');
  const [plansPage, setPlansPage] = useState(1);

  useEffect(() => {
    fetchManagedMenuItems().catch(console.error);
  }, [fetchManagedMenuItems]);

  useEffect(() => {
    fetchMealPlans({
      includeInactive: true,
      page: plansPage,
      pageSize: MEAL_PLANS_PAGE_SIZE,
    }).catch(console.error);
  }, [fetchMealPlans, plansPage]);

  // ? FIX: Add null check for mealPlanPagination
  useEffect(() => {
    if (!mealPlanPagination) return;

    if (
      mealPlanPagination.total_pages > 0 &&
      plansPage > mealPlanPagination.total_pages
    ) {
      setPlansPage(mealPlanPagination.total_pages);
    } else if (
      mealPlanPagination.page > 0 &&
      mealPlanPagination.page !== plansPage
    ) {
      setPlansPage(mealPlanPagination.page);
    }
  }, [mealPlanPagination?.page, mealPlanPagination?.total_pages, plansPage]);

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
      clearError();
    }
  }, [error, showToast, clearError]);

  const mealPlanEligibleItems = useMemo(
    () =>
      (managedMenuItems ?? []).filter((item) =>
        isMealPlanAssignableItem(item)
      ),
    [managedMenuItems]
  );

  const resolveMenuScope = (
    _metadata?: Record<string, unknown>
  ): 'meal_plan_only' => {
    return 'meal_plan_only';
  };

  const availableMenuItems = useMemo(
    () => [...mealPlanEligibleItems],
    [mealPlanEligibleItems]
  );

  const mealPlanItemIdSet = useMemo(
    () =>
      new Set(
        mealPlanEligibleItems
          .map((item) => item._id || item.id)
          .filter((id): id is string => !!id)
          .map((id) => id.toString())
      ),
    [mealPlanEligibleItems]
  );

  const sortedMenuItems = useMemo(
    () => [...availableMenuItems].sort((a, b) => a.name.localeCompare(b.name)),
    [availableMenuItems]
  );
  const multiSelectSize = Math.min(
    10,
    Math.max(4, sortedMenuItems.length || 0)
  );

  const scopedPlans = useMemo(
    () =>
      mealPlans.filter((plan) =>
        PLAN_TABS_AVAILABLE.includes(plan.tab as MealSubscriptionPlan['tab'])
      ),
    [mealPlans]
  );

  const visiblePlans = useMemo(
    () => scopedPlans.filter((plan) => plan.tab === activePlanTab),
    [scopedPlans, activePlanTab]
  );

  const sortedPlans = useMemo(
    () =>
      [...visiblePlans].sort(
        (a, b) =>
          (a.display_order ?? 0) - (b.display_order ?? 0) ||
          a.name.localeCompare(b.name)
      ),
    [visiblePlans]
  );

  const groupedDeliveryDates = useMemo(() => {
    const buckets: Record<'monday' | 'thursday', string[]> = {
      monday: [],
      thursday: [],
    };
    Object.keys(dateMenuSelections).forEach((isoDate) => {
      const parsed = new Date(`${isoDate}T00:00:00`);
      if (Number.isNaN(parsed.getTime())) {
        return;
      }
      const weekday = parsed.getDay();
      const key = weekday === 1 ? 'monday' : weekday === 4 ? 'thursday' : null;
      if (!key) {
        return;
      }
      buckets[key].push(isoDate);
    });
    (['monday', 'thursday'] as const).forEach((key) => {
      buckets[key].sort((a, b) => a.localeCompare(b));
    });
    return buckets;
  }, [dateMenuSelections]);

  const resolvedSelectedDays = useMemo(
    () => ensureRequiredDeliveryDays(selectedDays),
    [selectedDays]
  );

  const planDeliveryDays = useMemo(
    () => resolvePlanDeliveryDays(planForm, resolvedSelectedDays),
    [planForm, resolvedSelectedDays]
  );

const weeksWindow = useMemo(() => {
  const availableWeeks = planForm.week_selection_rules?.available_weeks;
  const fallbackWeeks =
    planForm.weeks_in_cycle ?? defaultPlanForm.weeks_in_cycle ?? 6;
  return Math.max(availableWeeks ?? fallbackWeeks ?? 6, 1);
}, [planForm.week_selection_rules?.available_weeks, planForm.weeks_in_cycle]);

  const upcomingDeliveryDates = useMemo(() => {
    const generated = generateUpcomingDeliveryDates(weeksWindow, planDeliveryDays);
    // For Regular plan, ensure at least 8 delivery dates to match customer view
    if ((planForm.tab || activePlanTab) === 'regular' && generated.length < 8) {
      return generated.slice(0, 8);
    }
    return generated;
  }, [weeksWindow, planDeliveryDays, planForm.tab, activePlanTab]);

  const upcomingDateSet = useMemo(
    () => new Set(upcomingDeliveryDates.map((option) => option.date)),
    [upcomingDeliveryDates]
  );

  useEffect(() => {
    if (!planModalOpen || upcomingDeliveryDates.length === 0) return;
    setDateMenuSelections((prev) => {
      let changed = false;
      const next = { ...prev };
      upcomingDeliveryDates.forEach(({ date }) => {
        if (!next[date]) {
          next[date] = [];
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [planModalOpen, upcomingDeliveryDates]);

  const handleOpenPlanModal = (plan?: MealSubscriptionPlan) => {
    if (plan) {
      setActivePlanTab((plan.tab as MealSubscriptionPlan['tab']) || 'weekly');
      setEditingPlan(plan);
      const planDaysRaw =
        Array.isArray(plan.available_delivery_days) &&
        plan.available_delivery_days.length > 0
          ? plan.available_delivery_days
          : Object.keys(plan.menu_item_ids_by_day ?? {});
      const normalizedDays = normalizeDeliveryDayOrder(planDaysRaw);
      const effectiveDays = ensureRequiredDeliveryDays(normalizedDays);

      const idMapping = plan.menu_item_ids_by_day ?? {};
      const fallbackMapping = plan.menu_items_by_day ?? {};
      const normalizedMenus: Record<string, string[]> = {};
      const allowedMenuItemIds = mealPlanItemIdSet;
      effectiveDays.forEach((day) => {
        const idsFromMapping = Array.isArray(idMapping[day])
          ? idMapping[day]
          : [];
        let resolvedIds = idsFromMapping
          .map((id) => (id != null ? String(id) : ''))
          .filter((id): id is string => id.length > 0);
        if (resolvedIds.length === 0 && Array.isArray(fallbackMapping[day])) {
          resolvedIds = (fallbackMapping[day] ?? [])
            .map((item) => item?._id || item?.id)
            .filter((id): id is string => !!id)
            .map((id) => String(id));
        }
        const sanitizedIds = allowedMenuItemIds
          ? resolvedIds.filter((id) => allowedMenuItemIds.has(id))
          : resolvedIds;
        normalizedMenus[day] = Array.from(new Set(sanitizedIds));
      });

      const dateMapping = plan.menu_item_ids_by_delivery_date ?? {};
      const normalizedDateMenus: Record<string, string[]> = {};
      Object.entries(dateMapping).forEach(([date, items]) => {
        const parsed = new Date(`${date}T00:00:00`);
        if (Number.isNaN(parsed.getTime())) return;
      const weekday = parsed.getDay();
      if (weekday !== 1 && weekday !== 4) return;
        const sanitized = (items ?? [])
          .map((id) => (id != null ? String(id) : ''))
          .filter((id) => id.length > 0 && mealPlanItemIdSet.has(id));
        normalizedDateMenus[date] = Array.from(new Set(sanitized));
      });

      // Ensure admin sees the full customer-facing date window (especially for Regular with 8 drops)
      const deliveriesRequired =
        (plan.tab === 'regular'
          ? Math.max(plan.deliveries_per_cycle ?? 0, 8)
          : plan.deliveries_per_cycle ?? 0) || 0;
      const weeksWindowForPlan =
        plan.week_selection_rules?.available_weeks ??
        plan.weeks_in_cycle ??
        weeksWindow;
      const generatedDates = generateUpcomingDeliveryDates(
        Math.max(
          weeksWindowForPlan,
          deliveriesRequired > 0 ? Math.ceil(deliveriesRequired / effectiveDays.length || 1) : 1,
          1
        ),
        effectiveDays
      );
      const mergedDateMenus: Record<string, string[]> = { ...normalizedDateMenus };
      generatedDates.forEach(({ date }) => {
        if (!mergedDateMenus[date]) {
          mergedDateMenus[date] = [];
        }
      });

      setSelectedDays(effectiveDays);
      setDayMenuSelections(normalizedMenus);
      setDateMenuSelections(mergedDateMenus);
      const notifications = plan.customer_notifications ?? {};
      const reminderSettings = plan.reminder_settings ?? undefined;
      setPlanForm({
        ...plan,
        tab: plan.tab ?? defaultPlanForm.tab,
        weeks_in_cycle: plan.weeks_in_cycle ?? defaultPlanForm.weeks_in_cycle,
        customer_notifications: {
          upsell_message: notifications.upsell_message ?? '',
          reminder_message: notifications.reminder_message ?? '',
          upsell_condition: notifications.upsell_condition ?? 'always',
        },
        reminder_settings: {
          enabled: reminderSettings?.enabled ?? false,
          frequency_days: reminderSettings?.frequency_days ?? 7,
          channel: reminderSettings?.channel ?? 'in_app',
          threshold_unselected_boxes:
            reminderSettings?.threshold_unselected_boxes ?? null,
        },
        suburbs: Array.isArray(plan.metadata?.suburbs)
          ? (plan.metadata?.suburbs as string[]).join(', ')
          : '',
        available_delivery_days: effectiveDays,
        menu_item_ids_by_day: normalizedMenus,
        metadata: {
          ...(plan.metadata ?? {}),
          menu_item_scope: 'meal_plan_only',
        },
      });
    } else {
      setEditingPlan(null);
      const resolvedTab = (activePlanTab || defaultPlanForm.tab || 'weekly') as MealSubscriptionPlan['tab'];
      setActivePlanTab(resolvedTab);
      const template = PLAN_TAB_CONFIGS[resolvedTab]?.template ?? {};
      const defaultIdentity = buildDefaultPlanIdentity(
        resolvedTab
      );
      const mergedForm: PlanFormState = {
        ...defaultPlanForm,
        ...template,
        ...defaultIdentity,
        tab: resolvedTab,
        customer_notifications: {
          upsell_message: template.customer_notifications?.upsell_message ?? '',
          reminder_message:
            template.customer_notifications?.reminder_message ?? '',
          upsell_condition:
            template.customer_notifications?.upsell_condition ?? 'always',
        },
        reminder_settings: template.reminder_settings ?? {
          enabled: false,
          frequency_days: 7,
          channel: 'in_app',
          threshold_unselected_boxes: null,
        },
        metadata: {
          menu_item_scope: 'meal_plan_only',
        },
        terms_and_conditions: template.terms_and_conditions ?? [],
      };
      setPlanForm(mergedForm);
      applyTemplateDays(template.available_delivery_days);
      setDateMenuSelections({});
    }
    setPlanModalOpen(true);
  };

  const handlePlanFormChange = (
    field: keyof PlanFormState,
    value: string | number | boolean
  ) => {
    setPlanForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValidDeliveryDate = (isoDate: string) => {
    if (!isoDate) return false;
    const parsed = new Date(`${isoDate}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return false;
    const day = parsed.getDay(); // 0=Sun ... 6=Sat
    return day === 1 || day === 4; // Monday or Thursday
  };

  const handleAddDeliveryDate = () => {
    const trimmed = newDeliveryDate.trim();
    if (!trimmed) {
      showToast('Select a delivery date first.', 'error');
      return;
    }
    if (!isValidDeliveryDate(trimmed)) {
      showToast('Delivery dates must be on Monday or Thursday.', 'error');
      return;
    }
    setDateMenuSelections((prev) => {
      if (prev[trimmed]) {
        return prev;
      }
      return { ...prev, [trimmed]: [] };
    });
    setNewDeliveryDate('');
  };

  const handleDateMenuChange = (date: string, values: string[]) => {
    const sanitized = values
      .map((value) => (value != null ? String(value) : ''))
      .filter((value) => value.length > 0 && mealPlanItemIdSet.has(value));
    setDateMenuSelections((prev) => ({
      ...prev,
      [date]: Array.from(new Set(sanitized)),
    }));
  };

  const handleDateMenuToggle = (
    event: React.MouseEvent<HTMLOptionElement>,
    date: string,
    value: string
  ) => {
    event.preventDefault();
    const normalized = value ? String(value) : '';
    if (!normalized || !mealPlanItemIdSet.has(normalized)) return;
    setDateMenuSelections((prev) => {
      const current = prev[date] ?? [];
      const exists = current.includes(normalized);
      const next = exists
        ? current.filter((v) => v !== normalized)
        : [...current, normalized];
      return { ...prev, [date]: next };
    });
  };

  const handleRemoveDeliveryDate = (isoDate: string) => {
    if (upcomingDateSet.has(isoDate)) {
      showToast(
        'This date is visible to customers. Change the weekly window to adjust it.',
        'error'
      );
      return;
    }
    setDateMenuSelections((prev) => {
      const next = { ...prev };
      delete next[isoDate];
      return next;
    });
  };

  const getDayLabel = (day: string) =>
    PLAN_DELIVERY_DAYS.find((option) => option.value === day)?.label ?? day;

  const normalizeTemplateDays = (days?: string[]) =>
    normalizeDeliveryDayOrder(days);

const applyTemplateDays = (days?: string[]) => {
  const normalized = ensureRequiredDeliveryDays(normalizeTemplateDays(days));
  const nextDays = normalized.length > 0 ? normalized : [...REQUIRED_PLAN_DAYS];
  setSelectedDays(nextDays);
  setDayMenuSelections((prev) => {
    const next: Record<string, string[]> = {};
    nextDays.forEach((day) => {
      next[day] = prev[day] ?? [];
    });
    return next;
  });
};

  const handleSubmitPlan = async () => {
    const {
      suburbs: _suburbs,
      _id: _ignoredPlanId,
      created_at: _ignoredCreatedAt,
      updated_at: _ignoredUpdatedAt,
      menu_items_by_day: _ignoredMenuItemsByDay,
      ...planBase
    } = planForm;

    const payload: Partial<MealSubscriptionPlan> = {
      ...planBase,
      included_meals: Number(planForm.included_meals ?? 0),
      deliveries_per_cycle: Number(planForm.deliveries_per_cycle ?? 0),
      weeks_in_cycle: Number(planForm.weeks_in_cycle ?? 0),
      boxes_per_delivery: Number(planForm.boxes_per_delivery ?? 0),
      max_boxes_per_meal:
        planForm.max_boxes_per_meal !== undefined &&
        planForm.max_boxes_per_meal !== null
          ? Number(planForm.max_boxes_per_meal)
          : null,
      price_per_plan: Number(planForm.price_per_plan ?? 0),
      price_per_box:
        planForm.price_per_box !== undefined && planForm.price_per_box !== null
          ? Number(planForm.price_per_box)
          : null,
      min_boxes_delivery:
        planForm.min_boxes_delivery !== undefined &&
        planForm.min_boxes_delivery !== null
          ? Number(planForm.min_boxes_delivery)
          : null,
      min_boxes_pickup:
        planForm.min_boxes_pickup !== undefined &&
        planForm.min_boxes_pickup !== null
          ? Number(planForm.min_boxes_pickup)
          : null,
    };

    payload.require_terms_ack = planForm.require_terms_ack ?? false;
    payload.acknowledgement_label = payload.require_terms_ack
      ? (planForm.acknowledgement_label ?? '').trim() || undefined
      : undefined;
    payload.terms_and_conditions = planForm.terms_and_conditions ?? [];

    const normalizedSuburbs = (_suburbs ?? '')
      .split(',')
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);

    const normalizedMetadataScope = resolveMenuScope(planForm.metadata);
    payload.metadata = {
      ...(planForm.metadata ?? {}),
      menu_item_scope: normalizedMetadataScope,
      ...(normalizedSuburbs.length ? { suburbs: normalizedSuburbs } : {}),
    };

    if (planForm.week_selection_rules) {
      const weekRules = planForm.week_selection_rules;
      const cleanedRules = {
        available_weeks: weekRules.available_weeks ?? undefined,
        required_weeks: weekRules.required_weeks ?? undefined,
        deliveries_per_week: weekRules.deliveries_per_week ?? undefined,
        allow_partial_weeks: weekRules.allow_partial_weeks ?? false,
      };
      const hasRule =
        cleanedRules.available_weeks ||
        cleanedRules.required_weeks ||
        cleanedRules.deliveries_per_week ||
        cleanedRules.allow_partial_weeks;
      payload.week_selection_rules = hasRule ? cleanedRules : undefined;
    } else {
      payload.week_selection_rules = undefined;
    }

    if (planForm.customer_notifications) {
      const upsell = (
        planForm.customer_notifications.upsell_message ?? ''
      ).trim();
      const reminder = (
        planForm.customer_notifications.reminder_message ?? ''
      ).trim();
      const upsellCondition =
        planForm.customer_notifications.upsell_condition ?? 'always';

      const shouldPersist =
        upsell.length > 0 ||
        reminder.length > 0 ||
        upsellCondition !== 'always' ||
        Boolean(editingPlan?.customer_notifications);

      payload.customer_notifications = shouldPersist
        ? {
            upsell_message: upsell || undefined,
            reminder_message: reminder || undefined,
            upsell_condition: upsellCondition,
          }
        : undefined;
    } else {
      payload.customer_notifications = undefined;
    }

    if (planForm.reminder_settings) {
      const reminder = planForm.reminder_settings;
      let frequency = Number(reminder.frequency_days ?? 7);
      if (!Number.isFinite(frequency) || frequency <= 0) {
        frequency = 7;
      }
      const threshold =
        reminder.threshold_unselected_boxes !== null &&
        reminder.threshold_unselected_boxes !== undefined
          ? Number(reminder.threshold_unselected_boxes)
          : null;

      payload.reminder_settings = {
        enabled: Boolean(reminder.enabled),
        frequency_days: frequency,
        channel: reminder.channel ?? 'in_app',
        threshold_unselected_boxes:
          threshold !== null && !Number.isNaN(threshold) ? threshold : null,
      };
    } else {
      payload.reminder_settings = undefined;
    }

    if (payload.code) {
      payload.code = payload.code.trim();
    }

    if (!payload.code || !payload.name) {
      showToast('Plan name and code are required.', 'error');
      return;
    }

    const normalizedDays = resolvedSelectedDays;

    if (!REQUIRED_PLAN_DAYS.every((day) => normalizedDays.includes(day))) {
      showToast(
        'Please keep both Monday and Thursday selected to assign menus for each delivery.',
        'error'
      );
      return;
    }

    const normalizedWeeks = Number(planForm.weeks_in_cycle ?? 0);
    if (normalizedWeeks < 0) {
      showToast('Number of weeks cannot be negative.', 'error');
      return;
    }

    payload.weeks_in_cycle = normalizedWeeks;
    payload.tab = planForm.tab || editingPlan?.tab || 'weekly';

    const menuMapping: Record<string, string[]> = {};
    for (const day of normalizedDays) {
      const rawSelections = dayMenuSelections[day] ?? [];
      const selections = rawSelections
        .map((id) => (id != null ? String(id) : ''))
        .filter((id) => id.length > 0)
        .filter((id) => mealPlanItemIdSet.has(id))
        .filter((id) => isValidObjectId(id));
      if (selections.length > 0) {
        menuMapping[day] = Array.from(new Set(selections));
      }
    }

    const dateMapping: Record<string, string[]> = {};
    const dateKeys = Object.keys(dateMenuSelections).sort((a, b) =>
      a.localeCompare(b)
    );
    if (dateKeys.length === 0) {
      showToast(
        'Add Monday and Thursday delivery dates first.',
        'error'
      );
      return;
    }
    if (
      groupedDeliveryDates.monday.length === 0 ||
      groupedDeliveryDates.thursday.length === 0
    ) {
      showToast(
        'Add at least one Monday and one Thursday delivery date to build the delivery pair.',
        'error'
      );
      return;
    }
    for (const dateKey of dateKeys) {
      if (!isValidDeliveryDate(dateKey)) {
        showToast(
          `Delivery date ${dateKey} must be on a Monday or Thursday.`,
          'error'
        );
        return;
      }
      const selections = (dateMenuSelections[dateKey] ?? [])
        .map((id) => (id != null ? String(id) : ''))
        .filter((id) => id.length > 0 && mealPlanItemIdSet.has(id))
        .filter((id) => isValidObjectId(id));
      dateMapping[dateKey] = Array.from(new Set(selections));
    }

    payload.available_delivery_days = normalizedDays;
    if (Object.keys(menuMapping).length > 0) {
      payload.menu_item_ids_by_day = menuMapping;
    } else if (editingPlan?.menu_item_ids_by_day) {
      payload.menu_item_ids_by_day = editingPlan.menu_item_ids_by_day;
    }
    payload.menu_item_ids_by_delivery_date = dateMapping;

    try {
      if (editingPlan?._id) {
        await updateMealPlan(editingPlan._id, payload);
      } else {
        await createMealPlan(payload);
      }

      // Keep weekly schedule in sync (used by /menu/weekly endpoint)
      let syncFailures: string[] = [];
      if ((payload.tab || editingPlan?.tab) === 'weekly') {
        const scheduleEntries = Object.entries(dateMapping).filter(
          ([, items]) => items.length > 0
        );
        const syncResults = await Promise.allSettled(
          scheduleEntries.map(([dateKey, items]) =>
            adminAPI.upsertWeeklySchedule(dateKey, items, 1)
          )
        );

        syncFailures = syncResults
          .map((result, idx) => ({ result, idx }))
          .filter((entry) => entry.result.status === 'rejected')
          .map(({ result, idx }) => {
            const dateKey = scheduleEntries[idx][0];
            const reason =
              (result as PromiseRejectedResult).reason?.response?.data?.detail ||
              (result as PromiseRejectedResult).reason?.message ||
              'Unknown error';
            console.error('Schedule sync failed', dateKey, reason);
            return `${dateKey}: ${reason}`;
          });
      }

      if (syncFailures.length > 0) {
        showToast(
          `Plan saved, but schedules failed for ${syncFailures.join('; ')}`,
          'warning'
        );
      } else {
        showToast('Plan updated and schedules synced', 'success');
      }
      setPlanModalOpen(false);
    } catch (err) {
      console.error(err);
      const message =
        (err as any)?.response?.data?.detail ||
        (err as any)?.response?.data?.message ||
        (err as any)?.message ||
        'Failed to save meal plan.';
      showToast(message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <AdminSidebar />
      {(isLoading || isUpdating) && (
        <LoadingScreen
          message={
            isLoading ? 'Loading meal plan data...' : 'Saving changes...'
          }
        />
      )}
      <div className="py-8 pr-4 sm:pr-6 lg:pr-8 pl-4 sm:pl-24 md:pl-32 lg:pl-[17rem] xl:pl-[18.5rem] transition-[padding-left] duration-300">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text">
                Meal Plan Scheduling
              </h1>
              <p className="text-gray-600 mt-2">
                Update pricing and set menus for each Monday & Thursday delivery date.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {PLAN_TABS_AVAILABLE.map((tab) => (
                <Button
                  key={tab}
                  variant={tab === activePlanTab ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setActivePlanTab(tab)}
                >
                  {PLAN_TAB_CONFIGS[tab]?.label || tab}
                </Button>
              ))}
            </div>
          </div>

          {/* Meal Plans Section */}
          <Card className="p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-text">
                  {(PLAN_TAB_CONFIGS[activePlanTab]?.label || activePlanTab) + ' overview'}
                </h2>
                <p className="text-sm text-gray-500">
                  Edit the {PLAN_TAB_CONFIGS[activePlanTab]?.label || activePlanTab} price and curate menus for each delivery date.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleOpenPlanModal()}
              >
                Create {PLAN_TAB_CONFIGS[activePlanTab]?.label || 'Meal Plan'}
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Delivery dates
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedPlans.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <p className="italic">
                            No {activePlanTab} meal plan configured yet.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenPlanModal()}
                          >
                            Create {PLAN_TAB_CONFIGS[activePlanTab]?.label || 'Meal Plan'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                  {sortedPlans.map((plan) => {
                    const deliveryDateCount = Object.keys(
                      plan.menu_item_ids_by_delivery_date ?? {}
                    ).length;
                    const mondayCount =
                      plan.menu_item_ids_by_day?.monday?.length ??
                      plan.menu_items_by_day?.monday?.length ??
                      0;
                    const thursdayCount =
                      plan.menu_item_ids_by_day?.thursday?.length ??
                      plan.menu_items_by_day?.thursday?.length ??
                      0;
                    return (
                      <tr key={plan._id}>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-text">
                            {plan.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {plan.code}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Deliveries: Mon ({mondayCount}) · Thu (
                            {thursdayCount})
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {formatCurrency(plan.price_per_plan)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {deliveryDateCount > 0
                            ? `${deliveryDateCount} dates configured`
                            : 'No dates yet'}
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenPlanModal(plan)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ? FIX: Only render Pagination when mealPlanPagination is not null */}
            {mealPlanPagination && mealPlanPagination.total > 0 && (
              <Pagination
                currentPage={mealPlanPagination.page || 1}
                totalItems={mealPlanPagination.total}
                pageSize={mealPlanPagination.page_size || MEAL_PLANS_PAGE_SIZE}
                onPageChange={setPlansPage}
                showSummary
                className="mt-4"
              />
            )}
          </Card>

          {/* Plan Modal */}
          <Modal
            isOpen={planModalOpen}
            onClose={() => setPlanModalOpen(false)}
            title={
              editingPlan
                ? `Edit ${PLAN_TAB_CONFIGS[planForm.tab || activePlanTab]?.label || 'Plan'}`
                : PLAN_TAB_CONFIGS[planForm.tab || activePlanTab]?.label || 'Plan'
            }
            size="xl"
          >
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    {PLAN_TAB_CONFIGS[planForm.tab || activePlanTab]?.label || 'Meal plan'}
                  </p>
                  <h3 className="text-xl font-semibold text-text">{planForm.name || editingPlan?.name || 'Plan'}</h3>
                  <p className="text-xs text-gray-500">{planForm.code || editingPlan?.code || planForm.tab || 'plan'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">Current price</p>
                  <p className="text-2xl font-semibold text-primary">{formatCurrency(planForm.price_per_plan ?? 0)}</p>
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-text">Plan price</h4>
                    <p className="text-xs text-gray-600">Update what customers pay for the weekly plan.</p>
                  </div>
                  <span className="text-xs text-gray-500">Shown to customers on checkout and subscriptions</span>
                </div>
                <Input
                  label="Plan price (AUD)"
                  type="number"
                  min={0}
                  step="0.01"
                  value={planForm.price_per_plan ?? 0}
                  onChange={(e) => handlePlanFormChange('price_per_plan', Number(e.target.value))}
                />
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-text text-sm">Delivery dates (Monday & Thursday)</h4>
                    <p className="text-xs text-gray-500">Add the Mondays and Thursdays customers can pair together and assign the menu for each specific date.</p>
                    <p className="text-xs text-gray-500">
                      These dates mirror what customers see on the {PLAN_TAB_CONFIGS[planForm.tab || activePlanTab]?.label || 'Meal Plan'} page (next {weeksWindow} week{weeksWindow === 1 ? '' : 's'}).
                    </p>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-600 mb-1">Delivery date</label>
                      <input
                        type="date"
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={newDeliveryDate}
                        onChange={(e) => setNewDeliveryDate(e.target.value)}
                      />
                    </div>
                    <Button type="button" variant="outline" onClick={handleAddDeliveryDate}>
                      Add date
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-gray-600">Customers will choose a Monday + Thursday combination from these dates.</p>
                {Object.keys(dateMenuSelections).length === 0 ? (
                  <p className="text-xs text-amber-600">Add at least one Monday and one Thursday delivery date to build the available pairs.</p>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(['monday', 'thursday'] as const).map((dayKey) => {
                    const dates = groupedDeliveryDates[dayKey];
                    return (
                      <div key={dayKey} className="rounded-lg border border-gray-200 bg-white/60 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-text">{getDayLabel(dayKey)} dates</p>
                            <p className="text-xs text-gray-500">{dates.length} date{dates.length === 1 ? '' : 's'} available</p>
                          </div>
                        </div>
                        {dates.length === 0 ? (
                          <p className="text-xs text-amber-600 mt-2">Add a {getDayLabel(dayKey)} date to enable this drop.</p>
                        ) : (
                          <div className="space-y-3 mt-3">
                            {dates.map((dateKey) => {
                              const display = new Date(`${dateKey}T00:00:00`).toLocaleDateString('en-AU', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                              });
                              return (
                                <div key={dateKey} className="rounded-lg border border-gray-200 p-3 bg-white">
                                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="font-medium text-sm text-text">{display} ({dateKey})</div>
                                    <div className="flex items-center gap-2">
                                      <div className="text-xs text-gray-500 sm:text-right">{dateMenuSelections[dateKey]?.length ?? 0} item{(dateMenuSelections[dateKey]?.length ?? 0) === 1 ? '' : 's'} selected</div>
                                      <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveDeliveryDate(dateKey)}>
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                  {sortedMenuItems.length > 0 ? (
                                    <select
                                      multiple
                                      size={multiSelectSize}
                                      className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                      value={dateMenuSelections[dateKey] ?? []}
                                      onChange={(e) =>
                                        handleDateMenuChange(
                                          dateKey,
                                          Array.from(e.target.selectedOptions).map((option) => option.value)
                                        )
                                      }
                                    >
                                      {sortedMenuItems.map((item) => {
                                        const optionRawId = item._id ?? item.id;
                                        if (!optionRawId) return null;
                                        const optionValue = String(optionRawId);
                                        const scopeLabel = describeMenuScope(item);
                                        return (
                                          <option
                                            key={`${dateKey}-${optionValue}`}
                                            value={optionValue}
                                            onMouseDown={(event) => handleDateMenuToggle(event, dateKey, optionValue)}
                                          >
                                            {item.name}
                                            {item.category ? ` - ${item.category}` : ''}
                                            {scopeLabel ? ` (${scopeLabel})` : ''}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  ) : (
                                    <div className="mt-2 text-xs text-amber-600">
                                      No menu items currently marked for Meal Plans. Update dishes in Menu Management to enable Meal Plan or Both menu availability.
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
              <Button variant="ghost" onClick={() => setPlanModalOpen(false)} className="w-full sm:w-auto">Cancel</Button>
              <Button variant="primary" onClick={handleSubmitPlan} className="w-full sm:w-auto">Save pricing & menus</Button>
            </div>
          </Modal>

        </div>
      </div>
    </div>
  );
};

export default MealPlanManagement;
