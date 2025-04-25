import React from 'react';
import { useHabit } from '../../context/HabitContext';

const WeeklyStats = () => {
  const { weeklyProgressCalculation } = useHabit();
  const progress = weeklyProgressCalculation();
  
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Weekly Stats</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Influence Practice Sessions:</span>
          <span className="font-bold">{progress.influencePractice}</span>
        </div>
        <div className="flex justify-between">
          <span>Wealth-Building Actions:</span>
          <span className="font-bold">{progress.wealthActions}</span>
        </div>
        <div className="flex justify-between">
          <span>Problems Solved:</span>
          <span className="font-bold">{progress.problemsSolved}</span>
        </div>
        <div className="flex justify-between">
          <span>Pages Read:</span>
          <span className="font-bold">{progress.pagesRead}</span>
        </div>
        <div className="flex justify-between">
          <span>Gym Sessions:</span>
          <span className="font-bold">{progress.gymSessions}</span>
        </div>
        <div className="flex justify-between">
          <span>English Practice Days:</span>
          <span className="font-bold">{progress.englishPractice}</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStats;