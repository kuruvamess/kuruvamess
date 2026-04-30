'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-500" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 50%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%)",
          }}
        />
        <div className="absolute inset-0 bg-emerald-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-12 text-white"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Experience Authentic Kerala Cuisine?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Visit us today or order online for delivery within 20 km. Authentic flavours, warm service, and a truly Kerala experience await you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/order" 
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center"
            >
              Order Online Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a 
              href="tel:9846880933" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call for Reservation
            </a>
          </div>

          {/* Quick Info */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
              className="bg-white/95 text-gray-900 px-6 py-6 rounded-xl shadow-lg"
            >
              <Clock className="w-8 h-8 mb-3 mx-auto text-primary" />
              <h3 className="font-semibold mb-1">Open Daily</h3>
              <p className="text-gray-600">5:00 AM - 10:00 PM</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
              className="bg-white/95 text-gray-900 px-6 py-6 rounded-xl shadow-lg"
            >
              <MapPin className="w-8 h-8 mb-3 mx-auto text-primary" />
              <h3 className="font-semibold mb-1">Find Us</h3>
              <a 
                href="https://maps.app.goo.gl/zWU5Ubk4cdaEA5G9A" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline"
              >
                Near Kuruva Island
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
              className="bg-white/95 text-gray-900 px-6 py-6 rounded-xl shadow-lg"
            >
              <Phone className="w-8 h-8 mb-3 mx-auto text-primary" />
              <h3 className="font-semibold mb-1">Contact</h3>
              <div className="text-gray-600">
                <a href="tel:9846880933" className="block hover:text-primary">9846880933</a>
                <a href="tel:8075387332" className="block hover:text-primary">8075387332</a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
