import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Server, Bell } from 'lucide-react';
import MainLayout from '../layout/MainLayout';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      icon: Shield,
      title: 'Information We Collect',
      content: `We collect information that you provide directly to us, including:
        • Name and contact information
        • Educational details
        • Account credentials
        • Usage data and preferences
        • Device and browser information`
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: `Your information helps us:
        • Provide and improve our services
        • Personalize your learning experience
        • Send important updates and notifications
        • Analyze and enhance platform performance
        • Ensure platform security`
    },
    {
      icon: Eye,
      title: 'Information Sharing',
      content: `We do not sell your personal information. We may share your information with:
        • Service providers who assist our operations
        • Educational institutions (with your consent)
        • Law enforcement when required by law`
    },
    {
      icon: UserCheck,
      title: 'Your Rights and Choices',
      content: `You have the right to:
        • Access your personal information
        • Request corrections or deletions
        • Opt-out of communications
        • Control cookie preferences
        • Export your data`
    },
    {
      icon: Server,
      title: 'Data Security',
      content: `We implement robust security measures:
        • Encryption of sensitive data
        • Regular security audits
        • Secure data storage
        • Access controls
        • Incident response procedures`
    },
    {
      icon: Bell,
      title: 'Updates to Privacy Policy',
      content: `We may update this policy periodically. We will notify you of any material changes through:
        • Email notifications
        • Platform announcements
        • Website updates`
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your privacy is important to us. This policy outlines how we collect,
              use, and protect your personal information.
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
                      <div className="text-gray-300 whitespace-pre-line">
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
                Questions About Our Privacy Policy?
              </h2>
              <p className="text-gray-300 mb-6">
                If you have any questions or concerns about our privacy policy,
                please don't hesitate to contact us.
              </p>
              <button className="btn-primary">
                Contact Privacy Team
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicyPage;