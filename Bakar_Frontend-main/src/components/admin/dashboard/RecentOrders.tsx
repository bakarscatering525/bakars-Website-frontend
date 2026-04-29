import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '@store/adminStore';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import { formatCurrency, formatDate, formatTime } from '@utils/formatters';
import { Eye } from 'lucide-react';
import {
  getOrderDisplayNumber,
  getOrderTotalWithAddOns,
  getOrderTypeDescription,
} from '@utils/orderHelpers';

export const RecentOrders: React.FC = () => {
  const navigate = useNavigate();
  const { allOrders, fetchAllOrders, isLoading } = useAdminStore();

  useEffect(() => {
    fetchAllOrders({
      status: undefined,
      date_from: undefined,
      date_to: undefined,
    });
  }, []);

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      out_for_delivery: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card padding="lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-text">
          Recent Orders
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/admin/orders')}
        >
          View All Orders
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading orders...</div>
      ) : allOrders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No orders found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Order #
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Customer
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allOrders.slice(0, 10).map((order: any) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-mono text-sm">
                    {getOrderDisplayNumber(order)}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-text">
                        {order.user_name || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.user_email}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm">
                      {getOrderTypeDescription(order)}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    {formatCurrency(getOrderTotalWithAddOns(order))}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                        order.status
                      )}`}
                    >
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {formatDate(order.created_at)} at {formatTime(order.created_at)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                    >
                      <Eye size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
