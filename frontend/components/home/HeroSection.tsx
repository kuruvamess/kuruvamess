'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&h=1080&fit=crop"
          alt="Kerala Traditional Food"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Welcome to{' '}
              <span className="block text-secondary">Kuruva Mess House</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Authentic Kerala Traditional Cuisine Near the Beautiful Kuruva Island
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/menu" className="btn-primary inline-flex items-center justify-center">
                View Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/order" className="btn-secondary inline-flex items-center justify-center">
                Order Online
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-white">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-secondary mr-2" />
                <span>Near Kuruva Island</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-secondary mr-2" />
                <span>5:00 AM - 10:00 PM</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
