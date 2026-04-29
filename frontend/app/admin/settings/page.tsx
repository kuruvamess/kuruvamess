'use client';

import { useState } from 'react';
import { 
  Save, 
  Clock, 
  MapPin, 
  DollarSign, 
  Percent,
  Toggle,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState({
    restaurant: {
      name: 'Kuruva Mess House',
      tagline: 'Authentic Kerala Traditional Cuisine',
      email: 'kuruvamesshouse@gmail.com',
      phone1: '9846880933',
      phone2: '8075387332',
      address: 'Near Kuruva Island, Kerala',
      googleMapsUrl: 'https://maps.app.goo.gl/zWU5Ubk4cdaEA5G9A'
    },
    operations: {
      openTime: '05:00',
      closeTime: '22:00',
      isAcceptingOrders: true,
      autoConfirmOrders: false,
      preparationTimeBuffer: 15
    },
    delivery: {
      radius: 20,
      minimumOrder: 2000,
      freeDeliveryAbove: 0,
      baseDeliveryFee: 50,
      perKmCharge: 10
    },
    payment: {
      acceptCash: true,
      acceptUPI: true,
      acceptCards: true,
      acceptWallets: true,
      taxRate: 5,
      serviceChargePercent: 0
    },
    notifications: {
      newOrderEmail: true,
      newOrderSMS: true,
      lowStockAlert: true,
      dailyReport: true
    }
  });

  const handleChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: API call to update settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Restaurant Settings</h1>
        <p className="text-gray-600 mt-2">Manage your restaurant configuration and preferences</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Restaurant Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-primary" />
            Restaurant Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Restaurant Name
              </label>
              <input
                type="text"
                value={settings.restaurant.name}
                onChange={(e) => handleChange('restaurant', 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={settings.restaurant.tagline}
                onChange={(e) => handleChange('restaurant', 'tagline', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Primary Phone
              </label>
              <input
                type="tel"
                value={settings.restaurant.phone1}
                onChange={(e) => handleChange('restaurant', 'phone1', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Secondary Phone
              </label>
              <input
                type="tel"
                value={settings.restaurant.phone2}
                onChange={(e) => handleChange('restaurant', 'phone2', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </label>
              <input
                type="email"
                value={settings.restaurant.email}
                onChange={(e) => handleChange('restaurant', 'email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Address
              </label>
              <input
                type="text"
                value={settings.restaurant.address}
                onChange={(e) => handleChange('restaurant', 'address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-primary" />
            Operating Hours
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opening Time
              </label>
              <input
                type="time"
                value={settings.operations.openTime}
                onChange={(e) => handleChange('operations', 'openTime', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Closing Time
              </label>
              <input
                type="time"
                value={settings.operations.closeTime}
                onChange={(e) => handleChange('operations', 'closeTime', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preparation Buffer (min)
              </label>
              <input
                type="number"
                value={settings.operations.preparationTimeBuffer}
                onChange={(e) => handleChange('operations', 'preparationTimeBuffer', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.operations.isAcceptingOrders}
                onChange={(e) => handleChange('operations', 'isAcceptingOrders', e.target.checked)}
                className="mr-3 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Accept Online Orders</span>
              {!settings.operations.isAcceptingOrders && (
                <span className="ml-2 text-xs text-red-600">(Customers cannot place new orders)</span>
              )}
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.operations.autoConfirmOrders}
                onChange={(e) => handleChange('operations', 'autoConfirmOrders', e.target.checked)}
                className="mr-3 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Auto-confirm Orders</span>
            </label>
          </div>
        </div>

        {/* Delivery Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Delivery Settings
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Radius (km)
              </label>
              <input
                type="number"
                value={settings.delivery.radius}
                onChange={(e) => handleChange('delivery', 'radius', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order Amount (₹)
              </label>
              <input
                type="number"
                value={settings.delivery.minimumOrder}
                onChange={(e) => handleChange('delivery', 'minimumOrder', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Delivery Fee (₹)
              </label>
              <input
                type="number"
                value={settings.delivery.baseDeliveryFee}
                onChange={(e) => handleChange('delivery', 'baseDeliveryFee', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Per KM Charge (₹)
              </label>
              <input
                type="number"
                value={settings.delivery.perKmCharge}
                onChange={(e) => handleChange('delivery', 'perKmCharge', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Free Delivery Above (₹)
              </label>
              <input
                type="number"
                value={settings.delivery.freeDeliveryAbove}
                onChange={(e) => handleChange('delivery', 'freeDeliveryAbove', parseInt(e.target.value))}
                placeholder="0 for no free delivery"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-primary" />
            Payment Settings
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Percent className="w-4 h-4 inline mr-1" />
                Tax Rate (%)
              </label>
              <input
                type="number"
                value={settings.payment.taxRate}
                onChange={(e) => handleChange('payment', 'taxRate', parseFloat(e.target.value))}
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Charge (%)
              </label>
              <input
                type="number"
                value={settings.payment.serviceChargePercent}
                onChange={(e) => handleChange('payment', 'serviceChargePercent', parseFloat(e.target.value))}
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Accepted Payment Methods</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.payment.acceptCash}
                  onChange={(e) => handleChange('payment', 'acceptCash', e.target.checked)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700">Cash on Delivery</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.payment.acceptUPI}
                  onChange={(e) => handleChange('payment', 'acceptUPI', e.target.checked)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700">UPI (GPay, PhonePe, etc.)</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.payment.acceptCards}
                  onChange={(e) => handleChange('payment', 'acceptCards', e.target.checked)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700">Credit/Debit Cards</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.payment.acceptWallets}
                  onChange={(e) => handleChange('payment', 'acceptWallets', e.target.checked)}
                  className="mr-3 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700">Digital Wallets</span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center ${
              isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {isSubmitting ? (
              'Saving...'
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
