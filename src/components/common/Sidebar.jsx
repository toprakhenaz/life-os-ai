import React from 'react';
import { 
  Calendar, BarChart, BookOpen, Settings, Home, List, User 
} from 'lucide-react';
import { useHabit } from '../../context/HabitContext';

const Sidebar = () => {
  const { activeTab, setActiveTab } = useHabit();
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'habits', label: 'Habits', icon: <List size={20} /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar size={20} /> },
    { id: 'resources', label: 'Resources', icon: <BookOpen size={20} /> },
    { id: 'stats', label: 'Analytics', icon: <BarChart size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];
  
  return (
    <div className="bg-white shadow-md w-64 h-screen fixed left-0 top-0 p-4">
      <div className="text-xl font-bold mb-8 text-center text-blue-600">
        LifeOS AI
      </div>
      
      <nav>
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`flex items-center w-full p-3 rounded-md transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button className="flex items-center w-full p-3 rounded-md hover:bg-gray-100 text-gray-700">
          <span className="mr-3"><Settings size={20} /></span>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;