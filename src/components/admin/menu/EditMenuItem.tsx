import React, { useState, useEffect } from 'react';
import { useAdminStore } from '@store/adminStore';
import { useToast } from '@components/common/Toast';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Upload, X, Save } from 'lucide-react';
import { MenuItem } from '@models/menu.types';

interface EditMenuItemProps {
  item: MenuItem;
  onSuccess: () => void;
  onCancel: () => void;
}

type AvailabilityScope = 'daily' | 'meal_plan' | 'both';

interface MenuItemVariation {
  size: 'small' | 'medium' | 'large';
  price: number;
  is_available: boolean;
}

export const EditMenuItem: React.FC<EditMenuItemProps> = ({
  item,
  onSuccess,
  onCancel,
}) => {
  const {
    updateMenuItem,
    managedCategories,
    fetchManagedCategories,
    isUpdating,
  } = useAdminStore();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: item.name,
    category: item.category,
    price: String(item.price),
    description: item.description || '',
    is_available: item.is_available,
    allergens: item.allergens?.join(', ') || '',
    spice_level: item.spice_level || '',
    is_vegetarian: item.is_vegetarian || false,
    is_halal: item.is_halal !== false,
  });

  const [variations, setVariations] = useState<MenuItemVariation[]>(() => {
    // Initialize with existing variations or defaults
    const existingVariations = item.variations || [];
    const defaultVariations: MenuItemVariation[] = [
      { size: 'small', price: 0, is_available: true },
      { size: 'medium', price: 0, is_available: true },
      { size: 'large', price: 0, is_available: true },
    ];

    // Merge existing variations with defaults
    return defaultVariations.map(defaultVar => {
      const existing = existingVariations.find(v => v.size === defaultVar.size);
      return existing ? { ...existing } : { ...defaultVar };
    });
  });
  const resolveInitialScope = (): AvailabilityScope => {
    if (item.is_available_for_daily && item.is_available_for_meal_plan) {
      return 'both';
    }
    if (item.is_available_for_meal_plan) {
      return 'meal_plan';
    }
    return 'daily';
  };
  const [availabilityScope, setAvailabilityScope] = useState<AvailabilityScope>(
    resolveInitialScope()
  );
  const availabilityOptions: {
    value: AvailabilityScope;
    label: string;
    description: string;
  }[] = [
    {
      value: 'daily',
      label: 'Daily Menu',
      description: 'Same-day menu items',
    },
    {
      value: 'meal_plan',
      label: 'Meal Plan Menu',
      description: 'Weekly rotation menu items',
    },
    {
      value: 'both',
      label: 'Both Menus',
      description: 'Visible in both daily and meal plan menus',
    },
  ];

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    item.image_url || ''
  );
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    fetchManagedCategories();
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'error');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setRemoveImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setRemoveImage(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append only changed fields
      if (formData.name !== item.name)
        formDataToSend.append('name', formData.name);
      if (formData.category !== item.category)
        formDataToSend.append('category', formData.category);
      if (Number(formData.price) !== item.price)
        formDataToSend.append('price', formData.price);
      if (formData.description !== item.description)
        formDataToSend.append('description', formData.description);
      if (formData.is_available !== item.is_available)
        formDataToSend.append('is_available', String(formData.is_available));

      const normalizedIncomingAllergens = formData.allergens
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean);
      const existingAllergens = (item.allergens || []).map((a) => a.trim());
      if (
        JSON.stringify(normalizedIncomingAllergens) !==
        JSON.stringify(existingAllergens)
      ) {
        formDataToSend.append('allergens', normalizedIncomingAllergens.join(', '));
      }

      if (formData.spice_level !== (item.spice_level || ''))
        formDataToSend.append('spice_level', formData.spice_level);
      if (formData.is_vegetarian !== item.is_vegetarian)
        formDataToSend.append('is_vegetarian', String(formData.is_vegetarian));
      if (formData.is_halal !== item.is_halal)
        formDataToSend.append('is_halal', String(formData.is_halal));

      if (availabilityScope !== resolveInitialScope()) {
        const scopedDaily =
          availabilityScope === 'daily' || availabilityScope === 'both';
        const scopedMealPlan =
          availabilityScope === 'meal_plan' || availabilityScope === 'both';
        formDataToSend.append('availability_scope', availabilityScope);
        formDataToSend.append('is_available_for_daily', String(scopedDaily));
        formDataToSend.append(
          'is_available_for_meal_plan',
          String(scopedMealPlan)
        );
      }

      // Check if variations have changed
      const availableVariations = variations.filter(v => v.is_available);
      const existingVariations = item.variations || [];
      const variationsChanged = JSON.stringify(availableVariations) !== JSON.stringify(existingVariations);
      if (variationsChanged) {
        formDataToSend.append('variations', JSON.stringify(availableVariations));
      }

      // Append image if changed
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      } else if (removeImage) {
        formDataToSend.append('remove_image', 'true');
      }

      const menuItemId = item._id || item.id;
      if (!menuItemId) {
        showToast('Unable to determine menu item ID.', 'error');
        return;
      }

      await updateMenuItem(menuItemId, formDataToSend);
      showToast('Menu item updated successfully', 'success');
      onSuccess();
    } catch (error) {
      showToast('Failed to update menu item', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Item Image
        </label>

        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
            <Upload size={32} className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">
              Click to upload new image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
          </label>
        )}
      </div>

      {/* Name */}
      <Input
        type="text"
        label="Item Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Butter Chicken"
        required
      />

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        >
          <option value="">Select category</option>
          {managedCategories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.display_name}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <Input
        type="number"
        step="0.01"
        label="Base Price (AUD)"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        placeholder="15.99"
        required
      />

      {/* Variations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-text">
            Size Variations
          </label>
          <span className="text-xs text-gray-500">
            Configure different sizes with custom pricing
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {variations.map((variation, index) => (
            <div key={variation.size} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-text capitalize">
                  {variation.size}
                </h4>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={variation.is_available}
                    onChange={(e) => {
                      const newVariations = [...variations];
                      newVariations[index].is_available = e.target.checked;
                      setVariations(newVariations);
                    }}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-xs text-gray-600">Available</span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-xs text-gray-600">Price (AUD)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={variation.price || ''}
                  onChange={(e) => {
                    const newVariations = [...variations];
                    newVariations[index].price = parseFloat(e.target.value) || 0;
                    setVariations(newVariations);
                  }}
                  disabled={!variation.is_available}
                  className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${
                    !variation.is_available ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="0.00"
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500">
          Leave variation prices at 0.00 to use the base price. Only available variations will be shown to customers.
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={4}
          placeholder="Creamy butter chicken with aromatic spices..."
        />
      </div>

      {/* Availability Status */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_available}
            onChange={(e) =>
              setFormData({ ...formData, is_available: e.target.checked })
            }
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700 font-medium">
            Item is Available
          </span>
        </label>
      </div>

      {/* Availability For Order Types */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-text">Available For:</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {availabilityOptions.map((option) => {
            const isActive = availabilityScope === option.value;
            return (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start space-x-3 rounded-xl border p-4 transition ${
                  isActive
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-gray-200 hover:border-primary/40'
                }`}
              >
                <input
                  type="radio"
                  name="availability_scope"
                  value={option.value}
                  checked={isActive}
                  onChange={() => setAvailabilityScope(option.value)}
                  className="mt-1 text-primary focus:ring-primary"
                />
                <div>
                  <p className="text-sm font-semibold text-text">
                    {option.label}
                  </p>
                  <p className="text-xs text-gray-500">{option.description}</p>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Allergens */}
      <Input
        type="text"
        label="Allergens (comma separated)"
        value={formData.allergens}
        onChange={(e) =>
          setFormData({ ...formData, allergens: e.target.value })
        }
        placeholder="dairy, nuts, gluten"
      />

      {/* Spice Level */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Spice Level
        </label>
        <select
          value={formData.spice_level}
          onChange={(e) =>
            setFormData({ ...formData, spice_level: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">None</option>
          <option value="mild">Mild</option>
          <option value="medium">Medium</option>
          <option value="hot">Hot</option>
        </select>
      </div>

      {/* Dietary Options */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_vegetarian}
            onChange={(e) =>
              setFormData({ ...formData, is_vegetarian: e.target.checked })
            }
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Vegetarian</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_halal}
            onChange={(e) =>
              setFormData({ ...formData, is_halal: e.target.checked })
            }
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Halal</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          isLoading={isUpdating}
          disabled={isUpdating}
        >
          <Save size={20} className="mr-2" />
          {isUpdating ? 'Updating...' : 'Update Menu Item'}
        </Button>
      </div>
    </form>
  );
};

export default EditMenuItem;
