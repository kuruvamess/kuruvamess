'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Award, Heart, MapPin } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Quality',
      description: 'Every dish is prepared with love and the finest ingredients, ensuring authentic flavors in every bite.'
    },
    {
      icon: Users,
      title: 'Family Values',
      description: 'As a family-run business, we treat every customer like family, creating a warm and welcoming atmosphere.'
    },
    {
      icon: Award,
      title: 'Traditional Excellence',
      description: 'We preserve age-old recipes and cooking techniques passed down through generations.'
    },
    {
      icon: MapPin,
      title: 'Local Connection',
      description: 'Deeply rooted in the community, we source fresh ingredients locally and support local farmers.'
    }
  ];

  const milestones = [
    { year: '2015', event: 'Founded by Sunil UM & Vineetha Sunil' },
    { year: '2017', event: 'Expanded seating capacity to 100 guests' },
    { year: '2019', event: 'Introduced home delivery service' },
    { year: '2021', event: 'Won local award for Best Traditional Restaurant' },
    { year: '2023', event: 'Launched online ordering system' }
  ];

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-500" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 40%), radial-gradient(circle at 90% 10%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 35%)" }} />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-white" style={{ clipPath: "ellipse(120% 100% at 50% 100%)" }} />
        
        <div className="relative text-white pt-16 sm:pt-20 pb-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                A journey of passion, tradition, and authentic Kerala flavors
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Story */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Welcome to Kuruva Mess House</h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-4">
              Nestled near the breathtaking Kuruva Island, Kuruva Mess House has been serving authentic Kerala 
              traditional cuisine to locals and travelers alike since 2015. What started as a humble venture by 
              Sunil UM and Vineetha Sunil has grown into a beloved dining destination that celebrates the rich 
              culinary heritage of Kerala.
            </p>
            <p className="mb-4">
              Our journey began with a simple vision: to share the authentic flavors of Kerala that we grew up 
              with. Every recipe in our kitchen has a story, passed down through generations and perfected over 
              time. From our signature biryani to the traditional Nadan Sadhya, each dish is prepared with the 
              same care and attention as if we were cooking for our own family.
            </p>
            <p>
              Today, with a seating capacity of 100 guests and a dedicated team of culinary experts, we continue 
              to uphold our commitment to quality, authenticity, and warm hospitality. Whether you're a tourist 
              exploring Kuruva Island or a local seeking comfort food, Kuruva Mess House welcomes you with open 
              arms and delicious food.
            </p>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: false, amount: 0.2 }}
                className="text-center"
              >
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Founders */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 bg-gray-50 rounded-lg p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Founders</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-48 h-48 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                <Image
                  src="https://ui-avatars.com/api/?name=Sunil+UM&size=192&background=22c55e&color=fff"
                  alt="Sunil UM"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Sunil UM</h3>
              <p className="text-gray-600 mb-2">Co-Founder & Head Chef</p>
              <p className="text-gray-500">Contact: 9846880933</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                <Image
                  src="https://ui-avatars.com/api/?name=Vineetha+Sunil&size=192&background=ec4899&color=fff"
                  alt="Vineetha Sunil"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Vineetha Sunil</h3>
              <p className="text-gray-600 mb-2">Co-Founder & Operations Manager</p>
              <p className="text-gray-500">Contact: 8075387332</p>
            </div>
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: false, amount: 0.2 }}
                className={`flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-1">
                  <div className={`bg-white p-6 rounded-lg shadow-lg ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <h3 className="text-xl font-bold text-primary mb-2">{milestone.year}</h3>
                    <p className="text-gray-600">{milestone.event}</p>
                  </div>
                </div>
                <div className="mx-8">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
