'use client';

import { useState } from 'react';
import { demoSubscriptions as initialSubs } from '@/lib/demoData';
import { Subscription } from '@/types';
import toast from 'react-hot-toast';

export default function AdminSubscriptionsPage() {
  const [subs, setSubs] = useState<Subscription[]>(initialSubs);

  const handleToggleStatus = (id: string) => {
    setSubs((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'active' ? 'paused' : 'active' }
          : s
      )
    );
    toast.success('Subscription status updated');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading font-bold text-2xl lg:text-3xl text-warm-gray-900">
          Active Tiffin Subscriptions 🗓️
        </h1>
        <p className="text-xs text-warm-gray-500 mt-1">
          Monitor recurring monthly/weekly meal subscriptions for students and bachelors in Kharghar.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-50 text-warm-gray-600 font-heading text-xs uppercase tracking-wider border-b border-cream-200">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Plan Name</th>
              <th className="p-4">Meal Type</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100 text-warm-gray-800">
            {subs.map((sub) => (
              <tr key={sub.id} className="hover:bg-cream-50/50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-warm-gray-900">{sub.userName}</p>
                  <p className="text-xs text-warm-gray-400">{sub.userPhone}</p>
                </td>
                <td className="p-4 font-medium">{sub.planName}</td>
                <td className="p-4 capitalize text-warm-gray-600">{sub.mealType}</td>
                <td className="p-4 text-xs text-warm-gray-500">
                  {new Date(sub.startDate).toLocaleDateString()} - {new Date(sub.endDate).toLocaleDateString()}
                </td>
                <td className="p-4 font-bold text-saffron-700">₹{sub.amount}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                      sub.status === 'active' ? 'bg-fresh-100 text-fresh-700' : 'bg-warm-gray-200 text-warm-gray-700'
                    }`}
                  >
                    {sub.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleToggleStatus(sub.id)}
                    className="px-3 py-1 bg-cream-100 text-warm-gray-700 font-semibold rounded-lg text-xs hover:bg-saffron-100 hover:text-saffron-800 transition-colors"
                  >
                    {sub.status === 'active' ? 'Pause Plan' : 'Resume Plan'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
