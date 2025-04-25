import React from 'react';
import { useHabit } from '../../context/HabitContext';

const DailySchedule = () => {
  const { data, selectedDay } = useHabit();
  
  // Add checks to prevent the error
  const scheduleItems = data?.weeklySchedule?.[selectedDay] || [];
  
  return (
    <div className="space-y-2">
      {scheduleItems.length > 0 ? (
        scheduleItems.map((item, index) => (
          <div 
            key={index}
            className="flex border-l-4 border-blue-500 bg-gray-50 p-3 rounded"
          >
            <div className="w-24 text-gray-600 font-medium">
              {item.time}
            </div>
            <div className="flex-1">
              {item.activity}
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500">No schedule items for this day.</div>
      )}
    </div>
  );
};

export default DailySchedule;