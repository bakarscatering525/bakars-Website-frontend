import { useEffect } from 'react';
import { useCartStore } from '@store/cartStore';
import { useAuthStore } from '@store/authStore';
import { useToast } from '@components/common/Toast';
import { MenuItem, MenuItemVariation } from '@models/menu.types';

export const useCart = () => {
  const cartStore = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { showToast } = useToast();

  // Fetch cart on mount if authenticated
  useEffect(() => {
    if (isAuthenticated && !cartStore.cartSummary && !cartStore.isLoading) {
      cartStore.fetchCart().catch(console.error);
    }
  }, [isAuthenticated]);

  /**
   * Add menu item to cart
   */
  const addToCart = async (
    menuItem: MenuItem,
    quantity: number = 1,
    specialInstructions?: string,
    variation?: MenuItemVariation
  ) => {
    if (!isAuthenticated) {
      // For unauthenticated users, use local cart
      cartStore.addLocalItem(menuItem, quantity, specialInstructions, variation);
      showToast(`${menuItem.name} added to cart!`, 'success');
      return;
    }

    try {
      await cartStore.addItem(menuItem, quantity, specialInstructions, variation);
      showToast(`${menuItem.name} added to cart!`, 'success');
    } catch (error) {
      showToast('Failed to add item to cart', 'error');
    }
  };



  /**
   * Remove item from cart
   */
  const removeFromCart = async (itemId: string, variationSize?: string) => {
    if (!isAuthenticated) {
      cartStore.removeLocalItem(itemId);
      showToast('Item removed from cart', 'info');
      return;
    }

    try {
      await cartStore.removeItem(itemId, variationSize);
      showToast('Item removed from cart', 'info');
    } catch (error) {
      showToast('Failed to remove item', 'error');
    }
  };

  /**
   * Update cart item quantity
   */
  const updateCartQuantity = async (itemId: string, quantity: number, variationSize?: string) => {
    if (!isAuthenticated) {
      cartStore.updateLocalQuantity(itemId, quantity);
      if (quantity === 0) {
        showToast('Item removed from cart', 'info');
      }
      return;
    }

    try {
      await cartStore.updateQuantity(itemId, quantity, variationSize);
      if (quantity === 0) {
        showToast('Item removed from cart', 'info');
      }
    } catch (error) {
      showToast('Failed to update quantity', 'error');
    }
  };

  /**
   * Clear the cart
   */
  const clearCart = async () => {
    if (!isAuthenticated) {
      cartStore.clearLocalCart();
      showToast('Cart cleared', 'info');
      return;
    }

    try {
      await cartStore.clearCart();
      showToast('Cart cleared', 'info');
    } catch (error) {
      showToast('Failed to clear cart', 'error');
    }
  };

  // Get cart data based on authentication status
  const cartSummary = isAuthenticated
    ? cartStore.cartSummary
    : cartStore.getLocalSummary();
  const items = isAuthenticated
    ? cartStore.cartSummary?.items || []
    : cartStore.localItems;
  const sidelines = isAuthenticated ? cartStore.cartSummary?.sidelines || [] : [];

  // Return formatted data for components
  return {
    // Cart items
    items,
    
    // Summary
    summary: {
      item_count: cartSummary?.items_count || 0,
      subtotal: cartSummary?.subtotal || 0,
      delivery_fee: cartSummary?.delivery_fee || 0,
      tax: ((cartSummary?.subtotal || 0) * 0.1), // 10% GST
      total: cartSummary?.total || 0,
    },
    sidelines,
    
    // Loading states
    isLoading: cartStore.isLoading,
    isUpdating: cartStore.isUpdating,
    
    // Local state
    orderType: cartStore.orderType,
    deliveryOption: cartStore.deliveryOption,
    
    // Actions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    refreshCart: cartStore.fetchCart,
    setOrderType: cartStore.setOrderType,
    setDeliveryOption: cartStore.setDeliveryOption,
  };
};
