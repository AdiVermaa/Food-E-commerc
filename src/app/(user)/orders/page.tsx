'use client';

import { demoSubscriptions } from '@/lib/demoData';
import Link from 'next/link';

export default function UserOrdersPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-bold text-3xl text-warm-gray-900 mb-2">My Tiffin Subscriptions 🍱</h1>
        <p className="text-warm-gray-500 mb-8">View active plans, payment history, and daily tiffin delivery status</p>

        <div className="space-y-6">
          {demoSubscriptions.map((sub) => (
            <div key={sub.id} className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-2 border-b border-cream-100 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-lg text-saffron-800">{sub.id}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-fresh-100 text-fresh-700 capitalize">
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs text-warm-gray-400 mt-1">
                    Subscribed on: {new Date(sub.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-heading font-bold text-xl text-warm-gray-900">₹{sub.amount}</p>
                  <p className="text-xs text-warm-gray-500 capitalize">Payment: {sub.paymentMethod} ({sub.paymentStatus})</p>
                </div>
              </div>

              {/* Plan info */}
              <div className="bg-cream-50 rounded-xl p-4 text-sm space-y-1">
                <p className="font-bold text-warm-gray-900">{sub.planName}</p>
                <p className="text-xs text-warm-gray-600">
                  📍 Delivering daily to: <strong>{sub.deliveryAddress}</strong>
                </p>
                {sub.instructions && (
                  <p className="text-xs text-saffron-800 italic mt-1">• &quot;{sub.instructions}&quot;</p>
                )}
              </div>

              {/* Footer Actions */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-fresh-600 font-semibold">✓ Daily Dispatch Active</span>
                <Link href="/contact" className="text-saffron-600 font-bold hover:underline">
                  Need Help or Out of Town?
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
