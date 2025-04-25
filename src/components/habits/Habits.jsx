import React from 'react';
import HabitList from './HabitList';
import HabitDetail from './HabitDetail';
import { useHabit } from '../../context/HabitContext';

const Habits = () => {
  const { selectedHabit, setSelectedHabit } = useHabit();
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow">
        <h2 className="text-xl font-bold mb-4">My Habits</h2>
        
        <div className="space-y-4">
          <HabitList 
            title="Top Priorities" 
            category="top" 
            onSelectHabit={setSelectedHabit}
          />
          
          <HabitList 
            title="Supporting Habits" 
            category="support" 
            onSelectHabit={setSelectedHabit}
          />
          
          <HabitList 
            title="Health Habits" 
            category="health" 
            onSelectHabit={setSelectedHabit}
          />
        </div>
      </div>
      
      {selectedHabit && (
        <HabitDetail 
          habit={selectedHabit} 
          onClose={() => setSelectedHabit(null)} 
        />
      )}
    </div>
  );
};

export default Habits;