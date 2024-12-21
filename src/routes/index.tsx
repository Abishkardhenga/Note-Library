import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import OTPVerification from '../components/auth/OTPVerification';

// Lazy load components
const AdminPortal = React.lazy(() => import('../components/admin/AdminPortal'));
const StudentPortal = React.lazy(() => import('../components/student/StudentPortal'));
const OnboardingFlow = React.lazy(() => import('../components/onboarding/OnboardingFlow'));
const LandingPage = React.lazy(() => import('../pages/LandingPage'));
const AboutPage = React.lazy(() => import('../components/pages/AboutPage'));
const FAQPage = React.lazy(() => import('../components/pages/FAQPage'));
const PrivacyPolicyPage = React.lazy(() => import('../components/pages/PrivacyPolicyPage'));
const HelpCenterPage = React.lazy(() => import('../components/pages/HelpCenterPage'));
const TermsPage = React.lazy(() => import('../components/pages/TermsPage'));
const NotesPage = React.lazy(() => import('../components/pages/NotesPage'));
const BlogPage = React.lazy(() => import('../components/pages/BlogPage'));
const FeaturesPage = React.lazy(() => import('../components/pages/FeaturesPage'));
const QuizzesPage = React.lazy(() => import('../components/pages/QuizzesPage'));
const ContactPage = React.lazy(() => import('../components/pages/ContactPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const AppRoutes = () => {
  const { user, isAdmin } = useAuth();

  if (isAdmin) {
    return (
      <React.Suspense fallback={<LoadingSpinner />}>
        <AdminPortal userData={user} />
      </React.Suspense>
    );
  }

//   if (user?.emailVerified === false) {
//     return (
//       <React.Suspense fallback={<LoadingSpinner />}>
// <LandingPage/>
//       </React.Suspense>
//     )
//   }

  if (user?.setupComplete === false && user.emailVerified === true) {
    return (
      <React.Suspense fallback={<LoadingSpinner />}>
        <OnboardingFlow />
      </React.Suspense>
    );
  }

  if (user?.emailVerified === true ) {
    return (
      <React.Suspense fallback={<LoadingSpinner />}>
        <StudentPortal userData={user} />
      </React.Suspense>
    );
  }

  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/student" element={<Navigate to="/" />} />
        <Route path="/otpverify" element={<OTPVerification/>} />
        <Route path="/onboarding" element={<OnboardingFlow/>} />
      </Routes>
    </React.Suspense>
  );
};