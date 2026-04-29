import apiClient from '../client';
import { Order, OrderTracking } from '@models/order.types';
import { ApiResponse } from '@models/common.types';

const DEFAULT_CHECKOUT_TIMEOUT = Number(
  import.meta.env.VITE_CHECKOUT_TIMEOUT ??
    import.meta.env.VITE_API_TIMEOUT ??
    45000,
);

export const ordersAPI = {
  /**
   * Create daily order
   */
  createDailyOrder: (payload: any) =>
    apiClient.post<ApiResponse<Order>>('/orders/daily', payload, {
      timeout: DEFAULT_CHECKOUT_TIMEOUT,
    }),

  /**
   * Create meal subscription order
   */
  createMealSubscriptionOrder: (payload: any) =>
    apiClient.post<ApiResponse<Order>>('/orders/weekly', payload, {
      timeout: DEFAULT_CHECKOUT_TIMEOUT,
    }),

  /**
   * Get meal subscription order details
   */
  getMealSubscriptionDetails: (orderId: string) =>
    apiClient.get<ApiResponse<any>>(`/orders/weekly/${orderId}`, {
      timeout: DEFAULT_CHECKOUT_TIMEOUT,
    }),

  /**
   * Update meal subscription order
   */
  updateMealSubscriptionOrder: (orderId: string, payload: any) =>
    apiClient.put<ApiResponse<Order>>(`/orders/weekly/${orderId}`, payload, {
      timeout: DEFAULT_CHECKOUT_TIMEOUT,
    }),
  /**
   * Update menu items for a specific delivery date (customer)
   */
  updateSubscriptionDeliverySlot: (orderId: string, payload: any) =>
    apiClient.patch<ApiResponse<Order>>(
      `/orders/weekly/${orderId}/delivery-slot`,
      payload,
      { timeout: DEFAULT_CHECKOUT_TIMEOUT }
    ),

  /**
   * Create catering order
   */
  createCateringOrder: (payload: any) =>
    apiClient.post<ApiResponse<Order>>('/orders/catering', payload, {
      timeout: DEFAULT_CHECKOUT_TIMEOUT,
    }),

  /**
   * Get user's order history
   */
  getOrderHistory: (page: number = 1, page_size: number = 20) =>
    apiClient.get<ApiResponse<{ orders: Order[]; total: number; page: number; page_size: number }>>(
      `/orders/my-orders?page=${page}&page_size=${page_size}`
    ),

  /**
   * Get order by ID
   */
  getOrderById: (orderId: string) =>
    apiClient.get<ApiResponse<Order>>(`/orders/${orderId}`),

  /**
   * Track order
   */
  trackOrder: (orderId: string) =>
    apiClient.get<ApiResponse<OrderTracking>>(`/orders/${orderId}/track`),

  /**
   * Cancel order
   */
  cancelOrder: (orderId: string, reason: string) =>
    apiClient.post<ApiResponse<Order>>(`/orders/${orderId}/cancel`, { reason }),

  /**
   * Update order status (admin)
   */
  updateOrderStatus: (orderId: string, status: string) =>
    apiClient.patch<ApiResponse<Order>>(`/admin/orders/${orderId}/status`, { status }),
};
