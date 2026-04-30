'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight, Search } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Secret Behind Our Famous Biryani',
    slug: 'secret-behind-famous-biryani',
    excerpt: 'Discover the traditional techniques and special spices that make our biryani a customer favorite.',
    category: 'Recipe Tips',
    author: 'Sunil UM',
    date: '2024-01-15',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=400&fit=crop',
    tags: ['Biryani', 'Recipe', 'Traditional']
  },
  {
    id: '2',
    title: 'Exploring Kuruva Island: A Food Lover\'s Guide',
    slug: 'exploring-kuruva-island-food-guide',
    excerpt: 'Your complete guide to visiting Kuruva Island and enjoying authentic Kerala cuisine at our restaurant.',
    category: 'Kuruva Island Travel',
    author: 'Vineetha Sunil',
    date: '2024-01-10',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=400&fit=crop',
    tags: ['Travel', 'Kuruva Island', 'Tourism']
  },
  {
    id: '3',
    title: 'Health Benefits of Traditional Kerala Cuisine',
    slug: 'health-benefits-kerala-cuisine',
    excerpt: 'Learn about the nutritional value and health benefits of authentic Kerala dishes.',
    category: 'Health & Nutrition',
    author: 'Guest Author',
    date: '2024-01-05',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=400&fit=crop',
    tags: ['Health', 'Nutrition', 'Traditional Food']
  },
  {
    id: '4',
    title: 'The Art of Making Perfect Nadan Sadhya',
    slug: 'art-making-perfect-nadan-sadhya',
    excerpt: 'A deep dive into the cultural significance and preparation of Kerala\'s traditional feast.',
    category: 'Food Culture',
    author: 'Sunil UM',
    date: '2023-12-28',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&h=400&fit=crop',
    tags: ['Sadhya', 'Culture', 'Traditional']
  },
  {
    id: '5',
    title: 'Fresh River Fish: From Catch to Plate',
    slug: 'fresh-river-fish-catch-to-plate',
    excerpt: 'How we ensure the freshest river fish reaches your plate with maximum flavor.',
    category: 'Kerala Food Stories',
    author: 'Kitchen Team',
    date: '2023-12-20',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1626200419320-77448f03151d?w=800&h=400&fit=crop',
    tags: ['Fish', 'Fresh Ingredients', 'Quality']
  },
  {
    id: '6',
    title: 'Celebrating Onam at Kuruva Mess House',
    slug: 'celebrating-onam-kuruva-mess-house',
    excerpt: 'Join us for special Onam celebrations with traditional Sadhya and cultural programs.',
    category: 'Events',
    author: 'Vineetha Sunil',
    date: '2023-12-15',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&h=400&fit=crop',
    tags: ['Onam', 'Festival', 'Events']
  }
];

const categories = [
  'All',
  'Kerala Food Stories',
  'Recipe Tips',
  'Restaurant Updates',
  'Kuruva Island Travel',
  'Health & Nutrition',
  'Food Culture',
  'Events'
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stories, recipes, and insights from Kerala's culinary heritage
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-4">{post.author}</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime} min read</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary rounded-lg p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6">Get the latest updates on new dishes, special offers, and Kerala food stories</p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
