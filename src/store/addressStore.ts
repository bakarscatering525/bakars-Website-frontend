import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { deliveryAPI } from '@api/endpoints/delivery'
import { Address, CreateAddressPayload, DeliveryValidation } from '@models/address.types'

interface AddressState {
  addresses: Address[]
  defaultAddress: Address | null
  deliveryValidation: DeliveryValidation | null
  
  // Loading states
  isLoading: boolean
  isValidating: boolean
  error: string | null
  
  // Actions
  fetchAddresses: () => Promise<void>
  addAddress: (payload: CreateAddressPayload) => Promise<Address>
  updateAddress: (addressId: string, payload: Partial<CreateAddressPayload>) => Promise<void>
  deleteAddress: (addressId: string) => Promise<void>
  setDefaultAddress: (addressId: string) => Promise<void>
  validateDeliveryArea: (addressId: string, orderType?: 'daily' | 'weekly' | 'catering') => Promise<DeliveryValidation>
  calculateDeliveryFee: (
    addressId: string,
    options?: { deliveryDays?: number; orderValue?: number; isExpress?: boolean }
  ) => Promise<{
    fee: number
    distance_km: number
    delivery_days: number
    is_express: boolean
    formatted_address?: string
  }>
  clearError: () => void
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => {
      const formatAddress = (address: Address) =>
        [
          address.street,
          address.suburb,
          address.state,
          address.postcode,
          address.country || 'Australia',
        ]
          .filter(Boolean)
          .join(', ')

      const resolveAddressById = async (addressId: string): Promise<Address> => {
        const existing = get().addresses.find((addr) => addr._id === addressId)
        if (existing) {
          return existing
        }

        const response = await deliveryAPI.getAddressById(addressId)
        const fetched = response.data.data
        if (!fetched) {
          throw new Error('Delivery address not found')
        }
        return fetched
      }

      return {
        addresses: [],
        defaultAddress: null,
        deliveryValidation: null,
        isLoading: false,
        isValidating: false,
        error: null,

        fetchAddresses: async () => {
          set({ isLoading: true, error: null })
          try {
            const response = await deliveryAPI.getAddresses()
            const addresses = response.data.data || []
            const defaultAddr = addresses.find((addr: Address) => addr.is_default) || null

            set({
              addresses,
              defaultAddress: defaultAddr,
              isLoading: false,
            })
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Failed to fetch addresses',
              isLoading: false,
            })
          }
        },

        addAddress: async (payload: CreateAddressPayload) => {
          set({ isLoading: true, error: null })
          try {
            const response = await deliveryAPI.createAddress(payload)
            const newAddress = response.data.data

            const { addresses } = get()
            set({
              addresses: [...addresses, newAddress],
              defaultAddress: newAddress.is_default ? newAddress : get().defaultAddress,
              isLoading: false,
            })

            return newAddress
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to add address'
            set({
              error: errorMessage,
              isLoading: false,
            })
            throw new Error(errorMessage)
          }
        },

        updateAddress: async (addressId: string, payload: Partial<CreateAddressPayload>) => {
          set({ isLoading: true, error: null })
          try {
            const response = await deliveryAPI.updateAddress(addressId, payload)
            const updatedAddress = response.data.data

            const { addresses } = get()
            const updatedAddresses = addresses.map((addr) =>
              addr._id === addressId ? updatedAddress : addr
            )

            set({
              addresses: updatedAddresses,
            defaultAddress: updatedAddress.is_default ? updatedAddress : get().defaultAddress,
            isLoading: false
          })
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to update address',
            isLoading: false
          })
          throw error
        }
      },

      deleteAddress: async (addressId: string) => {
        set({ isLoading: true, error: null })
        try {
          await deliveryAPI.deleteAddress(addressId)
          
          const { addresses } = get()
          const filteredAddresses = addresses.filter(addr => addr._id !== addressId)
          
          set({
            addresses: filteredAddresses,
            defaultAddress: get().defaultAddress?._id === addressId 
              ? filteredAddresses.find(addr => addr.is_default) || null 
              : get().defaultAddress,
            isLoading: false
          })
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to delete address',
            isLoading: false
          })
          throw error
        }
      },

      setDefaultAddress: async (addressId: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await deliveryAPI.setDefaultAddress(addressId)
          const updatedAddress = response.data.data
          
          const { addresses } = get()
          const updatedAddresses = addresses.map(addr => ({
            ...addr,
            is_default: addr._id === addressId
          }))
          
          set({
            addresses: updatedAddresses,
            defaultAddress: updatedAddress,
            isLoading: false
          })
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to set default address',
            isLoading: false
          })
          throw error
        }
      },

      validateDeliveryArea: async (addressId: string, orderType: 'daily' | 'weekly' | 'catering' = 'weekly') => {
        set({ isValidating: true, error: null })
        try {
          const address = await resolveAddressById(addressId)
          const formattedAddress = formatAddress(address)
          const response = await deliveryAPI.validateDelivery(formattedAddress, orderType)
          const availability = response.data.data

          const validation: DeliveryValidation = {
            is_valid: !!availability?.available,
            distance_km: availability?.distance_km ?? 0,
            delivery_fee: availability?.delivery_fee ?? 0,
            estimated_time_minutes: 0,
            message: availability?.message,
          }
          
          set({
            deliveryValidation: validation,
            isValidating: false
          })
          
          return validation
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Failed to validate delivery area'
          set({
            error: errorMessage,
            isValidating: false
          })
          throw new Error(errorMessage)
        }
      },

      calculateDeliveryFee: async (
        addressId: string,
        options?: { deliveryDays?: number; orderValue?: number; isExpress?: boolean }
      ) => {
        set({ isValidating: true, error: null })
        try {
          const address = await resolveAddressById(addressId)
          const formattedAddress = formatAddress(address)
          const deliveryDays = Math.max(1, options?.deliveryDays ?? 1)
          const payload = {
            address: formattedAddress,
            order_value: options?.orderValue ?? 0,
            delivery_days: deliveryDays,
            is_express: options?.isExpress ?? false,
          }

          const response = await deliveryAPI.calculateDeliveryFee(payload)
          const data = response.data.data ?? {}
          const result = {
            fee: data.delivery_fee ?? 0,
            distance_km: data.distance_km ?? 0,
            delivery_days: data.delivery_days ?? deliveryDays,
            is_express: data.is_express ?? payload.is_express,
            formatted_address: data.formatted_address ?? formattedAddress,
          }
          
          set({ isValidating: false })
          return result
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to calculate delivery fee',
            isValidating: false
          })
          throw error
        }
      },

      clearError: () => {
        set({ error: null })
      },
    };
  },
  {
    name: 'bakars-addresses',
    partialize: (state) => ({
      addresses: state.addresses,
      defaultAddress: state.defaultAddress,
    }),
  }
  )
);
