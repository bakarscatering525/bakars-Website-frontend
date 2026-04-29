import { CartItem } from './cart.types';
import { Address } from './auth.types';

export type OrderType = 'daily_menu' | 'meal_subscription';
export type DeliveryOption = 'pickup' | 'delivery';
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';
export type PaymentStatus =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'paid';
export type PaymentMethod = 'card' | 'cash';

export interface OrderStatusHistoryEntry {
  status: string;
  timestamp: string;
  note?: string;
  updated_by?: string;
}

export interface Order {
  id?: string;
  _id: string;
  user_id: string;
  order_type: OrderType;
  items: CartItem[];
  sidelines?: any[];
  delivery_option: DeliveryOption;
  delivery_address?: Address;
  delivery_date: string;
  delivery_time_slot?: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  payment_intent_id?: string;
  subtotal: number;
  tax_amount?: number;
  delivery_fee: number;
  tax: number;
  total: number;
  special_instructions?: string;
  cancellation_reason?: string;
  notes?: string;
  admin_notes?: string;
  add_on_total?: number;
  add_ons_total?: number;
  plan_price_total?: number;
  extra_boxes?: number;
  extra_boxes_price?: number;
  delivery_method?: DeliveryOption | string;
  delivery_instructions?: string;
  order_number?: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  subscription_type?: string;
  primary_plan_tab?: string;
  primary_plan_name?: string;
  created_at: string;
  updated_at: string;
  status_history?: OrderStatusHistoryEntry[];
  delivery_slots?: Array<{
    delivery_date: string;
    menu_items: Record<string, number>;
    notes?: string | null;
  }>;
}

export interface CreateOrderPayload {
  order_type: OrderType;
  items: {
    menu_item_id: string;
    quantity: number;
    special_instructions?: string;
  }[];
  delivery_option: DeliveryOption;
  delivery_address_id?: string;
  delivery_date: string;
  delivery_time_slot?: string;
  payment_method: PaymentMethod;
  special_instructions?: string;
}

export interface OrderTracking {
  order_id: string;
  status: string;
  estimated_delivery_time?: string;
  driver_location?: {
    lat: number;
    lng: number;
  };
  status_history: OrderStatusHistoryEntry[];
}

export interface MealSubscriptionEditDetails {
  order_id: string;
  order_number?: string;
  plan_selections: Array<{
    plan_id: string;
    plan_code?: string;
    plan_name?: string;
    quantity: number;
  }>;
  delivery_slots: Array<{
    delivery_date: string;
    menu_items: Record<string, number>;
    notes?: string | null;
    cutoff_at?: string | null;
    is_locked?: boolean;
  }>;
  fulfilment_method: 'delivery' | 'pickup';
  is_express: boolean;
  delivery_address_id?: string;
  delivery_instructions?: string | null;
  notes?: string | null;
  payment_method?: string | null;
}
