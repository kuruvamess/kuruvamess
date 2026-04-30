'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, Truck, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Order {
  id: string;
  orderNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  orderType: 'delivery' | 'takeaway';
  createdAt: string;
  estimatedDeliveryTime: string;
}

// Mock data - replace with actual API call
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'KM2412010001',
    items: [
      { name: 'Special Chicken Biryani', quantity: 2, price: 180, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=100&h=100&fit=crop' },
      { name: 'Masala Dosa', quantity: 1, price: 80, image: 'https://images.unsplash.com/photo-1630383249904-fc01cc4d1dc4?w=100&h=100&fit=crop' }
    ],
    total: 440,
    status: 'delivered',
    orderType: 'delivery',
    createdAt: '2024-01-15T10:30:00',
    estimatedDeliveryTime: '2024-01-15T11:15:00'
  },
  {
    id: '2',
    orderNumber: 'KM2412010002',
    items: [
      { name: 'Nadan Sadhya', quantity: 3, price: 250, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=100&h=100&fit=crop' }
    ],
    total: 750,
    status: 'preparing',
    orderType: 'takeaway',
    createdAt: '2024-01-16T12:00:00',
    estimatedDeliveryTime: '2024-01-16T12:45:00'
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['pending', 'confirmed', 'preparing', 'out-for-delivery'].includes(order.status);
    if (filter === 'completed') return ['delivered', 'cancelled'].includes(order.status);
    return true;
  });

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
      case 'preparing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'out-for-delivery':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Order Pending';
      case 'confirmed':
        return 'Order Confirmed';
      case 'preparing':
        return 'Preparing Your Food';
      case 'out-for-delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'confirmed':
      case 'preparing':
        return 'text-blue-600 bg-blue-50';
      case 'out-for-delivery':
        return 'text-purple-600 bg-purple-50';
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/profile" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Profile
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-8">
            {['all', 'active', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`px-6 py-2 rounded-lg font-medium transition-all capitalize ${
                  filter === tab
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab} Orders
              </button>
            ))}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
              <p className="text-gray-600 mb-6">
                {filter === 'active' 
                  ? "You don't have any active orders right now."
                  : filter === 'completed'
                  ? "You haven't completed any orders yet."
                  : "You haven't placed any orders yet."}
              </p>
              <Link href="/menu" className="btn-primary">
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          Order #{order.orderNumber}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                          <span className="capitalize">{order.orderType}</span>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-full font-medium inline-flex items-center gap-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                          <p className="font-medium">₹{item.quantity * item.price}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Amount</span>
                      <span className="text-lg font-bold text-primary">₹{order.total}</span>
                    </div>

                    {/* Action Buttons */}
                    {order.status === 'delivered' && (
                      <div className="mt-6 flex gap-4">
                        <button className="btn-primary flex-1">
                          Reorder
                        </button>
                        <button className="btn-secondary flex-1">
                          Rate & Review
                        </button>
                      </div>
                    )}
                    
                    {['pending', 'confirmed'].includes(order.status) && (
                      <div className="mt-6">
                        <button className="text-red-600 hover:text-red-700 font-medium">
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
