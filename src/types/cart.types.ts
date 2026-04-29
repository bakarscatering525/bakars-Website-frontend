import { MenuItem } from './menu.types'
import { Address } from './auth.types'
import { MealSubscriptionPlan } from './subscription.types'

export interface CartItem {
  menu_item: MenuItem
  quantity: number
  special_instructions?: string
}

export interface Cart {
  items: CartItem[]
  order_type: 'daily_menu' | 'meal_subscription'
  delivery_option: 'pickup' | 'delivery'
  selected_address?: Address
  delivery_date?: string
  delivery_time_slot?: string
  special_instructions?: string
}

export interface CartSummary {
  subtotal: number
  delivery_fee: number
  tax: number
  total: number
  item_count: number
}

export interface MealSubscriptionSelection {
  plan: MealSubscriptionPlan
  planQuantity: number
  fulfilment: 'delivery' | 'pickup'
  schedule: Array<{
    date: string
    items: { item: MenuItem; quantity: number; instructions?: string }[]
    notes?: string
  }>
  includedBoxes: number
  totalBoxes: number
  extraBoxes: number
  maxPerMeal?: number | null
}

