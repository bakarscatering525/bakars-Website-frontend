import React, { useEffect, useState, useCallback } from 'react';
import { useAdminStore } from '@store/adminStore';
import { useToast } from '@components/common/Toast';
import { OrdersList } from '@components/admin/orders/OrdersList';
import { OrderDetails } from '@components/admin/orders/OrderDetails';
import LoadingScreen from '@components/common/LoadingScreen';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Modal from '@components/common/Modal';
import Pagination from '@components/common/Pagination';
import { Filter, RefreshCcw, Download } from 'lucide-react';
import { Order } from '@models/order.types';
import { getOrderDisplayNumber, getOrderTypeDescription } from '@utils/orderHelpers';
import AdminSidebar from '@components/admin/AdminSidebar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ✅ UPDATED: Changed from 20 to 8 orders per page
const ORDERS_PER_PAGE = 8;

const OrderManagement: React.FC = () => {
  const { showToast } = useToast();
  const {
    allOrders,
    orderPagination,
    fetchAllOrders,
    updateOrderStatus,
    isLoading,
    isUpdating,
  } = useAdminStore();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    date: '',
    order_type: '',
    search: '',
  });
  const [orderNumberQuery, setOrderNumberQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);

  // Load orders when page or filters change
  useEffect(() => {
    loadOrders();
  }, [currentPage, filters]);

  // ✅ FIXED: Add null check for orderPagination
  useEffect(() => {
    if (!orderPagination) return;

    if (
      orderPagination.total_pages > 0 &&
      currentPage > orderPagination.total_pages
    ) {
      setCurrentPage(orderPagination.total_pages);
    }
  }, [orderPagination?.total_pages, currentPage]);

  const loadOrders = async () => {
    try {
      const params: {
        status?: string;
        order_type?: string;
        date_from?: string;
        date_to?: string;
        search?: string;
        page: number;
        page_size: number;
      } = {
        page: currentPage,
        page_size: ORDERS_PER_PAGE,
      };

      if (filters.status) {
        params.status = filters.status;
      }
      if (filters.order_type) {
        params.order_type = filters.order_type;
      }
      if (filters.date) {
        params.date_from = filters.date;
        params.date_to = filters.date;
      }
      if (filters.search?.trim()) {
        params.search = filters.search.trim();
      }

      await fetchAllOrders(params);
    } catch (error: any) {
      console.error('Failed to load orders:', error);
      showToast(
        error.response?.data?.message || 'Failed to load orders',
        'error'
      );
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
    showToast('Orders refreshed', 'success');
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      search: orderNumberQuery.trim(),
    }));
  };

  const handleClearFilters = () => {
    setFilters({ status: '', date: '', order_type: '', search: '' });
    setOrderNumberQuery('');
    setCurrentPage(1);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      showToast(`Order status updated to ${newStatus}`, 'success');
      loadOrders();
    } catch (error: any) {
      showToast(
        error.response?.data?.message || 'Failed to update order status',
        'error'
      );
    }
  };

  const formatCurrency = (value?: number) =>
    new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(Number(value ?? 0));

  const formatStatus = (status?: string) => {
    if (!status) return 'N/A';
    return status
      .split('_')
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join(' ');
  };

  const formatOrderType = (order: Order) => getOrderTypeDescription(order);

  const formatDateTime = (value?: string) => {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString();
  };

  const getOrderIdentifier = (order: Order) => getOrderDisplayNumber(order);

  const loadLogoAsset = useCallback(async () => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const response = await fetch('/logo.svg');
      if (!response.ok) {
        return null;
      }
      const svgText = await response.text();
      const encodedSvg = window
        .btoa(
          encodeURIComponent(svgText).replace(/%([0-9A-F]{2})/g, (_match, p1) =>
            String.fromCharCode(Number.parseInt(p1, 16))
          )
        );
      const imageSrc = `data:image/svg+xml;base64,${encodedSvg}`;

      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imageSrc;
      });

      const targetWidth = 200;
      const aspectRatio =
        image.naturalWidth && image.naturalHeight
          ? image.naturalHeight / image.naturalWidth
          : 0.35;
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = Math.max(50, targetWidth * aspectRatio || 60);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return null;
      }
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      return {
        dataUrl: canvas.toDataURL('image/png'),
        width: canvas.width,
        height: canvas.height,
      };
    } catch (error) {
      console.warn('Failed to load logo for export', error);
      return null;
    }
  }, []);

  const handleExportOrders = async () => {
    if (!allOrders.length) {
      showToast('There are no orders to export right now.', 'info');
      return;
    }

    setIsExporting(true);
    try {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      let startY = 40;

      const logoAsset = await loadLogoAsset();
      if (logoAsset) {
        const displayWidth = Math.min(logoAsset.width, 180);
        const displayHeight =
          (logoAsset.height / logoAsset.width) * displayWidth || 60;
        const xPosition = (pageWidth - displayWidth) / 2;
        doc.addImage(
          logoAsset.dataUrl,
          'PNG',
          xPosition,
          startY,
          displayWidth,
          displayHeight
        );
        startY += displayHeight + 25;
      } else {
        doc.setFontSize(24);
        doc.setTextColor(244, 114, 37);
        doc.setFont('helvetica', 'bold');
        doc.text("Bakar's Food & Catering", pageWidth / 2, startY + 20, {
          align: 'center',
        });
        startY += 40;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(33, 37, 41);
      doc.text('Orders Export', pageWidth / 2, startY, { align: 'center' });
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(90);
      doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        pageWidth / 2,
        startY + 18,
        {
          align: 'center',
        }
      );
      startY += 40;

      const tableRows = allOrders.map((order, index) => {
        const totalValue = Number(order.total ?? order.subtotal ?? 0);
        return [
          (index + 1).toString(),
          getOrderIdentifier(order),
          order.user_name || order.user_email || 'Guest',
          formatOrderType(order),
          formatStatus(order.status),
          formatCurrency(totalValue),
          formatDateTime(order.created_at),
        ];
      });

      autoTable(doc, {
        startY,
        head: [['#', 'Order #', 'Customer', 'Type', 'Status', 'Total', 'Placed']],
        body: tableRows,
        styles: {
          fontSize: 10,
          cellPadding: 6,
          textColor: [55, 65, 81],
        },
        headStyles: {
          fillColor: [244, 114, 37],
          textColor: [255, 255, 255],
          fontSize: 11,
        },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        columnStyles: {
          0: { halign: 'center', cellWidth: 30 },
          5: { halign: 'right', cellWidth: 80 },
          6: { cellWidth: 120 },
        },
      });

      const tableContext = doc as jsPDF & {
        lastAutoTable?: { finalY?: number };
      };
      const finalY = (tableContext.lastAutoTable?.finalY ?? startY) + 28;
      const totalRevenue = allOrders.reduce(
        (sum, order) => sum + Number(order.total ?? order.subtotal ?? 0),
        0
      );

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(33, 37, 41);
      doc.text(`Total Orders: ${allOrders.length}`, 40, finalY);
      doc.text(`Total Revenue: ${formatCurrency(totalRevenue)}`, 40, finalY + 18);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text("Generated by Bakar's Admin Dashboard", 40, finalY + 36);

      const filename = `bakars-orders-${new Date()
        .toISOString()
        .split('T')[0]}.pdf`;
      doc.save(filename);
      showToast('Orders exported successfully.', 'success');
    } catch (error) {
      console.error('Failed to export orders', error);
      showToast('Failed to export orders. Please try again.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && allOrders.length === 0) {
    return <LoadingScreen message="Loading orders..." />;
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
                Order Management
              </h1>
              <p className="text-gray-600">
                Manage and track all customer orders ({ORDERS_PER_PAGE} per
                page)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:justify-end">
              <Button
                variant="outline"
                size="md"
                onClick={handleExportOrders}
                isLoading={isExporting}
                disabled={isExporting || allOrders.length === 0 || isLoading}
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <Download size={18} className="mr-2" />
                {isExporting ? 'Preparing...' : 'Export'}
              </Button>

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
            </div>
          </div>

          {/* Filters */}
          <Card padding="lg" className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Filter size={20} className="text-primary" />
              <h3 className="font-semibold text-text">Filters</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Order Number Search */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Order Number
                </label>
                <input
                  type="text"
                  value={orderNumberQuery}
                  onChange={(e) => setOrderNumberQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleApplyFilters();
                    }
                  }}
                  placeholder="e.g. BF-20250101-ABC123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Order Type Filter */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Order Type
                </label>
                <select
                  value={filters.order_type}
                  onChange={(e) =>
                    handleFilterChange('order_type', e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="daily_menu">Daily Menu</option>
                  <option value="meal_subscription">Meals Subscription</option>
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-2">
                <Button
                  variant="primary"
                  onClick={handleApplyFilters}
                  className="w-full sm:flex-1"
                >
                  Apply
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleClearFilters}
                  className="w-full sm:w-auto"
                >
                  Clear
                </Button>
              </div>
            </div>
          </Card>

          {/* Orders List */}
          <OrdersList
            orders={allOrders}
            onViewOrder={handleViewOrder}
            onStatusUpdate={handleStatusUpdate}
            isLoading={isLoading}
            isUpdating={isUpdating}
          />

          {/* ✅ FIXED: Only render Pagination when orderPagination is not null */}
          {orderPagination && orderPagination.total > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalItems={orderPagination.total}
                pageSize={ORDERS_PER_PAGE}
                onPageChange={handlePageChange}
                showSummary
              />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && allOrders.length === 0 && (
            <Card padding="xl" className="text-center">
              <div className="py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-500">
                  {Object.values(filters).some((f) => f)
                    ? 'Try adjusting your filters to see more results.'
                    : 'Orders will appear here once customers start placing them.'}
                </p>
              </div>
            </Card>
          )}

          {/* Order Details Modal */}
          <Modal
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            title="Order Details"
            size="xl"
          >
            {selectedOrder && (
              <OrderDetails
                order={selectedOrder}
                onStatusUpdate={handleStatusUpdate}
                onClose={() => setShowDetailsModal(false)}
              />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
