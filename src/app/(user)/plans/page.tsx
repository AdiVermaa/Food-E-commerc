'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { tiffinPlans, defaultWeeklySchedule, deliveryAreas } from '@/lib/demoData';
import { TiffinPlan } from '@/types';
import { HiCheckCircle } from 'react-icons/hi';
import { FaFire, FaCalendarAlt, FaCheck, FaLock, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function PlansPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<TiffinPlan>(tiffinPlans[1]); // Default Monthly Saver
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  
  // Checkout Form State inside Plan Selector
  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedAreaId, setSelectedAreaId] = useState(deliveryAreas[0].id);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [subId, setSubId] = useState('');

  const activeDay = defaultWeeklySchedule[selectedDayIndex];
  const areaObj = deliveryAreas.find((a) => a.id === selectedAreaId) || deliveryAreas[0];
  const totalAmount = selectedPlan.price + areaObj.deliveryCharge;

  const handleSelectPlanToSubscribe = (plan: TiffinPlan) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
    // Smooth scroll to checkout form
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  const handleConfirmSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      toast.error('Please enter your delivery name, phone, and Kharghar address');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedSubId = 'SUB-' + Math.floor(1000 + Math.random() * 9000);
      setSubId(generatedSubId);
      setIsSubmitting(false);
      setSubscriptionSuccess(true);
      toast.success(`Tiffin Plan Subscribed Successfully! ID: ${generatedSubId}`);
    }, 1500);
  };

  if (subscriptionSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-cream-200 shadow-xl text-center animate-scale-in space-y-6">
          <div className="w-20 h-20 bg-fresh-100 text-fresh-600 rounded-full flex items-center justify-center mx-auto text-4xl animate-bounce">
            🎉
          </div>
          <div>
            <h2 className="font-heading font-bold text-2xl text-warm-gray-900">Tiffin Plan Subscribed!</h2>
            <p className="text-sm text-warm-gray-500 mt-1">
              Congratulations <strong className="text-warm-gray-800">{name}</strong>! Your daily meal plan with Archana Aunty is active.
            </p>
          </div>

          <div className="bg-cream-50 rounded-2xl p-4 text-left border border-cream-200 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-warm-gray-500">Subscription ID:</span>
              <span className="font-mono font-bold text-saffron-700">{subId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm-gray-500">Plan:</span>
              <span className="font-bold text-warm-gray-900">{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm-gray-500">Amount Paid/Due:</span>
              <span className="font-bold text-saffron-700">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm-gray-500">Delivery Address:</span>
              <span className="font-medium text-warm-gray-800">{address}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              href="/dashboard"
              className="block w-full py-3.5 gradient-saffron text-white font-bold rounded-xl shadow-md hover:opacity-95 transition-all text-sm"
            >
              Go to My Dashboard 📊
            </Link>
            <Link
              href="/"
              className="block w-full py-2.5 text-warm-gray-600 font-semibold hover:text-saffron-700 text-sm transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-saffron-100 border border-saffron-200 rounded-full text-sm text-saffron-800 font-medium mb-4">
            <FaFire className="text-saffron-500" />
            Save up to ₹600/month on daily meals!
          </div>
          <h1 className="font-heading font-extrabold text-3xl lg:text-5xl text-warm-gray-900 mb-4">
            Fix Your Tiffin Plan & Weekly Menu
          </h1>
          <p className="text-warm-gray-600 max-w-2xl mx-auto text-lg">
            No Swiggy/Zomato daily ordering hassle! Fix a plan once and enjoy fresh, home-cooked Bihari food delivered daily to your PG, flat, or college hostel in Kharghar.
          </p>
        </div>
      </div>

      {/* Plans Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-heading font-bold text-2xl text-warm-gray-900 text-center mb-8">
          1. Choose Your Subscription Plan
        </h2>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {tiffinPlans.map((plan) => {
            const isSelected = selectedPlan.id === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`relative rounded-3xl p-6 lg:p-8 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-saffron-600 text-white shadow-2xl scale-[1.03] ring-4 ring-saffron-300'
                    : 'bg-white border-2 border-cream-200 shadow-sm hover:border-saffron-300'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-saffron-600 text-xs font-extrabold rounded-full shadow-md">
                    ⭐ MOST POPULAR SAVER
                  </div>
                )}

                <div className="mb-4">
                  <h3 className={`font-heading font-bold text-2xl mb-1 ${isSelected ? 'text-white' : 'text-warm-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs ${isSelected ? 'text-saffron-100' : 'text-warm-gray-500'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className={`font-heading font-extrabold text-4xl ${isSelected ? 'text-white' : 'text-warm-gray-900'}`}>
                    ₹{plan.price}
                  </span>
                  <span className={`text-sm line-through ${isSelected ? 'text-saffron-200' : 'text-warm-gray-400'}`}>
                    ₹{plan.originalPrice}
                  </span>
                  <span className={`text-xs ${isSelected ? 'text-saffron-100' : 'text-warm-gray-500'}`}>
                    /{plan.duration === 'weekly' ? 'week' : 'month'}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <HiCheckCircle className={`shrink-0 text-base ${isSelected ? 'text-saffron-200' : 'text-fresh-500'}`} />
                      <span className={isSelected ? 'text-saffron-50' : 'text-warm-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlanToSubscribe(plan);
                  }}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                    isSelected
                      ? 'bg-white text-saffron-800 hover:bg-saffron-50'
                      : 'gradient-saffron text-white hover:opacity-90'
                  }`}
                >
                  {isSelected ? '✓ Selected — Subscribe Now' : 'Select Plan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* 2. Inspect Weekly Food Schedule (Mon-Sat) */}
        <div className="bg-gradient-to-br from-cream-50 to-saffron-50/50 rounded-3xl p-6 sm:p-10 border-2 border-saffron-200 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-warm-gray-900 mb-2">
              2. Inspect What You Get (Mon - Sat Menu)
            </h2>
            <p className="text-sm text-warm-gray-600">
              Each day of the week features a different home-cooked Bihari specialty!
            </p>
          </div>

          <div className="flex gap-2 justify-center overflow-x-auto pb-4 mb-6">
            {defaultWeeklySchedule.map((item, index) => (
              <button
                key={item.day}
                onClick={() => setSelectedDayIndex(index)}
                className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs whitespace-nowrap transition-all ${
                  selectedDayIndex === index
                    ? 'gradient-saffron text-white shadow-md'
                    : 'bg-white text-warm-gray-700 hover:bg-saffron-50 border border-cream-200'
                }`}
              >
                {item.day}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-cream-100 pb-3">
              <h4 className="font-heading font-bold text-lg text-warm-gray-900">{activeDay.day}&apos;s Food Menu</h4>
              <span className="text-xs font-semibold text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full">
                Special: {activeDay.special}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-cream-50 rounded-xl space-y-1">
                <span className="text-xs font-bold text-saffron-800 uppercase">Lunch (12:30 PM)</span>
                <p className="font-medium text-warm-gray-800">{activeDay.lunch}</p>
              </div>
              <div className="p-4 bg-cream-50 rounded-xl space-y-1">
                <span className="text-xs font-bold text-saffron-800 uppercase">Dinner (8:00 PM)</span>
                <p className="font-medium text-warm-gray-800">{activeDay.dinner}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Subscription Checkout Form */}
        <div id="checkout-form" className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-xl space-y-6">
          <div className="border-b border-cream-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Step 3 of 3</span>
            <h2 className="font-heading font-extrabold text-2xl text-warm-gray-900 mt-1">
              Subscribe to {selectedPlan.name} (₹{totalAmount})
            </h2>
            <p className="text-xs text-warm-gray-500 mt-1">
              Enter your Kharghar delivery address to activate your daily tiffin.
            </p>
          </div>

          <form onSubmit={handleConfirmSubscription} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Kumar"
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Select Delivery Area *</label>
              <select
                value={selectedAreaId}
                onChange={(e) => setSelectedAreaId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
              >
                {deliveryAreas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name} ({area.pincode}) — {area.deliveryCharge === 0 ? 'FREE Delivery' : `+₹${area.deliveryCharge} Delivery`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Kharghar Flat / PG / Hostel Address *</label>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Flat 302, Green Heights, Sector 35E, Kharghar"
                className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
              />
            </div>

            {/* Payment Selection */}
            <div>
              <label className="block text-xs font-semibold text-warm-gray-700 mb-2">Payment Method *</label>
              <div className="grid sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-saffron-500 bg-saffron-50 text-saffron-900 font-semibold'
                      : 'border-cream-200 hover:border-saffron-200'
                  }`}
                >
                  <FaMoneyBillWave className="text-saffron-600 text-lg" />
                  <span className="text-xs">Cash / UPI on Delivery</span>
                </label>

                <label
                  onClick={() => setPaymentMethod('online')}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'online'
                      ? 'border-saffron-500 bg-saffron-50 text-saffron-900 font-semibold'
                      : 'border-cream-200 hover:border-saffron-200'
                  }`}
                >
                  <FaCreditCard className="text-saffron-600 text-lg" />
                  <span className="text-xs">Online UPI / Card</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-4 gradient-saffron text-white font-bold rounded-2xl shadow-xl hover:opacity-95 transition-all text-base disabled:opacity-50 mt-4"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FaLock className="text-sm" /> Confirm & Activate Subscription (₹{totalAmount})
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
