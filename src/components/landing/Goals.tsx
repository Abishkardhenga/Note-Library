import React from 'react';
import { motion } from 'framer-motion';
import { Target, Award, TrendingUp } from 'lucide-react';

const goals = [
  {
    icon: Target,
    title: 'Academic Excellence',
    description: 'Achieve top grades and master your subjects with our comprehensive study materials.'
  },
  {
    icon: Award,
    title: 'Skill Development',
    description: 'Build critical thinking and problem-solving skills essential for your future.'
  },
  {
    icon: TrendingUp,
    title: 'Continuous Growth',
    description: 'Track your progress and improve consistently with our adaptive learning system.'
  }
];

export default function Goals() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Our Goals</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
            We're committed to helping you achieve your academic goals and prepare for a successful future
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all hover:scale-105"
            >
              <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <goal.icon className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 text-center">{goal.title}</h3>
              <p className="text-gray-300 text-center">{goal.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}