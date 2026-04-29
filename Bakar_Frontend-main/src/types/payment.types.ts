export interface PaymentIntentResponse {
  client_secret: string
  payment_intent_id: string
  amount: number
  currency: string
}

export interface ConfirmPaymentResponse {
  success: boolean
  order_id: string
  payment_status: string
  message: string
}

export interface PaymentConfigResponse {
  stripe_enabled: boolean
  stripe_publishable_key?: string
  currency: string
  is_live_mode: boolean
}
