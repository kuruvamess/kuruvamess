'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Utensils, Users, Award, MapPin } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Utensils,
      title: 'Traditional Recipes',
      description: 'Authentic Kerala cuisine prepared with time-honored recipes passed down through generations.'
    },
    {
      icon: Users,
      title: 'Family Atmosphere',
      description: 'A warm, welcoming environment perfect for families and groups up to 100 guests.'
    },
    {
      icon: Award,
      title: 'Quality Ingredients',
      description: 'Fresh, locally sourced ingredients including daily catch river fish and organic vegetables.'
    },
    {
      icon: MapPin,
      title: 'Prime Location',
      description: 'Conveniently located near the scenic Kuruva Island, perfect for tourists and locals alike.'
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience the True Taste of <span className="gradient-text">Kerala</span>
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Nestled near the breathtaking Kuruva Island, Kuruva Mess House has been serving 
              authentic Kerala traditional cuisine to locals and travelers alike. Founded by 
              Sunil UM and Vineetha Sunil, our restaurant was born from a passion for preserving 
              and sharing the authentic flavors of Kerala cuisine.
            </p>
            <p className="text-gray-600 mb-8">
              What started as a small venture has grown into a beloved dining destination for 
              tourists exploring Kuruva Island and locals seeking genuine homestyle Kerala food. 
              We take pride in using traditional recipes, fresh local ingredients, and cooking 
              methods that honor Kerala's rich culinary heritage.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: false, amount: 0.2 }}
                  className="flex items-start"
                >
                  <feature.icon className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop"
                    alt="Kerala Sadya"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&h=400&fit=crop"
                    alt="Traditional Kerala Kitchen"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1633350117612-88789e89a263?w=400&h=400&fit=crop"
                    alt="Kerala Fish Curry"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop"
                    alt="Kerala Biryani"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-secondary text-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-xl">
              <p className="text-3xl font-bold">100+</p>
              <p className="text-sm">Seating Capacity</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
