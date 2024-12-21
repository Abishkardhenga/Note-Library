import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import WelcomeAnimation from './WelcomeAnimation';
import GradeSelection from './GradeSelection';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const OnboardingFlow: React.FC = () => {
  const { user } = useAuth();
  const [step, setStep] = useState<'welcome' | 'grade'>('welcome');

  const handleGradeSelect = async (grade: string) => {
    if (!user?.id) {
      toast.error('User not found');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        grade,
        setupComplete: true
      });
    } catch (error) {
      console.error('Error updating grade:', error);
      throw new Error('Failed to update grade');
    }
  };

  if (step === 'welcome') {
    return (
      <WelcomeAnimation
        userName={user?.fullName || ''}
        onComplete={() => setStep('grade')}
      />
    );
  }

  return <GradeSelection onSelect={handleGradeSelect} />;
};

export default OnboardingFlow;