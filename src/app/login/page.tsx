'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { FaGoogle, FaLeaf, FaExclamationCircle } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountNotFound, setAccountNotFound] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAccountNotFound(false);
    try {
      await signIn(email, password);
      toast.success('Signed in successfully!');
      
      // Smart Role Routing
      if (email.toLowerCase().includes('admin')) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      const errObj = err as { code?: string; message?: string };
      if (
        errObj?.code === 'auth/user-not-found' ||
        errObj?.code === 'auth/invalid-credential' ||
        errObj?.message?.includes('user-not-found')
      ) {
        setAccountNotFound(true);
        toast.error('Account not found! Click below to create your account.');
      } else {
        toast.error(errObj?.message || 'Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google!');
      router.push('/dashboard');
    } catch {
      toast.error('Google Sign-in failed');
    }
  };

  // Quick Demo Admin Button
  const handleQuickDemoAdmin = async () => {
    setEmail('admin@archanaszaika.com');
    setPassword('admin123');
    try {
      await signIn('admin@archanaszaika.com', 'admin123');
      toast.success('Signed in as Archana Admin!');
      router.push('/admin');
    } catch {
      router.push('/admin');
    }
  };

  // Quick Demo User Button
  const handleQuickDemoUser = async () => {
    setEmail('user@gmail.com');
    setPassword('user123');
    try {
      await signIn('user@gmail.com', 'user123');
      toast.success('Signed in as Customer!');
      router.push('/dashboard');
    } catch {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-cream-200 shadow-xl space-y-6 animate-scale-in">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center text-white text-lg">
              <FaLeaf />
            </div>
            <span className="font-heading font-bold text-xl text-saffron-800">Archana&apos;s Zaika</span>
          </Link>
          <h2 className="font-heading font-bold text-2xl text-warm-gray-900">Welcome Back! 👋</h2>
          <p className="text-xs text-warm-gray-500 mt-1">Sign in to manage your tiffin plan and orders</p>
        </div>

        {/* Demo Login Quick Switcher */}
        <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-3 text-xs text-saffron-900 space-y-2">
          <p className="font-bold">🔑 One-Click Demo Sign In:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="px-3 py-2 bg-saffron-600 text-white font-bold rounded-lg hover:bg-saffron-700 transition-all text-xs"
            >
              ⚙️ Admin Portal
            </button>
            <button
              type="button"
              onClick={handleQuickDemoUser}
              className="px-3 py-2 bg-white text-saffron-800 border border-saffron-300 font-bold rounded-lg hover:bg-saffron-100 transition-all text-xs"
            >
              👤 Customer View
            </button>
          </div>
        </div>

        {/* Account Not Found Alert Prompt */}
        {accountNotFound && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-900 space-y-2 animate-slide-down">
            <p className="font-bold flex items-center gap-1.5 text-red-700">
              <FaExclamationCircle /> No account found for this email!
            </p>
            <p className="text-warm-gray-600">
              Would you like to register a new account for <strong className="text-warm-gray-900">{email}</strong>?
            </p>
            <Link
              href={`/signup?email=${encodeURIComponent(email)}`}
              className="inline-block w-full text-center py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
            >
              Create Account Now ➔
            </Link>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 gradient-saffron text-white font-semibold rounded-xl text-sm shadow-md hover:opacity-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <hr className="w-full border-cream-200" />
          <span className="absolute bg-white px-3 text-xs text-warm-gray-400">OR</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-white border border-cream-300 text-warm-gray-700 font-semibold rounded-xl text-sm hover:bg-cream-50 transition-all flex items-center justify-center gap-2"
        >
          <FaGoogle className="text-red-500" /> Sign in with Google
        </button>

        <p className="text-xs text-center text-warm-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-saffron-600 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
