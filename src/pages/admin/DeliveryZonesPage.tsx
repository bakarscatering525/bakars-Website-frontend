import React, { useEffect, useState } from 'react';
import { useAdminStore } from '@store/adminStore';
import { useToast } from '@components/common/Toast';
import AdminSidebar from '@components/admin/AdminSidebar';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Input from '@components/common/Input';
import Modal from '@components/common/Modal';
import LoadingScreen from '@components/common/LoadingScreen';
import Pagination from '@components/common/Pagination';
import { DeliveryZone } from '@models/subscription.types';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';

const ZONES_PAGE_SIZE = 10;

const DeliveryZonesPage: React.FC = () => {
  const { showToast } = useToast();
  const {
    deliveryZones,
    deliveryZonePagination,
    fetchDeliveryZones,
    createDeliveryZone,
    updateDeliveryZone,
    deleteDeliveryZone,
    isLoading,
    isUpdating,
    error,
    clearError,
  } = useAdminStore();

  const [zoneModalOpen, setZoneModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null);
  const [zonesPage, setZonesPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const [zoneForm, setZoneForm] = useState({
    postcode: '',
    zone_label: '',
    suburbs: '',
    base_delivery_fee: '10',
    express_delivery_fee: '',
    notes: '',
    is_active: true,
  });

  useEffect(() => {
    fetchDeliveryZones({
      includeInactive: true,
      page: zonesPage,
      pageSize: ZONES_PAGE_SIZE,
      search: searchTerm.trim() || undefined,
    }).catch(console.error);
  }, [fetchDeliveryZones, zonesPage, searchTerm]);

  // ✅ FIX: Add null check for deliveryZonePagination
  useEffect(() => {
    if (!deliveryZonePagination) return;

    if (
      deliveryZonePagination.totalPages > 0 &&
      zonesPage > deliveryZonePagination.totalPages
    ) {
      setZonesPage(deliveryZonePagination.totalPages);
    }
  }, [deliveryZonePagination?.totalPages, zonesPage]);

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
      clearError();
    }
  }, [error, showToast, clearError]);

  const handleOpenZoneModal = (zone?: DeliveryZone) => {
    if (zone) {
      setEditingZone(zone);
      setZoneForm({
        postcode: zone.postcode,
        zone_label: zone.zone_label || '',
        suburbs: zone.suburbs.join(', '),
        base_delivery_fee: String(zone.base_delivery_fee || 10),
        express_delivery_fee: zone.express_delivery_fee
          ? String(zone.express_delivery_fee)
          : '',
        notes: zone.notes || '',
        is_active: zone.is_active,
      });
    } else {
      setEditingZone(null);
      setZoneForm({
        postcode: '',
        zone_label: '',
        suburbs: '',
        base_delivery_fee: '10',
        express_delivery_fee: '',
        notes: '',
        is_active: true,
      });
    }
    setZoneModalOpen(true);
  };

  const handleZoneFormChange = (field: string, value: string | boolean) => {
    setZoneForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitZone = async () => {
    if (!zoneForm.postcode) {
      showToast('Postcode is required.', 'error');
      return;
    }

    const suburbsArray = zoneForm.suburbs
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: Partial<DeliveryZone> = {
      postcode: zoneForm.postcode,
      zone_label: zoneForm.zone_label || undefined,
      suburbs: suburbsArray,
      base_delivery_fee: Number(zoneForm.base_delivery_fee || 10),
      express_delivery_fee: zoneForm.express_delivery_fee
        ? Number(zoneForm.express_delivery_fee)
        : undefined,
      notes: zoneForm.notes || undefined,
      is_active: zoneForm.is_active,
    };

    try {
      if (editingZone?._id) {
        await updateDeliveryZone(editingZone._id, payload);
        showToast('Delivery zone updated successfully', 'success');
      } else {
        await createDeliveryZone(payload);
        showToast('Delivery zone created successfully', 'success');
      }
      setZoneModalOpen(false);
      fetchDeliveryZones({
        includeInactive: true,
        page: zonesPage,
        pageSize: ZONES_PAGE_SIZE,
        search: searchTerm.trim() || undefined,
      });
    } catch (err) {
      console.error(err);
      showToast('Failed to save delivery zone', 'error');
    }
  };

  const handleDeleteZone = async (zoneId: string) => {
    if (
      !window.confirm('Are you sure you want to deactivate this delivery zone?')
    ) {
      return;
    }
    try {
      await deleteDeliveryZone(zoneId, false);
      showToast('Delivery zone deactivated', 'success');
      fetchDeliveryZones({
        includeInactive: true,
        page: zonesPage,
        pageSize: ZONES_PAGE_SIZE,
        search: searchTerm.trim() || undefined,
      });
    } catch (err) {
      console.error(err);
      showToast('Failed to deactivate zone', 'error');
    }
  };

  const formatCurrency = (value?: number) =>
    value !== undefined
      ? new Intl.NumberFormat('en-AU', {
          style: 'currency',
          currency: 'AUD',
        }).format(value)
      : '—';

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <AdminSidebar />
      {(isLoading || isUpdating) && (
        <LoadingScreen
          message={
            isLoading ? 'Loading delivery zones...' : 'Saving changes...'
          }
        />
      )}
      <div className="py-8 pr-4 sm:pr-6 lg:pr-8 pl-4 sm:pl-24 md:pl-32 lg:pl-[17rem] xl:pl-[18.5rem] transition-[padding-left] duration-300">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text flex items-center space-x-3">
                <MapPin className="text-primary" />
                <span>Delivery Zones & Postal Codes</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Configure base delivery fees per postcode and control
                availability for meal subscriptions.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => handleOpenZoneModal()}
              className="w-full sm:w-auto flex items-center justify-center"
            >
              <Plus size={20} className="mr-2" />
              Add Delivery Zone
            </Button>
          </div>

          <Card className="p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <Input
                label="Search by postcode"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setZonesPage(1);
                }}
                placeholder="e.g. 2150"
                className="sm:w-64"
              />
              <div className="text-sm text-gray-500">
                Showing {deliveryZones.length} zone{deliveryZones.length === 1 ? '' : 's'}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Postcode
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Zone Label
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Suburbs
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Base Fee
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Express Fee
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Active
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deliveryZones.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-6 text-center text-gray-500 italic"
                      >
                        No delivery zones configured yet.
                      </td>
                    </tr>
                  )}
                  {deliveryZones.map((zone) => (
                    <tr key={zone._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-text">
                        {zone.postcode}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {zone.zone_label || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                        {zone.suburbs.join(', ')}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {formatCurrency(zone.base_delivery_fee)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {zone.express_delivery_fee
                          ? formatCurrency(zone.express_delivery_fee)
                          : '—'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {zone.is_active ? (
                          <span className="text-emerald-600 font-medium">
                            Active
                          </span>
                        ) : (
                          <span className="text-gray-400">Inactive</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenZoneModal(zone)}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteZone(zone._id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ FIX: Only render Pagination when deliveryZonePagination is not null */}
            {deliveryZonePagination && deliveryZonePagination.total > 0 && (
              <Pagination
                currentPage={deliveryZonePagination.page || 1}
                totalItems={deliveryZonePagination.total}
                pageSize={deliveryZonePagination.pageSize || ZONES_PAGE_SIZE}
                onPageChange={setZonesPage}
                showSummary
                className="mt-4"
              />
            )}
          </Card>

          {/* Zone Modal */}
          <Modal
            isOpen={zoneModalOpen}
            onClose={() => setZoneModalOpen(false)}
            title={editingZone ? 'Edit Delivery Zone' : 'Add Delivery Zone'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Postcode *"
                value={zoneForm.postcode}
                onChange={(e) =>
                  handleZoneFormChange('postcode', e.target.value)
                }
                required
                disabled={!!editingZone}
              />
              <Input
                label="Zone Label"
                value={zoneForm.zone_label}
                onChange={(e) =>
                  handleZoneFormChange('zone_label', e.target.value)
                }
                placeholder="e.g., Zone 1 (0-14km)"
              />
              <label className="flex flex-col text-sm font-medium text-gray-700 md:col-span-2">
                Suburbs (comma separated) *
                <textarea
                  className="mt-1 rounded-lg border border-gray-300 px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={zoneForm.suburbs}
                  onChange={(e) =>
                    handleZoneFormChange('suburbs', e.target.value)
                  }
                  placeholder="Guildford, Merrylands, Fairfield"
                />
              </label>
              <Input
                label="Base Delivery Fee *"
                type="number"
                step="0.01"
                value={zoneForm.base_delivery_fee}
                onChange={(e) =>
                  handleZoneFormChange('base_delivery_fee', e.target.value)
                }
                required
              />
              <Input
                label="Express Delivery Fee"
                type="number"
                step="0.01"
                value={zoneForm.express_delivery_fee}
                onChange={(e) =>
                  handleZoneFormChange('express_delivery_fee', e.target.value)
                }
                placeholder="Optional express fee"
              />
              <label className="flex flex-col text-sm font-medium text-gray-700 md:col-span-2">
                Notes
                <textarea
                  className="mt-1 rounded-lg border border-gray-300 px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={zoneForm.notes}
                  onChange={(e) =>
                    handleZoneFormChange('notes', e.target.value)
                  }
                  placeholder="Optional notes about this delivery zone"
                />
              </label>
              <label className="flex items-center space-x-2 mt-2 md:col-span-2">
                <input
                  type="checkbox"
                  checked={zoneForm.is_active}
                  onChange={(e) =>
                    handleZoneFormChange('is_active', e.target.checked)
                  }
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">
                  Zone is active and available
                </span>
              </label>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setZoneModalOpen(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitZone}
                isLoading={isUpdating}
                disabled={isUpdating}
              >
                {editingZone ? 'Save Changes' : 'Create Zone'}
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DeliveryZonesPage;
