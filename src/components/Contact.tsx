import React, { useState } from 'react';
import { Mail, MessageSquare, Send, User, Phone, Clock } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await addDoc(collection(db, 'contactMessages'), {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });

      setFormData({ name: '', email: '', message: '' });
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
              Have questions or feedback? We're here to help and would love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform transition-all duration-300 hover:scale-105 border border-white/20 hover:bg-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Email Us</h3>
                    <p className="text-purple-400 font-medium">content.notelibrary@gmail.com</p>
                    <p className="text-gray-300 text-sm mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform transition-all duration-300 hover:scale-105 border border-white/20 hover:bg-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Live Chat</h3>
                    <p className="text-purple-400 font-medium">Available Now</p>
                    <p className="text-gray-300 text-sm mt-1">
                      Get instant support from our team
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 space-y-6 border border-white/20">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-white/20"
                      placeholder="John Doe"
                      required
                      disabled={sending}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-white/20"
                      placeholder="john@example.com"
                      required
                      disabled={sending}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[160px] resize-y transition-all hover:bg-white/20"
                    placeholder="How can we help you today?"
                    required
                    disabled={sending}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;