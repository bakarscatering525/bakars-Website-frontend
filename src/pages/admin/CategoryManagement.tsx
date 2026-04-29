import React, { useEffect, useMemo, useState } from 'react';
import { MenuCategory } from '@models/menu.types';
import { useAdminStore } from '@store/adminStore';
import { useToast } from '@components/common/Toast';
import AdminSidebar from '@components/admin/AdminSidebar';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import Modal from '@components/common/Modal';
import LoadingScreen from '@components/common/LoadingScreen';
import {
  CategoryForm,
  CategoryFormValues,
} from '@components/admin/categories/CategoryForm';
import { Layers, FolderPlus, Pencil, Trash2, RefreshCcw } from 'lucide-react';

const createInitialFormValues = (
  categories: MenuCategory[]
): CategoryFormValues => ({
  name: '',
  display_name: '',
  description: '',
  is_active: true,
  sort_order: categories.length + 1,
  imageFile: null,
});

const mapCategoryToFormValues = (
  category: MenuCategory
): CategoryFormValues => ({
  name: category.name,
  display_name: category.display_name,
  description: category.description || '',
  is_active: category.is_active,
  sort_order: category.sort_order,
  imageFile: null,
});

const CategoryManagement: React.FC = () => {
  const {
    managedCategories,
    fetchManagedCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading,
    isUpdating,
  } = useAdminStore();
  const { showToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchManagedCategories().catch((error) => {
      console.error('Failed to load categories', error);
    });
  }, [fetchManagedCategories]);

  const sortedCategories = useMemo(
    () =>
      [...managedCategories].sort((a, b) => {
        const orderA = a.sort_order ?? 0;
        const orderB = b.sort_order ?? 0;
        if (orderA === orderB) {
          return a.display_name.localeCompare(b.display_name);
        }
        return orderA - orderB;
      }),
    [managedCategories]
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchManagedCategories();
      showToast('Categories refreshed', 'success');
    } catch (error) {
      console.error('Failed to refresh categories', error);
      showToast('Failed to refresh categories', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  const buildCategoryFormData = (
    values: CategoryFormValues,
    { includeName }: { includeName: boolean }
  ) => {
    const formData = new FormData();
    if (includeName) {
      formData.append('name', values.name);
    }
    formData.append('display_name', values.display_name);
    formData.append('description', values.description ?? '');
    formData.append('is_active', String(values.is_active));
    if (values.sort_order !== undefined && values.sort_order !== null) {
      formData.append('sort_order', String(values.sort_order));
    }
    if (values.imageFile) {
      formData.append('image', values.imageFile);
    }
    return formData;
  };

  const handleCreateCategory = async (values: CategoryFormValues) => {
    try {
      const formData = buildCategoryFormData(values, { includeName: true });
      await createCategory(formData);
      setShowAddModal(false);
      showToast('Category created successfully', 'success');
    } catch (error) {
      showToast('Failed to create category', 'error');
    }
  };

  const handleUpdateCategory = async (values: CategoryFormValues) => {
    if (!editingCategory) return;
    const categoryId =
      editingCategory._id || editingCategory.id || editingCategory.name;
    if (!categoryId) {
      showToast('Category identifier missing. Please refresh and try again.', 'error');
      return;
    }

    try {
      const formData = buildCategoryFormData(values, { includeName: false });
      await updateCategory(categoryId, formData);
      setEditingCategory(null);
      showToast('Category updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update category', 'error');
    }
  };

  const handleDeleteCategory = async (category: MenuCategory) => {
    const confirmed = window.confirm(
      `Delete category "${category.display_name}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(category._id);
      showToast('Category deleted', 'success');
    } catch (error) {
      showToast('Failed to delete category', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <AdminSidebar />
      <div className="py-8 pr-4 sm:pr-6 lg:pr-8 pl-4 sm:pl-24 md:pl-32 lg:pl-[17rem] xl:pl-[18.5rem] transition-[padding-left] duration-300">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#2E2E2E] mb-2 flex items-center space-x-3">
                <Layers className="text-primary" size={32} />
                <span>Category Management</span>
              </h1>
              <p className="text-gray-600 max-w-2xl">
                Create and maintain the categories that customers see on the
                menu. Categories can be re-used across daily, weekly, and
                catering experiences.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center justify-center w-full sm:w-auto"
              >
                <RefreshCcw
                  size={18}
                  className={refreshing ? 'animate-spin mr-2' : 'mr-2'}
                />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button
                variant="primary"
                className="flex items-center justify-center w-full sm:w-auto"
                onClick={() => setShowAddModal(true)}
              >
                <FolderPlus size={18} className="mr-2" />
                Add Category
              </Button>
            </div>
          </header>

          <Card>
            {isLoading && managedCategories.length === 0 ? (
              <div className="py-16">
                <LoadingScreen
                  variant="section"
                  message="Loading categories..."
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Internal Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Sort Order
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Updated
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedCategories.length === 0 ? (
                      <tr>
                        <td
                          className="px-4 py-6 text-center text-sm text-gray-500"
                          colSpan={6}
                        >
                          No categories found. Create your first category to
                          organise menu items.
                        </td>
                      </tr>
                    ) : (
                      sortedCategories.map((category) => (
                        <tr
                          key={category._id || category.id || category.name}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              {category.image_url ? (
                                <img
                                  src={category.image_url}
                                  alt={category.display_name}
                                  className="w-12 h-12 rounded-lg object-cover border"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">
                                  {category.display_name
                                    .charAt(0)
                                    .toUpperCase()}
                                </div>
                              )}
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {category.display_name}
                                </p>
                                {category.description && (
                                  <p className="text-sm text-gray-500 max-w-xs truncate">
                                    {category.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                            {category.name}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            {category.sort_order ?? '—'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                category.is_active
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {category.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            {category.updated_at
                              ? new Date(
                                  category.updated_at
                                ).toLocaleDateString()
                              : '—'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center text-sm"
                                onClick={() => setEditingCategory(category)}
                              >
                                <Pencil size={16} className="mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center text-sm text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteCategory(category)}
                              >
                                <Trash2 size={16} className="mr-1" />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Category"
        size="md"
      >
        <CategoryForm
          mode="create"
          initialValues={createInitialFormValues(managedCategories)}
          isSubmitting={isUpdating}
          onSubmit={handleCreateCategory}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Edit Category"
        size="md"
      >
        {editingCategory && (
          <CategoryForm
            mode="edit"
            initialValues={mapCategoryToFormValues(editingCategory)}
            existingCategory={editingCategory}
            isSubmitting={isUpdating}
            onSubmit={handleUpdateCategory}
            onCancel={() => setEditingCategory(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default CategoryManagement;
