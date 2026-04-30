'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, Car, Wifi, Users, CreditCard, Truck } from 'lucide-react';

const QuickInfo = () => {
  const infoCards = [
    {
      icon: Clock,
      title: 'Operating Hours',
      details: [
        'Open 7 Days a Week',
        '5:00 AM - 10:00 PM',
        'No holidays'
      ],
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: [
        'Near Kuruva Island',
        'Easy to find',
        'Tourist friendly area'
      ],
      bgColor: 'bg-secondary/10',
      iconColor: 'text-secondary',
      link: 'https://maps.app.goo.gl/zWU5Ubk4cdaEA5G9A'
    },
    {
      icon: Phone,
      title: 'Contact Us',
      details: [
        '9846880933',
        '8075387332',
        'WhatsApp available'
      ],
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Truck,
      title: 'Home Delivery',
      details: [
        '20km radius',
        'Min order: ₹2000',
        'Fast delivery'
      ],
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const features = [
    { icon: Car, text: 'Free Parking Available' },
    { icon: Wifi, text: 'Free Wi-Fi' },
    { icon: Users, text: '100 Person Capacity' },
    { icon: CreditCard, text: 'All Payment Methods' }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Know</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Quick information about our restaurant to help plan your visit
          </p>
        </motion.div>

        {/* Info Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {infoCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <ul className="space-y-1">
                {card.details.map((detail, idx) => (
                  <li key={idx} className="text-gray-600">
                    {card.link && idx === 0 ? (
                      <a 
                        href={card.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {detail} ↗
                      </a>
                    ) : (
                      detail
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Features Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="bg-primary rounded-lg p-8"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center text-white">
                <feature.icon className="w-6 h-6 mr-3" />
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Special Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 bg-yellow-50 rounded-lg p-4 inline-block">
            💡 <strong>Tip:</strong> Visit during lunch hours (12 PM - 2 PM) for our special Sadhya meals!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickInfo;
