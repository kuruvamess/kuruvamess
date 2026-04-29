'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Rahul Sharma',
      location: 'Mumbai',
      rating: 5,
      review: 'Best authentic Kerala food I\'ve had outside of Kerala! The biryani is absolutely amazing, and the fish curry reminded me of my grandmother\'s cooking. Must visit when near Kuruva Island.',
      date: '2 weeks ago',
      avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=22c55e&color=fff'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      location: 'USA',
      rating: 5,
      review: 'As a tourist, this was the perfect introduction to Kerala cuisine. The staff was very helpful in explaining the dishes. The Sadhya was an incredible experience - so many flavors!',
      date: '1 month ago',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3b82f6&color=fff'
    },
    {
      id: 3,
      name: 'Priya Nair',
      location: 'Kochi',
      rating: 5,
      review: 'Finally found a place that serves authentic Kerala food! The porotta and beef curry combo is to die for. Very reasonable prices and generous portions. Will definitely come back.',
      date: '3 weeks ago',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Nair&background=ec4899&color=fff'
    },
    {
      id: 4,
      name: 'Mohammed Ali',
      location: 'Bangalore',
      rating: 4,
      review: 'Great ambiance and delicious food. The river fish fry was fresh and perfectly spiced. Only suggestion would be to add more parking space. Overall, highly recommended!',
      date: '1 week ago',
      avatar: 'https://ui-avatars.com/api/?name=Mohammed+Ali&background=f59e0b&color=fff'
    },
    {
      id: 5,
      name: 'Anjali Menon',
      location: 'Thrissur',
      rating: 5,
      review: 'Been coming here for years with my family. Consistent quality and taste. The breakfast items are exceptional - try the appam with stew. Staff is very courteous and attentive.',
      date: '4 days ago',
      avatar: 'https://ui-avatars.com/api/?name=Anjali+Menon&background=8b5cf6&color=fff'
    },
    {
      id: 6,
      name: 'David Chen',
      location: 'Singapore',
      rating: 5,
      review: 'Visiting Kuruva Island and found this gem! The variety of vegetarian options impressed me. Everything was fresh and flavorful. The mango pickle was outstanding!',
      date: '2 months ago',
      avatar: 'https://ui-avatars.com/api/?name=David+Chen&background=10b981&color=fff'
    }
  ];

  const stats = {
    totalReviews: 1250,
    averageRating: 4.7,
    recommendations: 98
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
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
            Don't just take our word for it - hear from our satisfied customers
          </p>

          {/* Review Stats */}
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{stats.averageRating}</p>
              <div className="flex items-center gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(stats.averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{stats.totalReviews}+</p>
              <p className="text-gray-600 mt-2">Total Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{stats.recommendations}%</p>
              <p className="text-gray-600 mt-2">Would Recommend</p>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200" />
              
              {/* Reviewer Info */}
              <div className="flex items-center mb-4">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2">{review.date}</span>
              </div>

              {/* Review Text */}
              <p className="text-gray-600 leading-relaxed">{review.review}</p>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mt-12"
        >
          <a 
            href="https://maps.app.goo.gl/zWU5Ubk4cdaEA5G9A" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center btn-secondary"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Read More Reviews on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
