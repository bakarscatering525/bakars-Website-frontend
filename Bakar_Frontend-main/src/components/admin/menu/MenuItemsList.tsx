import React, { useState } from 'react';
import { MenuItem } from '@models/menu.types';
import { formatCurrency } from '@utils/formatters';
import { getImageUrl, handleImageError } from '@utils/images';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import LoadingScreen from '@components/common/LoadingScreen';
import { Edit2, Trash2, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';

interface MenuItemsListProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (itemId: string) => void;
  isLoading: boolean;
}

export const MenuItemsList: React.FC<MenuItemsListProps> = ({
  items,
  onEdit,
  onDelete,
  isLoading,
}) => {
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({});
  const [imageErrorStates, setImageErrorStates] = useState<Record<string, boolean>>({});

  const handleImageLoad = (itemId: string) => {
    setImageLoadStates((prev) => ({ ...prev, [itemId]: true }));
    setImageErrorStates((prev) => ({ ...prev, [itemId]: false }));
  };

  const handleImageFailure = (
    itemId: string,
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    category?: string
  ) => {
    setImageErrorStates((prev) => ({ ...prev, [itemId]: true }));
    handleImageError(event, category);
  };

  if (isLoading) {
    return (
      <Card padding="lg">
        <LoadingScreen variant="section" message="Loading menu items..." />
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card padding="lg">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No menu items found</p>
          <p className="text-sm text-gray-400">
            Click "Add Menu Item" to create your first item
          </p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const imageUrl = getImageUrl(item.image_url, item.category) || undefined;
          const isImageLoaded = imageLoadStates[item._id] || false;
          const hasImageAvailable =
            Boolean(imageUrl) && !imageErrorStates[item._id];
          const showSkeleton =
            Boolean(imageUrl) && !isImageLoaded && hasImageAvailable;
        return (
          <Card key={item._id} padding="none" className="overflow-hidden">
            {/* Image */}
            <div className="relative h-48 bg-gray-100">
              {/* Loading state */}
              {showSkeleton && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex flex-col items-center justify-center">
                  <ImageIcon className="text-gray-400 mb-2" size={32} />
                  <span className="text-gray-400 text-sm">
                    Loading image...
                  </span>
                </div>
              )}

              {hasImageAvailable ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(item._id)}
                  onError={(event) => handleImageFailure(item._id, event, item.category)}
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 text-xs">
                  <ImageIcon className="mb-2" size={32} />
                  <span>Image unavailable</span>
                </div>
              )}

              {/* Debug info for missing images in development */}
              {import.meta.env.DEV && !item.image_url && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded shadow">
                  No image_url in data
                </div>
              )}

              {/* Availability Badge */}
              <div className="absolute top-3 right-3">
                {item.is_available ? (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                    <CheckCircle size={14} />
                    <span>Available</span>
                  </div>
                ) : (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                    <XCircle size={14} />
                    <span>Unavailable</span>
                  </div>
                )}
              </div>
 

              {/* Spice level */}
              {item.spice_level && (
                <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-full shadow-md text-xs font-semibold">
                  {item.spice_level === 'mild' && '??? Mild'}
                  {item.spice_level === 'medium' && '?????? Medium'}
                  {item.spice_level === 'hot' && '????????? Hot'}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Category */}
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-xs font-bold rounded-full mb-2">
                {item.category}
              </span>

              {/* Name */}
              <h3 className="font-heading text-xl font-bold text-text mb-2 line-clamp-1">
                {item.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                {item.description}
              </p>

              {/* Availability Info */}
              <div className="space-y-2 mb-4 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  {item.is_available_for_daily && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Daily
                    </span>
                  )}
                {item.is_available_for_meal_plan && (
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    Meal Plan
                  </span>
                )}
              </div>

              {item.allergens && item.allergens.length > 0 && (
                <p className="text-red-600">
                    ?? Allergens: {item.allergens.join(', ')}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading text-2xl font-bold text-primary">
                  {formatCurrency(item.price)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(item)}
                  className="flex-1"
                >
                  <Edit2 size={16} className="mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(item._id || item.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        );
        })}
      </div>

    </>
  );
};

export default MenuItemsList;


