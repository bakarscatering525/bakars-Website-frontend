import { create } from 'zustand';
import { cartAPI, CartSummary } from '@api/endpoints/cart';
import { MenuItem, MenuItemVariation } from '@models/menu.types';
import { DAILY_DELIVERY_FEE } from '@utils/constants';

// Define the structure for cart items stored locally
interface LocalCartItem {
  menu_item: MenuItem;
  quantity: number;
  special_instructions?: string;
  variation?: MenuItemVariation;
}



interface CartStore {
  // Cart data from backend
  cartSummary: CartSummary | null;
  
  // Local cart data (for unauthenticated users)
  localItems: LocalCartItem[];
  
  // Loading states
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  
  // Order type and delivery option (local state)
  orderType: 'daily_menu' | 'meal_subscription' | null;
  deliveryOption: 'delivery' | 'pickup';
  
  // Actions
  fetchCart: () => Promise<void>;
  addItem: (item: MenuItem, quantity: number, specialInstructions?: string, variation?: MenuItemVariation) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number, variationSize?: string) => Promise<void>;
  removeItem: (itemId: string, variationSize?: string) => Promise<void>;
  clearCart: () => Promise<void>;
  
  // Local state setters
  setOrderType: (type: 'daily_menu' | 'meal_subscription') => void;
  setDeliveryOption: (option: 'delivery' | 'pickup') => void;
  clearError: () => void;

  // Local cart operations (for unauthenticated users)
  addLocalItem: (item: MenuItem, quantity: number, specialInstructions?: string, variation?: MenuItemVariation) => void;
  removeLocalItem: (itemId: string) => void;
  updateLocalQuantity: (itemId: string, quantity: number) => void;
  clearLocalCart: () => void;

  // Computed values for local cart
  getLocalSummary: () => CartSummary;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartSummary: null,
  localItems: [],
  isLoading: false,
  isUpdating: false,
  error: null,
  orderType: null,
  deliveryOption: 'delivery',

  /**
   * Fetch cart from backend
   */
  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await cartAPI.getCartSummary();
      set({
        cartSummary: response.data.data,
        isLoading: false,
      });
    } catch (error: any) {
      console.error('Failed to fetch cart:', error);
      // Don't set error for 404 (empty cart)
      if (error.response?.status !== 404) {
        set({
          error: error.response?.data?.message || 'Failed to fetch cart',
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    }
  },

  /**
   * Add menu item to cart - FIXED to use item.id
   */
  addItem: async (item: MenuItem, quantity: number, specialInstructions?: string, variation?: MenuItemVariation) => {
    set({ isUpdating: true, error: null });
    
    // Validate item has an ID
    if (!item.id) {
      set({
        error: 'Invalid item: missing ID',
        isUpdating: false,
      });
      throw new Error('Invalid item: missing ID');
    }

    try {
      const variationSize = variation?.size;
      const response = await cartAPI.addToCart(item.id, quantity, variationSize);
      
      set({
        cartSummary: response.data.data,
        isUpdating: false,
      });
    } catch (error: any) {
      console.error('Failed to add item:', error);
      
      // If not authenticated, add to local cart
      if (error.response?.status === 401) {
        get().addLocalItem(item, quantity, specialInstructions, variation);
        set({ isUpdating: false });
      } else {
        set({
          error: error.response?.data?.message || 'Failed to add item to cart',
          isUpdating: false,
        });
        throw error;
      }
    }
  },



  /**
   * Update item quantity in cart
   */
  updateQuantity: async (itemId: string, quantity: number, variationSize?: string) => {
    if (quantity <= 0) {
      await get().removeItem(itemId, variationSize);
      return;
    }

    set({ isUpdating: true, error: null });
    try {
      const response = await cartAPI.updateCartItem(itemId, quantity, variationSize);
      set({
        cartSummary: response.data.data,
        isUpdating: false,
      });
    } catch (error: any) {
      console.error('Failed to update quantity:', error);
      // If not authenticated, update local cart
      if (error.response?.status === 401) {
        get().updateLocalQuantity(itemId, quantity);
        set({ isUpdating: false });
      } else {
        set({
          error: error.response?.data?.message || 'Failed to update quantity',
          isUpdating: false,
        });
        throw error;
      }
    }
  },

  /**
   * Remove item from cart
   */
  removeItem: async (itemId: string, variationSize?: string) => {
    set({ isUpdating: true, error: null });
    try {
      const response = await cartAPI.removeFromCart(itemId, variationSize);
      set({
        cartSummary: response.data.data,
        isUpdating: false,
      });
    } catch (error: any) {
      console.error('Failed to remove item:', error);
      // If not authenticated, remove from local cart
      if (error.response?.status === 401) {
        get().removeLocalItem(itemId);
        set({ isUpdating: false });
      } else {
        set({
          error: error.response?.data?.message || 'Failed to remove item',
          isUpdating: false,
        });
        throw error;
      }
    }
  },

  /**
   * Clear entire cart
   */
  clearCart: async () => {
    set({ isUpdating: true, error: null });
    try {
      await cartAPI.clearCart();
      set({
        cartSummary: null,
        isUpdating: false,
      });
    } catch (error: any) {
      console.error('Failed to clear cart:', error);
      // If not authenticated, clear local cart
      if (error.response?.status === 401) {
        get().clearLocalCart();
        set({ isUpdating: false });
      } else {
        set({
          error: error.response?.data?.message || 'Failed to clear cart',
          isUpdating: false,
        });
        throw error;
      }
    }
  },

  /**
   * Local cart operations (for unauthenticated users)
   */
  addLocalItem: (item: MenuItem, quantity: number, specialInstructions?: string, variation?: MenuItemVariation) => {
    const currentItems = get().localItems;
    const existingItem = currentItems.find(
      (i) =>
        i.menu_item.id === item.id &&
        (i.variation?.size || undefined) === (variation?.size || undefined)
    );

    if (existingItem) {
      set({
        localItems: currentItems.map((i) =>
          i.menu_item.id === item.id &&
          (i.variation?.size || undefined) === (variation?.size || undefined)
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ),
      });
    } else {
      set({
        localItems: [...currentItems, { menu_item: item, quantity, special_instructions: specialInstructions, variation }],
      });
    }
  },

  removeLocalItem: (itemId: string) => {
    set({
      localItems: get().localItems.filter(i => i.menu_item.id !== itemId),
    });
  },

  updateLocalQuantity: (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeLocalItem(itemId);
      return;
    }
    set({
      localItems: get().localItems.map(i =>
        i.menu_item.id === itemId ? { ...i, quantity } : i
      ),
    });
  },

  clearLocalCart: () => {
    set({ localItems: [] });
  },

  getLocalSummary: () => {
    const items = get().localItems;
    const deliveryOption = get().deliveryOption;
    const subtotal = items.reduce(
      (sum, item) => sum + ((item.variation?.price ?? item.menu_item.price) * item.quantity),
      0
    );
    
    const delivery_fee = deliveryOption === 'pickup' ? 0 : DAILY_DELIVERY_FEE;
    const total = subtotal + delivery_fee;
    const items_count = items.reduce((sum, item) => sum + item.quantity, 0);
    
    return {
      items: items.map((i) => ({
        item_id: i.menu_item.id,
        item_name: i.menu_item.name,
        category: i.menu_item.category,
        quantity: i.quantity,
        price: i.variation?.price ?? i.menu_item.price,
        subtotal: (i.variation?.price ?? i.menu_item.price) * i.quantity,
        variation_size: i.variation?.size,
      })),
      sidelines: [],
      subtotal,
      delivery_fee,
      total,
      items_count,
    };
  },

  /**
   * Set order type (local state)
   */
  setOrderType: (type: 'daily_menu' | 'meal_subscription') => {
    set({ orderType: type });
  },

  /**
   * Set delivery option (local state)
   */
  setDeliveryOption: (option: 'delivery' | 'pickup') => {
    set({ deliveryOption: option });
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null });
  },
}));
