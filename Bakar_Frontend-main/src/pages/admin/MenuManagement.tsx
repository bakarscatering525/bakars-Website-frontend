import React, { useCallback, useEffect, useState } from 'react';
import { useAdminStore } from '@store/adminStore';
import { useToast } from '@components/common/Toast';
import { MenuItemsList } from '@components/admin/menu/MenuItemsList';
import { AddMenuItem } from '@components/admin/menu/AddMenuItem';
import { EditMenuItem } from '@components/admin/menu/EditMenuItem';
import LoadingScreen from '@components/common/LoadingScreen';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Modal from '@components/common/Modal';
import Pagination from '@components/common/Pagination';
import { useDebounce } from '@hooks/useDebounce';
import {
  Plus,
  Search,
  Filter,
  RefreshCcw,
  Eye,
  EyeOff,
  Info,
} from 'lucide-react';
import { MenuItem } from '@models/menu.types';
import AdminSidebar from '@components/admin/AdminSidebar';

const MENU_ITEMS_PER_PAGE = 9;

const MenuManagement: React.FC = () => {
  const { showToast } = useToast();
  const {
    managedMenuItems,
    managedCategories,
    menuItemPagination,
    menuItemStats,
    fetchManagedMenuItems,
    fetchManagedCategories,
    deleteMenuItem,
    isLoading,
    error,
    clearError,
  } = useAdminStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showUnavailable, setShowUnavailable] = useState(true); // âœ… DEFAULT: Show ALL items including unavailable
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 400);

  useEffect(() => {
    if (!error) return;
    const normalizedMessage =
      error === 'Invalid input data'
        ? 'Failed to load menu data from the server. Please refresh to try again.'
        : error;
    showToast(normalizedMessage, 'error');
    clearError();
  }, [error, clearError, showToast]);

  const handleMenuError = useCallback(
    (err: unknown) => {
      console.error('❌ Failed to load menu data:', err);
      showToast('Failed to load menu data', 'error');
    },
    [showToast]
  );

  const loadMenuItems = useCallback(
    (pageValue: number) => {
      const safePage = Math.max(1, pageValue);
      return fetchManagedMenuItems({
        page: safePage,
        pageSize: MENU_ITEMS_PER_PAGE,
        category: selectedCategory || undefined,
        includeUnavailable: showUnavailable,
        search: debouncedSearch || undefined,
      });
    },
    [debouncedSearch, fetchManagedMenuItems, selectedCategory, showUnavailable]
  );

  const loadData = useCallback(
    async (pageOverride?: number, reloadCategories: boolean = false) => {
      const targetPage = Math.max(1, pageOverride ?? currentPage);
      try {
        console.log('🔄 Loading menu management data...');
        const tasks: Promise<unknown>[] = [loadMenuItems(targetPage)];
        if (reloadCategories) {
          tasks.push(fetchManagedCategories());
        }
        await Promise.all(tasks);
        console.log('✅ Menu management data loaded');
      } catch (err) {
        handleMenuError(err);
        throw err;
      }
    },
    [currentPage, fetchManagedCategories, handleMenuError, loadMenuItems]
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadData(currentPage, true);
      showToast('Menu items refreshed', 'success');
    } catch {
      // Error already handled in loadData
    } finally {
      setRefreshing(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const initCategories = async () => {
      try {
        await fetchManagedCategories();
      } catch (err) {
        handleMenuError(err);
      }
    };

    initCategories();
  }, [fetchManagedCategories, handleMenuError]);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        await loadMenuItems(currentPage);
      } catch (err) {
        handleMenuError(err);
      }
    };

    fetchPage();
  }, [currentPage, handleMenuError, loadMenuItems]);

  useEffect(() => {
    if (!menuItemPagination?.total_pages) return;
    if (currentPage > menuItemPagination.total_pages) {
      setCurrentPage(menuItemPagination.total_pages);
    }
  }, [currentPage, menuItemPagination]);

  const handleDelete = async (itemId: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this menu item? This action cannot be undone.'
      )
    ) {
      return;
    }

    try {
      await deleteMenuItem(itemId);
      showToast('Menu item deleted successfully', 'success');
      try {
        await loadData(currentPage);
      } catch {
        // handled in loadData
      }
    } catch (error) {
      showToast('Failed to delete menu item', 'error');
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
  };

  const handleCloseEdit = async () => {
    setEditingItem(null);
    try {
      await loadData(currentPage);
    } catch {
      // handled in loadData
    }
  };

  const handleCloseAdd = async () => {
    setShowAddModal(false);
    setCurrentPage(1);
    try {
      await loadData(1, true);
    } catch {
      // handled in loadData
    }
  };

  const totalItems =
    menuItemStats?.total ??
    menuItemPagination?.total ??
    managedMenuItems.length;
  const availableItems =
    menuItemStats?.available ??
    managedMenuItems.filter((item) => item.is_available).length;
  const unavailableItems =
    menuItemStats?.unavailable ?? Math.max(totalItems - availableItems, 0);
  const filteredCount = menuItemPagination?.total ?? managedMenuItems.length;
  const overallCount = menuItemStats?.total ?? filteredCount;

  console.log('📊 Menu Management Stats:', {
    total: totalItems,
    available: availableItems,
    unavailable: unavailableItems,
    filtersTotal: menuItemPagination?.total ?? managedMenuItems.length,
    showingUnavailable: showUnavailable,
  });

  if (isLoading && managedMenuItems.length === 0) {
    return <LoadingScreen message="Loading menu items..." />;
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <AdminSidebar />
      <div className="py-8 pr-4 sm:pr-6 lg:pr-8 pl-4 sm:pl-24 md:pl-32 lg:pl-[17rem] xl:pl-[18.5rem] transition-[padding-left] duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="w-full sm:w-auto">
              <h1 className="font-heading text-4xl font-bold text-text mb-2">
                Menu Management
              </h1>
              <p className="text-gray-600">Manage your restaurant menu items</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:justify-end">
              <Button
                variant="outline"
                size="md"
                onClick={handleRefresh}
                disabled={refreshing}
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <RefreshCcw
                  size={18}
                  className={`mr-2 ${refreshing ? 'animate-spin' : ''}`}
                />
                Refresh
              </Button>

              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowAddModal(true)}
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <Plus size={20} className="mr-2" />
                Add Menu Item
              </Button>
            </div>
          </div>

          {/* âœ… Stats Cards - Shows counts of ALL items */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card padding="lg">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">
                  {totalItems}
                </h3>
                <p className="text-sm text-gray-600">Total Items</p>
              </div>
            </Card>

            <Card padding="lg">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-600 mb-2">
                  {availableItems}
                </h3>
                <p className="text-sm text-gray-600">Available</p>
              </div>
            </Card>

            <Card padding="lg">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-orange-600 mb-2">
                  {unavailableItems}
                </h3>
                <p className="text-sm text-gray-600">Unavailable</p>
              </div>
            </Card>

            <Card padding="lg">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-purple-600 mb-2">
                  {managedCategories.length}
                </h3>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card padding="lg" className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="w-full md:w-64">
                <div className="relative">
                  <Filter
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                  >
                    <option value="">All Categories</option>
                    {managedCategories.map((cat) => (
                      <option key={cat._id || cat.name} value={cat.name}>
                        {cat.display_name || cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* âœ… FIXED: Availability Toggle - Default shows all */}
              <div className="w-full md:w-auto">
                <button
                  onClick={() => {
                    setShowUnavailable((prev) => !prev);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center justify-center space-x-2 px-4 py-3 border-2 rounded-lg transition-all w-full ${
                    showUnavailable
                      ? 'border-primary bg-primary text-white'
                      : 'border-orange-500 bg-orange-500 text-white'
                  }`}
                >
                  {showUnavailable ? (
                    <>
                      <Eye size={20} />
                      <span>Showing All</span>
                    </>
                  ) : (
                    <>
                      <EyeOff size={20} />
                      <span>Available Only</span>
                    </>
                  )}
                </button>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory || !showUnavailable) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setShowUnavailable(true);
                    setCurrentPage(1);
                  }}
                  className="w-full md:w-auto"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Active Filters Display */}
            {(searchQuery || selectedCategory || !showUnavailable) && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchQuery && (
                  <span className="inline-block px-3 py-1 bg-primary-50 text-primary rounded-full text-sm">
                    Search: {searchQuery}
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-block px-3 py-1 bg-primary-50 text-primary rounded-full text-sm">
                    Category: {selectedCategory}
                  </span>
                )}
                {!showUnavailable && (
                  <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm">
                    Available Only
                  </span>
                )}
                <span className="text-sm text-gray-600 ml-2">
                  ({filteredCount} of {overallCount} items)
                </span>
              </div>
            )}

            {/* âœ… IMPROVED: Info Message for Admin */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800 flex items-start space-x-2">
                <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Admin View:</strong> You can see and manage ALL menu
                  items regardless of their availability status. Items marked as{' '}
                  <span className="font-semibold">unavailable</span> will not be
                  shown to customers but remain visible here for management. Use
                  the toggle above to filter your view.
                </span>
              </p>
            </div>
          </Card>

          {/* Menu Items List */}
          <MenuItemsList
            items={managedMenuItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />

          {menuItemPagination && menuItemPagination.total > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalItems={menuItemPagination.total}
                pageSize={menuItemPagination.page_size}
                onPageChange={handlePageChange}
                showSummary
              />
            </div>
          )}

          {/* Add Modal */}
          <Modal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            title="Add New Menu Item"
            size="lg"
          >
            <AddMenuItem
              onSuccess={handleCloseAdd}
              onCancel={() => setShowAddModal(false)}
            />
          </Modal>

          {/* Edit Modal */}
          <Modal
            isOpen={!!editingItem}
            onClose={() => setEditingItem(null)}
            title="Edit Menu Item"
            size="lg"
          >
            {editingItem && (
              <EditMenuItem
                item={editingItem}
                onSuccess={handleCloseEdit}
                onCancel={() => setEditingItem(null)}
              />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;

