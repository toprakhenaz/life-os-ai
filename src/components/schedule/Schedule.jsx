import React from 'react';
import DaySelector from './DaySelector';
import DailySchedule from './DailySchedule';
import ScheduleNotes from './ScheduleNotes';

const Schedule = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Weekly Schedule</h2>
          <DaySelector />
        </div>
        
        <DailySchedule />
      </div>
      
      <ScheduleNotes />
    </div>
  );
};

export default Schedule;