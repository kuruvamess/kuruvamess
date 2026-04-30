'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

const CartSidebar = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-6 border-b">
                      <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setIsOpen(false)}
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-4 py-6">
                      {items.length === 0 ? (
                        <div className="text-center py-12">
                          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">Cart is empty</h3>
                          <p className="mt-1 text-sm text-gray-500">Start adding some delicious items!</p>
                          <div className="mt-6">
                            <Link
                              href="/menu"
                              onClick={() => setIsOpen(false)}
                              className="btn-primary text-sm"
                            >
                              Browse Menu
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">₹{item.price}</p>
                                <div className="mt-2 flex items-center space-x-2">
                                  <div className="flex items-center border border-gray-300 rounded">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="p-1 hover:bg-gray-100"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="px-3 py-1 text-sm">{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="p-1 hover:bg-gray-100"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                  ₹{item.price * item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                          
                          {items.length > 0 && (
                            <button
                              onClick={clearCart}
                              className="w-full text-center text-sm text-red-600 hover:text-red-700 py-2"
                            >
                              Clear Cart
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="border-t px-4 py-6">
                        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                          <p>Subtotal</p>
                          <p>₹{getTotalPrice()}</p>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          Delivery charges will be calculated at checkout
                        </p>
                        <Link
                          href="/checkout"
                          onClick={() => setIsOpen(false)}
                          className="btn-primary w-full text-center block"
                        >
                          Proceed to Checkout
                        </Link>
                        <button
                          type="button"
                          className="mt-3 w-full text-center text-sm text-gray-500 hover:text-gray-700"
                          onClick={() => setIsOpen(false)}
                        >
                          Continue Shopping
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CartSidebar;
