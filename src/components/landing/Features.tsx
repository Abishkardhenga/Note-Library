import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Trophy, Users, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Study Materials',
    description: 'Access detailed notes and resources for every subject'
  },
  {
    icon: Brain,
    title: 'Interactive Learning',
    description: 'Engage with quizzes and interactive exercises'
  },
  {
    icon: Trophy,
    title: 'Progress Tracking',
    description: 'Monitor your academic growth with detailed analytics'
  },
  {
    icon: Users,
    title: 'Expert Teachers',
    description: 'Learn from experienced educators in your field'
  },
  {
    icon: Clock,
    title: 'Flexible Learning',
    description: 'Study at your own pace, anywhere, anytime'
  },
  {
    icon: Shield,
    title: 'Quality Content',
    description: 'Curriculum-aligned materials reviewed by experts'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Us?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover the features that make our platform the perfect choice for your academic journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}