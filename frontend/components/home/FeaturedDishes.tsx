'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { withBasePath } from '@/lib/imagePath';

const FeaturedDishes = () => {
  const dishes = [
    {
      id: 1,
      name: 'Special Biryani',
      description: 'Our signature dish - aromatic basmati rice layered with tender meat, infused with authentic Kerala spices',
      image: '/menu/biriyani.jpeg',
      spiceLevel: 'medium',
      isVeg: false,
      tag: 'Signature Dish'
    },
    {
      id: 2,
      name: 'Nadan Sadhya',
      description: 'Traditional Kerala feast served on banana leaf with an array of vegetarian delicacies',
      image: '/menu/sadya.jpeg',
      spiceLevel: 'mild',
      isVeg: true,
      tag: 'Traditional'
    },
    {
      id: 3,
      name: 'River Fish Fry',
      description: 'Fresh catch from local rivers, marinated in traditional spices and fried to perfection',
      image: '/menu/river-fish-fry.jpeg',
      spiceLevel: 'hot',
      isVeg: false,
      tag: 'Daily Special'
    },
    {
      id: 4,
      name: 'Porotta & Chicken Curry',
      description: 'Flaky, layered Malabar porotta served with our spicy, flavorful Kerala chicken curry',
      image: '/menu/porotta-lunch.jpeg',
      spiceLevel: 'hot',
      isVeg: false,
      tag: 'Popular'
    },
    {
      id: 5,
      name: 'Chicken Fry',
      description: 'Crispy deep-fried bone-in chicken coated in roasted Kerala spice masala with fried curry leaves',
      image: '/menu/chicken-fry.jpeg',
      spiceLevel: 'medium',
      isVeg: false,
      tag: 'Local Favorite'
    },
    {
      id: 6,
      name: 'Fish Curry Meals',
      description: 'Traditional Kerala fish curry served with rice, vegetables, and accompaniments',
      image: '/menu/fish-curry-meals.jpeg',
      spiceLevel: 'medium',
      isVeg: false,
      tag: 'Meal'
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
                    src={withBasePath(dish.image)}
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
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{dish.description}</p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="text-base font-semibold text-primary">Price on request</span>
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
