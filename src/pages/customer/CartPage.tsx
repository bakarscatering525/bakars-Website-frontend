import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@hooks/useCart';
import { useAuthStore } from '@store/authStore';
import { formatCurrency } from '@utils/formatters';
import { getImageUrl, handleImageError } from '@utils/images';
import { menuAPI } from '@api/endpoints/menu';
import { MenuItem } from '@models/menu.types';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  X,
  ArrowLeft,
  Tag,
  Truck,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import LoadingScreen from '@components/common/LoadingScreen';
import { useToast } from '@components/common/Toast';

const areSetsEqual = (a: Set<string>, b: Set<string>) => {
  if (a.size !== b.size) {
    return false;
  }

  for (const value of a) {
    if (!b.has(value)) {
      return false;
    }
  }

  return true;
};

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { showToast } = useToast();
  const {
    items,
    summary,
    isLoading,
    isUpdating,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
    addToCart,
  } = useCart();

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [addOnItems, setAddOnItems] = useState<MenuItem[]>([]);
  const [addOnsLoading, setAddOnsLoading] = useState(false);
  const [addOnsError, setAddOnsError] = useState<string | null>(null);
  const [itemImageMap, setItemImageMap] = useState<Record<string, string>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    refreshCart();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchAddOns = async () => {
      setAddOnsLoading(true);
      setAddOnsError(null);
      try {
        const response = await menuAPI.getDailyMenu({ category: 'add_ons' });
        const payload = response.data?.data ?? response.data;
        let addons: MenuItem[] = [];
        if (Array.isArray(payload)) {
          addons = payload;
        } else if (payload?.items && Array.isArray(payload.items)) {
          addons = payload.items;
        }
        setAddOnItems(addons);
      } catch (error: any) {
        console.error('Failed to load add-ons', error);
        const message =
          error?.response?.data?.message ||
          error?.message ||
          'Failed to load add-ons';
        setAddOnsError(message);
      } finally {
        setAddOnsLoading(false);
      }
    };

    fetchAddOns();
  }, []);

  const hasValidImageSource = (value?: string | null): boolean => {
    if (!value) return false;
    const trimmed = value.trim();
    return trimmed !== '' && trimmed !== 'null' && trimmed !== 'undefined';
  };

  useEffect(() => {
    const missingImageItemIds = items
      .filter(
        (item: any) =>
          !hasValidImageSource(item.image_url) && !itemImageMap[item.item_id]
      )
      .map((item: any) => item.item_id);

    if (missingImageItemIds.length === 0) {
      return;
    }

    let isActive = true;

    const fetchMissingImages = async () => {
      try {
        await Promise.all(
          missingImageItemIds.map(async (itemId: string) => {
            try {
              const response = await menuAPI.getMenuItemById(itemId);
              const menuItem = response.data?.data ?? response.data;
              const imageUrl = menuItem?.image_url;

              if (imageUrl && isActive) {
                setItemImageMap((prev) => ({
                  ...prev,
                  [itemId]: imageUrl,
                }));
                setImageErrors((prev) => {
                  if (!prev[itemId]) return prev;
                  const { [itemId]: _, ...rest } = prev;
                  return rest;
                });
              }
            } catch (error) {
              console.error(
                `Failed to fetch image for cart item ${itemId}`,
                error
              );
            }
          })
        );
      } catch (error) {
        console.error('Failed to backfill cart item images', error);
      }
    };

    fetchMissingImages();

    return () => {
      isActive = false;
    };
  }, [items, itemImageMap]);

  useEffect(() => {
    const currentItemIds = new Set(items.map((item: any) => `${item.item_id}-${item.variation_size || ''}`));

    setSelectedItems((prevSelected) => {
      if (selectAll) {
        return areSetsEqual(prevSelected, currentItemIds)
          ? prevSelected
          : currentItemIds;
      }

      const filtered = new Set<string>();
      prevSelected.forEach((id) => {
        if (currentItemIds.has(id)) {
          filtered.add(id);
        }
      });

      return areSetsEqual(prevSelected, filtered) ? prevSelected : filtered;
    });

    if (selectAll && currentItemIds.size === 0) {
      setSelectAll(false);
    }
  }, [items, selectAll]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
      setSelectAll(false);
    } else {
      const allItemIds = new Set([
        ...items.map((item: any) => `${item.item_id}-${item.variation_size || ''}`),
      ]);
      setSelectedItems(allItemIds);
      setSelectAll(true);
    }
  };

  const handleSelectItem = (itemId: string, variationSize?: string) => {
    const compositeId = `${itemId}-${variationSize || ''}`;
    const newSelected = new Set(selectedItems);
    if (newSelected.has(compositeId)) {
      newSelected.delete(compositeId);
    } else {
      newSelected.add(compositeId);
    }
    setSelectedItems(newSelected);

    // Update selectAll state
    const totalItems = items.length;
    setSelectAll(newSelected.size === totalItems && totalItems > 0);
  };

  const handleImageLoadError =
    (key: string) =>
    (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
      setImageErrors((prev) => ({ ...prev, [key]: true }));
      handleImageError(event);
    };

  const handleDeleteSelected = async () => {
    if (selectedItems.size === 0) {
      showToast('Please select items to delete', 'warning');
      return;
    }

    if (!window.confirm(`Delete ${selectedItems.size} selected item(s)?`)) {
      return;
    }

    for (const compositeId of selectedItems) {
      const [itemId, variationSize] = compositeId.split('-', 2);
      const variation = variationSize === '' ? undefined : variationSize;
      await removeFromCart(itemId, variation);
    }

    setSelectedItems(new Set());
    setSelectAll(false);
    showToast('Selected items removed', 'success');
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number, variationSize?: string) => {
    if (newQuantity === 0) {
      if (window.confirm('Remove this item from cart?')) {
        await removeFromCart(itemId, variationSize);
      }
    } else {
      await updateCartQuantity(itemId, newQuantity, variationSize);
    }
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      showToast('Your cart is empty', 'warning');
      return;
    }
    navigate('/checkout');
  };

  if (isLoading) {
    return <LoadingScreen message="Loading cart..." />;
  }

  const isCartEmpty = items.length === 0;

  if (isCartEmpty) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container-custom">
          <Card padding="lg" className="max-w-2xl mx-auto text-center">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
            <h2 className="font-heading text-3xl font-bold text-text mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/menu/daily')}
            >
              Start Shopping
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-primary hover:text-primary-600 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </button>
          <h1 className="font-heading text-4xl font-bold text-text">
            Shopping Cart
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            <Card padding="lg">
              {/* Select All & Delete Selected */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-600">
                      SELECT ALL ({items.length} ITEM(S))
                    </span>
                  </label>
                </div>

                {selectedItems.size > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                    <span>DELETE</span>
                  </button>
                )}
              </div>

              {/* Main Items */}
              <div className="space-y-4">
                {items.map((item: any) => {
                  const imageKey = `cart-${item.item_id}`;
                  const rawImageSource = hasValidImageSource(item.image_url)
                    ? item.image_url
                    : itemImageMap[item.item_id];
                  const imageUrl = getImageUrl(rawImageSource);
                  const hasImage = Boolean(imageUrl) && !imageErrors[imageKey];

                  return (
                    <div
                      key={item.item_id}
                      className="border-b border-gray-100 pb-4 last:border-0"
                    >
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.item_id)}
                        onChange={() => handleSelectItem(item.item_id, item.variation_size)}
                        className="mt-8 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />

                      {/* Item Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        {hasImage ? (
                          <img
                            src={imageUrl}
                            alt={item.item_name}
                            className="w-full h-full object-cover"
                            onError={handleImageLoadError(imageKey)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-text mb-1">
                              {item.item_name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              {item.category}
                            </p>
                            {item.variation_size && (
                              <p className="text-xs text-gray-500 mb-2">
                                Size: {item.variation_size.charAt(0).toUpperCase() + item.variation_size.slice(1)}
                              </p>
                            )}

                            {/* Special instructions if any */}
                            {item.special_instructions && (
                              <p className="text-xs text-gray-600 italic mb-2">
                                Note: {item.special_instructions}
                              </p>
                            )}

                            {/* Price */}
                            <div className="flex items-center space-x-3">
                              <span className="font-heading text-xl font-bold text-primary">
                                {formatCurrency(item.price)}
                              </span>
                              {item.original_price &&
                                item.original_price > item.price && (
                                  <span className="text-sm text-gray-400 line-through">
                                    {formatCurrency(item.original_price)}
                                  </span>
                                )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col items-end space-y-2">
                            <button
                              onClick={() => removeFromCart(item.item_id, item.variation_size)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-2 py-1">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.item_id,
                                    item.quantity - 1,
                                    item.variation_size
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                                disabled={isUpdating}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-10 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.item_id,
                                    item.quantity + 1,
                                    item.variation_size
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                                disabled={isUpdating}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  );
                })}

                {/* Sidelines */}
              </div>
            </Card>

            <Card
              padding="lg"
              className="overflow-hidden bg-gradient-to-r from-orange-50 via-rose-50 to-white border-transparent mt-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-orange-500 font-semibold">
                    Pair With
                  </p>
                  <h2 className="font-heading text-2xl font-bold text-text">
                    Chef’s Favorite Add-ons
                  </h2>
                  <p className="text-sm text-gray-600">
                    Quick bites and sides curated to elevate your order.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Freshly made daily
                </div>
              </div>

              {addOnsLoading ? (
                <div className="py-10 text-center text-gray-500 text-sm">
                  Loading add-ons...
                </div>
              ) : addOnsError ? (
                <div className="py-8 text-center text-red-500 text-sm">
                  {addOnsError}
                </div>
              ) : addOnItems.length === 0 ? (
                <div className="py-8 text-center text-gray-500 text-sm">
                  No add-ons are available right now.
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-2 mt-2 custom-scrollbar">
                  {addOnItems.map((addOn) => {
                    const addOnKey = `addon-${addOn._id || addOn.id}`;
                    const imageUrl = getImageUrl(addOn.image_url);
                    const hasImage = Boolean(imageUrl) && !imageErrors[addOnKey];

                    return (
                      <div
                        key={addOn._id || addOn.id}
                        className="min-w-[240px] max-w-[260px] bg-white rounded-2xl shadow-sm border border-orange-100/70 p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                      >
                      <div className="flex items-start gap-3">
                          <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                            {hasImage ? (
                              <img
                                src={imageUrl}
                                alt={addOn.name}
                                className="w-full h-full object-cover"
                                onError={handleImageLoadError(addOnKey)}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500 px-2 text-center">
                                No image
                              </div>
                            )}
                          </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 leading-tight">
                            {addOn.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {addOn.description || 'Perfect pairing for any meal.'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-base font-bold text-primary">
                          {formatCurrency(addOn.price)}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary text-primary hover:bg-primary hover:text-white"
                          onClick={() => addToCart(addOn, 1)}
                          disabled={isUpdating}
                        >
                          Add
                        </Button>
                      </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card padding="lg" className="sticky top-24">
              <h2 className="font-heading text-2xl font-bold text-text mb-6">
                Order Summary
              </h2>

              {/* Summary Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({summary.item_count} items)</span>
                  <span className="font-semibold">
                    {formatCurrency(summary.subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping Fee</span>
                  <span className="font-semibold">
                    {summary.delivery_fee > 0
                      ? formatCurrency(summary.delivery_fee)
                      : formatCurrency(0)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-text">Total</span>
                  <span className="font-heading text-3xl font-bold text-primary">
                    {formatCurrency(summary.total)}
                  </span>
                </div>

                {/* Proceed to Checkout */}
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleProceedToCheckout}
                  disabled={isCartEmpty}
                >
                  PROCEED TO CHECKOUT({summary.item_count})
                </Button>
              </div>

              {/* Info Messages */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <Truck
                    className="text-green-500 flex-shrink-0 mt-0.5"
                    size={16}
                  />
                  <p>Free delivery on orders above $50 within 6km</p>
                </div>

                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle
                    className="text-green-500 flex-shrink-0 mt-0.5"
                    size={16}
                  />
                  <p>100% secure payment</p>
                </div>

                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <AlertCircle
                    className="text-blue-500 flex-shrink-0 mt-0.5"
                    size={16}
                  />
                  <p>Need help? Contact us at support@bakars.com</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
