import React, { useState, useEffect } from 'react';
import { useAdminStore } from '@store/adminStore';
import { useToast } from '@components/common/Toast';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Upload, X } from 'lucide-react';

interface MenuItemVariation {
  size: 'small' | 'medium' | 'large';
  price: number;
  is_available: boolean;
}

interface AddMenuItemProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type AvailabilityScope = 'daily' | 'meal_plan' | 'both';

export const AddMenuItem: React.FC<AddMenuItemProps> = ({
  onSuccess,
  onCancel,
}) => {
  const {
    createMenuItem,
    managedCategories,
    fetchManagedCategories,
    isUpdating,
  } = useAdminStore();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    allergens: '',
    spice_level: '',
    is_vegetarian: false,
    is_halal: true,
  });

  const [variations, setVariations] = useState<MenuItemVariation[]>([
    { size: 'small', price: 0, is_available: true },
    { size: 'medium', price: 0, is_available: true },
    { size: 'large', price: 0, is_available: true },
  ]);

  const [availabilityScope, setAvailabilityScope] =
    useState<AvailabilityScope>('daily');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const availabilityOptions: {
    value: AvailabilityScope;
    label: string;
    description: string;
  }[] = [
    {
      value: 'daily',
      label: 'Daily Menu',
      description: 'Same-day ordering and delivery menu',
    },
    {
      value: 'meal_plan',
      label: 'Meal Plan Menu',
      description: 'Scheduled meal plan rotations',
    },
    {
      value: 'both',
      label: 'Both Menus',
      description: 'Show in both daily and meal plan experiences',
    },
  ];

  useEffect(() => {
    if (managedCategories.length === 0) {
      fetchManagedCategories();
    }
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        showToast('Image size should be less than 5MB', 'error');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.category || !formData.price) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Validate variations - at least one variation should be available
    const availableVariations = variations.filter(v => v.is_available);
    if (availableVariations.length === 0) {
      showToast('At least one variation must be available', 'error');
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      if (formData.description)
        formDataToSend.append('description', formData.description);
      const isDailyMenu = availabilityScope === 'daily' || availabilityScope === 'both';
      const isMealPlanMenu =
        availabilityScope === 'meal_plan' || availabilityScope === 'both';

      formDataToSend.append('is_available_for_daily', String(isDailyMenu));
      formDataToSend.append(
        'is_available_for_meal_plan',
        String(isMealPlanMenu)
      );
      formDataToSend.append('availability_scope', availabilityScope);

      // Append variations
      formDataToSend.append('variations', JSON.stringify(availableVariations));

      if (formData.allergens) {
        formDataToSend.append('allergens', formData.allergens);
      }
      if (formData.spice_level) {
        formDataToSend.append('spice_level', formData.spice_level);
      }

      formDataToSend.append('is_vegetarian', String(formData.is_vegetarian));
      formDataToSend.append('is_halal', String(formData.is_halal));

      // Append image if selected
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      await createMenuItem(formDataToSend);
      showToast('Menu item created successfully', 'success');
      onSuccess();
    } catch (error: any) {
      showToast(error.message || 'Failed to create menu item', 'error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[70vh] overflow-y-auto pr-2"
    >
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
              onClick={() => {
                setImageFile(null);
                setImagePreview('');
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
            <Upload size={32} className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Click to upload image</span>
            <span className="text-xs text-gray-400 mt-1">Max 5MB</span>
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
        placeholder="e.g., Butter Chicken"
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
          <option value="rice">Rice Dishes</option>
          <option value="curry">Curry</option>
          <option value="bbq">BBQ</option>
          <option value="sweets">Sweets</option>
          <option value="drinks">Drinks</option>
          {managedCategories
            .filter(
              (cat) =>
                !['rice', 'curry', 'bbq', 'sweets', 'drinks'].includes(cat.name)
            )
            .map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.display_name || cat.name}
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
        min="0"
      />

      {/* Variations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-text">
            Size Variations (Optional)
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
          placeholder="Describe your dish..."
        />
      </div>

      {/* Availability Selection */}
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
          Create Menu Item
        </Button>
      </div>
    </form>
  );
};

export default AddMenuItem;
