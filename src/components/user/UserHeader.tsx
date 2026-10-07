'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { FaLeaf } from 'react-icons/fa';

export default function UserHeader() {
  const { user, userData, signOut, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/plans', label: 'Tiffin Plans & Schedule' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 glass shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <FaLeaf className="text-white text-lg" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg text-saffron-800 leading-tight">
                Archana&apos;s Zaika
              </span>
              <span className="text-[10px] text-warm-gray-500 leading-tight hidden sm:block">
                Ghar Ka Khana, Dil Se
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-warm-gray-600 hover:text-saffron-700 hover:bg-saffron-50 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-warm-gray-600 hover:text-saffron-700 hover:bg-saffron-50 rounded-lg transition-all"
            >
              <HiOutlineShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-saffron-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user || userData ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-saffron-100 text-saffron-800 text-xs font-bold rounded-lg border border-saffron-300 hover:bg-saffron-200 transition-all shadow-sm"
                  >
                    ⚙️ Admin Portal
                  </Link>
                )}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 text-warm-gray-600 hover:bg-saffron-50 rounded-lg transition-all"
                  >
                    <div className="w-8 h-8 rounded-full gradient-saffron flex items-center justify-center text-white text-sm font-bold">
                      {userData?.name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:block text-sm font-medium truncate max-w-[100px]">
                      {userData?.name || 'User'}
                    </span>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-cream-200 py-2 animate-slide-down z-50">
                      <div className="px-4 py-2 border-b border-cream-100">
                        <p className="text-sm font-semibold text-warm-gray-800">{userData?.name}</p>
                        <p className="text-xs text-warm-gray-500">{userData?.email || user?.email}</p>
                      </div>
                      <Link href="/dashboard" className="block px-4 py-2.5 text-sm text-warm-gray-600 hover:bg-saffron-50 hover:text-saffron-700 transition-colors" onClick={() => setProfileOpen(false)}>
                        My Dashboard
                      </Link>
                      <Link href="/orders" className="block px-4 py-2.5 text-sm text-warm-gray-600 hover:bg-saffron-50 hover:text-saffron-700 transition-colors" onClick={() => setProfileOpen(false)}>
                        My Orders
                      </Link>
                      {isAdmin && (
                        <Link href="/admin" className="block px-4 py-2.5 text-sm text-saffron-700 font-bold hover:bg-saffron-50 transition-colors" onClick={() => setProfileOpen(false)}>
                          ⚙️ Admin Portal
                        </Link>
                      )}
                      <hr className="my-1 border-cream-100" />
                      <button
                        onClick={() => { signOut(); setProfileOpen(false); }}
                        className="block w-full text-left px-4 py-2.5 text-sm text-danger-500 hover:bg-danger-50 transition-colors font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white gradient-saffron rounded-lg hover:opacity-90 transition-opacity shadow-md"
              >
                <HiOutlineUser className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-warm-gray-600 hover:bg-saffron-50 rounded-lg transition-all"
            >
              {mobileMenuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-slide-down">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-warm-gray-600 hover:text-saffron-700 hover:bg-saffron-50 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
