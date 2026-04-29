import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '@store/adminStore';
import { useAuthStore } from '@store/authStore'; // âœ… Import authStore
import { formatCurrency } from '@utils/formatters';
import { adminAPI } from '@api';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock,
  RefreshCcw,
  Calendar,
  Package,
  CheckCircle,
  XCircle,
  Truck,
  AlertCircle,
} from 'lucide-react';
import AdminSidebar from '@components/admin/AdminSidebar';
import LoadingScreen from '@components/common/LoadingScreen';

// ===========================
// SIMPLE COMPONENTS (No External Dependencies)
// ===========================

// Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-gray-100 ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

// Button Component
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  const baseClasses =
    'px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-[#FF6B35] text-white hover:bg-[#E55A2B] shadow-md hover:shadow-lg',
    outline:
      'border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white',
    ghost: 'text-[#FF6B35] hover:bg-[#FFF5F2]',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// ===========================
// MAIN ADMIN DASHBOARD COMPONENT
// ===========================

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, role, isAuthenticated } = useAuthStore(); // âœ… Get auth state
  const {
    orderStats,
    revenueReport,
    fetchDashboardStats,
    fetchSalesReport,
    isLoading,
    isRevenueLoading,
  } = useAdminStore();
  const [refreshing, setRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const today = new Date();
  const [rangeStart, setRangeStart] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 29);
    return d.toISOString().slice(0, 10);
  });
  const [rangeEnd, setRangeEnd] = useState<string>(() => today.toISOString().slice(0, 10));

  // âœ… Debug log on mount
  useEffect(() => {
    console.log('ðŸŽ¯ AdminDashboard mounted', {
      isAuthenticated,
      role,
      userEmail: user?.email,
      userRole: user?.role,
    });
  }, [isAuthenticated, role, user]);

  // âœ… Load dashboard data
  useEffect(() => {
    if (role === 'admin') {
      console.log('ðŸ“¡ Loading dashboard data...');
      loadDashboardData();
    }
  }, [role]);

  const loadDashboardData = async () => {
    console.log('ðŸ“¡ Fetching dashboard stats...');
    try {
      await fetchDashboardStats();
      console.log('âœ… Dashboard data loaded:', orderStats);
    } catch (error) {
      console.error('âŒ Failed to load dashboard data:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleApplyRange = async () => {
    if (!rangeStart || !rangeEnd) return;
    try {
      await fetchSalesReport(rangeStart, rangeEnd);
    } catch (error) {
      console.error('Failed to fetch sales report:', error);
    }
  };

  const setQuickRange = (daysBack: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - daysBack);
    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);
    setRangeStart(startStr);
    setRangeEnd(endStr);
    fetchSalesReport(startStr, endStr).catch((err) =>
      console.error('Failed to fetch quick range sales:', err)
    );
  };

  const handleSpecificDate = (date: string) => {
    setRangeStart(date);
    setRangeEnd(date);
    fetchSalesReport(date, date).catch((err) =>
      console.error('Failed to fetch specific date sales:', err)
    );
  };

  const handleExportReport = async () => {
    if (!rangeStart || !rangeEnd) return;
    setIsExporting(true);
    try {
      const toISO = (date: string, endOfDay: boolean) =>
        date.includes('T') ? date : `${date}T${endOfDay ? '23:59:59' : '00:00:00'}`;

      const start = new Date(`${rangeStart}T00:00:00`);
      const end = new Date(`${rangeEnd}T00:00:00`);
      const days: string[] = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        days.push(d.toISOString().slice(0, 10));
      }

      const lines: string[] = ['Date,Order Type,Orders,Revenue'];
      const totalsByType: Record<string, { count: number; revenue: number }> = {};
      let totalOrders = 0;
      let totalRevenue = 0;

      for (const day of days) {
        const resp = await adminAPI.getSalesReport(toISO(day, false), toISO(day, true));
        const report = resp.data.data;
        const byType = report?.by_order_type || {};
        const entries = Object.keys(byType).length
          ? Object.entries(byType)
          : [];
        entries.forEach(([type, data]) => {
          const cleanType = type.replace(/_/g, ' ');
          lines.push(`${day},${cleanType},${data.count},${data.revenue.toFixed(2)}`);
          totalsByType[type] = totalsByType[type]
            ? {
                count: totalsByType[type].count + data.count,
                revenue: totalsByType[type].revenue + data.revenue,
              }
            : { count: data.count, revenue: data.revenue };
          totalOrders += data.count;
          totalRevenue += data.revenue;
        });
        if (entries.length === 0) {
          lines.push(`${day},No orders,0,0.00`);
        }
      }

      // Append totals by order type and grand total
      lines.push('');
      lines.push('Totals,,,');
      Object.entries(totalsByType).forEach(([type, data]) => {
        const cleanType = type.replace(/_/g, ' ');
        lines.push(
          `Total,${cleanType},${data.count},${data.revenue.toFixed(2)}`
        );
      });
      lines.push(
        `Total,All Order Types,${totalOrders},${totalRevenue.toFixed(2)}`
      );

      const csv = lines.join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `revenue-report_daily_${rangeStart}_to_${rangeEnd}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export revenue report:', error);
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    if (role === 'admin') {
      handleApplyRange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  // âœ… Show access denied if not admin
  if (role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
        <Card padding="lg" className="max-w-md text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#2E2E2E] mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-2">
            You need admin privileges to access this page.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              <strong>Current role:</strong>{' '}
              <span className="text-red-600 font-semibold">
                {role || 'None'}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              <strong>Required role:</strong>{' '}
              <span className="text-green-600 font-semibold">admin</span>
            </p>
          </div>
          <Button onClick={() => navigate('/')} className="w-full">
            Go to Homepage
          </Button>
        </Card>
      </div>
    );
  }

  // Show loading state only on initial load
  if (isLoading && !orderStats) {
    return <LoadingScreen message="Loading dashboard..." />;
  }

  // Default stats if API fails
  const stats = orderStats || {
    total_orders: 0,
    total_orders_growth_percent: 0,
    pending_orders: 0,
    pending_orders_weekly_change_percent: 0,
    confirmed_orders: 0,
    preparing_orders: 0,
    out_for_delivery_orders: 0,
    completed_orders: 0,
    cancelled_orders: 0,
    today_revenue: 0,
    today_vs_yesterday_percent: 0,
    weekly_revenue: 0,
    weekly_growth_percent: 0,
    monthly_revenue: 0,
    monthly_growth_percent: 0,
    total_revenue: 0,
    total_revenue_growth_percent: 0,
    weekly_revenue_breakdown: [],
    active_subscriptions: 0,
    upcoming_catering_events: 0,
  };

  const formatPercent = (value?: number) => {
    if (
      value === undefined ||
      value === null ||
      Number.isNaN(value) ||
      !Number.isFinite(value)
    ) {
      return 'â€”';
    }
    const rounded = value.toFixed(1);
    const numeric = Number(rounded);
    const sign = numeric > 0 ? '+' : '';
    return `${sign}${rounded}%`;
  };

  const statsCards = [
    {
      title: 'Total Orders',
      value: stats.total_orders || 0,
      icon: <ShoppingBag size={32} />,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: formatPercent(stats.total_orders_growth_percent),
    },
    {
      title: 'Pending Orders',
      value: stats.pending_orders || 0,
      icon: <Clock size={32} />,
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: formatPercent(stats.pending_orders_weekly_change_percent),
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(stats.today_revenue || 0),
      icon: <DollarSign size={32} />,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      change: formatPercent(stats.today_vs_yesterday_percent),
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.total_revenue || 0),
      icon: <TrendingUp size={32} />,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: formatPercent(stats.total_revenue_growth_percent),
    },
  ];

  const orderStatusCards = [
    {
      label: 'Pending',
      count: stats.pending_orders || 0,
      icon: <Clock size={24} />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Confirmed',
      count: stats.confirmed_orders || 0,
      icon: <Package size={24} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Out for Delivery',
      count: stats.out_for_delivery_orders || 0,
      icon: <Truck size={24} />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Completed',
      count: stats.completed_orders || 0,
      icon: <CheckCircle size={24} />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Cancelled',
      count: stats.cancelled_orders || 0,
      icon: <XCircle size={24} />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const weeklyRevenueBreakdown =
    stats.weekly_revenue_breakdown && stats.weekly_revenue_breakdown.length
      ? stats.weekly_revenue_breakdown
      : [
          { label: 'Mon', date: '', total: 0 },
          { label: 'Tue', date: '', total: 0 },
          { label: 'Wed', date: '', total: 0 },
          { label: 'Thu', date: '', total: 0 },
          { label: 'Fri', date: '', total: 0 },
          { label: 'Sat', date: '', total: 0 },
          { label: 'Sun', date: '', total: 0 },
        ];

  const maxDailyRevenue = Math.max(
    ...weeklyRevenueBreakdown.map((day) => day.total || 0),
    1
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <AdminSidebar />
      <div className="py-8 pr-4 sm:pr-6 lg:pr-8 pl-4 sm:pl-24 md:pl-32 lg:pl-[17rem] xl:pl-[18.5rem] transition-[padding-left] duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="w-full sm:w-auto">
              <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#2E2E2E] mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 flex items-center space-x-2">
                <Calendar size={16} />
                <span>
                  {new Date().toLocaleDateString('en-AU', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              className="w-full sm:w-auto flex items-center justify-center"
            >
              <RefreshCcw
                size={18}
                className={`mr-2 ${refreshing ? 'animate-spin' : ''}`}
              />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${stat.bgColor} flex items-center justify-center ${stat.textColor}`}
                  >
                    {stat.icon}
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="font-['Playfair_Display'] text-3xl font-bold text-[#2E2E2E]">
                  {stat.value}
                </p>
              </Card>
            ))}
          </div>

          {/* Order Status Overview */}
          <Card className="mb-8">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#2E2E2E] mb-6">
              Order Status Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {orderStatusCards.map((status, index) => (
                <div
                  key={index}
                  className={`${status.bgColor} rounded-lg p-4 text-center transition-transform hover:scale-105`}
                >
                  <div className={`${status.color} flex justify-center mb-3`}>
                    {status.icon}
                  </div>
                  <p className="font-['Playfair_Display'] text-3xl font-bold text-[#2E2E2E] mb-1">
                    {status.count}
                  </p>
                  <p className="text-sm text-gray-600">{status.label}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Revenue */}
          <div className="space-y-8">
            <Card>
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#2E2E2E] mb-6">
                Weekly Revenue
              </h3>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">This Week</p>
                  <p className="font-['Playfair_Display'] text-2xl font-bold text-blue-600">
                    {formatCurrency(stats.weekly_revenue || 0)}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="font-['Playfair_Display'] text-2xl font-bold text-green-600">
                    {formatCurrency(stats.monthly_revenue || 0)}
                  </p>
                  <p className="text-sm font-semibold text-green-600">
                    {formatPercent(stats.monthly_growth_percent)}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Growth</p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="text-purple-600" size={20} />
                    <p className="font-['Playfair_Display'] text-2xl font-bold text-purple-600">
                      {formatPercent(stats.weekly_growth_percent)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Revenue by Day */}
              <div className="space-y-4">
                {weeklyRevenueBreakdown.map((day) => {
                  const revenue = day.total || 0;
                  const width =
                    revenue > 0
                      ? Math.max((revenue / maxDailyRevenue) * 100, 8)
                      : 0;

                  return (
                    <div key={day.label} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium text-gray-700">
                        {day.label}
                      </div>
                      <div className="flex-1">
                        <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] rounded-lg flex items-center justify-end px-3 transition-all duration-500"
                            style={{ width: `${width}%` }}
                          >
                            {revenue > 0 && (
                              <span className="text-white font-semibold text-sm">
                                {formatCurrency(revenue)}
                              </span>
                            )}
                          </div>
                          {revenue === 0 && (
                            <div className="absolute inset-0 flex items-center justify-end px-3">
                              <span className="text-gray-400 text-sm">
                                {formatCurrency(0)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

<Card>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#2E2E2E]">
                    Revenue Explorer
                  </h3>
                  <p className="text-sm text-gray-600">
                    View revenue by custom range, specific date, or past year (live backend data).
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="text-sm px-3 py-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary"
                    onClick={() => handleSpecificDate(rangeEnd)}
                  >
                    Specific Date
                  </button>
                  <button
                    className="text-sm px-3 py-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary"
                    onClick={() => setQuickRange(365)}
                  >
                    Past Year
                  </button>
                  <Button
                    variant="outline"
                    disabled={!revenueReport || isExporting}
                    onClick={handleExportReport}
                    className="text-sm"
                  >
                    {isExporting ? 'Exporting...' : 'Export CSV'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-600">Start Date</label>
                  <input
                    type="date"
                    value={rangeStart}
                    max={rangeEnd}
                    onChange={(e) => setRangeStart(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-600">End Date</label>
                  <input
                    type="date"
                    value={rangeEnd}
                    min={rangeStart}
                    max={today.toISOString().slice(0, 10)}
                    onChange={(e) => setRangeEnd(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleApplyRange}
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isRevenueLoading}
                  >
                    {isRevenueLoading && <RefreshCcw className="animate-spin" size={18} />}
                    Apply Range
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Date Range</p>
                  <p className="font-semibold text-blue-700">
                    {rangeStart} → {rangeEnd}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="font-['Playfair_Display'] text-2xl font-bold text-green-700">
                    {formatCurrency(revenueReport?.total_revenue || 0)}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <p className="font-['Playfair_Display'] text-2xl font-bold text-purple-700">
                    {revenueReport?.total_orders ?? 0}
                  </p>
                </div>
              </div>

              {revenueReport && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    By Order Type
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(revenueReport.by_order_type).map(([type, data]) => (
                      <div
                        key={type}
                        className="border border-gray-100 rounded-lg p-4 bg-gray-50"
                      >
                        <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                          {type.replace('_', ' ')}
                        </p>
                        <p className="font-['Playfair_Display'] text-xl font-bold text-[#2E2E2E]">
                          {formatCurrency(data.revenue)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Orders: <span className="font-semibold">{data.count}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
