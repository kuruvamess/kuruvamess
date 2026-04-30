'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';
import Image from 'next/image';

export default function OrderPage() {
  const { items, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Order Online</h1>
            <p className="text-gray-600 mb-12 text-center text-lg">
              Call us to place your order and enjoy authentic Kerala cuisine!
            </p>
            
            {/* Contact Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Sunil UM */}
              <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                  <Image
                    src="https://ui-avatars.com/api/?name=Sunil+UM&size=128&background=22c55e&color=fff"
                    alt="Sunil UM"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Sunil UM</h3>
                <p className="text-gray-600 mb-4">Co-Founder & Head Chef</p>
                <a 
                  href="tel:9846880933" 
                  className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary border-2 border-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
                >
                  <Phone className="w-5 h-5" />
                  9846880933
                </a>
              </div>

              {/* Vineetha Sunil */}
              <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                  <Image
                    src="https://ui-avatars.com/api/?name=Vineetha+Sunil&size=128&background=ec4899&color=fff"
                    alt="Vineetha Sunil"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Vineetha Sunil</h3>
                <p className="text-gray-600 mb-4">Co-Founder & Operations Manager</p>
                <a 
                  href="tel:8075387332" 
                  className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary border-2 border-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
                >
                  <Phone className="w-5 h-5" />
                  8075387332
                </a>
              </div>
            </div>

            {/* Browse Menu Link */}
            <div className="text-center">
              <Link href="/menu" className="btn-secondary inline-flex items-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Complete Your Order</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-4 border-b">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">Subtotal</p>
                  <p className="text-lg font-bold">₹{getTotalPrice()}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Checkout</h2>
              <p className="text-gray-600 mb-4">
                To complete your order, please visit our checkout page.
              </p>
              <Link href="/checkout" className="btn-primary w-full text-center block">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
