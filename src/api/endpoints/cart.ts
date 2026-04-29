import apiClient from '../client'
import { ApiResponse } from '@models/common.types'

export interface CartItem {
  item_id: string;
  item_name: string;
  category: string;
  quantity: number;
  price: number;
  subtotal: number;
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
  addToCart: (item_id: string, quantity: number, is_sideline: boolean = false) => {
    console.log('📤 Sending to /cart/add-item:', { item_id, quantity, is_sideline });
    return apiClient.post<ApiResponse<CartSummary>>('/cart/add-item', {
      item_id,
      quantity,
      is_sideline,
    });
  },

  /**
   * Update cart item quantity
   */
  updateCartItem: (item_id: string, quantity: number, is_sideline: boolean = false) => 
    apiClient.put<ApiResponse<CartSummary>>(`/cart/update-item/${item_id}?is_sideline=${is_sideline}`, { 
      quantity 
    }),

  /**
   * Remove item from cart
   */
  removeFromCart: (item_id: string, is_sideline: boolean = false) => 
    apiClient.delete<ApiResponse<CartSummary>>(`/cart/remove-item/${item_id}?is_sideline=${is_sideline}`),

  /**
   * Clear cart
   */
  clearCart: () => 
    apiClient.post<ApiResponse<void>>('/cart/clear'),
}
