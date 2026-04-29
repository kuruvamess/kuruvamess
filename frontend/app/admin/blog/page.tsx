'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  User,
  BarChart
} from 'lucide-react';
import toast from 'react-hot-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  views: number;
  likes: number;
  featuredImage: string;
}

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Secret Behind Our Famous Biryani',
    slug: 'secret-behind-famous-biryani',
    excerpt: 'Discover the traditional techniques and special spices that make our biryani a customer favorite.',
    category: 'Recipe Tips',
    author: 'Sunil UM',
    status: 'published',
    publishedAt: '2024-01-15',
    views: 1234,
    likes: 89,
    featuredImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Exploring Kuruva Island: A Food Lover\'s Guide',
    slug: 'exploring-kuruva-island-food-guide',
    excerpt: 'Your complete guide to visiting Kuruva Island and enjoying authentic Kerala cuisine at our restaurant.',
    category: 'Kuruva Island Travel',
    author: 'Vineetha Sunil',
    status: 'published',
    publishedAt: '2024-01-10',
    views: 856,
    likes: 65,
    featuredImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Health Benefits of Traditional Kerala Cuisine',
    slug: 'health-benefits-kerala-cuisine',
    excerpt: 'Learn about the nutritional value and health benefits of authentic Kerala dishes.',
    category: 'Health & Nutrition',
    author: 'Guest Author',
    status: 'draft',
    views: 0,
    likes: 0,
    featuredImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop'
  }
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    'All Categories',
    'Kerala Food Stories',
    'Recipe Tips',
    'Restaurant Updates',
    'Kuruva Island Travel',
    'Health & Nutrition',
    'Food Culture',
    'Events'
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory.replace('All Categories', 'all');
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const toggleStatus = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, status: post.status === 'published' ? 'draft' : 'published' as 'draft' | 'published' }
        : post
    ));
    toast.success('Post status updated');
  };

  const deletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
      toast.success('Post deleted successfully');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-2">Create and manage blog posts</p>
        </div>
        <Link 
          href="/admin/blog/new" 
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="flex">
              {/* Image */}
              <div className="relative w-48 h-36">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </span>
                      {post.publishedAt && (
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views} views
                      </span>
                      <span className="flex items-center">
                        ❤️ {post.likes}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                    
                    <button
                      onClick={() => toggleStatus(post.id)}
                      className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                    >
                      <BarChart className="w-4 h-4" />
                    </button>
                    
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500">No blog posts found</p>
        </div>
      )}
    </div>
  );
}
