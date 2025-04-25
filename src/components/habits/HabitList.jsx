import React from 'react';
import HabitItem from './HabitItem';
import { useHabit } from '../../context/HabitContext';

const HabitList = ({ title, category, onSelectHabit }) => {
  const { data } = useHabit();
  
  const filteredHabits = data.habits.filter(habit => habit.category === category);
  
  return (
    <div className="mb-6">
      <h3 className="font-medium text-gray-700 mb-2">{title}</h3>
      <div className="space-y-2">
        {filteredHabits.map(habit => (
          <HabitItem 
            key={habit.id} 
            habit={habit} 
            onClick={() => onSelectHabit(habit)}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitList;