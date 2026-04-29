import { create } from 'zustand'
import { ordersAPI } from '@api/endpoints/orders'
import { Order, CreateOrderPayload, OrderTracking } from '@models/order.types'
import { PaginatedResponse } from '@models/common.types'

interface OrderState {
  // Current order being created
  currentOrder: Order | null
  
  // Order history
  orderHistory: Order[]
  orderHistoryTotal: number
  orderHistoryPage: number
  orderHistoryPageSize: number
  
  // Order tracking
  trackingInfo: OrderTracking | null
  
  // Loading states
  isPlacingOrder: boolean
  isLoadingHistory: boolean
  isTracking: boolean
  error: string | null
  
  // Actions
  createOrder: (payload: CreateOrderPayload) => Promise<Order>
  fetchOrderHistory: (page?: number) => Promise<void>
  fetchOrderById: (orderId: string) => Promise<void>
  trackOrder: (orderId: string) => Promise<void>
  cancelOrder: (orderId: string, reason: string) => Promise<void>
  clearCurrentOrder: () => void
  clearError: () => void
}

export const useOrderStore = create<OrderState>((set, get) => ({
  currentOrder: null,
  orderHistory: [],
  orderHistoryTotal: 0,
  orderHistoryPage: 1,
  orderHistoryPageSize: 10,
  trackingInfo: null,
  isPlacingOrder: false,
  isLoadingHistory: false,
  isTracking: false,
  error: null,

  createOrder: async (payload: CreateOrderPayload) => {
    set({ isPlacingOrder: true, error: null })
    try {
      const response = await ordersAPI.createOrder(payload)
      const order = response.data.data
      
      set({ 
        currentOrder: order,
        isPlacingOrder: false 
      })
      
      return order
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create order'
      set({ 
        error: errorMessage,
        isPlacingOrder: false 
      })
      throw new Error(errorMessage)
    }
  },

  fetchOrderHistory: async (page = 1) => {
    set({ isLoadingHistory: true, error: null })
    try {
      const pageSize = get().orderHistoryPageSize
      const response = await ordersAPI.getOrderHistory(page, pageSize)
      const payload = response?.data?.data || {}

      // Backend returns { orders, total, page, page_size }
      // Older FE expected PaginatedResponse with { items, total, page }
      const rawOrders = payload.orders || payload.items || []

      // Normalize backend order shape to frontend Order type
      const mapped: Order[] = rawOrders.map((o: any) => ({
        ...o,
        _id: o._id || o.id,
        total: o.total ?? o.total_amount,
        delivery_option: o.delivery_option ?? o.delivery_method,
      }))

      set({
        orderHistory: Array.isArray(mapped) ? mapped : [],
        orderHistoryTotal: Number(payload.total ?? (Array.isArray(mapped) ? mapped.length : 0)),
        orderHistoryPage: page,
        isLoadingHistory: false,
      })
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || 'Failed to fetch order history',
        isLoadingHistory: false,
      })
    }
  },

  fetchOrderById: async (orderId: string) => {
    set({ isLoadingHistory: true, error: null })
    try {
      const response = await ordersAPI.getOrderById(orderId)
      set({ 
        currentOrder: response.data.data,
        isLoadingHistory: false 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch order details',
        isLoadingHistory: false 
      })
    }
  },

  trackOrder: async (orderId: string) => {
    set({ isTracking: true, error: null })
    try {
      const response = await ordersAPI.trackOrder(orderId)
      set({ 
        trackingInfo: response.data.data,
        isTracking: false 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to track order',
        isTracking: false 
      })
    }
  },

  cancelOrder: async (orderId: string, reason: string) => {
    set({ isPlacingOrder: true, error: null })
    try {
      const response = await ordersAPI.cancelOrder(orderId, reason)
      const cancelledOrder = response.data.data
      
      // Update order history if the cancelled order is in the list
      const { orderHistory } = get()
      const updatedHistory = orderHistory.map(order => 
        order._id === orderId ? cancelledOrder : order
      )
      
      set({
        orderHistory: updatedHistory,
        currentOrder: get().currentOrder?._id === orderId ? cancelledOrder : get().currentOrder,
        isPlacingOrder: false
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to cancel order',
        isPlacingOrder: false 
      })
      throw error
    }
  },

  clearCurrentOrder: () => {
    set({ currentOrder: null, trackingInfo: null })
  },

  clearError: () => {
    set({ error: null })
  },
}))
