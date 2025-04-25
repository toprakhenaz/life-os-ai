import React from 'react';
import { Circle, CheckCircle } from 'lucide-react';
import { useHabit } from '../../context/HabitContext';
import { renderIcon } from '../../utils/iconHelper';

const DailyFocus = () => {
  const { data, toggleHabitCompletion } = useHabit();
  
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Today's Focus</h2>
      <div className="space-y-4">
        {data.habits.map(habit => (
          <div key={habit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <span className="mr-3 text-blue-500">
                {renderIcon(habit.icon)}
              </span>
              <div>
                <h3 className="font-medium">{habit.name}</h3>
                <p className="text-sm text-gray-500">{habit.description}</p>
              </div>
            </div>
            <button 
              onClick={() => toggleHabitCompletion(habit.id)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              {habit.progress[new Date().getDate() - 1] ? 
                <CheckCircle className="text-green-500" /> : 
                <Circle className="text-gray-400" />
              }
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyFocus;