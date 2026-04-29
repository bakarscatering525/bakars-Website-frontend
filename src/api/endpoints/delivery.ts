import apiClient from '../client'
import { Address, CreateAddressPayload, DeliveryAvailability, DeliveryValidation } from '@models/address.types'
import { DeliveryZone } from '@models/subscription.types'
import { ApiResponse } from '@models/common.types'

interface DeliveryFeeRequestPayload {
  address: string
  order_value: number
  delivery_days: number
  is_express?: boolean
}

export const deliveryAPI = {
  /**
   * Get all addresses for user
   */
  getAddresses: () => 
    apiClient.get<ApiResponse<Address[]>>('/addresses'),

  /**
   * Get address by ID
   */
  getAddressById: (addressId: string) => 
    apiClient.get<ApiResponse<Address>>(`/addresses/${addressId}`),

  /**
   * Create new address
   */
  createAddress: (payload: CreateAddressPayload) => 
    apiClient.post<ApiResponse<Address>>('/addresses', payload),

  /**
   * Update address
   */
  updateAddress: (addressId: string, payload: Partial<CreateAddressPayload>) => 
    apiClient.put<ApiResponse<Address>>(`/addresses/${addressId}`, payload),

  /**
   * Delete address
   */
  deleteAddress: (addressId: string) => 
    apiClient.delete<ApiResponse<void>>(`/addresses/${addressId}`),

  /**
   * Set default address
   */
  setDefaultAddress: (addressId: string) => 
    apiClient.put<ApiResponse<Address>>(`/addresses/${addressId}/default`),

  /**
   * Validate delivery address (wrapper around availability check)
   */
  validateDelivery: (address: string, orderType: 'daily' | 'weekly' | 'catering') => 
    apiClient.post<ApiResponse<DeliveryAvailability>>('/delivery/check-availability', {
      address,
      order_type: orderType,
    }),

  /**
   * Calculate delivery fee
   */
  calculateDeliveryFee: (payload: DeliveryFeeRequestPayload) => 
    apiClient.post<ApiResponse<{
      delivery_fee: number
      distance_km: number
      delivery_days: number
      is_express: boolean
      formatted_address?: string
    }>>('/delivery/calculate-fee', payload),

  /**
   * Check delivery availability for an address
   */
  checkAvailability: (address: string, orderType: 'daily' | 'weekly' | 'catering') =>
    apiClient.post<ApiResponse<DeliveryAvailability>>('/delivery/check-availability', {
      address,
      order_type: orderType,
    }),

  /**
   * Get configured delivery zones with pricing
   */
  getDeliveryZones: () =>
    apiClient.get<ApiResponse<DeliveryZone[]>>('/delivery/zones'),
}
