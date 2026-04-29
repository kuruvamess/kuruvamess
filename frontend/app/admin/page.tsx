'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign,
  Package,
  Clock,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  orders: {
    total: number;
    today: number;
    thisMonth: number;
  };
  revenue: {
    today: number;
    thisMonth: number;
  };
  users: {
    total: number;
  };
  menuItems: {
    total: number;
  };
}

// Mock data - replace with API calls
const mockStats: DashboardStats = {
  orders: {
    total: 1234,
    today: 45,
    thisMonth: 567
  },
  revenue: {
    today: 15600,
    thisMonth: 456000
  },
  users: {
    total: 892
  },
  menuItems: {
    total: 64
  }
};

const recentOrders = [
  { id: 'KM2412010001', customer: 'John Doe', amount: 440, status: 'preparing', time: '10 mins ago' },
  { id: 'KM2412010002', customer: 'Jane Smith', amount: 750, status: 'out-for-delivery', time: '25 mins ago' },
  { id: 'KM2412010003', customer: 'Mike Johnson', amount: 320, status: 'delivered', time: '1 hour ago' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [loading, setLoading] = useState(false);

  const statCards = [
    {
      title: 'Today\'s Revenue',
      value: `₹${stats.revenue.today.toLocaleString()}`,
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Today\'s Orders',
      value: stats.orders.today,
      change: '+8%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Users',
      value: stats.users.total,
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Menu Items',
      value: stats.menuItems.total,
      change: '0%',
      trend: 'neutral',
      icon: Package,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at your restaurant.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center text-sm ${
                card.trend === 'up' ? 'text-green-600' : card.trend === 'down' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {card.change}
                {card.trend === 'up' && <ChevronUp className="w-4 h-4 ml-1" />}
                {card.trend === 'down' && <ChevronDown className="w-4 h-4 ml-1" />}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link href="/admin/orders" className="text-primary hover:text-primary/80 text-sm">
                View All →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">#{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{order.amount}</p>
                    <p className="text-xs text-gray-500 flex items-center justify-end mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {order.time}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'out-for-delivery' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status.replace(/-/g, ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/menu/new" className="block w-full text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
              Add New Menu Item
            </Link>
            <Link href="/admin/orders" className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              View All Orders
            </Link>
            <Link href="/admin/settings" className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              Restaurant Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart Placeholder */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
          <TrendingUp className="w-8 h-8 mr-2" />
          <span>Revenue Chart Placeholder</span>
        </div>
      </div>
    </div>
  );
}
