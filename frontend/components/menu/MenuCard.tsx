'use client';

import Image from 'next/image';
import { Star, Clock, ShoppingCart, Plus } from 'lucide-react';
import { MenuItem } from '@/types/menu';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard = ({ item }: MenuCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const getSpiceLevelIcon = (level?: string) => {
    const icons = {
      mild: '🌶️',
      medium: '🌶️🌶️',
      hot: '🌶️🌶️🌶️'
    };
    return level ? icons[level as keyof typeof icons] || '' : '';
  };

  const handleAddToCart = () => {
    addItem(item, quantity);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="flex">
        {/* Image */}
        <div className="relative w-1/3 h-40">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
          {item.isDailySpecial && (
            <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full">
              Daily Special
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${
              item.isVegetarian ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {item.isVegetarian ? '🟢 Veg' : '🔴 Non-Veg'}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              {item.rating}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {item.preparationTime} min
            </span>
            {item.spiceLevel && (
              <span title={`Spice Level: ${item.spiceLevel}`}>
                {getSpiceLevelIcon(item.spiceLevel)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-100 mt-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">₹{item.price}</p>
            {item.tags.length > 0 && (
              <div className="flex gap-1 mt-1">
                {item.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {item.isAvailable ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-1 min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors"
                title="Add to cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <span className="text-red-600 font-medium">Not Available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
