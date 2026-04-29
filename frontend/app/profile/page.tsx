'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Mail, Package, Settings, LogOut, Edit2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Mock user data - replace with actual auth context
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '9876543210',
  addresses: [
    {
      id: '1',
      street: '123 Main Street',
      area: 'Near City Mall',
      landmark: 'Opposite Park',
      pincode: '670001',
      isDefault: true
    }
  ]
};

export default function ProfilePage() {
  const router = useRouter();
  const [user] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    // TODO: Implement actual logout
    toast.success('Logged out successfully');
    router.push('/');
  };

  const profileLinks = [
    {
      icon: Package,
      label: 'My Orders',
      href: '/profile/orders',
      description: 'View and track your orders'
    },
    {
      icon: MapPin,
      label: 'Saved Addresses',
      href: '/profile/addresses',
      description: 'Manage delivery addresses'
    },
    {
      icon: Settings,
      label: 'Account Settings',
      href: '/profile/settings',
      description: 'Update your preferences'
    }
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-primary hover:text-primary/80"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <div className="flex items-center mt-1">
                      <User className="w-5 h-5 text-gray-400 mr-2" />
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <p className="font-medium">{user.name}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <div className="flex items-center mt-1">
                      <Mail className="w-5 h-5 text-gray-400 mr-2" />
                      {isEditing ? (
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <p className="font-medium">{user.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <div className="flex items-center mt-1">
                      <Phone className="w-5 h-5 text-gray-400 mr-2" />
                      {isEditing ? (
                        <input
                          type="tel"
                          defaultValue={user.phone}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <p className="font-medium">{user.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        toast.success('Profile updated');
                      }}
                      className="btn-primary flex-1 py-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {profileLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 block"
                    >
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-3 rounded-lg mr-4">
                          <link.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{link.label}</h3>
                          <p className="text-gray-600 text-sm">{link.description}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Default Address */}
              {user.addresses.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-6 bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Default Delivery Address</h3>
                    <Link href="/profile/addresses" className="text-primary hover:underline text-sm">
                      Manage
                    </Link>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">{user.addresses[0].street}</p>
                      <p className="text-gray-600">
                        {user.addresses[0].area}, {user.addresses[0].landmark}
                      </p>
                      <p className="text-gray-600">Pincode: {user.addresses[0].pincode}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
