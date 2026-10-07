'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaLeaf, FaClock, FaStar, FaFire, FaHeart, FaArrowRight, FaQuoteLeft, FaCalendarAlt, FaUtensils } from 'react-icons/fa';
import { HiSparkles, HiCheckCircle } from 'react-icons/hi';
import { tiffinPlans, defaultWeeklySchedule, reviews } from '@/lib/demoData';

export default function HomePage() {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const activeDay = defaultWeeklySchedule[selectedDayIndex];

  return (
    <div className="overflow-hidden w-full">
      {/* ─── Hero Section ─── */}
      <section className="relative gradient-hero min-h-[85vh] flex items-center w-full">
        {/* Background Decorative Blur */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-saffron-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cream-200/40 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-saffron-100 border border-saffron-200 rounded-full text-sm text-saffron-800 font-medium mb-6">
                <HiSparkles className="text-saffron-500" />
                Daily Tiffin Service in Kharghar Sec 35E
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-warm-gray-900 leading-tight mb-6">
                Ghar Ka Khana <br />
                <span className="text-saffron-600">Daily Tiffin Service</span>
              </h1>

              <p className="text-lg text-warm-gray-600 leading-relaxed mb-8 max-w-lg">
                Fresh, hot, authentic Bihari home-cooked meals delivered daily to college students & bachelors in Kharghar. <strong>Fix your plan & get fresh food everyday!</strong>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="/plans"
                  className="inline-flex items-center gap-2 px-7 py-4 gradient-saffron text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:opacity-95 transition-all text-base"
                >
                  <FaFire />
                  Subscribe to Tiffin Plan
                  <FaArrowRight className="ml-1" />
                </Link>
                <a
                  href="#weekly-schedule"
                  className="inline-flex items-center gap-2 px-6 py-4 bg-white text-saffron-800 font-bold rounded-2xl border-2 border-saffron-200 hover:border-saffron-400 hover:bg-saffron-50 transition-all text-base"
                >
                  <FaCalendarAlt /> View Weekly Menu
                </a>
              </div>

              {/* Trust Features */}
              <div className="flex flex-wrap gap-6 text-sm text-warm-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-fresh-100 flex items-center justify-center">
                    <FaLeaf className="text-fresh-600 text-sm" />
                  </div>
                  <span className="font-semibold">100% Homestyle</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-saffron-100 flex items-center justify-center">
                    <FaClock className="text-saffron-600 text-sm" />
                  </div>
                  <span className="font-semibold">Fixed Delivery Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cream-100 flex items-center justify-center">
                    <FaHeart className="text-spice-500 text-sm" />
                  </div>
                  <span className="font-semibold">Cooked by Archana Aunty</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-slide-up">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-saffron-200/40 rounded-[2.5rem] rotate-3 transform" />
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/images/hero-banner.png"
                    alt="Archana's Zaika - Fresh Daily Tiffin Service"
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>

                {/* Floating Customer Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3.5 border border-cream-100 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center text-white font-bold text-sm">
                      🍱
                    </div>
                    <div>
                      <p className="text-xs font-bold text-warm-gray-900">89+ Active Tiffin Subscribers</p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <FaStar key={i} className="text-saffron-400 text-xs" />
                        ))}
                        <span className="text-xs text-warm-gray-500 ml-1 font-bold">4.9/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price starting badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 border border-cream-100 animate-float" style={{ animationDelay: '1s' }}>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-warm-gray-400">Plans starting at</p>
                  <p className="text-2xl font-heading font-extrabold text-saffron-600">₹799<span className="text-xs text-warm-gray-500 font-normal">/week</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Weekly Meal Schedule (Fixed Tiffin Menu) ─── */}
      <section id="weekly-schedule" className="py-16 lg:py-20 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-saffron-50 border border-saffron-200 rounded-full text-xs font-bold text-saffron-800 uppercase tracking-wider mb-3">
              <FaUtensils /> What&apos;s In Your Tiffin
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-warm-gray-900 mb-4">
              This Week&apos;s Daily Tiffin Schedule (Mon - Sat)
            </h2>
            <p className="text-warm-gray-600 text-base">
              Here is what Archana aunty cooks for your tiffin every day of the week! Choose a plan and get these delicious home-cooked meals delivered daily.
            </p>
          </div>

          {/* Days Tabs */}
          <div className="flex gap-2 justify-center overflow-x-auto pb-4 mb-8">
            {defaultWeeklySchedule.map((item, index) => (
              <button
                key={item.day}
                onClick={() => setSelectedDayIndex(index)}
                className={`px-5 py-3 rounded-2xl font-heading font-bold text-sm whitespace-nowrap transition-all duration-200 ${
                  selectedDayIndex === index
                    ? 'gradient-saffron text-white shadow-lg scale-105'
                    : 'bg-cream-50 text-warm-gray-700 hover:bg-saffron-50 border border-cream-200'
                }`}
              >
                {item.day}
                {index === 5 && ' ⭐'}
              </button>
            ))}
          </div>

          {/* Selected Day Card Display */}
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-cream-50 to-saffron-50/40 rounded-3xl p-6 sm:p-8 border-2 border-saffron-200 shadow-md">
            <div className="flex flex-wrap justify-between items-center gap-2 border-b border-saffron-200/60 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-saffron-700">Scheduled Meal Menu</span>
                <h3 className="font-heading font-extrabold text-2xl text-warm-gray-900">{activeDay.day}&apos;s Tiffin Special</h3>
              </div>
              <span className="px-3.5 py-1 bg-white text-saffron-800 text-xs font-bold rounded-full border border-saffron-200 shadow-sm">
                {activeDay.special}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Lunch Box */}
              <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-saffron-800 font-bold text-sm">
                  <span>☀️ Lunch Menu</span>
                  <span className="text-[10px] bg-saffron-100 px-2 py-0.5 rounded-full font-semibold">12:30 PM</span>
                </div>
                <p className="text-sm text-warm-gray-700 leading-relaxed font-medium">
                  {activeDay.lunch}
                </p>
              </div>

              {/* Dinner Box */}
              <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-saffron-800 font-bold text-sm">
                  <span>🌙 Dinner Menu</span>
                  <span className="text-[10px] bg-saffron-100 px-2 py-0.5 rounded-full font-semibold">8:00 PM</span>
                </div>
                <p className="text-sm text-warm-gray-700 leading-relaxed font-medium">
                  {activeDay.dinner}
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/plans"
                className="inline-flex items-center gap-2 px-8 py-3.5 gradient-saffron text-white font-bold rounded-xl shadow-md hover:opacity-95 transition-all text-sm"
              >
                Select Tiffin Plan for {activeDay.day} & Entire Week <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tiffin Subscription Plans ─── */}
      <section className="py-16 lg:py-20 bg-warm-50/50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-warm-gray-900 mb-4">
              Fix Your Tiffin Subscription Plan
            </h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto text-base">
              No daily ordering hassles! Choose a weekly or monthly plan once, set your delivery location in Kharghar, and get fresh food delivered everyday.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {tiffinPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 lg:p-8 card-hover ${
                  plan.isPopular
                    ? 'bg-saffron-600 text-white shadow-2xl scale-[1.02] ring-4 ring-saffron-200'
                    : 'bg-white border-2 border-cream-200 shadow-sm'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-saffron-600 text-xs font-extrabold rounded-full shadow-md">
                    ⭐ MOST POPULAR SAVER
                  </div>
                )}

                <h3 className={`font-heading font-bold text-2xl mb-1 ${plan.isPopular ? 'text-white' : 'text-warm-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mb-5 ${plan.isPopular ? 'text-saffron-100' : 'text-warm-gray-500'}`}>
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className={`font-heading font-extrabold text-4xl ${plan.isPopular ? 'text-white' : 'text-warm-gray-900'}`}>
                    ₹{plan.price}
                  </span>
                  <span className={`text-sm line-through ${plan.isPopular ? 'text-saffron-200' : 'text-warm-gray-400'}`}>
                    ₹{plan.originalPrice}
                  </span>
                  <span className={`text-xs font-semibold ${plan.isPopular ? 'text-saffron-100' : 'text-warm-gray-500'}`}>
                    /{plan.duration === 'weekly' ? 'week' : 'month'}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <HiCheckCircle className={`shrink-0 text-base ${plan.isPopular ? 'text-saffron-200' : 'text-fresh-500'}`} />
                      <span className={plan.isPopular ? 'text-saffron-50' : 'text-warm-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/plans?selected=${plan.id}`}
                  className={`block text-center py-3.5 rounded-xl font-bold text-sm transition-all ${
                    plan.isPopular
                      ? 'bg-white text-saffron-700 hover:bg-saffron-50 shadow-md'
                      : 'gradient-saffron text-white hover:opacity-90 shadow-md'
                  }`}
                >
                  Subscribe to {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section className="py-16 lg:py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-warm-gray-900 mb-4">
              Loved by Students & Bachelors ❤️
            </h2>
            <p className="text-warm-gray-500">Real reviews from subscribers in Kharghar</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-cream-100 card-hover space-y-3">
                <FaQuoteLeft className="text-saffron-300 text-2xl" />
                <p className="text-sm text-warm-gray-600 leading-relaxed">&quot;{review.comment}&quot;</p>
                <div className="pt-3 border-t border-cream-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-warm-gray-900">{review.userName}</p>
                    <p className="text-xs text-saffron-700 font-medium">{review.planName}</p>
                  </div>
                  <div className="flex text-saffron-400 text-xs">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-16 lg:py-20 bg-warm-gray-900 relative overflow-hidden w-full">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full space-y-6">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white">
            Ready to Fix Your Daily Meals? 🏠
          </h2>
          <p className="text-warm-gray-300 text-lg max-w-2xl mx-auto">
            Join 89+ students and bachelors in Kharghar who don&apos;t worry about cooking. 
            Subscribe to Archana Aunty&apos;s Tiffin Plan today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/plans"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 gradient-saffron text-white font-bold rounded-2xl shadow-xl hover:opacity-95 transition-all text-base"
            >
              <FaFire />
              Fix Your Tiffin Plan Now
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20subscribe%20to%20Archana's%20Zaika%20tiffin%20plan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-warm-gray-700 text-white font-bold rounded-2xl hover:bg-warm-gray-800 transition-all text-base"
            >
              Inquire on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
