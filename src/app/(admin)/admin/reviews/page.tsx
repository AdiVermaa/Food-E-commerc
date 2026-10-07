'use client';

import { useState } from 'react';
import { reviews as initialReviews } from '@/lib/demoData';
import { Review } from '@/types';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import { HiOutlineCheck, HiOutlineTrash } from 'react-icons/hi';

export default function AdminReviewsPage() {
  const [reviewList, setReviewList] = useState<Review[]>(initialReviews);

  const handleToggleApprove = (id: string) => {
    setReviewList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isApproved: !r.isApproved } : r))
    );
    toast.success('Review approval status toggled');
  };

  const handleDeleteReview = (id: string) => {
    setReviewList((prev) => prev.filter((r) => r.id !== id));
    toast.success('Review removed');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading font-bold text-2xl lg:text-3xl text-warm-gray-900">
          Reviews Moderation ⭐
        </h1>
        <p className="text-xs text-warm-gray-500 mt-1">
          Approve, feature, or moderate customer reviews before they appear on the homepage.
        </p>
      </div>

      <div className="space-y-4">
        {reviewList.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-warm-gray-900 text-sm">{review.userName}</span>
                <div className="flex text-saffron-400 text-xs">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    review.isApproved ? 'bg-fresh-100 text-fresh-700' : 'bg-saffron-100 text-saffron-800'
                  }`}
                >
                  {review.isApproved ? 'Published' : 'Pending Approval'}
                </span>
              </div>
              <p className="text-xs text-warm-gray-600 leading-relaxed">&quot;{review.comment}&quot;</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggleApprove(review.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                  review.isApproved
                    ? 'bg-cream-100 text-warm-gray-700 hover:bg-cream-200'
                    : 'bg-fresh-500 text-white hover:bg-fresh-600'
                }`}
              >
                <HiOutlineCheck /> {review.isApproved ? 'Unpublish' : 'Approve & Publish'}
              </button>
              <button
                onClick={() => handleDeleteReview(review.id)}
                className="p-2 text-warm-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
