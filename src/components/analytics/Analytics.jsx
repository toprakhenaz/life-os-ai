import React from 'react';
import { useHabit } from '../../context/HabitContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const Analytics = () => {
  const { data } = useHabit();
  
  // Prepare data for mental energy chart
  const mentalEnergyData = data.user.mentalEnergyLog.map((value, index) => ({
    day: index + 1,
    energy: value
  })).filter(item => item.energy !== null);
  
  // Prepare data for habit completion chart
  const habitCompletionData = data.habits.map(habit => {
    const completedDays = habit.progress.filter(day => day).length;
    const percentage = Math.round((completedDays / habit.progress.length) * 100);
    
    return {
      name: habit.name,
      completion: percentage
    };
  });
  
  // Prepare data for influence skill progress
  const influenceSkillData = data.user.influenceSkillProgress.map(item => ({
    date: item.date.substring(5), // Show only MM-DD
    score: item.score
  }));
  
  // Prepare data for project completion pie chart
  const projectData = [
    { name: 'Completed', value: data.user.projectCompletionHistory.filter(p => p.status === 'completed').length },
    { name: 'In Progress', value: data.user.projectCompletionHistory.filter(p => p.status === 'in-progress').length },
    { name: 'Abandoned', value: data.user.projectCompletionHistory.filter(p => p.status === 'abandoned').length }
  ];
  
  const COLORS = ['#22c55e', '#3b82f6', '#ef4444'];
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow">
        <h2 className="text-xl font-bold mb-4">Mental Energy Trends</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mentalEnergyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#3b82f6" 
                activeDot={{ r: 8 }} 
                name="Mental Energy (1-10)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold mb-4">Habit Completion Rates</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={habitCompletionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="completion" name="Completion %" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold mb-4">Influence Skill Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={influenceSkillData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8b5cf6" 
                  activeDot={{ r: 8 }} 
                  name="Influence Skill Level"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold mb-4">Project Completion Status</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold mb-4">Weekly Completion Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.user.completionRates.map((rate, index) => ({ 
                  week: `Week ${index + 1}`, 
                  rate 
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#f59e0b" 
                  activeDot={{ r: 8 }} 
                  name="Weekly Completion %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;