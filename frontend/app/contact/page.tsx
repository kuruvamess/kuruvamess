'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: [
        'Near Kuruva Island',
        'Kerala, India',
        <a
          key="map"
          href="https://maps.app.goo.gl/zWU5Ubk4cdaEA5G9A"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Get Directions →
        </a>,
      ],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        <a key="phone1" href="tel:9846880933" className="hover:text-primary">
          9846880933
        </a>,
        <a key="phone2" href="tel:8075387332" className="hover:text-primary">
          8075387332
        </a>,
        'WhatsApp Available',
      ],
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      details: ['Open 7 Days a Week', '5:00 AM - 10:00 PM', 'No holidays'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        <a
          key="email"
          href="mailto:kuruvamesshouse@gmail.com"
          className="hover:text-primary break-all"
        >
          kuruvamesshouse@gmail.com
        </a>,
      ],
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’re here to help with reservations, catering enquiries, and special requests.
          </p>
        </motion.div>

        {/* Order Online Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-2 text-center">Order Online</h2>
            <p className="text-gray-600 mb-8 text-center text-lg">
              Call us to place your order and enjoy authentic Kerala cuisine!
            </p>
            
            {/* Contact Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Sunil UM */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                  <Image
                    src="https://ui-avatars.com/api/?name=Sunil+UM&size=128&background=22c55e&color=fff"
                    alt="Sunil UM"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Sunil UM</h3>
                <p className="text-gray-600 mb-3 text-sm">Co-Founder & Head Chef</p>
                <a 
                  href="tel:9846880933" 
                  className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary border-2 border-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
                >
                  <Phone className="w-4 h-4" />
                  9846880933
                </a>
              </div>

              {/* Vineetha Sunil */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                  <Image
                    src="https://ui-avatars.com/api/?name=Vineetha+Sunil&size=128&background=ec4899&color=fff"
                    alt="Vineetha Sunil"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Vineetha Sunil</h3>
                <p className="text-gray-600 mb-3 text-sm">Co-Founder & Operations Manager</p>
                <a 
                  href="tel:8075387332" 
                  className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary border-2 border-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
                >
                  <Phone className="w-4 h-4" />
                  8075387332
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, idx) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: false, amount: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                    <div className="space-y-1 text-gray-600">
                      {info.details.map((detail, detailIdx) => (
                        <p key={detailIdx}>{detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="font-semibold text-lg mb-4">Find Us on Map</h3>
            <a
              href="https://maps.app.goo.gl/zWU5Ubk4cdaEA5G9A"
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-video rounded-lg overflow-hidden relative group cursor-pointer"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.8971!2d76.0833!3d11.8333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDUwJzAwLjAiTiA3NsKwMDUnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-primary font-semibold">Click to Get Directions →</span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Additional Guidance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="mt-12 bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Other Ways to Reach Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">For Quick Response</h3>
              <p className="text-gray-600">
                Call us directly or send a WhatsApp message for immediate assistance.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">
                We're located near Kuruva Island with ample parking space.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
