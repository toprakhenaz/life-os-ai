import React from 'react';
import { HabitProvider, useHabit } from './context/HabitContext';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Habits from './components/habits/Habits';
import Schedule from './components/schedule/Schedule';
import Resources from './components/resources/Resources';
import Analytics from './components/analytics/Analytics';
import Profile from './components/profile/Profile';
import MentalLoadModal from './components/common/MentalLoadModal';
import CompletionModal from './components/common/CompletionModal';

const AppContent = () => {
  const { activeTab, showCompletionModal } = useHabit();
  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'habits':
        return <Habits />;
      case 'schedule':
        return <Schedule />;
      case 'resources':
        return <Resources />;
      case 'stats':
        return <Analytics />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />
      
      <div className="ml-64 p-6">
        <Header />
        
        <main className="mt-6">
          {renderContent()}
        </main>
      </div>
      
      <MentalLoadModal />
      <CompletionModal isVisible={showCompletionModal} />
    </div>
  );
};

const App = () => {
  return (
    <HabitProvider>
      <AppContent />
    </HabitProvider>
  );
};

export default App;