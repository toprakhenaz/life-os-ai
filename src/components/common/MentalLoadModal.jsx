import React from 'react';
import Modal from './Modal';
import { useHabit } from '../../context/HabitContext';

const MentalLoadModal = () => {
  const { 
    showMentalLoadModal, 
    setShowMentalLoadModal, 
    updateMentalLoad 
  } = useHabit();
  
  return (
    <Modal
      isOpen={showMentalLoadModal}
      onClose={() => setShowMentalLoadModal(false)}
      title="Mental Energy Check-in"
    >
      <p className="mb-4">How is your mental energy right now? (1-10)</p>
      <div className="flex justify-between mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
          <button
            key={value}
            onClick={() => updateMentalLoad(value)}
            className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${value <= 3 ? 'bg-red-500' : value <= 7 ? 'bg-yellow-500' : 'bg-green-500'} 
              text-white font-bold hover:opacity-80`}
          >
            {value}
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default MentalLoadModal;