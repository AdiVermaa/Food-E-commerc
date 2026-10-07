'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { demoSubscriptions } from '@/lib/demoData';
import { FaUtensils, FaClock, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

export default function UserDashboard() {
  const { user, userData } = useAuth();

  const activeSub = demoSubscriptions.find((s) => s.status === 'active') || demoSubscriptions[0];

  return (
    <div className="min-h-screen py-10 bg-warm-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-warm-gray-900">
              Welcome back, {userData?.name || 'Rahul'}! 👋
            </h1>
            <p className="text-sm text-warm-gray-500 mt-1">
              Manage your active tiffin subscription, delivery address, and daily meal schedule.
            </p>
          </div>
          <Link
            href="/plans"
            className="px-5 py-2.5 gradient-saffron text-white text-sm font-bold rounded-xl shadow-md hover:opacity-95 transition-all shrink-0"
          >
            Explore Tiffin Plans 🍱
          </Link>
        </div>

        {/* Active Subscription Banner */}
        {activeSub ? (
          <div className="bg-gradient-to-r from-saffron-600 to-saffron-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-3">
                  <FaCheckCircle className="text-fresh-400" /> Active Subscription
                </div>
                <h3 className="font-heading font-bold text-2xl">{activeSub.planName}</h3>
                <p className="text-saffron-100 text-sm mt-1">
                  Daily Tiffin Delivery to: <span className="font-medium text-white">{activeSub.deliveryAddress}</span>
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shrink-0">
                <p className="text-xs text-saffron-100">Plan Valid Until</p>
                <p className="font-heading font-bold text-lg text-white">
                  {new Date(activeSub.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <button className="mt-2 text-xs bg-white text-saffron-800 font-bold px-3 py-1 rounded-lg hover:bg-saffron-50 transition-colors">
                  Pause Plan / Out of Town
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-cream-100 rounded-3xl p-6 text-center border border-cream-200">
            <p className="text-warm-gray-700 font-bold mb-2">No Active Tiffin Plan</p>
            <p className="text-sm text-warm-gray-500 mb-4">Fix your weekly or monthly tiffin plan and get home-cooked Bihari food delivered daily!</p>
            <Link href="/plans" className="inline-block px-5 py-2.5 bg-saffron-500 text-white font-bold text-sm rounded-xl hover:bg-saffron-600 transition-colors">
              Fix Your Tiffin Plan
            </Link>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-cream-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-saffron-100 text-saffron-600 flex items-center justify-center text-xl">
              <FaUtensils />
            </div>
            <div>
              <p className="text-xs text-warm-gray-400 font-medium">Tiffins Received</p>
              <p className="font-heading font-bold text-2xl text-warm-gray-900">22</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-fresh-100 text-fresh-600 flex items-center justify-center text-xl">
              <FaCalendarAlt />
            </div>
            <div>
              <p className="text-xs text-warm-gray-400 font-medium">Active Days Left</p>
              <p className="font-heading font-bold text-2xl text-warm-gray-900">14 Days</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-spice-100 text-spice-600 flex items-center justify-center text-xl">
              <FaClock />
            </div>
            <div>
              <p className="text-xs text-warm-gray-400 font-medium">Today&apos;s Lunch Dispatch</p>
              <p className="font-heading font-bold text-lg text-fresh-600">12:30 PM (On Time)</p>
            </div>
          </div>
        </div>

        {/* My Tiffin Subscription Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-xl text-warm-gray-900">My Subscribed Tiffin Details</h3>
          <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-warm-gray-500">Plan Name:</span>
              <span className="font-bold text-warm-gray-900">{activeSub.planName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm-gray-500">Subscribed Amount:</span>
              <span className="font-bold text-saffron-700">₹{activeSub.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm-gray-500">Delivery Address:</span>
              <span className="font-medium text-warm-gray-800">{activeSub.deliveryAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm-gray-500">Special Note:</span>
              <span className="font-medium text-warm-gray-800">{activeSub.instructions || 'Delivered before college class'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
