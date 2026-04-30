'use client';

import { useState, useMemo } from 'react';
import MenuHeader from '@/components/menu/MenuHeader';
import MenuFilters from '@/components/menu/MenuFilters';
import MenuGrid from '@/components/menu/MenuGrid';
import { menuItems } from '@/lib/menuData';

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietFilter, setDietFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Filter and sort menu items
  const filteredItems = useMemo(() => {
    let items = [...menuItems];

    // Search filter
    if (searchTerm) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Diet filter
    if (dietFilter === 'veg') {
      items = items.filter(item => item.isVegetarian);
    } else if (dietFilter === 'non-veg') {
      items = items.filter(item => !item.isVegetarian);
    }

    // Price range filter
    items = items.filter(item => item.price >= priceRange.min && item.price <= priceRange.max);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        items.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        items.sort((a, b) => b.orderCount - a.orderCount);
    }

    return items;
  }, [searchTerm, selectedCategory, dietFilter, sortBy, priceRange]);

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-b from-emerald-50 via-white to-white">
      <MenuHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        itemCount={filteredItems.length}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <MenuFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              dietFilter={dietFilter}
              setDietFilter={setDietFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
          
          <div className="lg:col-span-3">
            <MenuGrid items={filteredItems} />
          </div>
        </div>
      </div>
    </main>
  );
}
