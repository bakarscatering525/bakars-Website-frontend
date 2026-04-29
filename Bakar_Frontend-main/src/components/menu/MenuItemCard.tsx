import React, { useState } from 'react';
import { MenuItem } from '@models/menu.types';
import { useCart } from '@hooks/useCart';
import { useAuthStore } from '@store/authStore';
import { useAuthModalStore } from '@store/authModalStore';
import { useMenuStore } from '@store/menuStore';
import { formatCurrency, formatCategoryLabel } from '@utils/formatters';
import { getImageUrl, handleImageError } from '@utils/images';
import { Plus, Minus, ShoppingCart, AlertCircle, Utensils } from 'lucide-react';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import Modal from '@components/common/Modal';
import { useToast } from '@components/common/Toast';

interface MenuItemCardProps {
  item: MenuItem;
  showQuickAdd?: boolean;
  isActionDisabled?: boolean;
  disabledMessage?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  showQuickAdd = true,
  isActionDisabled = false,
  disabledMessage,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { addToCart, isUpdating } = useCart();
  const { isAuthenticated } = useAuthStore();
  const { openModal, setPendingCartAction } = useAuthModalStore();
  const { showToast } = useToast();
  const categoryMap = useMenuStore((state) => state.categoryMap);

  const handleAddToCart = async () => {
    if (isActionDisabled) {
      showToast(disabledMessage || 'Daily Menu ordering is currently unavailable.', 'info');
      return;
    }

    if (!item.id) {
      console.error('❌ Item missing ID:', item);
      showToast('Error: Item data is invalid', 'error');
      return;
    }

    if (!isAuthenticated) {
      // Save the pending cart action
      setPendingCartAction({
        type: 'daily_menu',
        item: item,
        quantity: quantity,
        specialInstructions: specialInstructions,
        timestamp: new Date().toISOString(),
      });

      // Close the details modal and open auth modal
      setShowDetailsModal(false);
      openModal('login');
      return;
    }

    if (quantity > 0) {
      try {
        await addToCart(item, quantity, specialInstructions);
        // Reset form and close modal
        setQuantity(1);
        setSpecialInstructions('');
        setShowDetailsModal(false);
        showToast('Item added to cart!', 'success');
      } catch (error) {
        console.error('Failed to add to cart:', error);
      }
    }
  };

  const handleQuickAdd = () => {
    if (isActionDisabled) {
      showToast(disabledMessage || 'Daily Menu ordering is currently unavailable.', 'info');
      return;
    }

    if (!isAuthenticated) {
      // Save the pending cart action with default quantity
      setPendingCartAction({
        type: 'daily_menu',
        item: item,
        quantity: 1,
        specialInstructions: '',
        timestamp: new Date().toISOString(),
      });

      // Open auth modal
      openModal('login');
      return;
    }

    // If authenticated, open the modal
    setShowDetailsModal(true);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    // Reset to default values when closing
    setQuantity(1);
    setSpecialInstructions('');
  };

  const categoryLabel = React.useMemo(() => {
    const category = categoryMap[item.category];
    if (category) {
      return category.display_name || category.name;
    }
    return formatCategoryLabel(item.category);
  }, [categoryMap, item.category]);

  // Get the proper image URL
  const imageUrl = getImageUrl(item.image_url) || undefined;
  const hasImage = Boolean(imageUrl) && !imageError;
  const showSkeleton = Boolean(imageUrl) && !imageLoaded && !imageError;

