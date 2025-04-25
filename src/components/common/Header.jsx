import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useHabit } from '../../context/HabitContext';

const Header = () => {
  const { data, setShowMentalLoadModal } = useHabit();
  
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800">
          Hello, {data.user.name}
        </h1>
        <p className="text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button 
          onClick={() => setShowMentalLoadModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Log Energy
        </button>
        
        <div className="relative">
          <Bell size={24} className="text-gray-600 cursor-pointer" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </div>
        
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;