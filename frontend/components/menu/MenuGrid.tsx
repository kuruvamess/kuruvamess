'use client';

import { motion } from 'framer-motion';
import MenuCard from './MenuCard';
import { MenuItem } from '@/types/menu';

interface MenuGridProps {
  items: MenuItem[];
}

const MenuGrid = ({ items }: MenuGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <MenuCard item={item} />
        </motion.div>
      ))}
    </div>
  );
};

export default MenuGrid;
