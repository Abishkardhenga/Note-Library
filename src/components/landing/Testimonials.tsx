import React from 'react';
import { motion } from 'framer-motion';
import { Star, User, Quote } from 'lucide-react';
import { Parallax } from 'react-scroll-parallax';

const testimonials = [
  {
    name: 'Sudin Ghimire',
    role: 'Grade 12 Student',
    content: 'The study materials and quizzes have helped me improve my grades significantly. I feel more confident in my subjects now.',
    rating: 5
  },
  {
    name: 'Bibhuti Devkota',
    role: 'Grade 11 Student',
    content: 'The interactive learning approach makes studying more engaging. I especially love the practice quizzes.',
    rating: 5
  },
  {
    name: 'Ram Lal Yadav',
    role: 'Parent',
    content: 'As a parent, I appreciate how the platform helps my children stay organized with their studies.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Students Say
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Hear from our community about their experience with Note Library
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all hover:scale-105 relative group"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* User icon and details */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 group-hover:bg-purple-500/30 transition-colors">
                  <User className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-purple-300">{testimonial.role}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-4 space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-purple-400 fill-purple-400" 
                  />
                ))}
              </div>

              {/* Testimonial content */}
              <p className="text-gray-300 leading-relaxed">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}