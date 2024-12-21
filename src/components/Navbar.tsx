import React, { useEffect } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onAuthClick: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuthClick, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburgerButton = document.getElementById('hamburger-button');
      
      if (mobileMenu && hamburgerButton) {
        if (!mobileMenu.contains(event.target as Node) && 
            !hamburgerButton.contains(event.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'notes', label: 'Notes', path: '/notes' },
    { id: 'quizzes', label: 'Quizzes', path: '/quizzes' },
    { id: 'features', label: 'Features', path: '/features' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="text-purple-400" size={32} />
              <span className="text-xl md:text-2xl font-bold text-white">Note Library</span>
            </Link>
          </motion.div>
          
          {/* Mobile menu button */}
          <button
            id="hamburger-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2 z-50"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop menu */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-8"
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`text-gray-300 hover:text-white transition-colors ${
                  isActive(item.path) ? 'text-white font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAuthClick}
              className="btn-primary"
            >
              Sign In
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile menu */}
        <motion.div
          id="mobile-menu"
          initial={false}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'visible' : 'invisible'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-lg rounded-lg mt-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`block w-full px-3 py-2 text-gray-300 hover:text-white transition-colors text-left rounded-lg hover:bg-white/10 ${
                  isActive(item.path) ? 'bg-white/20 text-white font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button 
              onClick={() => {
                onAuthClick();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full px-3 py-2 text-gray-300 hover:text-white transition-colors text-left rounded-lg hover:bg-white/10"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;