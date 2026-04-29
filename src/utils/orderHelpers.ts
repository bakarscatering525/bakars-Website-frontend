import type { Order } from '@models/order.types';
import { TAX_RATE } from '@utils/constants';

const PLAN_TAB_LABELS: Record<string, string> = {
  weekly: 'Weekly Plan',
  fortnight: 'Fortnight Plan',
  monthly: 'Monthly Plan',
  regular: 'Regular Plan',
  custom: 'Custom Plan',
};

const PLAN_KEYWORD_MAP: Array<{ keyword: string; label: string }> = [
  { keyword: 'weekly', label: 'Weekly Plan' },
  { keyword: 'week', label: 'Weekly Plan' },
  { keyword: 'fortnight', label: 'Fortnight Plan' },
  { keyword: 'monthly', label: 'Monthly Plan' },
  { keyword: 'month', label: 'Monthly Plan' },
  { keyword: 'regular', label: 'Regular Plan' },
];

export const getPlanTabLabel = (
  tab?: string | null | undefined,
  fallbackName?: string | null,
): string | null => {
  if (tab) {
    const normalized = tab.toString().toLowerCase();
    if (PLAN_TAB_LABELS[normalized]) {
      return PLAN_TAB_LABELS[normalized];
    }
  }

  if (fallbackName) {
    const normalizedName = fallbackName.toLowerCase();
    const match = PLAN_KEYWORD_MAP.find((entry) =>
      normalizedName.includes(entry.keyword),
    );
    if (match) {
      return match.label;
    }
  }

  return null;
};

export const getPlanTypeLabel = (
  order?: Pick<Order, 'subscription_type' | 'primary_plan_tab' | 'primary_plan_name'>,
): string | null => {
  if (!order) {
    return null;
  }
  if (order.subscription_type) {
    return order.subscription_type;
  }
  return getPlanTabLabel(order.primary_plan_tab, order.primary_plan_name);
};

export const getOrderTypeDescription = (
  order?: Pick<
    Order,
    'order_type' | 'primary_plan_tab' | 'primary_plan_name'
  >,
): string => {
  if (!order) {
    return 'Order';
  }

  if (order.order_type === 'meal_subscription') {
    const planLabel = getPlanTypeLabel(order);
    return planLabel ? `Meal Subscription (${planLabel})` : 'Meal Subscription';
  }

  if (order.order_type === 'daily_menu') {
    return 'Daily Order';
  }

  return 'Order';
};

export const getOrderDisplayNumber = (
  order?: Pick<Order, 'order_number' | '_id'> | null,
  fallbackLength: number = 6,
): string => {
  if (!order) {
    return '-';
  }

  if (order.order_number) {
    return order.order_number;
  }

  const id = (order as any)._id;
  if (typeof id === 'string' && id.length) {
    const safeLength = Math.max(1, fallbackLength);
    return id.slice(-safeLength).toUpperCase();
  }

  return '-';
};

export const getOrderAddOnTotal = (order?: any): number => {
  if (!order) return 0;

  const explicit =
    order.add_on_total ??
    order.add_ons_total ??
    order.addOnsTotal ??
    order.addOnTotal;
  if (explicit !== undefined && explicit !== null) {
    const value = Number(explicit);
    if (!Number.isNaN(value)) return value;
  }

  const candidates = [
    order.sidelines,
    order.add_ons,
    order.addOns,
    order.addons,
    order.add_on_items,
    order.addOnItems,
  ].filter(Array.isArray);

  if (!candidates.length) return 0;

  const flattened = candidates.flat();
  return flattened.reduce((sum: number, sideline: any) => {
    const price =
      sideline?.subtotal ??
      sideline?.price ??
      sideline?.item_price ??
      sideline?.menu_item?.price ??
      0;
    const qty = sideline?.quantity ?? 1;
    return sum + Number(price) * Number(qty);
  }, 0);
};

export const getOrderDeliveryFee = (order?: any): number => {
  if (!order) return 0;
  const deliveryFee =
    order.delivery_fee ??
    order.deliveryFee ??
    order.delivery_amount ??
    order.delivery;
  const value = Number(deliveryFee ?? 0);
  return Number.isNaN(value) ? 0 : value;
};

export const getOrderSubtotalWithAddOns = (order?: any): number => {
  if (!order) return 0;
  const baseSubtotal =
    Number(
      order.subtotal ?? order.subtotal_amount ?? order.total_before_add_ons ?? 0,
    ) || 0;
  // Subtotal now already contains add-ons for subscriptions; prefer stored subtotal.
  return baseSubtotal > 0 ? baseSubtotal : baseSubtotal + getOrderAddOnTotal(order);
};

export const getOrderTaxAmount = (order?: any): number => {
  if (!order) return 0;
  const baseSubtotal =
    Number(
      order.subtotal ??
        order.subtotal_amount ??
        order.total_before_add_ons ??
        0
    ) || 0;
  const explicit =
    order.tax ??
    order.tax_amount ??
    order.gst ??
    order.gst_amount ??
    order.tax_total;
  if (explicit !== undefined && explicit !== null) {
    const parsed = Number(explicit);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  const deliveryFee = getOrderDeliveryFee(order);
  const storedTotal = Number(order.total ?? order.total_amount ?? 0) || 0;

  // Derive tax from stored total when available (total - delivery - subtotal).
  const derivedFromStored = storedTotal - deliveryFee - baseSubtotal;
  if (storedTotal > 0 && derivedFromStored > 0) {
    return Number(derivedFromStored.toFixed(2));
  }

  // Fallback: apply GST rate to subtotal (excluding delivery), matching checkout.
  return Number((baseSubtotal * TAX_RATE).toFixed(2));
};

export const getOrderTotalWithAddOns = (order?: any): number => {
  if (!order) return 0;
  const storedTotal = Number(order.total ?? order.total_amount ?? 0) || 0;
  const deliveryFee = getOrderDeliveryFee(order);
  const taxAmount = getOrderTaxAmount(order);
  const computedTotal =
    getOrderSubtotalWithAddOns(order) + deliveryFee + taxAmount;

  // Prefer the stored total when present (reflects discounts/fees), otherwise fall back.
  if (storedTotal > 0) {
    return storedTotal;
  }
  return computedTotal;
};
