import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookText, Brain, MessageSquare, 
  LogOut, UserCircle, Menu, X, BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StudentProfile from './StudentProfile';
import StudentFeedback from './StudentFeedback';
import NotesViewer from '../notes/NotesViewer';
import StudentQuizSection from './QuizSection';
import StudentBlog from './StudentBlog';

interface StudentPortalProps {
  userData: any;
}

const StudentPortal: React.FC<StudentPortalProps> = ({ userData }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notes');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'notes', label: 'Study Notes', icon: BookText },
    { id: 'quizzes', label: 'Quizzes', icon: Brain },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'notes':
        return <NotesViewer />;
      case 'quizzes':
        return <StudentQuizSection grade={userData.grade} />;
      case 'blog':
        return <StudentBlog />;
      case 'profile':
        return <StudentProfile userData={userData} onUpdate={() => {}} />;
      case 'feedback':
        return <StudentFeedback userId={userData.id} userName={userData.fullName} />;
      default:
        return <NotesViewer />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/10 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="flex items-center justify-between px-4 h-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
              <UserCircle size={20} />
            </div>
            <span className="text-white font-semibold">{userData.fullName}</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          x: isMobileMenuOpen ? '0%' : '-100%',
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ type: 'tween' }}
        className="lg:hidden fixed inset-0 top-16 bg-white/10 backdrop-blur-xl z-40 w-64"
      >
        <div className="p-4">
          <nav className="space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-white/10 transition-all duration-200"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-white/10 backdrop-blur-xl border-r border-white/10">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
              <UserCircle size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold">{userData.fullName}</h3>
              <p className="text-gray-400 text-sm">Grade {userData.grade}</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 btn-secondary !justify-start gap-3"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className={`lg:ml-64 min-h-screen ${isMobileMenuOpen ? 'blur-sm' : ''}`}>
        <div className="h-16 lg:h-0" />
        <div className="container mx-auto p-4 lg:py-6 lg:px-8">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-white">
              {navItems.find(item => item.id === activeTab)?.label}
            </h1>
          </div>

          <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 lg:p-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentPortal;