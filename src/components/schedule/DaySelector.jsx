import React from 'react';
import { useHabit } from '../../context/HabitContext';

const DaySelector = () => {
  const { selectedDay, setSelectedDay } = useHabit();
  
  const days = [
    { id: 'monday', label: 'Mon' },
    { id: 'tuesday', label: 'Tue' },
    { id: 'wednesday', label: 'Wed' },
    { id: 'thursday', label: 'Thu' },
    { id: 'friday', label: 'Fri' },
    { id: 'saturday', label: 'Sat' },
    { id: 'sunday', label: 'Sun' },
  ];
  
  return (
    <div className="flex space-x-2">
      {days.map(day => (
        <button
          key={day.id}
          className={`px-2 py-1 rounded text-xs ${
            selectedDay === day.id 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setSelectedDay(day.id)}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;