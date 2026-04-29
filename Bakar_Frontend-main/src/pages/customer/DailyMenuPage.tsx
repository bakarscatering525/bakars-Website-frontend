import React, { useEffect, useState } from 'react';
import { useMenuStore } from '@store/menuStore';
import MenuItemCard from '@components/menu/MenuItemCard';
import FilterBar from '@components/menu/FilterBar';
import LoadingScreen from '@components/common/LoadingScreen';
import Card from '@components/common/Card';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import {
  RefreshCcw,
  AlertCircle,
  Search,
  Package,
  Truck,
  Store as StoreIcon,
  MapPin,
  Clock3,
} from 'lucide-react';
import Pagination from '@components/common/Pagination';
import { useAuthStore } from '@store/authStore';
import { useAddressStore } from '@store/addressStore';
import { useAuthModalStore } from '@store/authModalStore';
import { useCartStore } from '@store/cartStore';
import type { Address } from '@models/address.types';

const formatAddressLine = (address: Address) =>
  [address.street, address.suburb, `${address.state} ${address.postcode}`.trim()]
    .filter(Boolean)
    .join(', ');

const DailyMenuPage: React.FC = () => {
  const {
    dailyMenuItems,
    categories,
    activeFilters,
    searchQuery,
    dailyMenuPagination,
    dailyMenuAvailability,
    isLoading,
    error,
    fetchDailyMenu,
    fetchDailyMenuAvailability,
    fetchCategories,
    setFilters,
    clearFilters,
    setSearchQuery,
  } = useMenuStore();
  const { isAuthenticated } = useAuthStore();
  const { openModal } = useAuthModalStore();
  const setDeliveryOption = useCartStore((state) => state.setDeliveryOption);
  const {
    addresses,
    defaultAddress,
    fetchAddresses,
    isLoading: isAddressLoading,
    error: addressError,
    validateDeliveryArea,
  } = useAddressStore();

  const [isFulfilmentModalOpen, setIsFulfilmentModalOpen] = useState(true);
  const [selectedFulfilment, setSelectedFulfilment] = useState<
    'delivery' | 'pickup' | null
  >(null);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [didPrefetchAddresses, setDidPrefetchAddresses] = useState(false);
  const [isConfirmingDelivery, setIsConfirmingDelivery] = useState(false);
  const [deliveryValidationError, setDeliveryValidationError] = useState<string | null>(null);
  const [hasConfirmedDelivery, setHasConfirmedDelivery] = useState(false);

  const filtersSignature = JSON.stringify({
    category: activeFilters.category ?? '',
    order_type: activeFilters.order_type ?? '',
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchDailyMenuAvailability();
    const interval = setInterval(fetchDailyMenuAvailability, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchDailyMenuAvailability]);

  useEffect(() => {
    fetchDailyMenu({ page: 1 });
  }, [fetchDailyMenu, filtersSignature]);

  useEffect(() => {
    if (
      selectedFulfilment === 'delivery' &&
      isAuthenticated &&
      !didPrefetchAddresses &&
      addresses.length === 0
    ) {
      setDidPrefetchAddresses(true);
      fetchAddresses().catch(() => setDidPrefetchAddresses(false));
    }
  }, [
    fetchAddresses,
    addresses.length,
    didPrefetchAddresses,
    isAuthenticated,
    selectedFulfilment,
  ]);

  useEffect(() => {
    if (
      selectedFulfilment === 'delivery' &&
      !selectedAddressId &&
      (defaultAddress || addresses.length > 0)
    ) {
      const preferredAddress = defaultAddress || addresses[0];
      if (preferredAddress?._id) {
        setSelectedAddressId(preferredAddress._id);
      }
    }
  }, [addresses, defaultAddress, selectedAddressId, selectedFulfilment]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    fetchDailyMenu({ page: 1, search: value });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchDailyMenu({ page: 1, search: '' });
  };

  const handleRetry = () => {
    fetchDailyMenu({ page: dailyMenuPagination.page });
  };

  const handlePageChange = (page: number) => {
    if (page === dailyMenuPagination.page) return;
    fetchDailyMenu({ page });
  };

  const handleClearFiltersClick = () => {
    const hadFilters = !!activeFilters.category || !!activeFilters.order_type;
    const hadSearch = Boolean(searchQuery);
    clearFilters();
    if (!hadFilters && hadSearch) {
      fetchDailyMenu({ page: 1, search: '' });
    }
  };

  const hasResults = dailyMenuItems.length > 0;
  const isDailyMenuOpen = dailyMenuAvailability?.is_open !== false;
  const availabilityMessage =
    dailyMenuAvailability?.message ||
    'Daily Menu orders are available from 11:00 AM to 9:00 PM (AEST).';
  const windowLabel = dailyMenuAvailability?.window_label || '11:00 AM to 9:00 PM (AEST)';
  const timezoneLabel = dailyMenuAvailability?.timezone;
  const formatTime = (value?: string) => {
    if (!value) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleTimeString('en-AU', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const fulfilmentLabel = selectedFulfilment
    ? selectedFulfilment === 'delivery'
      ? 'Delivery'
      : 'Pickup'
    : 'Choose delivery or pickup';

  const handleFulfilmentSelect = (method: 'delivery' | 'pickup') => {
    setSelectedFulfilment(method);
    setDeliveryOption(method);
    setDeliveryValidationError(null);
    setHasConfirmedDelivery(false);

    if (method === 'pickup') {
      setSelectedAddressId('');
      setIsFulfilmentModalOpen(false);
    }
  };

  const handleConfirmDelivery = async () => {
    if (!selectedAddressId) {
      setDeliveryValidationError('Please select an address to continue.');
      return;
    }

    setDeliveryValidationError(null);
    setIsConfirmingDelivery(true);

    try {
      const validation = await validateDeliveryArea(selectedAddressId, 'daily');
      if (validation?.is_valid) {
        setHasConfirmedDelivery(true);
        setIsFulfilmentModalOpen(false);
      } else {
        setDeliveryValidationError(
          validation?.message ||
            'You are not in the area we operate for daily Meal.'
        );
      }
    } catch (error: any) {
      setDeliveryValidationError(
        error?.message ||
          'We could not validate your address. Please try again.'
      );
    } finally {
      setIsConfirmingDelivery(false);
    }
  };

  const handleModalClose = () => {
    if (selectedFulfilment === 'pickup' || hasConfirmedDelivery) {
      setIsFulfilmentModalOpen(false);
    }
  };

  if (isLoading && dailyMenuItems.length === 0) {
    return <LoadingScreen message="Loading daily menu..." />;
  }

  if (error && dailyMenuItems.length === 0) {
    return (
      <div className="container-custom py-12">
        <Card padding="lg" className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-text mb-4">
            Failed to Load Menu
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors inline-flex items-center space-x-2"
          >
            <RefreshCcw size={20} />
            <span>Retry Loading</span>
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container-custom">
        <div className="space-y-6">
          <div className="max-w-3xl mx-auto w-full space-y-4">
            <Card padding="md" className="border border-primary/20 bg-primary/5 shadow-sm">
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-full p-2 ${
                    isDailyMenuOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  <Clock3 className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {isDailyMenuOpen
                      ? 'Daily Menu is open for orders'
                      : 'Daily Menu ordering is closed right now'}
                  </p>
                  <p className="text-sm text-gray-700">
                    {availabilityMessage}
                  </p>
                  {!isDailyMenuOpen && dailyMenuAvailability?.opens_at && (
                    <p className="text-xs text-gray-500">
                      Next opening: {formatTime(dailyMenuAvailability.opens_at)}
                      {timezoneLabel ? ` (${timezoneLabel})` : ''}
                    </p>
                  )}
                  {isDailyMenuOpen && dailyMenuAvailability?.closes_at && (
                    <p className="text-xs text-gray-500">
                      Ordering hours: {windowLabel}
                      {timezoneLabel ? ` (${timezoneLabel})` : ''}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  {selectedFulfilment === 'delivery' ? (
                    <Truck className="h-5 w-5" />
                  ) : selectedFulfilment === 'pickup' ? (
                    <StoreIcon className="h-5 w-5" />
                  ) : (
                    <MapPin className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Fulfilment preference
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {fulfilmentLabel}
                  </p>
                  {!selectedFulfilment && (
                    <p className="text-sm text-gray-500">
                      Select an option to continue browsing.
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFulfilmentModalOpen(true)}
              >
                {selectedFulfilment ? 'Change preference' : 'Select preference'}
              </Button>
            </div>

            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-3 shadow-sm transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search menu items..."
                className="flex-1 bg-transparent text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                aria-label="Search menu items"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

        <FilterBar
          categories={categories}
          activeFilters={activeFilters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFiltersClick}
        />

          {hasResults ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {dailyMenuItems.map((item) => (
                <MenuItemCard
                  key={item._id || item.id}
                  item={item}
                  showQuickAdd={true}
                />
              ))}
            </div>
          ) : (
            <Card padding="lg">
              <div className="text-center py-12">
                <Package className="mx-auto h-20 w-20 text-gray-300 mb-4" />
                <h3 className="font-semibold text-gray-500 mb-2 text-xl">
                  {dailyMenuPagination.total === 0
                    ? 'No menu items available'
                    : 'No items match your filters'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {dailyMenuPagination.total === 0
                    ? 'Please check back later or contact us.'
                    : 'Try adjusting your filters to see more items.'}
                </p>
                {activeFilters.category ? (
                  <button
                    onClick={handleClearFiltersClick}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                ) : (
                  <button
                    onClick={handleRetry}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors inline-flex items-center space-x-2"
                  >
                    <RefreshCcw size={18} />
                    <span>Refresh Menu</span>
                  </button>
                )}
              </div>
            </Card>
          )}

          {dailyMenuPagination.total > 0 && (
            <Pagination
              currentPage={dailyMenuPagination.page}
              totalItems={dailyMenuPagination.total}
              pageSize={dailyMenuPagination.pageSize}
              onPageChange={handlePageChange}
              showSummary
              className="pt-4"
            />
          )}
        </div>
      </div>

      <Modal
        isOpen={isFulfilmentModalOpen}
        onClose={handleModalClose}
        title="How would you like your meals?"
        showCloseButton={selectedFulfilment === 'pickup' || hasConfirmedDelivery}
      >
        <div className="space-y-6">
          <p className="text-gray-600">
            Choose delivery if you’d like us to bring the daily meals to your
            door, or pickup if you’ll collect them yourself.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                value: 'delivery' as const,
                title: 'Delivery',
                description: 'We’ll deliver to one of your saved addresses.',
                Icon: Truck,
              },
              {
                value: 'pickup' as const,
                title: 'Pickup',
                description: 'Collect from our kitchen at your convenience.',
                Icon: StoreIcon,
              },
            ].map((option) => {
              const isActive = selectedFulfilment === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleFulfilmentSelect(option.value)}
                  className={`flex flex-col gap-3 rounded-2xl border-2 p-4 text-left transition focus:outline-none ${
                    isActive
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 hover:border-primary/40'
                  }`}
                >
                  <option.Icon
                    className={`h-6 w-6 ${
                      isActive ? 'text-primary' : 'text-gray-400'
                    }`}
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {option.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedFulfilment === 'delivery' && (
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Select a saved address
              </h3>

              {!isAuthenticated ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-gray-600">
                  <p className="font-medium">
                    Please sign in to choose from your saved addresses.
                  </p>
                  <Button
                    className="mt-3"
                    onClick={() => openModal('login')}
                  >
                    Sign in to continue
                  </Button>
                </div>
              ) : (
                <>
                  {isAddressLoading && addresses.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-500">
                      Loading your saved addresses...
                    </div>
                  ) : addresses.length > 0 ? (
                    <div className="space-y-3">
                      {addresses.map((address) => (
                        <label
                          key={address._id}
                          className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                            selectedAddressId === address._id
                              ? 'border-primary bg-primary/5 shadow-sm'
                              : 'border-gray-200 hover:border-primary/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="delivery-address"
                            className="mt-1 h-4 w-4 text-primary focus:ring-primary"
                            checked={selectedAddressId === address._id}
                            onChange={() => setSelectedAddressId(address._id)}
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                              {address.label}
                              {address.is_default && (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="flex items-start gap-2 text-sm text-gray-600">
                              <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                              {formatAddressLine(address)}
                            </p>
                            {address.delivery_instructions && (
                              <p className="text-xs text-gray-500">
                                Notes: {address.delivery_instructions}
                              </p>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-4 text-amber-800">
                      <p className="font-semibold">No saved addresses yet.</p>
                      <p className="text-sm">
                        Add an address from your profile to enable delivery.
                      </p>
                    </div>
                  )}

                  {addressError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {addressError}
                    </div>
                  )}

                  {deliveryValidationError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {deliveryValidationError}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedFulfilment(null);
                        setHasConfirmedDelivery(false);
                      }}
                    >
                      Go back
                    </Button>
                    <Button
                      onClick={handleConfirmDelivery}
                      isLoading={isConfirmingDelivery}
                      disabled={addresses.length === 0 || isConfirmingDelivery}
                    >
                      Continue with delivery
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DailyMenuPage;
