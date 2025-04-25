import React from 'react';
import { CheckCircle } from 'lucide-react';

const CompletionModal = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-bounce">
        <CheckCircle size={40} className="mx-auto mb-2 text-green-500" />
        <h2 className="text-2xl font-bold text-green-600 mb-2">Great Job!</h2>
        <p>You've completed a priority habit!</p>
      </div>
    </div>
  );
};

export default CompletionModal;