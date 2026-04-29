import React from 'react';
import { useAdminStore } from '@store/adminStore';
import Card from '@components/common/Card';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

export const OrderStats: React.FC = () => {
  const { orderStats } = useAdminStore();

  const statuses = [
    {
      label: 'Pending',
      count: orderStats?.pending_orders || 0,
      icon: <Clock size={24} />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Confirmed',
      count: orderStats?.confirmed_orders || 0,
      icon: <Package size={24} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Out for Delivery',
      count: orderStats?.out_for_delivery_orders || 0,
      icon: <Truck size={24} />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Completed',
      count: orderStats?.completed_orders || 0,
      icon: <CheckCircle size={24} />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Cancelled',
      count: orderStats?.cancelled_orders || 0,
      icon: <XCircle size={24} />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <Card padding="lg">
      <h2 className="font-heading text-2xl font-bold text-text mb-6">
        Order Status Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {statuses.map((status, index) => (
          <div
            key={index}
            className={`${status.bgColor} rounded-lg p-4 text-center transition-transform hover:scale-105`}
          >
            <div className={`${status.color} flex justify-center mb-3`}>
              {status.icon}
            </div>
            <p className="font-heading text-3xl font-bold text-text mb-1">
              {status.count}
            </p>
            <p className="text-sm text-gray-600">{status.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
