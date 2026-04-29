import React, { useMemo } from 'react';
import { Order } from '@models/order.types';
import { formatCurrency, formatDate, formatTime } from '@utils/formatters';
import Button from '@components/common/Button';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  DollarSign,
  Calendar,
  FileText,
} from 'lucide-react';
import {
  getOrderAddOnTotal,
  getOrderDeliveryFee,
  getOrderDisplayNumber,
  getOrderSubtotalWithAddOns,
  getOrderTotalWithAddOns,
  getOrderTypeDescription,
  getPlanTypeLabel,
  getOrderTaxAmount,
} from '@utils/orderHelpers';

interface OrderDetailsProps {
  order: Order;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
  onClose: () => void;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  onStatusUpdate,
  onClose,
}) => {
  const getAddOns = (source: any): any[] => {
    if (!source) return [];
    const candidates = [
      source.sidelines,
      source.add_ons,
      source.addOns,
      source.addons,
      source.add_on_items,
      source.addOnItems,
    ].filter(Array.isArray);
    if (!candidates.length) return [];
    const merged = candidates.flat();
    const deduped = new Map<string, any>();
    merged.forEach((item: any, idx: number) => {
      const key =
        item._id ||
        item.id ||
        item.item_id ||
        item.itemId ||
        item.menu_item_id ||
        `${item.item_name || item.name || 'add-on'}-${idx}`;
      if (!deduped.has(String(key))) {
        deduped.set(String(key), item);
      }
    });
    return Array.from(deduped.values());
  };

  const deliveryMethod =
    order.delivery_method || order.delivery_option || 'delivery';
  const planLabel =
    order.order_type === 'meal_subscription'
      ? getPlanTypeLabel(order)
      : null;
  const hasDeliverySlots =
    order.order_type === 'meal_subscription' &&
    Array.isArray(order.delivery_slots) &&
    order.delivery_slots.length > 0;

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'text-yellow-600 bg-yellow-50',
      confirmed: 'text-blue-600 bg-blue-50',
      preparing: 'text-purple-600 bg-purple-50',
      out_for_delivery: 'text-indigo-600 bg-indigo-50',
      delivered: 'text-green-600 bg-green-50',
      cancelled: 'text-red-600 bg-red-50',
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  const menuLookup = useMemo(() => {
    const map = new Map<string, { name: string; price?: number; category?: string }>();
    const allItems = [...(order.items || []), ...getAddOns(order)];
    allItems.forEach((item: any) => {
      const id =
        item.menu_item_id ||
        item.menuItemId ||
        item.item_id ||
        item.itemId ||
        item.menu_item?._id ||
        item.menu_item?.id ||
        item._id;
      if (!id || map.has(String(id))) return;
      map.set(String(id), {
        name: item.menu_item?.name || item.item_name || item.name || 'Item',
        price: item.price || item.menu_item?.price,
        category: item.category,
      });
    });
    return map;
  }, [order.items, order.sidelines]);

  const addOnTotal = useMemo(() => getOrderAddOnTotal(order), [order]);
  const subtotalWithAddOns = useMemo(
    () => getOrderSubtotalWithAddOns(order),
    [order]
  );
  const taxAmount = useMemo(() => getOrderTaxAmount(order), [order]);
  const totalWithAddOns = useMemo(
    () => getOrderTotalWithAddOns(order),
    [order]
  );
  const deliveryFee = useMemo(() => getOrderDeliveryFee(order), [order]);

  const renderDeliverySlotMeals = () => {
    if (!hasDeliverySlots) return null;
    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
          <Package size={20} className="text-primary" />
          <span>Meals by Delivery Date</span>
        </h3>
        <div className="space-y-3">
          {order.delivery_slots?.map((slot, idx) => {
            const entries = Object.entries(slot.menu_items || {});
            return (
              <div
                key={`${slot.delivery_date}-${idx}`}
                className="bg-white rounded-lg border border-gray-100"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div>
                    <p className="font-semibold text-text">
                      {formatDate(slot.delivery_date)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {entries.length} meal{entries.length === 1 ? '' : 's'} selected
                    </p>
                  </div>
                  {slot.notes ? (
                    <p className="text-xs text-gray-500 italic text-right max-w-sm">
                      {slot.notes}
                    </p>
                  ) : null}
                </div>
                {entries.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No meals recorded for this delivery.
                  </div>
                ) : (
                  <div className="divide-y">
                    {entries.map(([menuId, qty], entryIdx) => {
                      const meta = menuLookup.get(String(menuId));
                      const name = meta?.name || 'Meal';
                      return (
                        <div
                          key={`${slot.delivery_date}-${menuId}-${entryIdx}`}
                          className="flex items-center justify-between px-4 py-3 text-sm"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-text">{name}</p>
                            {meta?.category && (
                              <p className="text-xs text-gray-500">{meta.category}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Qty: {qty}</p>
                            {meta?.price ? (
                              <p className="font-semibold text-primary">
                                {formatCurrency(Number(meta.price) * Number(qty || 0))}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-heading text-3xl font-bold text-text">
            Order #{getOrderDisplayNumber(order)}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Placed on {formatDate(order.created_at)} at{' '}
            {formatTime(order.created_at)} · {getOrderTypeDescription(order)}
          </p>
        </div>
        <div
          className={`px-4 py-2 rounded-full ${getStatusColor(order.status)}`}
        >
          <span className="font-semibold uppercase text-sm">
            {order.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
          <User size={20} className="text-primary" />
          <span>Customer Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3">
            <User size={16} className="text-gray-400" />
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium text-text">
                {order.user_name || 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail size={16} className="text-gray-400" />
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-text">
                {order.user_email || 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone size={16} className="text-gray-400" />
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium text-text">
                {order.user_phone || 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar size={16} className="text-gray-400" />
            <div>
              <p className="text-gray-500">Order Date</p>
              <p className="font-medium text-text">
                {formatDate(order.created_at)} at {formatTime(order.created_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Package size={16} className="text-gray-400" />
            <div>
              <p className="text-gray-500">Order Type</p>
              <p className="font-medium text-text">
                {getOrderTypeDescription(order)}
              </p>
            </div>
          </div>

          {planLabel && (
            <div className="flex items-center space-x-3">
              <FileText size={16} className="text-gray-400" />
              <div>
                <p className="text-gray-500">Selected Plan</p>
                <p className="font-medium text-text">{planLabel}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delivery Information */}
      {order.delivery_address && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
            <MapPin size={20} className="text-primary" />
            <span>Delivery Information</span>
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Delivery Method</p>
              <p className="font-medium text-text capitalize">
                {deliveryMethod.replace('_', ' ')}
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Address</p>
              <p className="font-medium text-text">
                {order.delivery_address.street}
                <br />
                {order.delivery_address.suburb}, {order.delivery_address.state}{' '}
                {order.delivery_address.postcode}
              </p>
            </div>

            {order.delivery_instructions && (
              <div>
                <p className="text-gray-500 mb-1">Delivery Instructions</p>
                <p className="font-medium text-text italic">
                  {order.delivery_instructions}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delivery Slots for Meal Subscriptions */}
      {hasDeliverySlots && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
            <Calendar size={20} className="text-primary" />
            <span>Delivery Schedule</span>
          </h3>
          <div className="space-y-3 text-sm">
            {order.delivery_slots?.map((slot, idx) => {
              const itemsCount = Object.values(slot.menu_items || {}).reduce(
                (sum, qty) => sum + Number(qty || 0),
                0
              );
              return (
                <div
                  key={`${slot.delivery_date}-${idx}`}
                  className="flex items-center justify-between bg-white p-3 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-text">
                      {formatDate(slot.delivery_date)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Items selected: {itemsCount}
                    </p>
                  </div>
                  {slot.notes ? (
                    <p className="text-xs text-gray-500 italic max-w-sm text-right">
                      {slot.notes}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Order Items */}
      {hasDeliverySlots ? (
        renderDeliverySlotMeals()
      ) : (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
            <Package size={20} className="text-primary" />
            <span>Order Items</span>
          </h3>

          <div className="space-y-3">
            {order.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-text">{item.item_name}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="font-semibold text-primary">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            {order.sidelines && order.sidelines.length > 0 && (
              <>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Add-ons:
                  </p>
                </div>
                {order.sidelines.map((sideline: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-3 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-text">
                        {sideline.item_name}
                      </p>
                      <p className="text-xs text-gray-500">Sideline</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Qty: {sideline.quantity}
                      </p>
                      <p className="font-semibold text-primary">
                        {formatCurrency(sideline.price * sideline.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* Add-ons (charged separately) */}
      {(() => {
        const addOns = getAddOns(order);
        if (!addOns.length) return null;
        return (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
              <Package size={20} className="text-primary" />
              <span>Add-ons (charged separately)</span>
            </h3>
            <div className="space-y-3">
              {addOns.map((sideline: any, index: number) => (
                <div
                  key={`sideline-${sideline._id || index}`}
                  className="flex items-center justify-between bg-white p-3 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-text">
                      {sideline.item_name || sideline.name || 'Add-on'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {sideline.quantity ?? 1}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      {formatCurrency(
                        (sideline.subtotal ??
                          sideline.price ??
                          sideline.item_price ??
                          sideline.menu_item?.price ??
                          0) * (sideline.quantity ?? 1)
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200 text-sm font-semibold text-text">
              <span>Add-ons total</span>
              <span>{formatCurrency(addOnTotal)}</span>
            </div>
          </div>
        );
      })()}

      {/* Payment Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
          <DollarSign size={20} className="text-primary" />
          <span>Payment Summary</span>
        </h3>

        <div className="space-y-3 text-sm">
          {order.order_type === 'meal_subscription' && (order as any).plan_price_total !== undefined && (
            <div className="flex justify-between">
              <span className="text-gray-600">Plan price:</span>
              <span className="font-medium">
                {formatCurrency(Number((order as any).plan_price_total) || 0)}
              </span>
            </div>
          )}
          {addOnTotal > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Add-ons (charged separately):</span>
              <span className="font-medium">{formatCurrency(addOnTotal)}</span>
            </div>
          )}
          {order.order_type === 'meal_subscription' && (order.extra_boxes_price ?? 0) > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Extra Boxes ({order.extra_boxes ?? 0}):
              </span>
              <span className="font-medium">{formatCurrency(order.extra_boxes_price ?? 0)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">
              {formatCurrency(subtotalWithAddOns)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee:</span>
            <span className="font-medium">
              {formatCurrency(deliveryFee)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (GST 10%):</span>
            <span className="font-medium">
              {formatCurrency(taxAmount)}
            </span>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-text text-lg">Total:</span>
              <span className="font-heading text-3xl font-bold text-primary">
                {formatCurrency(totalWithAddOns)}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${order.payment_status === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : order.payment_status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
              >
                {order.payment_status.toUpperCase()}
              </span>
            </div>
          </div>

          {order.payment_intent_id && (
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Payment ID:</span>
              <span className="font-mono text-gray-700">
                {order.payment_intent_id}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      {(order.notes || order.admin_notes) && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-text mb-4 flex items-center space-x-2">
            <FileText size={20} className="text-primary" />
            <span>Notes</span>
          </h3>

          {order.notes && (
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Customer Notes:</p>
              <p className="text-sm text-text">{order.notes}</p>
            </div>
          )}

          {order.admin_notes && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Admin Notes:</p>
              <p className="text-sm text-text">{order.admin_notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3 pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Close
        </Button>

        {order.status !== 'delivered' && order.status !== 'cancelled' && (
          <div className="flex-1">
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={order.status}
              onChange={(e) => onStatusUpdate(order._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancel Order</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