  React.useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [item.image_url]);

  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
    handleImageError(e);
  };

  const onImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <>
      <Card
        className="flex h-full flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300"
        padding="none"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {showSkeleton && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex flex-col items-center justify-center">
              <Utensils className="text-gray-400 mb-2" size={32} />
              <span className="text-gray-400 text-sm">Loading...</span>
            </div>
          )}

          {hasImage ? (
            <img
              src={imageUrl}
              alt={item.name}
              className={`w-full h-full object-cover transition-all duration-300 ${
                imageLoaded ? 'opacity-100 hover:scale-110' : 'opacity-0'
              }`}
              onLoad={onImageLoad}
              onError={onImageError}
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 text-xs">
              <Utensils className="mb-2" size={32} />
              <span>Image unavailable</span>
            </div>
          )}

          {/* Availability badge */}
          {!item.is_available && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                Sold Out
              </span>
            </div>
          )}

          {/* Spice level indicator */}
          {item.spice_level && (
            <div className="absolute bottom-3 left-3">
              <div className="bg-white px-2 py-1 rounded-full shadow-md text-xs font-semibold">
                {item.spice_level === 'mild' && '🌶️ Mild'}
                {item.spice_level === 'medium' && '🌶️🌶️ Medium'}
                {item.spice_level === 'hot' && '🌶️🌶️🌶️ Hot'}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Category tag */}
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-2">
            {categoryLabel}
          </span>

          {/* Name and description */}
          <h3 className="font-heading text-xl font-bold text-text mb-2">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>

          {/* Allergens warning */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="flex items-start space-x-2 mb-4 text-xs text-orange-700 bg-orange-50 p-2 rounded">
              <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
              <span>Contains: {item.allergens.join(', ')}</span>
            </div>
          )}

          {/* Price and action */}
          <div className="mt-auto pt-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
              <div className="flex items-end gap-1 sm:gap-2 whitespace-nowrap">
                <span className="font-heading text-xl sm:text-2xl font-bold text-primary leading-none">
                  {formatCurrency(item.price)}
                </span>
                {item.serving_size && (
                  <span className="text-xs sm:text-sm text-gray-500 leading-none">
                    / {item.serving_size}
                  </span>
                )}
              </div>

              {showQuickAdd && item.is_available && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleQuickAdd}
                  disabled={isUpdating || !item.id || isActionDisabled}
                  className="w-full sm:w-auto justify-center"
                >
                  <ShoppingCart size={16} className="mr-1" />
                  {isActionDisabled ? 'Closed' : 'Add'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Add to Cart Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={handleCloseModal}
        title={item.name}
        size="md"
      >
        <div className="space-y-6">
          {/* Item Image in Modal */}
          {hasImage ? (
            <div className="relative h-48 w-full rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="relative h-48 w-full rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
              <Utensils className="mr-2" size={20} />
              <span>No image available</span>
            </div>
          )}

          {/* Item Details */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-semibold rounded-full">
                {categoryLabel}
              </span>
              {item.spice_level && (
                <span className="text-xs text-gray-600">
                  {item.spice_level === 'mild' && '🌶️ Mild'}
                  {item.spice_level === 'medium' && '🌶️🌶️ Medium'}
                  {item.spice_level === 'hot' && '🌶️🌶️🌶️ Hot'}
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm">{item.description}</p>

            {/* Allergens in modal */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="flex items-start space-x-2 mt-3 text-xs text-orange-700 bg-orange-50 p-2 rounded">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>Contains: {item.allergens.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-medium text-text mb-3">
              Quantity
            </label>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={decrementQuantity}
                className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="w-16 text-center font-semibold text-2xl">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-primary transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
              placeholder="e.g., Extra spicy, no onions..."
            />
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price per item:</span>
              <span className="font-semibold">
                {formatCurrency(item.price)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
              <span className="font-semibold text-lg">Total:</span>
              <span className="font-heading text-2xl font-bold text-primary">
                {formatCurrency(item.price * quantity)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleCloseModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className="flex-1"
              disabled={isUpdating || !item.id || isActionDisabled}
              isLoading={isUpdating}
            >
              {isUpdating ? (
                'Adding...'
              ) : isActionDisabled ? (
                <>
                  <ShoppingCart size={20} className="mr-2" />
                  Ordering closed
                </>
              ) : (
                <>
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart - {formatCurrency(item.price * quantity)}
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MenuItemCard;
