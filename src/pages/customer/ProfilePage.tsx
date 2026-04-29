import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { authAPI } from '@api/endpoints/auth';
import { ordersAPI, menuAPI } from '@api';
import { useAuth } from '@hooks/useAuth';
import { useAddressStore } from '@store/addressStore';
import { useOrderStore } from '@store/orderStore';
import { useToast } from '@components/common/Toast';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import LoadingScreen from '@components/common/LoadingScreen';
import Modal from '@components/common/Modal';
import {
  User,
  MapPin,
  Package,
  Settings,
  Bell,
  CreditCard,
  Edit2,
  Trash2,
  Plus,
  Check,
  X,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react';
import { formatCurrency, formatDate, formatTime } from '@utils/formatters';
import type { Order } from '@models/order.types';
import type { MealSubscriptionEditDetails } from '@models/order.types';
import type { MenuItem } from '@models/menu.types';
import type { MealSubscriptionPlan } from '@models/subscription.types';
import {
  getOrderTypeDescription,
  getOrderDisplayNumber,
  getOrderAddOnTotal,
  getOrderSubtotalWithAddOns,
  getOrderTotalWithAddOns,
  getOrderDeliveryFee,
  getOrderTaxAmount,
  getPlanTypeLabel,
} from '@utils/orderHelpers';

const unwrapProfileUser = (payload: any) => {
  const data = (payload as any)?.data ?? payload;
  return (data as any)?.user ?? data ?? null;
};

const extractJoinDate = (source: any): string | null => {
  if (!source) return null;
  const candidate =
    source.created_at ??
    source.createdAt ??
    source.joined_at ??
    source.joinedAt ??
    source.created ??
    source.createdDate ??
    source.user?.created_at ??
    source.user?.createdAt ??
    source.user?.joined_at ??
    source.user?.joinedAt;
  return candidate || null;
};

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const {
    addresses,
    fetchAddresses,
    addAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddressStore();
  const {
    orderHistory,
    fetchOrderHistory,
    orderHistoryTotal,
    orderHistoryPage,
    orderHistoryPageSize,
    isLoadingHistory,
  } = useOrderStore();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'addresses' | 'orders'
  >('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isLoadingSelectedOrder, setIsLoadingSelectedOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditPlanModalOpen, setIsEditPlanModalOpen] = useState(false);
  const [isLoadingEditPlan, setIsLoadingEditPlan] = useState(false);
  const [isSavingEditPlan, setIsSavingEditPlan] = useState(false);
  const [editingOrderContext, setEditingOrderContext] = useState<Order | null>(null);
  const [editPlanDetails, setEditPlanDetails] = useState<MealSubscriptionEditDetails | null>(null);
  const [editPlanSelections, setEditPlanSelections] = useState<
    Record<string, Array<{ menuItemId: string; quantity: number }>>
  >({});
  const [menuOptionsByDate, setMenuOptionsByDate] = useState<Record<string, MenuItem[]>>({});
  const [editPlanError, setEditPlanError] = useState<string | null>(null);
  const [editPlanMeta, setEditPlanMeta] = useState<{
    plan: MealSubscriptionPlan | null;
    quantity: number;
    fulfilment: 'delivery' | 'pickup' | null;
  }>({ plan: null, quantity: 1, fulfilment: null });
  const [memberSinceRaw, setMemberSinceRaw] = useState<string | null>(
    () => extractJoinDate(user) || null
  );

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Address form state
  const [addressForm, setAddressForm] = useState({
    label: '',
    street: '',
    suburb: '',
    postcode: '',
    state: 'NSW',
    delivery_instructions: '',
  });

  const totalOrderPages = Math.max(
    1,
    Math.ceil(
      (orderHistoryTotal || 0) /
        (orderHistoryPageSize || 1),
    ),
  );

  const ordersRangeStart =
    orderHistoryTotal === 0
      ? 0
      : (orderHistoryPage - 1) * orderHistoryPageSize + 1;
  const ordersRangeEnd = Math.min(
    orderHistoryTotal,
    orderHistoryPage * orderHistoryPageSize,
  );

  const handleOrderHistoryPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalOrderPages) {
      return;
    }
    fetchOrderHistory(newPage);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchAddresses(), fetchOrderHistory(1)]);
      } catch (error) {
        showToast('Failed to load profile data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const joinDate = extractJoinDate(user);
    if (joinDate) {
      setMemberSinceRaw(joinDate);
      return;
    }

    let isMounted = true;
    const fetchJoinDate = async () => {
      try {
        const response = await authAPI.getProfile();
        if (!isMounted) return;
        const profileUser = unwrapProfileUser(response.data);
        const resolved = extractJoinDate(profileUser);
        if (resolved) {
          setMemberSinceRaw(resolved);
        }
      } catch (error) {
        console.error('Failed to fetch profile for join date', error);
      }
    };

    if (user) {
      fetchJoinDate();
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      showToast('Profile updated successfully', 'success');
      setIsEditingProfile(false);
    } catch (error) {
      showToast('Failed to update profile', 'error');
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAddress(addressForm);
      showToast('Address added successfully', 'success');
      setIsAddingAddress(false);
      setAddressForm({
        label: '',
        street: '',
        suburb: '',
        postcode: '',
        state: 'NSW',
        delivery_instructions: '',
      });
    } catch (error) {
      showToast('Failed to add address', 'error');
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(addressId);
        showToast('Address deleted successfully', 'success');
      } catch (error) {
        showToast('Failed to delete address', 'error');
      }
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      await setDefaultAddress(addressId);
      showToast('Default address updated', 'success');
    } catch (error) {
      showToast('Failed to update default address', 'error');
    }
  };

  const canEditMealPlan = (order?: Order | null) => {
    // Temporarily hide meal plan editing from Order History.
    return false;
  };

  const totalSelectedBoxes = useCallback((selections: typeof editPlanSelections) => {
    return Object.values(selections).reduce((sum, rows) => {
      return (
        sum +
        rows.reduce((rowSum, row) => rowSum + Math.max(0, Number(row.quantity) || 0), 0)
      );
    }, 0);
  }, []);

  const totalBoxesForDate = useCallback(
    (date: string, selections: typeof editPlanSelections) => {
      const rows = selections[date] || [];
      return rows.reduce((sum, row) => sum + Math.max(0, Number(row.quantity) || 0), 0);
    },
    []
  );

  const computeEditPlanLimits = useCallback(() => {
    const plan = editPlanMeta.plan;
    const quantity = editPlanMeta.quantity || 1;
    const fulfilment = editPlanMeta.fulfilment ?? 'delivery';
    if (!plan) {
      return {
        maxPerMeal: null as number | null,
        maxTotal: null as number | null,
        minPerDelivery: 1,
      };
    }
    const maxPerMeal =
      plan.max_boxes_per_meal && plan.max_boxes_per_meal > 0
        ? plan.max_boxes_per_meal * quantity
        : null;
    const maxTotal =
      plan.included_meals && plan.included_meals > 0
        ? plan.included_meals * quantity
        : null;
    const minPerDelivery =
      plan.tab === 'regular'
        ? fulfilment === 'pickup'
          ? plan.min_boxes_pickup ?? 1
          : plan.min_boxes_delivery ?? 4
        : 1;

    return { maxPerMeal, maxTotal, minPerDelivery };
  }, [editPlanMeta]);

  const isAddOnItem = (item: any) => {
    if (!item) return false;
    const category = String(item.category || item.item_type || item.type || '').toLowerCase();
    return (
      item.is_add_on === true ||
      category.includes('add_on') ||
      category.includes('add-on') ||
      category.includes('addon') ||
      category.includes('add on') ||
      category.includes('sideline') ||
      category === 'add ons' ||
      category === 'add-ons'
    );
  };

  const getAddOnsFromOrder = useCallback((source?: Order | null) => {
    if (!source) return [];
    const candidates = [
      (source as any).sidelines,
      (source as any).add_ons,
      (source as any).addOns,
      (source as any).addons,
      (source as any).add_on_items,
      (source as any).addOnItems,
    ].filter(Array.isArray);

    const merged = candidates.flat();

    // Also capture add-ons that might have been merged into items with a category flag
    const flaggedItems = Array.isArray((source as any).items)
      ? (source as any).items.filter(isAddOnItem)
      : [];

    const deduped = new Map<string, any>();
    [...merged, ...flaggedItems].forEach((item: any, idx: number) => {
      const key =
        item._id ||
        item.id ||
        item.item_id ||
        item.itemId ||
        item.menu_item_id ||
        `${item.item_name || item.name || item.menu_item?.name || 'add-on'}-${idx}`;
      if (!deduped.has(String(key))) {
        deduped.set(String(key), item);
      }
    });
    return Array.from(deduped.values());
  }, []);

  const getPrimaryItemsFromOrder = useCallback(
    (source?: Order | null) => {
      if (!source || !Array.isArray((source as any).items)) return [];
      return (source as any).items.filter((item: any) => !isAddOnItem(item));
    },
    []
  );

  const resolveMenuItemId = useCallback((item?: Partial<MenuItem> | null) => {
    if (!item) {
      return '';
    }
    return (item as any)._id || (item as any).id || '';
  }, []);

  const filterMealPlanEligibleItems = useCallback(
    (items: Partial<MenuItem>[] = [], requireExplicitFlag: boolean = false) => {
      return items.filter((item) => {
        if (!item) return false;
        const flag = (item as any).is_available_for_meal_plan;
        if (requireExplicitFlag) {
          return flag === true;
        }
        return flag !== false;
      }) as MenuItem[];
    },
    []
  );

  const getDayKeyFromDate = useCallback((isoDate?: string | null) => {
    if (!isoDate) return null;
    const parts = isoDate.split('-').map((v) => Number(v));
    if (parts.length !== 3 || parts.some((v) => Number.isNaN(v))) return null;
    const candidate = new Date(parts[0], parts[1] - 1, parts[2]);
    if (Number.isNaN(candidate.getTime())) return null;
    const dayIndex = candidate.getDay();
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ] as const;
    return days[dayIndex] ?? null;
  }, []);

  const buildInitialEditSelections = useCallback(
    (details: MealSubscriptionEditDetails) => {
      const nextSelections: Record<
        string,
        Array<{ menuItemId: string; quantity: number }>
      > = {};

      (details.delivery_slots || []).forEach((slot) => {
        const entries = Object.entries(slot.menu_items || {}).map(
          ([menuItemId, quantity]) => ({
            menuItemId,
            quantity: Number(quantity) > 0 ? Number(quantity) : 1,
          })
        );
        nextSelections[slot.delivery_date] =
          entries.length > 0 ? entries : [{ menuItemId: '', quantity: 1 }];
      });

      setEditPlanSelections(nextSelections);
    },
    []
  );

  const fetchMenuOptionsForDate = useCallback(
    async (
      deliveryDate: string,
      existingMenuIds: string[],
      planOverride?: MealSubscriptionPlan | null
    ) => {
      const plan = planOverride ?? editPlanMeta.plan;
      const dayKey = getDayKeyFromDate(deliveryDate);

      const resolveMenuItemsByIds = async (ids: any[]): Promise<Partial<MenuItem>[]> => {
        const results = await Promise.all(
          ids.map(async (id) => {
            try {
              const response = await menuAPI.getMenuItemById(id);
              return response.data?.data || response.data || { _id: id, id };
            } catch (error) {
              console.error('Failed to load menu item', id, error);
              return { _id: id, id, name: 'Menu item' };
            }
          })
        );
        return results.filter(Boolean);
      };

      try {
        const response = await menuAPI.getWeeklyMenu(deliveryDate);
        const payload = response.data?.data ?? response.data ?? {};
        const rawItems: Partial<MenuItem>[] = Array.isArray(payload?.items)
          ? payload.items
          : Array.isArray(payload)
            ? payload
            : [];

        const deduped = new Map<string, Partial<MenuItem>>();
        const pushItem = (item: Partial<MenuItem>) => {
          const id = resolveMenuItemId(item);
          if (!id || deduped.has(id)) {
            return;
          }
          deduped.set(id, item);
        };

        if (plan) {
          const dateMenus =
            (plan?.menu_items_by_delivery_date as any)?.[deliveryDate] || [];
          if (Array.isArray(dateMenus)) {
            dateMenus.forEach(pushItem);
          }

          const dateIds =
            (plan?.menu_item_ids_by_delivery_date as any)?.[deliveryDate] || [];
          if (Array.isArray(dateIds) && dateIds.length > 0) {
            const resolved = await resolveMenuItemsByIds(dateIds);
            resolved.forEach(pushItem);
          }

          if (dayKey) {
            const dayMenus = (plan?.menu_items_by_day as any)?.[dayKey] || [];
            if (Array.isArray(dayMenus)) {
              dayMenus.forEach(pushItem);
            }
            const dayIds = (plan?.menu_item_ids_by_day as any)?.[dayKey] || [];
            if (Array.isArray(dayIds) && dayIds.length > 0) {
              const resolved = await resolveMenuItemsByIds(dayIds);
              resolved.forEach(pushItem);
            }
          }
        }

        // Append weekly menu items after plan-configured items to preserve admin choices first.
        if (rawItems.length > 0) {
          rawItems.forEach(pushItem);
        }

        // Final list, filtered for meal-plan eligibility (match selection page behaviour).
        const filtered = filterMealPlanEligibleItems(Array.from(deduped.values()));
        return filtered;

      } catch (error) {
        console.error('Failed to load menu for', deliveryDate, error);
        return existingMenuIds.map((id) => ({
          _id: id,
          id,
          name: 'Current selection',
        }));
      }
    },
    [filterMealPlanEligibleItems, getDayKeyFromDate, editPlanMeta.plan]
  );

  const resetEditPlanState = useCallback(() => {
    setIsEditPlanModalOpen(false);
    setIsLoadingEditPlan(false);
    setIsSavingEditPlan(false);
    setEditingOrderContext(null);
    setEditPlanDetails(null);
    setEditPlanSelections({});
    setMenuOptionsByDate({});
    setEditPlanError(null);
  }, []);

  const handleEditMealPlan = useCallback(
    async (order?: Order | null) => {
      if (!order || !canEditMealPlan(order)) {
        return;
      }

      setIsOrderModalOpen(false);
      setSelectedOrder(null);
      setEditingOrderContext(order);
      setIsEditPlanModalOpen(true);
      setIsLoadingEditPlan(true);
      setEditPlanError(null);
      setEditPlanDetails(null);
      setEditPlanSelections({});
      setMenuOptionsByDate({});
      setEditPlanMeta({ plan: null, quantity: 1, fulfilment: null });

      try {
        const response = await ordersAPI.getMealSubscriptionDetails(order._id);
        const details: MealSubscriptionEditDetails =
          response.data?.data ?? response.data;

        if (!details) {
          throw new Error('Unable to load meal plan for editing.');
        }

        setEditPlanDetails(details);
        buildInitialEditSelections(details);

        const selection = details.plan_selections?.[0];
        const selectionQuantity = selection?.quantity ?? 1;
        const fulfilment =
          (details as any)?.fulfilment_method ?? (details as any)?.delivery_option ?? null;

        let matchedPlan: MealSubscriptionPlan | null = null;
        try {
          const plansResp = await menuAPI.getMealSubscriptionPlans();
          const plansPayload = plansResp.data?.data ?? plansResp.data ?? [];
          const plans: MealSubscriptionPlan[] = Array.isArray(plansPayload)
            ? plansPayload
            : [];
          matchedPlan =
            plans.find(
              (p) =>
                (p as any)._id === selection?.plan_id ||
                (p as any).id === selection?.plan_id ||
                (p as any).code === selection?.plan_code
            ) || null;
        } catch (planError) {
          console.warn('Unable to load plan for edit limits', planError);
        }

        setEditPlanMeta({
          plan: matchedPlan,
          quantity: selectionQuantity,
          fulfilment,
        });

        const nextMenuOptions: Record<string, MenuItem[]> = {};
        await Promise.all(
          (details.delivery_slots || []).map(async (slot) => {
            const menuIds = Object.keys(slot.menu_items || {});
            const options = await fetchMenuOptionsForDate(
              slot.delivery_date,
              menuIds,
              matchedPlan
            );
            nextMenuOptions[slot.delivery_date] = options as MenuItem[];
          })
        );
        setMenuOptionsByDate(nextMenuOptions);
      } catch (error: any) {
        console.error('Failed to load meal plan', error);
        const message =
          error?.response?.data?.message ||
          error?.message ||
          'Failed to load meal plan for editing.';
        setEditPlanError(message);
        showToast(message, 'error');
        setIsEditPlanModalOpen(false);
      } finally {
        setIsLoadingEditPlan(false);
      }
    },
    [
      buildInitialEditSelections,
      canEditMealPlan,
      fetchMenuOptionsForDate,
      showToast,
    ]
  );

  const getMenuOptionsForDate = useCallback(
    (date: string) => menuOptionsByDate[date] || [],
    [menuOptionsByDate]
  );

  const updateSelectionRow = (
    date: string,
    index: number,
    updates: Partial<{ menuItemId: string; quantity: number }>
  ) => {
    setEditPlanSelections((prev) => {
      const current = prev[date] || [];
      const next = [...current];
      const existing = next[index] || { menuItemId: '', quantity: 1 };
      const limits = computeEditPlanLimits();
      const merged = {
        ...existing,
        ...updates,
        quantity:
          updates.quantity !== undefined
            ? Math.max(1, Number(updates.quantity) || 1)
            : existing.quantity,
      };
      if (limits.maxPerMeal && merged.quantity > limits.maxPerMeal) {
        showToast(`This plan allows up to ${limits.maxPerMeal} boxes per meal.`, 'warning');
        merged.quantity = limits.maxPerMeal;
      }
      next[index] = merged;

      const nextSelections = { ...prev, [date]: next };
      const nextTotal = totalSelectedBoxes(nextSelections);
      if (limits.maxTotal && nextTotal > limits.maxTotal) {
        showToast(`This plan allows up to ${limits.maxTotal} boxes in total.`, 'warning');
        return prev;
      }
      return { ...prev, [date]: next };
    });
  };

  const handleAddMealRow = (date: string) => {
    const options = getMenuOptionsForDate(date);
    const defaultMenuId = resolveMenuItemId(options[0]);
    const limits = computeEditPlanLimits();
    setEditPlanSelections((prev) => {
      const current = prev[date] || [];
      const candidateSelections = {
        ...prev,
        [date]: [...current, { menuItemId: defaultMenuId || '', quantity: 1 }],
      };
      const nextTotal = totalSelectedBoxes(candidateSelections);
      if (limits.maxTotal && nextTotal > limits.maxTotal) {
        showToast(`This plan allows up to ${limits.maxTotal} boxes in total.`, 'warning');
        return prev;
      }
      return candidateSelections;
    });
  };

  const handleRemoveMealRow = (date: string, index: number) => {
    setEditPlanSelections((prev) => {
      const current = prev[date] || [];
      const next = [...current];
      next.splice(index, 1);
      return {
        ...prev,
        [date]: next.length ? next : [{ menuItemId: '', quantity: 1 }],
      };
    });
  };

  const buildEditPlanPayload = () => {
    if (!editPlanDetails) {
      return null;
    }

    const limits = computeEditPlanLimits();
    const totalBoxes = totalSelectedBoxes(editPlanSelections);
    if (limits.maxTotal && totalBoxes > limits.maxTotal) {
      throw new Error(`This plan allows up to ${limits.maxTotal} boxes in total.`);
    }

    const deliverySlots = (editPlanDetails.delivery_slots || []).map((slot) => {
      const selections = editPlanSelections[slot.delivery_date] || [];
      const menuItems: Record<string, number> = {};

      selections.forEach(({ menuItemId, quantity }) => {
        if (!menuItemId) {
          return;
        }
        menuItems[menuItemId] = Math.max(1, Number(quantity) || 1);
      });

      const perDateTotal = Object.values(menuItems).reduce(
        (sum, qty) => sum + Math.max(0, qty || 0),
        0
      );
      if (
        editPlanMeta.plan?.tab === 'regular' &&
        limits.minPerDelivery &&
        perDateTotal < limits.minPerDelivery
      ) {
        throw new Error(
          `At least ${limits.minPerDelivery} boxes are required for each delivery on this plan.`
        );
      }

      return {
        delivery_date: slot.delivery_date,
        menu_items: menuItems,
      };
    });

    const hasEmptyDay = deliverySlots.some(
      (slot) => Object.keys(slot.menu_items).length === 0
    );
    if (hasEmptyDay) {
      throw new Error('Please select at least one meal for each delivery day.');
    }

    return {
      plan_selections: (editPlanDetails.plan_selections || []).map((selection) => ({
        plan_id: selection.plan_id,
        plan_code: selection.plan_code,
        plan_name: selection.plan_name,
        quantity: selection.quantity,
      })),
      delivery_slots: deliverySlots,
      fulfilment_method: editPlanDetails.fulfilment_method,
      is_express: editPlanDetails.is_express,
      delivery_address_id: editPlanDetails.delivery_address_id,
      delivery_instructions: editPlanDetails.delivery_instructions ?? undefined,
      notes: editPlanDetails.notes ?? undefined,
      payment_method: editPlanDetails.payment_method ?? 'cash',
    };
  };

  const handleSaveEditPlan = async () => {
    if (!editPlanDetails && !editingOrderContext) {
      return;
    }
    const orderId =
      editPlanDetails?.order_id ||
      (editPlanDetails as any)?._id ||
      editingOrderContext?._id;

    if (!orderId) {
      showToast('Missing order information for updating meal plan.', 'error');
      return;
    }

    try {
      const payload = buildEditPlanPayload();
      if (!payload) {
        return;
      }

      setIsSavingEditPlan(true);
      await ordersAPI.updateMealSubscriptionOrder(orderId, payload);
      showToast('Meal plan updated successfully.', 'success');
      await fetchOrderHistory(orderHistoryPage);
      resetEditPlanState();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Unable to update meal plan.';
      setEditPlanError(message);
      showToast(message, 'error');
    } finally {
      setIsSavingEditPlan(false);
    }
  };

  const handleOpenOrderDetails = useCallback(
    async (order: Order) => {
      setSelectedOrder(order);
      setIsOrderModalOpen(true);
      setIsLoadingSelectedOrder(true);
      try {
        let fullOrder: Order | null = null;
        if (order.order_type === 'meal_subscription') {
          try {
            const weeklyResp = await ordersAPI.getMealSubscriptionDetails(order._id);
            const payload = (weeklyResp.data as any)?.data ?? weeklyResp.data;
            if (payload) {
              fullOrder = {
                ...order,
                ...payload,
                delivery_slots: payload.delivery_slots ?? order.delivery_slots,
              } as Order;
            }
          } catch (weeklyError) {
            console.warn('Fallback to order by id for meal subscription', weeklyError);
          }
        }
        if (!fullOrder) {
          const resp = await ordersAPI.getOrderById(order._id);
          fullOrder = ((resp.data as any)?.data ?? resp.data) as Order;
        }
        setSelectedOrder(fullOrder || order);
      } catch (error) {
        console.error('Failed to load order details', error);
        showToast('Failed to load order details.', 'error');
      } finally {
        setIsLoadingSelectedOrder(false);
      }
    },
    [showToast]
  );

  const memberSinceDisplay = useMemo(() => {
    if (!memberSinceRaw) {
      return '—';
    }

    const dateObj =
      memberSinceRaw instanceof Date ? memberSinceRaw : new Date(memberSinceRaw);

    if (Number.isNaN(dateObj.getTime())) {
      return '—';
    }

    return formatDate(dateObj);
  }, [memberSinceRaw]);

  const selectedOrderMenuLookup = useMemo(() => {
    if (!selectedOrder) return new Map<string, { name: string; price?: number; category?: string }>();
    const map = new Map<string, { name: string; price?: number; category?: string }>();
    const allItems = [
      ...getPrimaryItemsFromOrder(selectedOrder),
      ...getAddOnsFromOrder(selectedOrder),
    ];
    allItems.forEach((item: any) => {
      const id =
        item.menu_item_id ||
        item.menuItemId ||
        item.item_id ||
        item.itemId ||
        item.menu_item?._id ||
        item.menu_item?.id ||
        item._id;
      if (!id || map.has(String(id))) return;
      map.set(String(id), {
        name: item.menu_item?.name || item.item_name || item.name || 'Item',
        price: item.price || item.menu_item?.price,
        category: item.category,
      });
    });
    return map;
  }, [selectedOrder, getAddOnsFromOrder, getPrimaryItemsFromOrder]);

  const selectedOrderAddOns = useMemo(
    () => getAddOnsFromOrder(selectedOrder),
    [getAddOnsFromOrder, selectedOrder]
  );

  const selectedOrderAddOnTotal = useMemo(() => {
    if (!selectedOrder) return 0;
    return getOrderAddOnTotal({
      ...selectedOrder,
      sidelines: selectedOrderAddOns,
    });
  }, [selectedOrder, selectedOrderAddOns]);

  const selectedOrderSubtotalWithAddOns = useMemo(
    () => (selectedOrder ? getOrderSubtotalWithAddOns(selectedOrder) : 0),
    [selectedOrder]
  );

  const selectedOrderTaxAmount = useMemo(
    () => (selectedOrder ? getOrderTaxAmount(selectedOrder) : 0),
    [selectedOrder]
  );

  const selectedOrderTotalWithAddOns = useMemo(
    () => (selectedOrder ? getOrderTotalWithAddOns(selectedOrder) : 0),
    [selectedOrder]
  );

  const selectedOrderDeliveryFee = useMemo(
    () => (selectedOrder ? getOrderDeliveryFee(selectedOrder) : 0),
    [selectedOrder]
  );

  if (isLoading) {
    return <LoadingScreen message="Loading profile..." />;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-text mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card padding="md">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {user?.full_name?.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold text-text text-lg">
                  {user?.full_name}
                </h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User size={20} />
                  <span className="font-medium">Personal Info</span>
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MapPin size={20} />
                  <span className="font-medium">Addresses</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package size={20} />
                  <span className="font-medium">Order History</span>
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card padding="lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-bold text-text">
                    Personal Information
                  </h2>
                  {!isEditingProfile && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingProfile(true)}
                    >
                      <Edit2 size={16} className="mr-2" />
                      Edit
                    </Button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <Input
                      type="text"
                      label="Full Name"
                      value={profileForm.full_name}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          full_name: e.target.value,
                        })
                      }
                      leftIcon={<User size={20} />}
                      required
                    />

                    <Input
                      type="email"
                      label="Email Address"
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          email: e.target.value,
                        })
                      }
                      leftIcon={<Mail size={20} />}
                      required
                    />

                    <Input
                      type="tel"
                      label="Phone Number"
                      value={profileForm.phone}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          phone: e.target.value,
                        })
                      }
                      leftIcon={<Phone size={20} />}
                      required
                    />

                    <div className="flex space-x-3">
                      <Button type="submit" variant="primary">
                        <Check size={16} className="mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditingProfile(false);
                          setProfileForm({
                            full_name: user?.full_name || '',
                            email: user?.email || '',
                            phone: user?.phone || '',
                          });
                        }}
                      >
                        <X size={16} className="mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
                      <User className="text-gray-400" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-semibold text-text">
                          {user?.full_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
                      <Mail className="text-gray-400" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-semibold text-text">{user?.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
                      <Phone className="text-gray-400" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-semibold text-text">{user?.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 py-4">
                      <Calendar className="text-gray-400" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-semibold text-text">
                          {memberSinceDisplay}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-2xl font-bold text-text">
                      Saved Addresses
                    </h2>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setIsAddingAddress(true)}
                    >
                      <Plus size={16} className="mr-2" />
                      Add Address
                    </Button>
                  </div>

                  {addresses.length === 0 ? (
                    <div className="text-center py-12">
                      <MapPin className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                      <p className="text-gray-600 mb-4">
                        No saved addresses yet
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingAddress(true)}
                      >
                        Add Your First Address
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div
                          key={address._id}
                          className={`border-2 rounded-lg p-4 transition-all ${
                            address.is_default
                              ? 'border-primary bg-primary-50'
                              : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-text mb-1">
                                {address.label}
                              </h3>
                              {address.is_default && (
                                <span className="inline-block px-2 py-1 bg-primary text-white text-xs rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => handleDeleteAddress(address._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <p className="text-sm text-gray-700 mb-3">
                            {address.street}
                            <br />
                            {address.suburb}, {address.state} {address.postcode}
                          </p>

                          {!address.is_default && (
                            <Button
                              variant="outline"
                              size="sm"
                              fullWidth
                              onClick={() =>
                                handleSetDefaultAddress(address._id)
                              }
                            >
                              Set as Default
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <Card padding="lg">
                <h2 className="font-heading text-2xl font-bold text-text mb-6">
                  Order History
                </h2>

                {isLoadingHistory ? (
                  <div className="text-center py-12 text-gray-500">
                    Loading orders...
                  </div>
                ) : orderHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-gray-600 mb-4">No orders yet</p>
                    <Button
                      variant="primary"
                      onClick={() => (window.location.href = '/menu/daily')}
                    >
                      Start Ordering
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div
                        key={order._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-text">
                              Order #{getOrderDisplayNumber(order)}
                            </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.created_at)}
                  </p>
                  {order.order_type === 'meal_subscription' && getPlanTypeLabel(order) && (
                    <p className="text-xs text-purple-700 font-semibold">
                      {getPlanTypeLabel(order)}
                    </p>
                  )}
                </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {order.status.toUpperCase().replace('_', ' ')}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm mb-3">
                          <p className="text-gray-600">
                            {(order.items?.length ?? 0) + (order.sidelines?.length ?? 0)} item(s)
                          </p>
                          <p className="font-semibold text-text">
                            {formatCurrency(getOrderTotalWithAddOns(order))}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            fullWidth
                            onClick={() => handleOpenOrderDetails(order as unknown as Order)}
                          >
                            View Details
                          </Button>
                          {canEditMealPlan(order) && (
                            <Button
                              variant="primary"
                              size="sm"
                              fullWidth
                              onClick={() => handleEditMealPlan(order)}
                            >
                              Edit Meal Plan
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    {orderHistoryTotal > 0 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 pt-4">
                        <p className="text-sm text-gray-500">
                          Showing {ordersRangeStart}-{ordersRangeEnd} of{' '}
                          {orderHistoryTotal} orders
                        </p>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={orderHistoryPage <= 1 || isLoadingHistory}
                            onClick={() =>
                              handleOrderHistoryPageChange(orderHistoryPage - 1)
                            }
                          >
                            Previous
                          </Button>
                          <span className="text-sm text-gray-600">
                            Page {orderHistoryPage} of {totalOrderPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={
                              orderHistoryPage >= totalOrderPages || isLoadingHistory
                            }
                            onClick={() =>
                              handleOrderHistoryPageChange(orderHistoryPage + 1)
                            }
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            )}
          </div>
      </div>
    </div>

    {/* Add Address Modal */}
    <Modal
        isOpen={isAddingAddress}
        onClose={() => setIsAddingAddress(false)}
        title="Add New Address"
      >
        <form onSubmit={handleAddAddress} className="space-y-4">
          <Input
            type="text"
            label="Label (e.g., Home, Work)"
            value={addressForm.label}
            onChange={(e) =>
              setAddressForm({ ...addressForm, label: e.target.value })
            }
            required
      />
          <Input
            type="text"
            label="Street Address"
            value={addressForm.street}
            onChange={(e) =>
              setAddressForm({ ...addressForm, street: e.target.value })
            }
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Suburb"
              value={addressForm.suburb}
              onChange={(e) =>
                setAddressForm({ ...addressForm, suburb: e.target.value })
              }
              required
            />

            <Input
              type="text"
              label="Postcode"
              value={addressForm.postcode}
              onChange={(e) =>
                setAddressForm({ ...addressForm, postcode: e.target.value })
              }
              maxLength={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              State
            </label>
            <select
              value={addressForm.state}
              onChange={(e) =>
                setAddressForm({ ...addressForm, state: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="NSW">NSW</option>
              <option value="VIC">VIC</option>
              <option value="QLD">QLD</option>
              <option value="SA">SA</option>
              <option value="WA">WA</option>
              <option value="TAS">TAS</option>
              <option value="ACT">ACT</option>
              <option value="NT">NT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Delivery Instructions (Optional)
            </label>
            <textarea
              value={addressForm.delivery_instructions}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  delivery_instructions: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          <div className="flex space-x-3">
            <Button type="submit" variant="primary" fullWidth>
              Add Address
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddingAddress(false)}
            >
          Cancel
        </Button>
      </div>
    </form>
  </Modal>
      {/* Edit Meal Plan Modal */}
      <Modal
        isOpen={isEditPlanModalOpen}
        onClose={() => {
          if (!isSavingEditPlan) {
            resetEditPlanState();
          }
        }}
        title="Edit Meal Plan"
      >
        {isLoadingEditPlan ? (
          <div className="py-6 text-center text-gray-600">
            Loading meal plan...
          </div>
        ) : editPlanError ? (
          <div className="py-4 text-sm text-red-600">{editPlanError}</div>
        ) : !editPlanDetails ? (
          <div className="py-6 text-center text-gray-600">
            Select an order to edit.
          </div>
        ) : (
          <div className="space-y-4">
            {(editPlanDetails.delivery_slots || []).map((slot) => (
              <div
                key={slot.delivery_date}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Delivery date</p>
                    <p className="font-semibold text-text">
                      {formatDate(slot.delivery_date)}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    Meals only - delivery day locked
                  </span>
                </div>

                <div className="space-y-3">
                  {(editPlanSelections[slot.delivery_date] || []).map(
                    (row, idx) => (
                      <div
                        key={`${slot.delivery_date}-${idx}`}
                        className="flex flex-col sm:flex-row gap-3"
                      >
                        <select
                          className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={row.menuItemId}
                          onChange={(e) =>
                            updateSelectionRow(slot.delivery_date, idx, {
                              menuItemId: e.target.value,
                            })
                          }
                        >
                          <option value="">Select a meal</option>
                          {getMenuOptionsForDate(slot.delivery_date).map(
                            (option) => {
                              const id = resolveMenuItemId(option);
                              return (
                                <option key={`${slot.delivery_date}-${id}`} value={id}>
                                  {option.name || 'Meal'}
                                </option>
                              );
                            }
                          )}
                        </select>

                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min={1}
                            value={row.quantity}
                            className="w-24"
                            onChange={(e) =>
                              updateSelectionRow(slot.delivery_date, idx, {
                                quantity: Number(e.target.value) || 1,
                              })
                            }
                            label=""
                          />
                          {(editPlanSelections[slot.delivery_date] || []).length >
                            1 && (
                            <button
                              type="button"
                              className="text-red-500 text-sm"
                              onClick={() =>
                                handleRemoveMealRow(slot.delivery_date, idx)
                              }
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  )}

                  <div className="pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddMealRow(slot.delivery_date)}
                      disabled={getMenuOptionsForDate(slot.delivery_date).length === 0}
                      fullWidth
                    >
                      Add Meal
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="primary"
                fullWidth
                onClick={handleSaveEditPlan}
                disabled={isSavingEditPlan || isLoadingEditPlan}
              >
                {isSavingEditPlan ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={resetEditPlanState}
                disabled={isSavingEditPlan}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
      {/* Order Details Modal */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false)
          setSelectedOrder(null)
        }}
        title={
          selectedOrder
            ? `Order #${getOrderDisplayNumber(selectedOrder)}`
            : 'Order Details'
        }
      >
        {!selectedOrder ? (
          <div className="py-6 text-center text-gray-600">
            No order selected.
          </div>
        ) : (
          <div className="space-y-4">
            {isLoadingSelectedOrder ? (
              <div className="text-center text-gray-500 py-6">Loading order...</div>
            ) : null}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Placed on</p>
                <p className="font-medium">
                  {formatDate(selectedOrder.created_at)}{' '}
                  <span className="text-gray-500">
                    at {formatTime(selectedOrder.created_at)}
                  </span>
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedOrder.status === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : selectedOrder.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                }`}
              >
                {selectedOrder.status?.toUpperCase().replace('_', ' ')}
              </span>
            </div>

            {selectedOrder.order_type === 'meal_subscription' &&
            Array.isArray(selectedOrder.delivery_slots) &&
            selectedOrder.delivery_slots.length > 0 ? (
              <div className="space-y-3">
                {selectedOrder.delivery_slots.map((slot, idx) => {
                  const entries = Object.entries(slot.menu_items || {});
                  return (
                    <div
                      key={`${slot.delivery_date}-${idx}`}
                      className="border border-gray-200 rounded"
                    >
                      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                        <div>
                          <p className="font-semibold text-text">
                            {formatDate(slot.delivery_date)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {entries.length} meal{entries.length === 1 ? '' : 's'} selected
                          </p>
                        </div>
                        {slot.notes ? (
                          <p className="text-xs text-gray-500 italic text-right max-w-sm">
                            {slot.notes}
                          </p>
                        ) : null}
                      </div>
                      {entries.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          No meals recorded for this delivery.
                        </div>
                      ) : (
                        <div className="divide-y">
                          {entries.map(([menuId, qty], entryIdx) => {
                            const meta = selectedOrderMenuLookup.get(String(menuId));
                            const name = meta?.name || 'Meal';
                            return (
                              <div
                                key={`${slot.delivery_date}-${menuId}-${entryIdx}`}
                                className="flex items-center justify-between px-3 py-2 text-sm"
                              >
                                <div className="text-gray-700">
                                  {name}
                                  {meta?.category ? (
                                    <span className="text-gray-400"> • {meta.category}</span>
                                  ) : null}
                                </div>
                                <div className="text-gray-600">x{qty}</div>
                                {meta?.price ? (
                                  <div className="font-medium">
                                    {formatCurrency(Number(meta.price) * Number(qty || 0))}
                                  </div>
                                ) : (
                                  <div className="font-medium text-gray-400">—</div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {Array.isArray(selectedOrderAddOns) &&
                  selectedOrderAddOns.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
                      <p className="text-sm font-semibold text-gray-700">
                        Add-ons (charged separately)
                      </p>
                      {selectedOrderAddOns.map((sideline: any, idx: number) => (
                        <div
                          key={`sideline-${sideline._id || idx}`}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="text-gray-700">
                            {sideline.item_name || sideline.name || 'Add-on'}
                          </div>
                          <div className="text-gray-600">
                            x{sideline.quantity ?? 1}
                          </div>
                          <div className="font-medium">
                            {formatCurrency(
                              (sideline.subtotal ??
                                sideline.price ??
                                sideline.item_price ??
                                sideline.menu_item?.price ??
                                0) * (sideline.quantity ?? 1)
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-sm font-semibold text-text">
                        <span>Add-ons total</span>
                        <span>{formatCurrency(selectedOrderAddOnTotal)}</span>
                      </div>
                    </div>
                  )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="divide-y border rounded">
                  {getPrimaryItemsFromOrder(selectedOrder).map((item: any, index: number) => (
                    <div
                      key={`${item._id || item.menu_item?._id || index}-${index}`}
                      className="flex items-center justify-between p-3 text-sm"
                    >
                      <div className="text-gray-700">
                        {item.menu_item?.name || item.item_name || item.name || 'Item'}
                        {item.category ? (
                          <span className="text-gray-400"> • {item.category}</span>
                        ) : null}
                      </div>
                      <div className="text-gray-600">x{item.quantity ?? 1}</div>
                      <div className="font-medium">
                        {formatCurrency(
                          item.subtotal ??
                            (item.price || item.menu_item?.price || 0) *
                              (item.quantity ?? 1)
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {Array.isArray(selectedOrderAddOns) &&
                  selectedOrderAddOns.length > 0 && (
                    <div className="divide-y border rounded">
                      <div className="px-3 py-2 text-sm font-semibold text-text">
                        Add-ons (charged separately)
                      </div>
                      {selectedOrderAddOns.map((sideline: any, index: number) => (
                        <div
                          key={`sideline-${sideline._id || index}`}
                          className="flex items-center justify-between p-3 text-sm"
                        >
                          <div className="text-gray-700">
                            {sideline.menu_item?.name ||
                              sideline.item_name ||
                              sideline.name ||
                              'Add-on'}
                          </div>
                          <div className="text-gray-600">
                            x{sideline.quantity ?? 1}
                          </div>
                          <div className="font-medium">
                            {formatCurrency(
                              (sideline.subtotal ??
                                sideline.price ??
                                sideline.item_price ??
                                sideline.menu_item?.price ??
                                0) * (sideline.quantity ?? 1)
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-text">
                        <span>Add-ons total</span>
                        <span>{formatCurrency(selectedOrderAddOnTotal)}</span>
                      </div>
                    </div>
                  )}
              </div>
            )}

            {selectedOrderAddOnTotal > 0 && (
              <div className="flex items-center justify-between pt-2 text-sm">
                <span className="text-gray-600">Add-ons (charged separately)</span>
                <span className="font-medium">
                  {formatCurrency(selectedOrderAddOnTotal)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">
                {formatCurrency(selectedOrderSubtotalWithAddOns)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Delivery</span>
              <span className="font-medium">
                {formatCurrency(selectedOrderDeliveryFee)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tax (GST 10%)</span>
              <span className="font-medium">
                {formatCurrency(selectedOrderTaxAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                {formatCurrency(selectedOrderTotalWithAddOns)}
              </span>
            </div>

            <div className="pt-2 text-xs text-gray-500">
              Delivery method:{' '}
              {String(
                selectedOrder.delivery_option ||
                  (selectedOrder as any).delivery_method ||
                  'N/A'
              )}
            </div>
            {selectedOrder.order_type === 'meal_subscription' && getPlanTypeLabel(selectedOrder) && (
              <div className="text-xs text-gray-500">
                Plan type: {getPlanTypeLabel(selectedOrder)}
              </div>
            )}
            <div className="text-xs text-gray-500">
              Order type: {getOrderTypeDescription(selectedOrder)}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProfilePage;
