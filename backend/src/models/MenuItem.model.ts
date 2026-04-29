import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory?: string;
  image?: string;
  isVegetarian: boolean;
  isAvailable: boolean;
  isDailySpecial: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot';
  preparationTime: number; // in minutes
  tags: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  rating?: number;
  reviewCount?: number;
  orderCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>({
  name: {
    type: String,
    required: [true, 'Please add a name for the menu item'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: [
      'Breakfast',
      'Lunch Specials',
      'Dinner',
      'Biryani',
      'Traditional Sadhya',
      'Dosa Varieties',
      'Chapathi & Porotta',
      'Curry Items',
      'River Fish',
      'Daily Specials',
      'Beverages',
      'Desserts',
      'Snacks'
    ]
  },
  subCategory: {
    type: String
  },
  image: {
    type: String,
    default: 'default-food.jpg'
  },
  isVegetarian: {
    type: Boolean,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isDailySpecial: {
    type: Boolean,
    default: false
  },
  spiceLevel: {
    type: String,
    enum: ['mild', 'medium', 'hot']
  },
  preparationTime: {
    type: Number,
    required: [true, 'Please add preparation time'],
    min: [0, 'Preparation time cannot be negative']
  },
  tags: [{
    type: String,
    trim: true
  }],
  allergens: [{
    type: String
  }],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  orderCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search
MenuItemSchema.index({ name: 'text', description: 'text', tags: 'text' });
MenuItemSchema.index({ category: 1, isAvailable: 1 });
MenuItemSchema.index({ price: 1 });
MenuItemSchema.index({ rating: -1 });

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
