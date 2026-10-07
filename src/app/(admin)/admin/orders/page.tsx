'use client';

import { useState } from 'react';
import { demoSubscriptions as initialSubs } from '@/lib/demoData';
import { Subscription } from '@/types';
import toast from 'react-hot-toast';
import { HiOutlineCheck, HiOutlineTruck, HiOutlineClock } from 'react-icons/hi';
import { FaPhone } from 'react-icons/fa';

export default function AdminDailyDeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Subscription[]>(initialSubs);
  const [deliveryFilter, setDeliveryFilter] = useState<'all' | 'lunch' | 'dinner'>('all');

  const handleMarkDeliveredToday = (id: string) => {
    toast.success('Today\'s tiffin marked as delivered to subscriber! 🚚');
  };

  const filtered = deliveryFilter === 'all'
    ? deliveries
    : deliveries.filter((d) => d.mealType === deliveryFilter || d.mealType === 'both');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl lg:text-3xl text-warm-gray-900">
            Today&apos;s Tiffin Delivery Dispatch 🚚
          </h1>
          <p className="text-xs text-warm-gray-500 mt-1">
            Track daily lunch & dinner tiffin dispatch to active subscribers in Kharghar.
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(['all', 'lunch', 'dinner'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setDeliveryFilter(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                deliveryFilter === type
                  ? 'gradient-saffron text-white shadow-sm'
                  : 'bg-white text-warm-gray-600 border border-cream-200 hover:bg-cream-50'
              }`}
            >
              {type === 'all' ? 'All Deliveries' : `${type} Dispatch`}
            </button>
          ))}
        </div>
      </div>

      {/* Tiffin Delivery List Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filtered.map((sub) => (
          <div key={sub.id} className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm space-y-4">
            <div className="flex justify-between items-start border-b border-cream-100 pb-3">
              <div>
                <span className="font-mono font-bold text-xs text-saffron-800">{sub.id}</span>
                <h4 className="font-bold text-warm-gray-900 text-base mt-0.5">{sub.userName}</h4>
                <a href={`tel:${sub.userPhone}`} className="text-xs text-saffron-600 font-bold hover:underline flex items-center gap-1 mt-0.5">
                  <FaPhone className="text-[10px]" /> {sub.userPhone}
                </a>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-fresh-100 text-fresh-700 uppercase">
                  {sub.mealType === 'both' ? 'Lunch + Dinner' : sub.mealType}
                </span>
                <p className="text-xs font-bold text-warm-gray-500 mt-1">{sub.planName}</p>
              </div>
            </div>

            {/* Delivery Address & Instructions */}
            <div className="bg-cream-50 rounded-xl p-3 text-xs space-y-1">
              <p className="text-warm-gray-800">
                📍 <strong>Address:</strong> {sub.deliveryAddress} ({sub.deliveryArea})
              </p>
              {sub.instructions && (
                <p className="text-saffron-900 bg-saffron-100/60 p-2 rounded-lg font-medium mt-1">
                  💬 Note: {sub.instructions}
                </p>
              )}
            </div>

            {/* Dispatch Buttons */}
            <div className="pt-2 border-t border-cream-100 flex gap-2">
              <button
                onClick={() => handleMarkDeliveredToday(sub.id)}
                className="flex-1 py-2.5 bg-fresh-600 text-white rounded-xl text-xs font-bold hover:bg-fresh-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <HiOutlineCheck /> Mark Today&apos;s Tiffin Delivered ✅
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
