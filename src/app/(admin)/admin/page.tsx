'use client';

import { dashboardStats, demoSubscriptions } from '@/lib/demoData';
import Link from 'next/link';
import {
  HiOutlineCurrencyRupee,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineTrendingUp,
} from 'react-icons/hi';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function AdminDashboardPage() {
  const chartData = [
    { day: 'Mon', revenue: 4200, deliveries: 24 },
    { day: 'Tue', revenue: 5100, deliveries: 24 },
    { day: 'Wed', revenue: 3900, deliveries: 24 },
    { day: 'Thu', revenue: 6400, deliveries: 24 },
    { day: 'Fri', revenue: 5800, deliveries: 24 },
    { day: 'Sat', revenue: 7200, deliveries: 24 },
    { day: 'Sun', revenue: 0, deliveries: 0 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title & Date Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl lg:text-3xl text-warm-gray-900">
            Tiffin Business Dashboard 📈
          </h1>
          <p className="text-xs text-warm-gray-500 mt-1">
            Real-time analytics & operations overview for Archana&apos;s Zaika (Kharghar Sector 35E)
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-saffron-500 text-white font-semibold rounded-xl text-xs shadow-md hover:bg-saffron-600 transition-colors"
          >
            Today&apos;s Tiffin Dispatches ({dashboardStats.pendingDeliveries})
          </Link>
          <Link
            href="/admin/plans"
            className="px-4 py-2 bg-white text-warm-gray-700 font-semibold border border-cream-200 rounded-xl text-xs hover:bg-cream-50 transition-colors"
          >
            ✏️ Edit Weekly Schedule
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-warm-gray-500">Monthly Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-saffron-100 text-saffron-600 flex items-center justify-center">
              <HiOutlineCurrencyRupee className="w-5 h-5" />
            </div>
          </div>
          <p className="font-heading font-bold text-2xl text-warm-gray-900">₹{dashboardStats.totalRevenue}</p>
          <p className="text-[11px] text-fresh-600 font-semibold flex items-center gap-1">
            <HiOutlineTrendingUp /> +14.2% recurring growth
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-warm-gray-500">Active Subscribers</span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <HiOutlineClock className="w-5 h-5" />
            </div>
          </div>
          <p className="font-heading font-bold text-2xl text-warm-gray-900">{dashboardStats.activeSubscriptions}</p>
          <p className="text-[11px] text-purple-600 font-semibold">Weekly & Monthly Customers</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-warm-gray-500">Today Tiffin Dispatches</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <HiOutlineShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="font-heading font-bold text-2xl text-warm-gray-900">24 Tiffins</p>
          <p className="text-[11px] text-warm-gray-400 font-medium">12 Lunch + 12 Dinner</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-warm-gray-500">Total Customers</span>
            <div className="w-8 h-8 rounded-lg bg-fresh-100 text-fresh-600 flex items-center justify-center">
              <HiOutlineUsers className="w-5 h-5" />
            </div>
          </div>
          <p className="font-heading font-bold text-2xl text-warm-gray-900">{dashboardStats.totalUsers}</p>
          <p className="text-[11px] text-fresh-600 font-semibold">+8 new in Kharghar Sec 35</p>
        </div>
      </div>

      {/* Revenue Chart & Active Subscribers Feed */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-cream-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading font-bold text-lg text-warm-gray-900">Weekly Tiffin Revenue</h3>
            <span className="text-xs font-medium text-warm-gray-400">Mon - Sun</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F4" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716C' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716C' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1C1917', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <Bar dataKey="revenue" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Subscribers Feed */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-cream-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-cream-100 pb-3">
            <h3 className="font-heading font-bold text-base text-warm-gray-900">Active Subscribers</h3>
            <Link href="/admin/subscriptions" className="text-xs font-bold text-saffron-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {demoSubscriptions.map((sub) => (
              <div key={sub.id} className="p-3 bg-cream-50 rounded-xl border border-cream-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-xs text-saffron-900">{sub.id}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full badge-delivered">
                    {sub.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-warm-gray-800">{sub.userName}</p>
                <p className="text-[11px] text-warm-gray-500 font-medium">{sub.planName}</p>
                <div className="flex justify-between text-[11px] pt-1 text-warm-gray-600 border-t border-cream-200/60">
                  <span>{sub.deliveryArea}</span>
                  <span className="font-bold text-saffron-700">₹{sub.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
