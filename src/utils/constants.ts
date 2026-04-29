/**
 * Application constants
 */

export const APP_NAME = 'Bakar\'s Food & Catering'

export const BUSINESS_INFO = {
  address: 'Guildford 2161, Sydney, Australia',
  phone: import.meta.env.VITE_WHATSAPP_NUMBER || '+61 480 573 034',
  email: 'info@bakarsfood.com.au',
  deliveryRadius: 6, // km
}

export const ORDER_TYPES = {
  DAILY_MENU: 'daily_menu',
  MEAL_SUBSCRIPTION: 'meal_subscription',
} as const

export const DELIVERY_OPTIONS = {
  PICKUP: 'pickup',
  DELIVERY: 'delivery',
} as const

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const

export const PAYMENT_METHODS = {
  CARD: 'card',
  CASH: 'cash',
} as const

export const DELIVERY_TIME_SLOTS = [
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '6:00 PM - 7:00 PM',
  '7:00 PM - 8:00 PM',
  '8:00 PM - 9:00 PM',
]

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const SUBSCRIPTION_PLANS = {
  WEEKLY: { meals: 7, discount: 0 },
  FORTNIGHTLY: { meals: 14, discount: 5 },
  MONTHLY: { meals: 30, discount: 10 },
}

export const TAX_RATE = 0.10 // 10% GST

export const MIN_ORDER_VALUE = 15 // AUD
export const DAILY_DELIVERY_FEE = 12 // AUD

export const DELIVERY_FEE_PER_KM = 2.5 // AUD per km

export const FREE_DELIVERY_THRESHOLD = 50 // AUD
