import React from 'react';
import { Facebook, MessageCircle, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBlogClick = () => {
    if (user?.role === 'admin') {
      navigate('/student', { state: { activeTab: 'blog' } });
    } else {
      navigate('/blog');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-purple-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Note Library</h3>
            <p className="text-gray-300 mb-6">
              Your trusted companion for comprehensive study materials and interactive learning experiences.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://www.facebook.com/notelibrary" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-purple-400 transition-colors transform hover:scale-110"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://t.me/gradexii" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-purple-400 transition-colors transform hover:scale-110"
              >
                <MessageCircle size={24} />
              </a>
              <a 
                href="https://www.instagram.com/p/DCi-Li6TmLK/?igsh=MWY3bmZpOHR3dmd4eQ=="
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-purple-400 transition-colors transform hover:scale-110"
              >
                <Instagram size={24} />
              </a>
            </div>

            {/* App Download Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.notes.notelibrary"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 group"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1280px-Google_Play_Store_badge_EN.svg.png"
                alt="Get it on Google Play"
                className="h-6 group-hover:scale-105 transition-transform"
              />
            </a>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-gray-300 hover:text-purple-400 transition-colors">About Us</Link></li>
                  <li><Link to="/notes" className="text-gray-300 hover:text-purple-400 transition-colors">Study Materials</Link></li>
                  <li><Link to="/quizzes" className="text-gray-300 hover:text-purple-400 transition-colors">Practice Tests</Link></li>
                  <li>
                    <button 
                      onClick={handleBlogClick}
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      Blog
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-white">Support</h4>
                <ul className="space-y-2">
                  <li><Link to="/help" className="text-gray-300 hover:text-purple-400 transition-colors">Help Center</Link></li>
                  <li><Link to="/terms" className="text-gray-300 hover:text-purple-400 transition-colors">Terms of Service</Link></li>
                  <li><Link to="/privacy" className="text-gray-300 hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/faq" className="text-gray-300 hover:text-purple-400 transition-colors">FAQ</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors">
                <MapPin size={20} className="text-purple-400 flex-shrink-0" />
                <span className="text-sm"> Nepal</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors">
                <Mail size={20} className="text-purple-400 flex-shrink-0" />
                <span className="text-sm">content.notelibrary@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Note Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;