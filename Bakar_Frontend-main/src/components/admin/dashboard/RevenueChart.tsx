import React from 'react';
import { useAdminStore } from '@store/adminStore';
import Card from '@components/common/Card';
import { formatCurrency } from '@utils/formatters';
import { TrendingUp, Calendar } from 'lucide-react';

const formatPercent = (value?: number) => {
  if (
    value === undefined ||
    value === null ||
    Number.isNaN(value) ||
    !Number.isFinite(value)
  ) {
    return '—';
  }
  const rounded = value.toFixed(1);
  const numeric = Number(rounded);
  const sign = numeric > 0 ? '+' : '';
  return `${sign}${rounded}%`;
};

export const RevenueChart: React.FC = () => {
  const { orderStats } = useAdminStore();

  const weeklyBreakdown =
    orderStats?.weekly_revenue_breakdown && orderStats.weekly_revenue_breakdown.length
      ? orderStats.weekly_revenue_breakdown
      : [
          { label: 'Mon', date: '', total: 0 },
          { label: 'Tue', date: '', total: 0 },
          { label: 'Wed', date: '', total: 0 },
          { label: 'Thu', date: '', total: 0 },
          { label: 'Fri', date: '', total: 0 },
          { label: 'Sat', date: '', total: 0 },
          { label: 'Sun', date: '', total: 0 },
        ];

  const maxRevenue = Math.max(
    ...weeklyBreakdown.map((day) => day.total || 0),
    1
  );

  return (
    <Card padding="lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-text">
          Weekly Revenue
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar size={16} />
          <span>Last 7 Days</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">This Week</p>
          <p className="font-heading text-2xl font-bold text-blue-600">
            {formatCurrency(orderStats?.weekly_revenue || 0)}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">This Month</p>
          <p className="font-heading text-2xl font-bold text-green-600">
            {formatCurrency(orderStats?.monthly_revenue || 0)}
          </p>
          <p className="text-sm font-semibold text-green-600">
            {formatPercent(orderStats?.monthly_growth_percent)}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Growth</p>
          <div className="flex items-center space-x-1">
            <TrendingUp className="text-purple-600" size={20} />
            <p className="font-heading text-2xl font-bold text-purple-600">
              {formatPercent(orderStats?.weekly_growth_percent)}
            </p>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="space-y-4">
        {weeklyBreakdown.map((day) => {
          const revenue = day.total || 0;
          const width =
            revenue > 0 ? Math.max((revenue / maxRevenue) * 100, 8) : 0;

          return (
            <div key={day.label} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-700">
                {day.label}
              </div>
              <div className="flex-1">
                <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-600 rounded-lg transition-all duration-500 flex items-center justify-end px-3"
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
  );
};
