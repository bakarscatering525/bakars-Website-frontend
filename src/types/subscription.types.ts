import { MenuItem } from './menu.types';

export interface WeekSelectionRules {
  available_weeks?: number | null;
  required_weeks?: number | null;
  deliveries_per_week?: number | null;
  allow_partial_weeks?: boolean | null;
}

export type UpsellCondition =
  | 'always'
  | 'when_plan_selected'
  | 'when_no_plan'
  | 'hidden';

export interface CustomerNotificationSettings {
  upsell_message?: string | null;
  reminder_message?: string | null;
  upsell_condition?: UpsellCondition | null;
}

export interface ReminderSettings {
  enabled?: boolean | null;
  frequency_days?: number | null;
  channel?: 'in_app' | 'email' | 'both' | null;
  threshold_unselected_boxes?: number | null;
}

export interface MealSubscriptionPlan {
  _id: string;
  code: string;
  name: string;
  tab: string;
  description?: string;
  short_description?: string;
  included_meals: number;
  deliveries_per_cycle: number;
  weeks_in_cycle: number;
  boxes_per_delivery: number;
  max_boxes_per_meal?: number | null;
  price_per_plan: number;
  price_per_box?: number | null;
  allow_multiple: boolean;
  min_boxes_delivery?: number | null;
  min_boxes_pickup?: number | null;
  display_badge?: string;
  display_order: number;
  extra_box_price?: number | null;
  highlight: boolean;
  require_terms_ack: boolean;
  acknowledgement_label?: string | null;
  terms_and_conditions: string[];
  week_selection_rules?: WeekSelectionRules | null;
  customer_notifications?: CustomerNotificationSettings | null;
  reminder_settings?: ReminderSettings | null;
  is_active: boolean;
  metadata?: Record<string, unknown>;
  available_delivery_days?: string[];
  menu_item_ids_by_day?: Record<string, string[]>;
  menu_items_by_day?: Record<string, MenuItem[]>;
  menu_item_ids_by_delivery_date?: Record<string, string[]>;
  menu_items_by_delivery_date?: Record<string, MenuItem[]>;
  created_at: string;
  updated_at: string;
}

export interface DeliveryZone {
  _id: string;
  postcode: string;
  zone_label?: string | null;
  suburbs: string[];
  state: string;
  distance_from_business?: number | null;
  base_delivery_fee: number;
  express_delivery_fee?: number | null;
  max_delivery_days?: number | null;
  notes?: string | null;
  order_types?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MealPlanListResponse {
  plans: MealSubscriptionPlan[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DeliveryZoneListResponse {
  zones: DeliveryZone[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PlanSelectionInput {
  plan_id: string;
  quantity: number;
}

export interface DeliverySlotInput {
  delivery_date: string;
  menu_items: Record<string, number>;
  notes?: string;
}
