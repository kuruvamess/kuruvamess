'use client';

import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { menuCategories } from '@/lib/menuData';

interface MenuFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  dietFilter: string;
  setDietFilter: (diet: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
}

const MenuFilters = ({
  selectedCategory,
  setSelectedCategory,
  dietFilter,
  setDietFilter,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange
}: MenuFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.2 }}
      className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
    >
      <div className="flex items-center mb-6">
        <Filter className="w-5 h-5 mr-2 text-primary" />
        <h2 className="text-xl font-bold">Filters</h2>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              value="all"
              checked={selectedCategory === 'all'}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mr-2 text-primary focus:ring-primary"
            />
            <span className="text-gray-700">All Categories</span>
          </label>
          {menuCategories.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mr-2 text-primary focus:ring-primary"
              />
              <span className="text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Diet Preference */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Diet Preference</h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="diet"
              value="all"
              checked={dietFilter === 'all'}
              onChange={(e) => setDietFilter(e.target.value)}
              className="mr-2"
            />
            <span className="text-gray-700">All</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="diet"
              value="veg"
              checked={dietFilter === 'veg'}
              onChange={(e) => setDietFilter(e.target.value)}
              className="mr-2"
            />
            <span className="text-gray-700">🟢 Vegetarian</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="diet"
              value="non-veg"
              checked={dietFilter === 'non-veg'}
              onChange={(e) => setDietFilter(e.target.value)}
              className="mr-2"
            />
            <span className="text-gray-700">🔴 Non-Vegetarian</span>
          </label>
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Sort By
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Min: ₹{priceRange.min}</label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Max: ₹{priceRange.max}</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => {
          setSelectedCategory('all');
          setDietFilter('all');
          setSortBy('popular');
          setPriceRange({ min: 0, max: 1000 });
        }}
        className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Reset Filters
      </button>
    </motion.div>
  );
};

export default MenuFilters;
