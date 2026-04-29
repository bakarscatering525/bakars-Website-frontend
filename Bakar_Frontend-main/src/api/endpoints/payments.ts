import apiClient from '../client'
import { ApiResponse } from '@models/common.types'
import type {
  PaymentIntentResponse,
  ConfirmPaymentResponse,
  PaymentConfigResponse,
} from '@models/payment.types'

export const paymentsAPI = {
  /**
   * Create payment intent for order
   */
  createPaymentIntent: (orderId: string) =>
    apiClient.post<ApiResponse<PaymentIntentResponse>>(
      '/payments/create-intent',
      { order_id: orderId },
    ),

  /**
   * Confirm payment
   */
  confirmPayment: (paymentIntentId: string) =>
    apiClient.post<ApiResponse<ConfirmPaymentResponse>>(
      '/payments/confirm',
      { payment_intent_id: paymentIntentId },
    ),

  /**
   * Get payment status
   */
  getPaymentStatus: (paymentIntentId: string) => 
    apiClient.get<ApiResponse<{ status: string }>>(`/payments/${paymentIntentId}/status`),

  /**
   * Get Stripe config (publishable key + status)
   */
  getConfig: () =>
    apiClient.get<ApiResponse<PaymentConfigResponse>>('/payments/config'),

  /**
   * Request refund
   */
  requestRefund: (orderId: string, reason: string) => 
    apiClient.post<ApiResponse<void>>('/payments/refund', { order_id: orderId, reason }),
}
