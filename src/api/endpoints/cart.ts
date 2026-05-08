import apiClient from '../client'
import { ApiResponse } from '@models/common.types'

export interface CartItem {
  item_id: string;
  item_name: string;
  category: string;
  quantity: number;
  price: number;
  subtotal: number;
  variation_size?: string;
}

export interface CartSideline {
  item_id: string;
  item_name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CartSummary {
  items: CartItem[];
  sidelines: CartSideline[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  items_count: number;
}

export const cartAPI = {
  /**
   * Get cart summary for current user
   */
  getCartSummary: () => 
    apiClient.get<ApiResponse<CartSummary>>('/cart/summary'),

  /**
   * Add item to cart - FIXED to match backend API
   */
  addToCart: (
    item_id: string,
    quantity: number,
    variation_size?: string
  ) => {
    return apiClient.post<ApiResponse<CartSummary>>('/cart/add-item', {
      item_id,
      quantity,
      variation_size,
    });
  },

  /**
   * Update cart item quantity
   */
  updateCartItem: (item_id: string, quantity: number, variation_size?: string) => 
    apiClient.put<ApiResponse<CartSummary>>(`/cart/update-item/${item_id}`, { 
      quantity,
      variation_size,
    }),

  /**
   * Remove item from cart
   */
  removeFromCart: (item_id: string, variation_size?: string) => 
    apiClient.delete<ApiResponse<CartSummary>>(`/cart/remove-item/${item_id}${variation_size ? `?variation_size=${variation_size}` : ''}`),

  /**
   * Clear cart
   */
  clearCart: () => 
    apiClient.post<ApiResponse<void>>('/cart/clear'),
}
