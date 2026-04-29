import React from 'react';
import { Order } from '@models/order.types';
import { formatCurrency, formatDate, formatTime } from '@utils/formatters';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import LoadingScreen from '@components/common/LoadingScreen';
import { Eye, Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { getOrderDisplayNumber, getOrderTotalWithAddOns, getOrderTypeDescription } from '@utils/orderHelpers';

interface OrdersListProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
  isLoading: boolean;
  isUpdating: boolean;
}

export const OrdersList: React.FC<OrdersListProps> = ({
  orders,
  onViewOrder,
  onStatusUpdate,
  isLoading,
  isUpdating,
}) => {
  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock className="text-yellow-500" size={20} />,
      confirmed: <CheckCircle className="text-blue-500" size={20} />,
      preparing: <Package className="text-purple-500" size={20} />,
      out_for_delivery: <Truck className="text-indigo-500" size={20} />,
      delivered: <CheckCircle className="text-green-500" size={20} />,
      cancelled: <XCircle className="text-red-500" size={20} />,
    };
    return icons[status as keyof typeof icons] || <Package size={20} />;
  };

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      out_for_delivery: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentBadgeColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
      partially_paid: 'bg-orange-100 text-orange-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getOrderTypeBadgeClass = (type: string) => {
    const classes = {
      daily_menu: 'bg-amber-50 text-amber-700 border border-amber-100',
      meal_subscription: 'bg-purple-50 text-purple-700 border border-purple-100',
      special_catering: 'bg-blue-50 text-blue-700 border border-blue-100',
    };
    return classes[type as keyof typeof classes] || 'bg-gray-50 text-gray-700 border border-gray-100';
  };

  if (isLoading) {
    return (
      <Card padding="lg">
        <LoadingScreen variant="section" message="Loading orders..." />
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card padding="lg">
        <div className="text-center py-12">
          <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-600 text-lg mb-2">No orders found</p>
          <p className="text-sm text-gray-500">
            Orders will appear here when customers place them
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order: any) => (
        <Card
          key={order._id}
          padding="lg"
          className="hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            {/* Left Section - Order Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <h3 className="font-heading text-xl font-bold text-text">
                    #{getOrderDisplayNumber(order)}
                  </h3>
                </div>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getOrderTypeBadgeClass(order.order_type)}`}
                >
                  {getOrderTypeDescription(order)}
                </span>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(order.status)}`}
                >
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPaymentBadgeColor(order.payment_status)}`}
                >
                  {order.payment_status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Customer</p>
                  <p className="font-semibold text-text">
                    {order.user_name || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">{order.user_email}</p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-text">
                    {formatDate(order.created_at)} at {formatTime(order.created_at)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Total Amount</p>
                  <p className="font-heading text-2xl font-bold text-primary">
                    {formatCurrency(getOrderTotalWithAddOns(order))}
                  </p>
                  {order.order_type === 'meal_subscription' &&
                    (order.extra_boxes_price ?? 0) > 0 && (
                      <p className="text-xs text-primary mt-1">
                        Extras: {formatCurrency(Number(order.extra_boxes_price) || 0)}
                      </p>
                    )}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <Package size={16} />
                <span>{order.items?.length || 0} items</span>
                {order.sidelines && order.sidelines.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{order.sidelines.length} add-ons</span>
                  </>
                )}
                {order.delivery_method && (
                  <>
                    <span>•</span>
                    <span className="capitalize">
                      {order.delivery_method.replace('_', ' ')}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex flex-col space-y-2 w-full md:w-52 md:ml-4">
              <Button
                variant="primary"
                size="sm"
                onClick={() => onViewOrder(order)}
                fullWidth
              >
                <Eye size={16} className="mr-2" />
                View Details
              </Button>

              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent w-full"
                  value={order.status}
                  onChange={(e) => onStatusUpdate(order._id, e.target.value)}
                  disabled={isUpdating}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancel</option>
                </select>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
