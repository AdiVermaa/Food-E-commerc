'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MenuRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/plans');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-warm-gray-500">Redirecting to Tiffin Subscription Plans & Schedule...</p>
    </div>
  );
}
