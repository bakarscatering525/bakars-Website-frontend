import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@hooks/useCart';
import { useAuthStore } from '@store/authStore';
import { formatCurrency } from '@utils/formatters';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import Button from '@components/common/Button';
import Card from '@components/common/Card';

interface CartSummaryProps {
  sticky?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ sticky = true }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const {
    items,
    summary,
    isLoading,
    isUpdating,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
  } = useCart();

  // Refresh cart on mount
  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    }
  }, [isAuthenticated]);

  // Only show cart if authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Loading state
  if (isLoading && items.length === 0) {
    return (
      <Card className={sticky ? 'sticky top-24' : ''} padding="lg">
        <div className="text-center py-8">
          <Loader2 className="mx-auto h-8 w-8 text-primary animate-spin mb-4" />
          <p className="text-sm text-gray-500">Loading cart...</p>
        </div>
      </Card>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <Card className={sticky ? 'sticky top-24' : ''} padding="lg">
        <div className="text-center py-8">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="font-semibold text-gray-500 mb-2">
            Your cart is empty
          </h3>
          <p className="text-sm text-gray-400">Add items to get started</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={sticky ? 'sticky top-24' : ''} padding="lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="text-primary" size={24} />
          <h3 className="font-heading text-xl font-bold text-text">
            Your Cart
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={refreshCart}
            className="p-1 text-gray-400 hover:text-primary transition-colors"
            disabled={isUpdating}
          >
            <RefreshCw size={16} className={isUpdating ? 'animate-spin' : ''} />
          </button>
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {summary.item_count} {summary.item_count === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Cart items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map((item: any) => (
          <div
            key={item.item_id}
            className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0"
          >
            {/* Details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-text text-sm mb-1">
                {item.item_name}
              </h4>
              <p className="text-xs text-gray-500 mb-1">{item.category}</p>
              <p className="text-primary font-semibold text-sm mb-2">
                {formatCurrency(item.price)}
              </p>

              {/* Quantity controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    updateCartQuantity(item.item_id, item.quantity - 1)
                  }
                  disabled={isUpdating}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:border-primary transition-colors disabled:opacity-50"
                >
                  <Minus size={12} />
                </button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateCartQuantity(item.item_id, item.quantity + 1)
                  }
                  disabled={isUpdating}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:border-primary transition-colors disabled:opacity-50"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Remove button */}
            <button
              onClick={() => removeFromCart(item.item_id)}
              disabled={isUpdating}
              className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0 disabled:opacity-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="space-y-2 mb-6 pt-4 border-t-2 border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">
            {formatCurrency(summary.subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery Fee:</span>
          <span className="font-medium">
            {summary.delivery_fee > 0
              ? formatCurrency(summary.delivery_fee)
              : 'FREE'}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (GST 10%):</span>
          <span className="font-medium">{formatCurrency(summary.tax)}</span>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-text">Total:</span>
            <span className="font-heading text-2xl font-bold text-primary">
              {formatCurrency(summary.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={() => navigate('/checkout')}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Updating...
            </>
          ) : (
            'Proceed to Checkout'
          )}
        </Button>

        <button
          onClick={clearCart}
          disabled={isUpdating}
          className="w-full text-sm text-gray-600 hover:text-red-500 transition-colors py-2 disabled:opacity-50"
        >
          Clear Cart
        </button>
      </div>
    </Card>
  );
};

export default CartSummary;
