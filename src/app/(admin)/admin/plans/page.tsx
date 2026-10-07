'use client';

import { useState } from 'react';
import { defaultWeeklySchedule as initialSchedule, tiffinPlans as initialPlans } from '@/lib/demoData';
import { DailyMealMenu, TiffinPlan } from '@/types';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineCheck } from 'react-icons/hi';

export default function AdminWeeklySchedulePage() {
  const [schedule, setSchedule] = useState<DailyMealMenu[]>(initialSchedule);
  const [plans, setPlans] = useState<TiffinPlan[]>(initialPlans);
  const [editingDay, setEditingDay] = useState<DailyMealMenu | null>(null);

  // Modal Form state for day schedule editing
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [special, setSpecial] = useState('');

  const handleOpenEdit = (item: DailyMealMenu) => {
    setEditingDay(item);
    setLunch(item.lunch);
    setDinner(item.dinner);
    setSpecial(item.special || '');
  };

  const handleSaveDaySchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDay) return;

    setSchedule((prev) =>
      prev.map((item) =>
        item.day === editingDay.day ? { ...item, lunch, dinner, special } : item
      )
    );
    toast.success(`Updated ${editingDay.day}'s Tiffin Menu!`);
    setEditingDay(null);
  };

  const handleUpdatePlanPrice = (planId: string, newPrice: number) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, price: newPrice } : p))
    );
    toast.success('Subscription plan price updated');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading font-bold text-2xl lg:text-3xl text-warm-gray-900">
          Weekly Tiffin Schedule & Plans Management 🗓️
        </h1>
        <p className="text-xs text-warm-gray-500 mt-1">
          Set what food is cooked on each day of the week (Mon-Sat) for Archana Aunty&apos;s tiffin subscribers.
        </p>
      </div>

      {/* 1. Mon-Sat Daily Menu Manager */}
      <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 space-y-4">
        <h2 className="font-heading font-bold text-xl text-warm-gray-900">
          Daily Tiffin Menu Schedule (Monday to Saturday)
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.map((item) => (
            <div key={item.day} className="bg-cream-50 rounded-2xl p-5 border border-cream-200 shadow-sm space-y-3 relative group">
              <div className="flex justify-between items-center border-b border-cream-200/80 pb-2">
                <h3 className="font-heading font-bold text-lg text-warm-gray-900">{item.day}</h3>
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="px-3 py-1 bg-white text-saffron-700 border border-cream-200 rounded-lg text-xs font-bold hover:bg-saffron-50 transition-colors flex items-center gap-1 shadow-sm"
                >
                  <HiOutlinePencil /> Edit {item.day}
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-saffron-800 uppercase">☀️ Lunch:</span>
                  <p className="text-warm-gray-700 font-medium leading-relaxed">{item.lunch}</p>
                </div>
                <div>
                  <span className="font-bold text-saffron-800 uppercase">🌙 Dinner:</span>
                  <p className="text-warm-gray-700 font-medium leading-relaxed">{item.dinner}</p>
                </div>
                {item.special && (
                  <div className="pt-1">
                    <span className="px-2 py-0.5 bg-saffron-100 text-saffron-900 rounded font-bold text-[10px]">
                      {item.special}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Tiffin Subscription Plan Prices & Features */}
      <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 space-y-4">
        <h2 className="font-heading font-bold text-xl text-warm-gray-900">
          Subscription Plan Pricing & Settings
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-cream-50/60 rounded-2xl p-5 border border-cream-200 space-y-3">
              <h3 className="font-heading font-bold text-lg text-warm-gray-900">{plan.name}</h3>
              <p className="text-xs text-warm-gray-500">{plan.description}</p>
              
              <div className="flex items-center gap-2 pt-2">
                <label className="text-xs font-bold text-warm-gray-700">Plan Price (₹):</label>
                <input
                  type="number"
                  value={plan.price}
                  onChange={(e) => handleUpdatePlanPrice(plan.id, Number(e.target.value))}
                  className="w-24 px-3 py-1 bg-white border border-cream-300 rounded-lg text-sm font-bold text-saffron-700"
                />
              </div>

              <div className="pt-2 border-t border-cream-200">
                <p className="text-[11px] font-bold text-warm-gray-500 mb-1">Plan Inclusions:</p>
                <ul className="text-xs text-warm-gray-600 space-y-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <HiOutlineCheck className="text-fresh-600 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Day Schedule Modal */}
      {editingDay && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-cream-200 shadow-2xl space-y-4 animate-scale-in">
            <h3 className="font-heading font-bold text-xl text-warm-gray-900">
              Edit {editingDay.day}&apos;s Tiffin Menu
            </h3>

            <form onSubmit={handleSaveDaySchedule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-warm-gray-700 mb-1">☀️ Lunch Meal Menu *</label>
                <textarea
                  rows={3}
                  required
                  value={lunch}
                  onChange={(e) => setLunch(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-warm-gray-700 mb-1">🌙 Dinner Meal Menu *</label>
                <textarea
                  rows={3}
                  required
                  value={dinner}
                  onChange={(e) => setDinner(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-warm-gray-700 mb-1">Special Highlight Badge</label>
                <input
                  type="text"
                  value={special}
                  onChange={(e) => setSpecial(e.target.value)}
                  placeholder="e.g. Litti Chokha Special"
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setEditingDay(null)}
                  className="px-5 py-2.5 bg-cream-100 text-warm-gray-700 font-semibold rounded-xl text-sm hover:bg-cream-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 gradient-saffron text-white font-bold rounded-xl text-sm shadow-md hover:opacity-95 transition-all"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
