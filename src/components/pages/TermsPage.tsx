import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Shield, 
  UserCheck, 
  AlertTriangle, 
  DollarSign,
  Scale
} from 'lucide-react';
import MainLayout from '../layout/MainLayout';

const TermsPage = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Terms of Use',
      content: 'By accessing and using Note Library, you agree to these terms and conditions. These terms apply to all visitors, users, and others who access or use our service.'
    },
    {
      icon: Shield,
      title: 'User Responsibilities',
      content: 'Users must provide accurate registration information, maintain account security, not share credentials, use content for personal non-commercial purposes, and respect intellectual property rights.'
    },
    {
      icon: UserCheck,
      title: 'Content Usage',
      content: 'All content provided on Note Library is for educational purposes only. Users may access and view content for personal use, download materials for offline study, and share content with proper attribution. Users may not redistribute or sell our content, remove copyright notices, or create derivative works.'
    },
    {
      icon: AlertTriangle,
      title: 'Termination',
      content: 'We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.'
    },
    {
      icon: DollarSign,
      title: 'Payment Terms',
      content: 'For premium services, payments are processed securely, subscriptions auto-renew unless cancelled, refunds are provided according to our refund policy, and prices may change with notice.'
    },
    {
      icon: Scale,
      title: 'Limitation of Liability',
      content: 'Note Library and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.'
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Please read these terms carefully before using Note Library.
            </p>
            <p className="text-gray-400 mt-4">
              Last updated: March 15, 2024
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 md:p-8"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <section.icon className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                        {section.title}
                      </h2>
                      <div className="text-gray-300">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-8 glass-card text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Questions About Our Terms?
              </h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about our terms of service,
                please contact our legal team.
              </p>
              <button className="btn-primary">
                Contact Legal Team
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsPage;