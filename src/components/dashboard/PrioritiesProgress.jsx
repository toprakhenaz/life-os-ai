import React from 'react';
import { useHabit } from '../../context/HabitContext';

const PrioritiesProgress = () => {
  const { data, calculateCompletionRate } = useHabit();
  
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Top Priorities Progress</h2>
      {data.habits
        .filter(habit => habit.category === "top")
        .map(habit => (
          <div key={habit.id} className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{habit.name}</span>
              <span className="text-sm font-medium">{calculateCompletionRate(habit)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${calculateCompletionRate(habit)}%` }}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PrioritiesProgress;