'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Flame } from 'lucide-react';

const FeaturedDishes = () => {
  const dishes = [
    {
      id: 1,
      name: 'Special Biryani',
      description: 'Our signature dish - aromatic basmati rice layered with tender meat, infused with authentic Kerala spices',
      price: '₹180',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop',
      rating: 4.8,
      prepTime: '45 min',
      spiceLevel: 'medium',
      isVeg: false,
      tag: 'Signature Dish'
    },
    {
      id: 2,
      name: 'Nadan Sadhya',
      description: 'Traditional Kerala feast served on banana leaf with an array of vegetarian delicacies',
      price: '₹250',
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&h=400&fit=crop',
      rating: 4.9,
      prepTime: '30 min',
      spiceLevel: 'mild',
      isVeg: true,
      tag: 'Traditional'
    },
    {
      id: 3,
      name: 'River Fish Fry',
      description: 'Fresh catch from local rivers, marinated in traditional spices and fried to perfection',
      price: '₹220',
      image: 'https://images.unsplash.com/photo-1626200419320-77448f03151d?w=600&h=400&fit=crop',
      rating: 4.7,
      prepTime: '25 min',
      spiceLevel: 'hot',
      isVeg: false,
      tag: 'Daily Special'
    },
    {
      id: 4,
      name: 'Kerala Porotta & Beef Curry',
      description: 'Flaky, layered porotta served with spicy and flavorful beef curry',
      price: '₹150',
      image: 'https://images.unsplash.com/photo-1670163090584-e43596b4471f?w=600&h=400&fit=crop',
      rating: 4.6,
      prepTime: '35 min',
      spiceLevel: 'hot',
      isVeg: false,
      tag: 'Popular'
    },
    {
      id: 5,
      name: 'Masala Dosa',
      description: 'Crispy rice crepe filled with spiced potato filling, served with sambar and chutneys',
      price: '₹80',
      image: 'https://images.unsplash.com/photo-1630383249904-fc01cc4d1dc4?w=600&h=400&fit=crop',
      rating: 4.5,
      prepTime: '20 min',
      spiceLevel: 'mild',
      isVeg: true,
      tag: 'Breakfast Special'
    },
    {
      id: 6,
      name: 'Fish Curry Meals',
      description: 'Traditional Kerala fish curry served with rice, vegetables, and accompaniments',
      price: '₹120',
      image: 'https://images.unsplash.com/photo-1596128160992-bd90fb59f190?w=600&h=400&fit=crop',
      rating: 4.7,
      prepTime: '30 min',
      spiceLevel: 'medium',
      isVeg: false,
      tag: 'Local Favorite'
    }
  ];

  const getSpiceLevelIcon = (level: string) => {
    const icons = {
      mild: '🌶️',
      medium: '🌶️🌶️',
      hot: '🌶️🌶️🌶️'
    };
    return icons[level as keyof typeof icons] || '';
  };

  return (
    <section className="section-padding">
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
            Our <span className="gradient-text">Featured Dishes</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our most loved dishes, from traditional Kerala Sadhya to our famous Biryani,
            each prepared with authentic spices and fresh ingredients.
          </p>
        </motion.div>

        {/* Dishes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {dish.tag}
                    </span>
                    {dish.isVeg && (
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Veg
                      </span>
                    )}
                  </div>
                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{dish.price}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{dish.description}</p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        {dish.rating}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {dish.prepTime}
                      </span>
                    </div>
                    <span title={`Spice Level: ${dish.spiceLevel}`}>
                      {getSpiceLevelIcon(dish.spiceLevel)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/menu" className="btn-primary inline-flex items-center">
            View Full Menu
            <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
