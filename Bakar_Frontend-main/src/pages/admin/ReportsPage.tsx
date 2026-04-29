import React, { useEffect, useMemo, useState } from 'react';
import AdminSidebar from '@components/admin/AdminSidebar';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import Pagination from '@components/common/Pagination';
import { adminAPI } from '@api';
import { MenuItemOrdersReportRow } from '@models/admin.types';
import { useToast } from '@components/common/Toast';
import { Download, RefreshCcw, Search } from 'lucide-react';

const DEFAULT_PAGE_SIZE = 25;

const formatOrderType = (value?: string) => {
  if (!value) return 'Unknown';
  const normalized = value.toLowerCase();
  if (normalized === 'meal_subscription' || normalized === 'subscription' || normalized === 'weekly') {
    return 'Meal Plan';
  }
  if (normalized === 'daily_menu' || normalized === 'daily') {
    return 'Daily Menu';
  }
  if (normalized === 'special_catering' || normalized === 'catering') {
    return 'Catering';
  }
  return 'Unknown';
};

const formatDateDisplay = (value?: string) => {
  if (!value) return 'Unknown';
  const isoDate = value.split('T')[0];
  const parts = isoDate?.split('-');
  if (parts && parts.length === 3) {
    const [year, month, day] = parts;
    if (year && month && day) {
      return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    }
  }
  return value;
};

const ReportsPage: React.FC = () => {
  const { showToast } = useToast();
  const today = new Date().toISOString().slice(0, 10);
  const thirtyDaysAgo = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 29);
    return d.toISOString().slice(0, 10);
  }, []);

  const [filters, setFilters] = useState({
    date_from: thirtyDaysAgo,
    date_to: today,
    order_type: '',
    menu_item_id: '',
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [results, setResults] = useState<MenuItemOrdersReportRow[]>([]);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const loadReport = async (requestedPage = page, requestedSize = pageSize) => {
    setIsLoading(true);
    try {
      const resp = await adminAPI.getMenuItemOrdersReport({
        ...filters,
        page: requestedPage,
        page_size: requestedSize,
      });
      setResults(resp.data.data.results || []);
      setPagination(resp.data.data.pagination);
      setPage(requestedPage);
      setPageSize(requestedSize);
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to load report';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReport().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyFilters = () => {
    setPage(1);
    loadReport(1, pageSize);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const resp = await adminAPI.getMenuItemOrdersReport({
        ...filters,
        page: 1,
        page_size: 1000, // export up to 1000 rows with current filters
      });
      const rows = resp.data.data.results || [];
      const header = [
        'Date',
        'Menu Item',
        'Category',
        'Order Type',
        'Total Quantity',
        'Order Count',
        'Menu Item ID',
      ];
      const csvLines = [
        header.join(','),
        ...rows.map((r) =>
          [
            formatDateDisplay(r.date),
            `"${(r.menu_item_name || '').replace(/"/g, '""')}"`,
            `"${(r.category || '').replace(/"/g, '""')}"`,
            formatOrderType(r.order_type),
            r.total_quantity,
            r.order_count,
            r.menu_item_id,
          ].join(','),
        ),
      ];
      const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `menu-item-orders-${filters.date_from || 'all'}-${filters.date_to || 'all'}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to export report';
      showToast(message, 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="sm:pl-72 pt-24 px-4 sm:px-8 pb-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Menu Orders
            </p>
            <h1 className="text-3xl font-heading font-bold text-gray-900">
              Menu Item Orders by Date
            </h1>
            <p className="text-gray-500 mt-1">
              See how many orders each menu item received per day across daily and meal subscription orders.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => loadReport()} disabled={isLoading}>
              <RefreshCcw size={16} className="mr-2" />
              Refresh
            </Button>
            <Button onClick={handleExport} disabled={isExporting || isLoading}>
              <Download size={16} className="mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={filters.date_from}
                onChange={(e) => setFilters((f) => ({ ...f, date_from: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={filters.date_to}
                onChange={(e) => setFilters((f) => ({ ...f, date_to: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Type
              </label>
              <select
                value={filters.order_type}
                onChange={(e) => setFilters((f) => ({ ...f, order_type: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All</option>
                <option value="daily_menu">Daily Menu</option>
                <option value="meal_subscription">Meal Subscription</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Menu Item ID (optional)
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
                <Search size={16} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={filters.menu_item_id}
                  onChange={(e) => setFilters((f) => ({ ...f, menu_item_id: e.target.value.trim() }))}
                  placeholder="Mongo ID or leave empty"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={handleApplyFilters} disabled={isLoading}>
              Apply Filters
            </Button>
            <span className="text-xs text-gray-500">
              Showing {pagination?.page_size || pageSize} per page
            </span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Results</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="px-3 py-1 rounded-full bg-gray-100">
                Total rows: {pagination?.total ?? 0}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Menu Item
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order Type
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total Qty
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Item ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : results.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                      No data found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  results.map((row) => (
                    <tr key={`${row.menu_item_id}-${row.date}`}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                        {formatDateDisplay(row.date)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.menu_item_name || 'Unknown Item'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {row.category || '—'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          {formatOrderType(row.order_type)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">
                        {row.total_quantity}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">
                        {row.order_count}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500 font-mono">
                        {row.menu_item_id}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Pagination
              currentPage={pagination?.page || page}
              totalItems={pagination?.total || 0}
              pageSize={pagination?.page_size || pageSize}
              onPageChange={(next) => loadReport(next)}
              showSummary
            />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ReportsPage;
