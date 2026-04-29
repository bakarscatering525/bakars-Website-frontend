import { useEffect } from 'react';
import { useOrderStore } from '@store/orderStore';
import { useToast } from './useToast'; // This will now properly import from Toast component

export const useOrders = () => {
  const orderStore = useOrderStore();
  const { showToast } = useToast();

  useEffect(() => {
    if (orderStore.orderHistory.length === 0) {
      orderStore.fetchOrderHistory();
    }
  }, []);

  const placeOrder = async (payload: any) => {
    try {
      const order = await orderStore.createOrder(payload);
      showToast('Order placed successfully!', 'success');
      return order;
    } catch (error: any) {
      showToast(error.message || 'Failed to place order', 'error');
      throw error;
    }
  };

  const cancelOrder = async (orderId: string, reason: string) => {
    try {
      await orderStore.cancelOrder(orderId, reason);
      showToast('Order cancelled successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to cancel order', 'error');
      throw error;
    }
  };

  return {
    ...orderStore,
    placeOrder,
    cancelOrder,
  };
};
