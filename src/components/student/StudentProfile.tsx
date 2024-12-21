import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Mail, Phone, Book } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface StudentProfileProps {
  userData: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    grade: string;
  };
  onUpdate: (data: any) => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: userData.fullName || '',
    email: userData.email || '',
    phone: userData.phone || '',
    grade: userData.grade || '11'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userRef = doc(db, 'users', userData.id);
      await updateDoc(userRef, formData);
      onUpdate(formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Grade</label>
            <div className="relative">
              <Book className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                disabled={isLoading}
              >
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary"
          >
            <Save size={20} className="mr-2" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default StudentProfile;