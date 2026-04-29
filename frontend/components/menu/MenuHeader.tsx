'use client';

import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  itemCount: number;
}

const MenuHeader = ({ searchTerm, setSearchTerm, itemCount }: MenuHeaderProps) => {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-500" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 40%), radial-gradient(circle at 90% 10%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 35%)" }} />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-white" style={{ clipPath: "ellipse(120% 100% at 50% 100%)" }} />

      <div className="relative text-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 text-sm font-medium uppercase tracking-wider mb-6">
              Kerala flavours crafted with tradition
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Our Menu
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/90">
              Discover authentic Kerala cuisine with <span className="font-semibold text-white">{itemCount} delicious dishes</span>
              , crafted using fresh ingredients and century-old family recipes.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for dishes, ingredients, or cuisine type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 bg-white/95 shadow-lg shadow-emerald-900/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-400"
                />
              </div>
              <p className="mt-4 text-sm text-white/80">
                Tip: Try searching for "fish fry", "veg meals", or "biryani".
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MenuHeader;
