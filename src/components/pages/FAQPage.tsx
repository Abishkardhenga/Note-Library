import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageSquare } from 'lucide-react';
import MainLayout from '../layout/MainLayout';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = [
    { id: 'general', label: 'General' },
    { id: 'account', label: 'Account' },
    { id: 'content', label: 'Study Materials' },
    { id: 'technical', label: 'Technical' },
    { id: 'payment', label: 'Payment' },
  ];

  const faqs = {
    general: [
      {
        id: 'g1',
        question: 'What is Note Library?',
        answer: 'Note Library is a comprehensive online learning platform designed specifically for Grade 11 and 12 students in Nepal. We provide study materials, interactive quizzes, and personalized learning resources to help students excel in their academics.'
      },
      {
        id: 'g2',
        question: 'How can I get started?',
        answer: "Getting started is easy! Simply create an account, select your grade and subjects, and you will have immediate access to our study materials and quizzes. We offer both free and premium content to support your learning journey."
      },
      {
        id: 'g3',
        question: 'Is Note Library available on mobile devices?',
        answer: 'Yes! Note Library is fully responsive and works seamlessly on all devices including smartphones, tablets, and computers. You can access your study materials anytime, anywhere.'
      }
    ],
    account: [
      {
        id: 'a1',
        question: 'How do I create an account?',
        answer: 'Click the "Sign Up" button, enter your details, verify your email, and you are ready to go! You can also sign up using your Google account for faster access.'
      },
      {
        id: 'a2',
        question: 'Can I change my grade level?',
        answer: 'Yes, you can change your grade level from your profile settings at any time. This will update your dashboard to show relevant content for your new grade.'
      }
    ],
    content: [
      {
        id: 'c1',
        question: 'What subjects do you cover?',
        answer: 'We cover all major subjects for Grade 11 and 12 including Physics, Chemistry, Mathematics, Biology, Computer Science, English, and Nepali. Each subject includes comprehensive notes, practice questions, and quizzes.'
      },
      {
        id: 'c2',
        question: 'How often is content updated?',
        answer: 'Our content is regularly updated to align with the latest curriculum changes and examination patterns. We also add new practice questions and quizzes weekly.'
      }
    ],
    technical: [
      {
        id: 't1',
        question: 'What browsers are supported?',
        answer: 'Note Library works best on modern browsers like Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.'
      },
      {
        id: 't2',
        question: 'Can I download study materials for offline use?',
        answer: 'Yes, premium users can download PDF versions of study materials for offline access. This feature is available for most of our content.'
      }
    ],
    payment: [
      {
        id: 'p1',
        question: 'What payment methods do you accept?',
        answer: 'We accept various payment methods including eSewa, Khalti, bank transfers, and international credit/debit cards. All transactions are secure and encrypted.'
      },
      {
        id: 'p2',
        question: 'Is there a refund policy?',
        answer: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with our premium services. Contact our support team for assistance with refunds."
      }
    ]
  };

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = Object.entries(faqs).reduce((acc, [category, items]) => {
    if (category === activeCategory) {
      acc[category] = items.filter(item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return acc;
  }, {} as typeof faqs);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about Note Library and our services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeCategory === category.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {filteredFaqs[activeCategory]?.map((faq) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass-card"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between"
                    >
                      <span className="text-lg font-semibold text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`text-purple-400 transition-transform ${
                          openItems.includes(faq.id) ? 'rotate-180' : ''
                        }`}
                        size={20}
                      />
                    </button>
                    <AnimatePresence>
                      {openItems.includes(faq.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6"
                        >
                          <p className="text-gray-300">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-12 p-8 glass-card"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-300 mb-6">
                Cannot find the answer you are looking for? Our support team is here to help!
              </p>
              <button className="btn-primary">
                <MessageSquare className="mr-2" size={20} />
                Contact Support
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQPage;