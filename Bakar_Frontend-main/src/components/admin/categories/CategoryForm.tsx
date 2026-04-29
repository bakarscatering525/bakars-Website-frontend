import React, { useEffect, useState } from 'react';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { MenuCategory } from '@models/menu.types';

export interface CategoryFormValues {
  name: string;
  display_name: string;
  description: string;
  is_active: boolean;
  sort_order?: number;
  imageFile: File | null;
}

interface CategoryFormProps {
  mode: 'create' | 'edit';
  initialValues: CategoryFormValues;
  existingCategory?: MenuCategory | null;
  isSubmitting: boolean;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
  onCancel: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  mode,
  initialValues,
  existingCategory,
  isSubmitting,
  onSubmit,
  onCancel,
}) => {
  const [values, setValues] = useState<CategoryFormValues>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (field: keyof CategoryFormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      field === 'sort_order'
        ? event.target.value === ''
          ? undefined
          : Number(event.target.value)
        : event.target.value;
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      is_active: event.target.checked,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setValues((prev) => ({
      ...prev,
      imageFile: file,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          label="Internal Name"
          value={values.name}
          onChange={handleChange('name')}
          placeholder="e.g., daily_specials"
          required={mode === 'create'}
          disabled={mode === 'edit'}
        />
        <Input
          type="text"
          label="Display Name"
          value={values.display_name}
          onChange={handleChange('display_name')}
          placeholder="Visible label for customers"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Description
        </label>
        <textarea
          value={values.description}
          onChange={handleChange('description')}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="Optional description shown to customers"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          label="Sort Order"
          value={values.sort_order ?? ''}
          onChange={handleChange('sort_order')}
          placeholder="Optional ordering number"
          min={0}
        />

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-text">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-600"
          />
          {existingCategory?.image_url && !values.imageFile && (
            <div className="flex items-center space-x-3">
              <img
                src={existingCategory.image_url}
                alt={existingCategory.display_name}
                className="w-16 h-16 rounded-lg object-cover border"
              />
              <span className="text-xs text-gray-500">
                Current image – upload a new file to replace
              </span>
            </div>
          )}
          {values.imageFile && (
            <div className="text-xs text-gray-500">
              Selected file: {values.imageFile.name}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input
          id="category-active"
          type="checkbox"
          checked={values.is_active}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="category-active" className="text-sm text-gray-700">
          Category is active and visible to customers
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {mode === 'create' ? 'Create Category' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};
