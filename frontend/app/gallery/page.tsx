'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: 'food' | 'ambiance' | 'events' | 'team';
}

const galleryItems: GalleryItem[] = [
  // Food Images
  { id: 1, src: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop', alt: 'Kerala Biryani', category: 'food' },
  { id: 2, src: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&h=400&fit=crop', alt: 'Traditional Sadhya', category: 'food' },
  { id: 3, src: 'https://images.unsplash.com/photo-1626200419320-77448f03151d?w=600&h=400&fit=crop', alt: 'Fish Fry', category: 'food' },
  { id: 4, src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop', alt: 'Kerala Meals', category: 'food' },
  { id: 5, src: 'https://images.unsplash.com/photo-1630383249904-fc01cc4d1dc4?w=600&h=400&fit=crop', alt: 'Dosa Varieties', category: 'food' },
  { id: 6, src: 'https://images.unsplash.com/photo-1596128160992-bd90fb59f190?w=600&h=400&fit=crop', alt: 'Fish Curry', category: 'food' },
  
  // Ambiance Images
  { id: 7, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop', alt: 'Restaurant Interior', category: 'ambiance' },
  { id: 8, src: 'https://images.unsplash.com/photo-1554679665-f5537f187268?w=600&h=400&fit=crop', alt: 'Dining Area', category: 'ambiance' },
  { id: 9, src: 'https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=600&h=400&fit=crop', alt: 'Restaurant Exterior', category: 'ambiance' },
  { id: 10, src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop', alt: 'Outdoor Seating', category: 'ambiance' },
  
  // Events Images
  { id: 11, src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop', alt: 'Party Celebration', category: 'events' },
  { id: 12, src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop', alt: 'Campfire Night', category: 'events' },
  
  // Team Images
  { id: 13, src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=400&fit=crop', alt: 'Chef at Work', category: 'team' },
  { id: 14, src: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&h=400&fit=crop', alt: 'Kitchen Team', category: 'team' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'food' | 'ambiance' | 'events' | 'team'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'food', label: 'Food' },
    { id: 'ambiance', label: 'Ambiance' },
    { id: 'events', label: 'Events' },
    { id: 'team', label: 'Our Team' }
  ];

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    const previousIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    setSelectedImage(filteredItems[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    const nextIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(filteredItems[nextIndex]);
  };

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a visual journey through our restaurant, from our delicious dishes to our warm ambiance
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              viewport={{ once: false, amount: 0.2 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                    {item.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={handlePrevious}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
              <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg bg-black bg-opacity-50 px-4 py-2 rounded">
                {selectedImage.alt}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
