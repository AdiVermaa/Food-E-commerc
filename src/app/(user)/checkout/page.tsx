'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { deliveryAreas } from '@/lib/demoData';
import toast from 'react-hot-toast';
import { HiArrowLeft, HiCheckCircle } from 'react-icons/hi';
import { FaMoneyBillWave, FaCreditCard, FaLock } from 'react-icons/fa';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount, clearCart } = useCart();
  const { user, userData } = useAuth();

  const [name, setName] = useState(userData?.name || '');
  const [phone, setPhone] = useState(userData?.phone || '');
  const [address, setAddress] = useState(userData?.address || '');
  const [selectedArea, setSelectedArea] = useState(deliveryAreas[0].id);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const areaObj = deliveryAreas.find((a) => a.id === selectedArea) || deliveryAreas[0];
  const deliveryCharge = areaObj.deliveryCharge;
  const finalTotal = totalAmount + deliveryCharge;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      toast.error('Please fill in all required delivery details');
      return;
    }

    setIsSubmitting(true);
    // Simulate order placement
    setTimeout(() => {
      const generatedId = 'AZ-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderSuccess(true);
      clearCart();
      toast.success('Order placed successfully!');
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-cream-200 shadow-xl text-center animate-scale-in">
          <div className="w-20 h-20 bg-fresh-100 text-fresh-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl animate-bounce">
            🎉
          </div>
          <h2 className="font-heading font-bold text-2xl text-warm-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-sm text-warm-gray-500 mb-6">
            Thank you, <span className="font-semibold text-warm-gray-800">{name}</span>! Archana aunty has received your order and started preparing it with love.
          </p>

          <div className="bg-cream-50 rounded-2xl p-4 mb-6 text-left border border-cream-200 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-warm-gray-500">Order ID:</span>
              <span className="font-mono font-bold text-saffron-700">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm-gray-500">Total Amount:</span>
              <span className="font-semibold text-warm-gray-800">₹{finalTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm-gray-500">Payment Method:</span>
              <span className="font-semibold text-warm-gray-800 uppercase">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm-gray-500">Est. Delivery Time:</span>
              <span className="font-semibold text-fresh-600">{areaObj.estimatedTime}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/orders"
              className="block w-full py-3.5 gradient-saffron text-white font-semibold rounded-xl shadow-md hover:opacity-95 transition-all text-sm"
            >
              Track Order Status
            </Link>
            <Link
              href="/menu"
              className="block w-full py-3 text-warm-gray-600 hover:text-saffron-700 text-sm font-medium transition-colors"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="gradient-hero py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cart" className="inline-flex items-center gap-1 text-sm text-saffron-600 hover:text-saffron-700 mb-4">
            <HiArrowLeft /> Back to Cart
          </Link>
          <h1 className="font-heading font-bold text-3xl text-warm-gray-900">Checkout 📦</h1>
          <p className="text-warm-gray-500 mt-1">Complete your delivery address and payment method</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmitOrder} className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <div className="bg-white rounded-2xl p-6 border border-cream-100 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-warm-gray-800 flex items-center gap-2">
                <span>📍 Delivery Details</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
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
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
                >
                  {deliveryAreas.map((area) => (
                    <option key={area.id} value={area.id} disabled={!area.isServiceable}>
                      {area.name} ({area.pincode}) - {area.deliveryCharge === 0 ? 'FREE Delivery' : `₹${area.deliveryCharge} Delivery`} {!area.isServiceable ? '(Not Serviceable)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Complete Flat / House / PG Address *</label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Flat 302, Green Heights, Near NIFT College, Sector 35E, Kharghar"
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Special Cooking / Delivery Instructions (Optional)</label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Less spicy dal, leave at door with guard"
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-cream-100 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-warm-gray-800 flex items-center gap-2">
                <span>💳 Select Payment Method</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-saffron-500 bg-saffron-50/50 text-saffron-900 shadow-sm'
                      : 'border-cream-200 hover:border-saffron-200'
                  }`}
                >
                  <FaMoneyBillWave className={`text-xl ${paymentMethod === 'cod' ? 'text-saffron-600' : 'text-warm-gray-400'}`} />
                  <div>
                    <p className="font-semibold text-sm">Cash on Delivery (COD)</p>
                    <p className="text-xs text-warm-gray-500">Pay when food arrives</p>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('online')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'online'
                      ? 'border-saffron-500 bg-saffron-50/50 text-saffron-900 shadow-sm'
                      : 'border-cream-200 hover:border-saffron-200'
                  }`}
                >
                  <FaCreditCard className={`text-xl ${paymentMethod === 'online' ? 'text-saffron-600' : 'text-warm-gray-400'}`} />
                  <div>
                    <p className="font-semibold text-sm">Online UPI / Card / QR</p>
                    <p className="text-xs text-warm-gray-500">Instant payment via Razorpay</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-cream-100 shadow-sm sticky top-24 space-y-4">
              <h3 className="font-heading font-bold text-lg text-warm-gray-800">Order Summary</h3>

              <div className="divide-y divide-cream-100 text-sm">
                {items.map((item) => (
                  <div key={item.menuItemId} className="py-2.5 flex justify-between">
                    <div>
                      <p className="font-medium text-warm-gray-800">{item.name}</p>
                      <p className="text-xs text-warm-gray-400">Qty: {item.quantity} x ₹{item.price}</p>
                    </div>
                    <span className="font-semibold text-warm-gray-800">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-cream-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-warm-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-warm-gray-600">
                  <span>Delivery Charge</span>
                  <span className={deliveryCharge === 0 ? 'text-fresh-600 font-semibold' : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between font-heading font-bold text-lg text-warm-gray-900 pt-2 border-t border-cream-200">
                  <span>Total Payable</span>
                  <span className="text-saffron-600">₹{finalTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 w-full py-3.5 gradient-saffron text-white font-semibold rounded-xl shadow-md hover:opacity-95 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaLock className="text-xs" />
                    Place Order (₹{finalTotal})
                  </>
                )}
              </button>

              <p className="text-xs text-center text-warm-gray-400">
                Guaranteed fresh & hot home-cooked meal by Archana Aunty 🍛
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
