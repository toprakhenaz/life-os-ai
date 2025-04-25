import React from 'react';
import DailyFocus from './DailyFocus';
import PrioritiesProgress from './PrioritiesProgress';
import WeeklyStats from './WeeklyStats';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DailyFocus />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PrioritiesProgress />
        <WeeklyStats />
      </div>
    </div>
  );
};

export default Dashboard;