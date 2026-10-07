'use client';

import { useAuth } from '@/context/AuthContext';
import { HiOutlineBell, HiOutlineSearch } from 'react-icons/hi';

export default function AdminHeader() {
  const { userData, user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-cream-200 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Search Bar */}
      <div className="relative max-w-md w-full">
        <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search orders, customers, dishes..."
          className="w-full pl-10 pr-4 py-2 bg-cream-50 rounded-xl border border-cream-200 text-xs focus:outline-none focus:ring-2 focus:ring-saffron-400 text-warm-gray-800"
        />
      </div>

      {/* Admin Profile & Notifications */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl text-warm-gray-500 hover:bg-cream-100 transition-colors">
          <HiOutlineBell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-saffron-500 rounded-full" />
        </button>

        <div className="h-6 w-px bg-cream-200" />

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gradient-saffron flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {userData?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-warm-gray-900 leading-tight">
              {userData?.name || 'Archana Admin'}
            </p>
            <p className="text-[10px] font-semibold text-saffron-700 leading-tight">Master Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
