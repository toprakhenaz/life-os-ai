import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useHabit } from '../../context/HabitContext';
import { renderIcon } from '../../utils/iconHelper';

const HabitItem = ({ habit, onClick }) => {
  return (
    <div 
      className="flex items-center justify-between p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="flex items-center">
        <span className="mr-3 text-blue-500">
          {renderIcon(habit.icon)}
        </span>
        <div>
          <h3 className="font-medium">{habit.name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              {habit.frequency}
            </span>
            <span className="text-xs ml-2 text-gray-500">
              {habit.timeRequired} min
            </span>
            <span className="text-xs ml-2 text-green-600 font-medium">
              Streak: {habit.streak} days
            </span>
          </div>
        </div>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </div>
  );
};

export default HabitItem;