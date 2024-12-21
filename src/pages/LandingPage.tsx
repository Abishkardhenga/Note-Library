import React from 'react';
import Navbar from '../components/Navbar';
import Hero3D from '../components/landing/Hero3D';
import Features from '../components/landing/Features';
import QuizSection from '../components/landing/QuizSection';
import Goals from '../components/landing/Goals';
import Testimonials from '../components/landing/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import AdScript from '../components/AdScript';

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      <AdScript />
      <Navbar 
        onAuthClick={() => setShowAuthModal(true)} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      <main>
        <Hero3D />
        <Features />
        <QuizSection />
        <Goals />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};

export default LandingPage;