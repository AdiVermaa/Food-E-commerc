'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiOutlineChartBar,
  HiOutlineBookOpen,
  HiOutlineClipboardList,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineUsers,
  HiOutlineStar,
  HiOutlineArrowLeft,
} from 'react-icons/hi';
import { FaLeaf } from 'react-icons/fa';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard Overview', icon: HiOutlineChartBar },
    { href: '/admin/plans', label: 'Weekly Schedule & Plans', icon: HiOutlineBookOpen },
    { href: '/admin/orders', label: 'Daily Tiffin Deliveries', icon: HiOutlineClipboardList },
    { href: '/admin/subscriptions', label: 'Active Subscribers', icon: HiOutlineCalendar },
    { href: '/admin/delivery', label: 'Delivery Sectors & Fees', icon: HiOutlineLocationMarker },
    { href: '/admin/users', label: 'User Roles & Accounts', icon: HiOutlineUsers },
    { href: '/admin/reviews', label: 'Reviews Moderation', icon: HiOutlineStar },
  ];

  return (
    <aside className="w-64 bg-warm-gray-900 text-warm-gray-300 min-h-screen flex flex-col shrink-0 border-r border-warm-gray-800">
      {/* Brand / Logo Header */}
      <div className="p-6 border-b border-warm-gray-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-saffron flex items-center justify-center text-white text-base shadow-md">
            <FaLeaf />
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-base leading-tight">Archana&apos;s Zaika</h2>
            <span className="text-[10px] font-semibold tracking-wider text-saffron-400 uppercase bg-saffron-950/60 px-2 py-0.5 rounded border border-saffron-800/40">
              Admin Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Admin Nav Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="text-[11px] font-bold text-warm-gray-500 uppercase px-3 mb-2 tracking-wider">
          Tiffin Service Admin
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-saffron-500 text-white shadow-md font-semibold'
                  : 'hover:bg-warm-gray-800 hover:text-white text-warm-gray-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-warm-gray-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Switch to User Store View */}
      <div className="p-4 border-t border-warm-gray-800 bg-warm-gray-950/40">
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-warm-gray-400 hover:text-saffron-400 hover:bg-warm-gray-800 transition-all"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          <span>Back to Tiffin Storefront</span>
        </Link>
      </div>
    </aside>
  );
}
