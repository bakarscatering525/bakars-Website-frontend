import React, { useEffect } from 'react';
import { useOrderStore } from '@store/orderStore';
import { formatCurrency, formatDate, formatTime } from '@utils/formatters';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import LoadingScreen from '@components/common/LoadingScreen';
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '@components/common/Modal';
import type { Order } from '@models/order.types';
import {
  getOrderTypeDescription,
  getOrderDisplayNumber,
  getOrderTotalWithAddOns,
  getOrderSubtotalWithAddOns,
  getPlanTypeLabel,
  getOrderTaxAmount,
  getOrderAddOnTotal,
} from '@utils/orderHelpers';

const OrderHistory: React.FC = () => {
  const {
    orderHistory,
    fetchOrderHistory,
    isLoadingHistory,
    orderHistoryTotal,
    orderHistoryPage,
    orderHistoryPageSize,
  } = useOrderStore();
  const navigate = useNavigate();
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const canEditMealSubscription = (order?: Order | null) => {
    if (!order || order.order_type !== 'meal_subscription') {
      return false;
    }
    const normalizedStatus = order.status?.toLowerCase() ?? '';
    return !['delivered', 'cancelled'].includes(normalizedStatus);
  };

  const navigateToMealPlanEditor = (order: Order) => {
    navigate('/menu/meals', { state: { editOrderId: order._id } });
  };

  useEffect(() => {
    fetchOrderHistory(1);
  }, [fetchOrderHistory]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      (orderHistoryTotal || 0) /
      (orderHistoryPageSize || 1),
    ),
  );

  const paginationRangeStart =
    orderHistoryTotal === 0
      ? 0
      : (orderHistoryPage - 1) * orderHistoryPageSize + 1;
  const paginationRangeEnd = Math.min(
    orderHistoryTotal,
    orderHistoryPage * orderHistoryPageSize,
  );

  const handlePageChange = (newPage: number) => {
    if (
      newPage < 1 ||
      newPage > totalPages ||
      isLoadingHistory
    ) {
      return;
    }
    fetchOrderHistory(newPage);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'pending':
      case 'confirmed':
        return 'text-blue-600 bg-blue-50';
      case 'preparing':
      case 'out_for_delivery':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      case 'preparing':
      case 'out_for_delivery':
        return <Clock size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const getOrderTypeBadgeClass = (orderType?: Order['order_type']) => {
    switch (orderType) {
      case 'meal_subscription':
        return 'bg-purple-50 text-purple-700 border border-purple-100';
      case 'daily_menu':
        return 'bg-amber-50 text-amber-700 border border-amber-100';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  const effectivePlanUnitPrice = React.useMemo(() => {
    if (!selectedOrder || selectedOrder.order_type !== 'meal_subscription') {
      return null;
    }
    const aggregatedItems = [
      ...(selectedOrder.items || []),
      ...(selectedOrder.sidelines || []),
    ];
    const totalBoxes = aggregatedItems.reduce(
      (sum, item: any) => sum + (item.quantity || 0),
      0
    );
    const subtotal = Number(selectedOrder.subtotal ?? 0);
    if (subtotal > 0 && totalBoxes > 0) {
      return subtotal / totalBoxes;
    }
    return null;
  }, [selectedOrder]);

  const getLineTotal = (item: any) => {
    const quantity = item.quantity || 1;
    const hasSubtotal = typeof item.subtotal === 'number' && item.subtotal > 0;
    if (hasSubtotal) {
      return item.subtotal;
    }
    const basePrice =
      item.price ??
      item.item_price ??
      item.menu_item?.price ??
      0;
    if (basePrice > 0) {
      return basePrice * quantity;
    }
    if (
      effectivePlanUnitPrice &&
      selectedOrder?.order_type === 'meal_subscription'
    ) {
      return effectivePlanUnitPrice * quantity;
    }
    return 0;
  };

  const handleEditWeeklySelections = () => {
    if (!canEditMealSubscription(selectedOrder)) {
      return;
    }
    const orderToEdit = selectedOrder as Order;
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
    navigateToMealPlanEditor(orderToEdit);
  };

  const handleQuickMealPlanEdit = (order: Order) => {
    if (!canEditMealSubscription(order)) {
      return;
    }
    navigateToMealPlanEditor(order);
  };

  const renderDeliverySchedule = (order: Order) => {
    if (order.order_type !== 'meal_subscription') return null;
    const slots = order.delivery_slots || [];
    if (!slots.length) return null;
    return (
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 space-y-2">
        <p className="text-xs font-semibold text-gray-700">Delivery schedule</p>
        {slots.map((slot, idx) => {
          const itemsCount = Object.values(slot.menu_items || {}).reduce(
            (sum, qty) => sum + Number(qty || 0),
            0
          );
          return (
            <div
              key={`${slot.delivery_date}-${idx}`}
              className="flex items-center justify-between text-xs bg-white rounded border border-gray-100 px-3 py-2"
            >
              <div className="font-semibold text-text">
                {formatDate(slot.delivery_date)}
              </div>
              <div className="text-gray-500">
                Items selected: {itemsCount}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  if (isLoadingHistory) {
    return (
      <Card padding="lg">
        <LoadingScreen variant="section" message="Loading order history..." />
      </Card>
    );
  }

  if (orderHistory.length === 0) {
    return (
      <Card padding="lg">
        <div className="text-center py-12">
          <Package className="mx-auto h-20 w-20 text-gray-300 mb-4" />
          <h3 className="font-semibold text-gray-500 mb-2">No orders yet</h3>
          <p className="text-sm text-gray-400 mb-6">
            Start ordering to see your order history
          </p>
          <Button variant="primary" onClick={() => navigate('/menu/daily')}>
            Browse Menu
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <h2 className="font-heading text-2xl font-bold text-text">
          Order History
        </h2>

        <div className="space-y-4">
          {orderHistory.map((order) => (
            <Card
              key={order._id}
              padding="lg"
              className="hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-text">
                      Order #{getOrderDisplayNumber(order)}
                    </h3>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getOrderTypeBadgeClass(
                        order.order_type
                      )}`}
                    >
                      {getOrderTypeDescription(order)}
                    </span>
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">
                        {order.status.replace('_', ' ')}
                      </span>
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {formatDate(order.created_at)} at {formatTime(order.created_at)} |{' '}
                    {(order.items?.length ?? 0) + (order.sidelines?.length ?? 0)} items |{' '}
                    {getOrderTypeDescription(order)}
                  </p>

                  <div className="space-y-1">
                    {(order.items ?? []).slice(0, 2).map((item, index) => {
                      const itemName =
                        item.item_name ||
                        (item as any).name ||
                        (item as any).menu_item?.name ||
                        'Item';
                      return (
                      <p key={index} className="text-sm text-gray-700">
                        {item.quantity}x {itemName}
                      </p>
                    );
                    })}
                    {(order.items ?? []).length > 2 && (
                      <p className="text-sm text-gray-500">
                        +{(order.items ?? []).length - 2} more items
                      </p>
                    )}
                  </div>

                  {order.order_type === 'meal_subscription' &&
                    (order.extra_boxes_price ?? 0) > 0 && (
                      <p className="text-xs text-primary mt-2">
                        Extras charged: {formatCurrency(Number(order.extra_boxes_price) || 0)}
                      </p>
                    )}
                </div>

                <div className="flex flex-col items-start md:items-end space-y-3">
                  <div className="text-right">
                    <p className="font-heading text-2xl font-bold text-primary">
                      {formatCurrency(getOrderTotalWithAddOns(order))}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.delivery_option === 'delivery'
                        ? 'Delivery'
                        : 'Pickup'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { setSelectedOrder(order as unknown as Order); setIsOrderModalOpen(true); }}
                    >
                      <Eye size={16} className="mr-2" />
                      View Details
                    </Button>
                    {/* Meal plan editing temporarily disabled */}
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {orderHistoryTotal > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
              <p className="text-sm text-gray-500">
                Showing {paginationRangeStart}-{paginationRangeEnd} of{' '}
                {orderHistoryTotal} orders
              </p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={orderHistoryPage <= 1 || isLoadingHistory}
                  onClick={() => handlePageChange(orderHistoryPage - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {orderHistoryPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    orderHistoryPage >= totalPages || isLoadingHistory
                  }
                  onClick={() => handlePageChange(orderHistoryPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        title={
          selectedOrder
            ? `Order #${getOrderDisplayNumber(selectedOrder)}`
            : 'Order Details'
        }
      >
        {!selectedOrder ? (
          <div className="py-6 text-center text-gray-600">No order selected.</div>
        ) : (
          <div className="space-y-4">
            {(() => {
              const addOnTotalInline =
                Number(selectedOrder.add_on_total ??
                  selectedOrder.add_ons_total ??
                  getOrderAddOnTotal(selectedOrder) ??
                  0) || 0;
              const planPriceInline =
                Number((selectedOrder as any).plan_price_total) || 0;
              const storedExtras =
                Number(selectedOrder.extra_boxes_price ?? 0) || 0;
              const derivedExtras = Math.max(
                0,
                Number(selectedOrder.subtotal ?? 0) - addOnTotalInline - planPriceInline
              );
              const extraDisplay = storedExtras || derivedExtras;
              return extraDisplay > 0 ? (
                <div className="rounded border border-primary/30 bg-primary/5 px-3 py-2 text-xs text-primary font-semibold">
                  Extras charged: {formatCurrency(extraDisplay)}
                </div>
              ) : null;
            })()}

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Placed on</p>
                <p className="font-medium">
                  {formatDate(selectedOrder.created_at)}{' '}
                  <span className="text-gray-500">
                    at {formatTime(selectedOrder.created_at)}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getOrderTypeBadgeClass(
                    selectedOrder.order_type
                  )}`}
                >
                  {getOrderTypeDescription(selectedOrder)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedOrder.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : selectedOrder.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                >
                  {selectedOrder.status?.toUpperCase().replace('_', ' ')}
                </span>
              </div>
            </div>

            {renderDeliverySchedule(selectedOrder)}

            <div className="divide-y border rounded">
              {[...(selectedOrder.items || []), ...(selectedOrder.sidelines || [])].map((it: any, idx: number) => {
                const displayName =
                  it.item_name || it.name || it.menu_item?.name || 'Item';
                return (
                <div key={idx} className="flex items-center justify-between p-3 text-sm">
                  <div className="text-gray-700">
                    {displayName}
                    {it.category ? <span className="text-gray-400"> • {it.category}</span> : null}
                  </div>
                  <div className="text-gray-600">x{it.quantity}</div>
                  <div className="font-medium">{formatCurrency(getLineTotal(it))}</div>
                </div>
              );
              })}
            </div>

            {selectedOrder.order_type === 'meal_subscription' && (
              <div className="rounded border border-gray-100 bg-gray-50 p-3 text-sm space-y-1">
                {(selectedOrder as any).plan_price_total !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Plan price</span>
                    <span className="font-semibold">
                      {formatCurrency(
                        Number((selectedOrder as any).plan_price_total) || 0
                      )}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Included boxes</span>
                  <span className="font-semibold">
                    {selectedOrder.total_included_boxes ??
                      selectedOrder.included_boxes ??
                      selectedOrder.subscription_included_boxes ??
                      '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Extra boxes</span>
                  <span className="font-semibold">
                    {(selectedOrder.extra_boxes ?? 0)}{' '}
                    {selectedOrder.extra_boxes_price
                      ? `(${formatCurrency(selectedOrder.extra_boxes_price)})`
                      : ''}
                  </span>
                </div>
                {(() => {
                  const addOnTotalInline =
                    Number(selectedOrder.add_on_total ??
                      selectedOrder.add_ons_total ??
                      getOrderAddOnTotal(selectedOrder) ??
                      0) || 0;
                  const planPriceInline =
                    Number((selectedOrder as any).plan_price_total) || 0;
                  const storedExtras =
                    Number(selectedOrder.extra_boxes_price ?? 0) || 0;
                  const derivedExtras = Math.max(
                    0,
                    Number(selectedOrder.subtotal ?? 0) - addOnTotalInline - planPriceInline
                  );
                  const extraDisplay = storedExtras || derivedExtras;
                  return extraDisplay > 0 ? (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Extras total</span>
                    <span className="font-semibold text-primary">
                      {formatCurrency(extraDisplay)}
                    </span>
                  </div>
                  ) : null;
                })()}
              </div>
            )}

            {(() => {
              const storedSubtotal =
                Number(selectedOrder?.subtotal ?? selectedOrder?.subtotal_amount ?? 0) || 0;
              const subtotalValue =
                storedSubtotal > 0 ? storedSubtotal : getOrderSubtotalWithAddOns(selectedOrder);
              return (
            <div className="flex items-center justify-between pt-2 text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">
                {formatCurrency(subtotalValue)}
              </span>
            </div>
              );
            })()}
            {selectedOrder.order_type === 'meal_subscription' && (selectedOrder.extra_boxes_price ?? 0) > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Extra Boxes ({selectedOrder.extra_boxes ?? 0})
                </span>
                <span className="font-medium">{formatCurrency(selectedOrder.extra_boxes_price ?? 0)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Delivery</span>
              <span className="font-medium">{formatCurrency(selectedOrder.delivery_fee || 0)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tax (GST 10%)</span>
              <span className="font-medium">
                {formatCurrency(getOrderTaxAmount(selectedOrder))}
              </span>
            </div>
            <div className="flex items-center justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                {formatCurrency(getOrderTotalWithAddOns(selectedOrder))}
              </span>
            </div>

            {/* Meal plan editing temporarily disabled */}

            <div className="pt-2 text-xs text-gray-500 space-y-1">
              <div>Order type: {getOrderTypeDescription(selectedOrder)}</div>
              {selectedOrder.order_type === 'meal_subscription' && getPlanTypeLabel(selectedOrder) && (
                <div>
                  Plan type: {getPlanTypeLabel(selectedOrder)}
                </div>
              )}
              <div>
                Delivery method:{' '}
                {String(
                  (selectedOrder as any).delivery_option ||
                  (selectedOrder as any).delivery_method ||
                  'N/A',
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default OrderHistory;

// Inline order details modal rendering at the bottom
// Render modal via a portal-like placement within this component tree
// to avoid external wiring.
