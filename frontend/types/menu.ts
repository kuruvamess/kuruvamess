export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory?: string;
  image: string;
  isVegetarian: boolean;
  isAvailable: boolean;
  isDailySpecial: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot';
  preparationTime: number;
  tags: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  rating: number;
  reviewCount: number;
  orderCount: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
