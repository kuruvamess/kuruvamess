'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Home, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your order! We've received it and will start preparing your delicious meal.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 my-8">
              <h2 className="font-semibold mb-3">What happens next?</h2>
              <div className="text-left space-y-3 text-gray-600">
                <p>✅ You'll receive an SMS confirmation shortly</p>
                <p>🍳 Our chefs will start preparing your order</p>
                <p>📞 We'll call you if we need any clarification</p>
                <p>🚚 Your order will be delivered within the estimated time</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary inline-flex items-center justify-center">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <Link href="/profile/orders" className="btn-secondary inline-flex items-center justify-center">
                <FileText className="w-5 h-5 mr-2" />
                View My Orders
              </Link>
            </div>
            
            <p className="mt-8 text-sm text-gray-500">
              Need help? Call us at{' '}
              <a href="tel:9846880933" className="text-primary font-medium">
                9846880933
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
