'use client';

import { useState } from 'react';
import { reviews } from '@/lib/demoData';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ReviewsPage() {
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !name) {
      toast.error('Please provide your name and review comment');
      return;
    }
    toast.success('Thank you! Your review has been submitted for approval.');
    setNewComment('');
    setName('');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-heading font-bold text-3xl lg:text-4xl text-warm-gray-900 mb-3">
            Customer Reviews & Ratings ⭐
          </h1>
          <p className="text-warm-gray-500">
            See what students and working professionals in Kharghar say about Archana aunty&apos;s food!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center text-white font-bold">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-warm-gray-900">{review.userName}</h4>
                      <p className="text-xs text-warm-gray-400">Verified Customer</p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-saffron-400 text-sm">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-warm-gray-600 leading-relaxed">&quot;{review.comment}&quot;</p>
              </div>
            ))}
          </div>

          {/* Leave a Review Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm sticky top-24 space-y-4">
              <h3 className="font-heading font-bold text-lg text-warm-gray-900">Leave a Review 📝</h3>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Your Name</label>
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
                  <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className={`text-2xl transition-transform hover:scale-110 ${
                          star <= newRating ? 'text-saffron-400' : 'text-warm-gray-200'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Your Feedback</label>
                  <textarea
                    rows={4}
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tell us how much you loved the food..."
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 gradient-saffron text-white font-semibold rounded-xl text-sm shadow-md hover:opacity-95 transition-all"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
