import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import defaultData from '../data/defaultData';

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [data, setData] = useLocalStorage('habitData', defaultData);
  const [activeTab, setActiveTab] = useLocalStorage('activeTab', 'dashboard');
  const [selectedDay, setSelectedDay] = useLocalStorage('selectedDay', 'monday');
  const [selectedHabit, setSelectedHabit] = React.useState(null);
  const [mentalLoad, setMentalLoad] = React.useState(5);
  const [showMentalLoadModal, setShowMentalLoadModal] = React.useState(false);
  const [showCompletionModal, setShowCompletionModal] = React.useState(false);
  
  // Mental load check-in reminder
  React.useEffect(() => {
    const mentalLoadCheckInterval = setInterval(() => {
      setShowMentalLoadModal(true);
    }, 21600000); // Every 6 hours
    
    return () => clearInterval(mentalLoadCheckInterval);
  }, []);
  
  // Show completion modal timeout handler
  React.useEffect(() => {
    let timeoutId;
    if (showCompletionModal) {
      timeoutId = setTimeout(() => {
        setShowCompletionModal(false);
      }, 3000);
    }
    
    return () => clearTimeout(timeoutId);
  }, [showCompletionModal]);
  
  const toggleHabitCompletion = (habitId) => {
    setData(prevData => {
      const updatedHabits = prevData.habits.map(habit => {
        if (habit.id === habitId) {
          const today = new Date().getDate() - 1; // 0-indexed for array
          const newProgress = [...habit.progress];
          newProgress[today] = !newProgress[today];
          
          // Update streak logic
          let newStreak = habit.streak;
          if (newProgress[today]) {
            newStreak += 1;
            
            // Show celebration for completing important habits
            if (habit.category === "top") {
              setShowCompletionModal(true);
            }
          } else {
            newStreak = Math.max(0, newStreak - 1);
          }
          
          return {
            ...habit,
            progress: newProgress,
            streak: newStreak
          };
        }
        return habit;
      });
      
      return {
        ...prevData,
        habits: updatedHabits
      };
    });
  };
  
  const updateMentalLoad = (value) => {
    setMentalLoad(value);
    
    // Store the mental load in user data
    const today = new Date().getDate() - 1;
    setData(prevData => {
      const updatedMentalEnergyLog = [...prevData.user.mentalEnergyLog];
      updatedMentalEnergyLog[today] = value;
      
      return {
        ...prevData,
        user: {
          ...prevData.user,
          mentalEnergyLog: updatedMentalEnergyLog
        }
      };
    });
    
    setShowMentalLoadModal(false);
  };

  const addNote = (habitId, note) => {
    setData(prevData => {
      const updatedHabits = prevData.habits.map(habit => {
        if (habit.id === habitId) {
          return {
            ...habit,
            notes: [...habit.notes, {
              id: Date.now(),
              text: note,
              date: new Date().toISOString()
            }]
          };
        }
        return habit;
      });
      
      return {
        ...prevData,
        habits: updatedHabits
      };
    });
  };
  
  // Calculate completion percentage for each habit
  const calculateCompletionRate = (habit) => {
    const completedDays = habit.progress.filter(day => day).length;
    return Math.round((completedDays / habit.progress.length) * 100);
  };
  
  const weeklyProgressCalculation = () => {
    // Calculate weekly progress based on habit completions
    // For a real app, implement actual calculation logic here
    return {
      influencePractice: 4,
      wealthActions: 5,
      problemsSolved: 8,
      pagesRead: 120,
      gymSessions: 3,
      englishPractice: 6
    };
  };
  
  return (
    <HabitContext.Provider
      value={{
        data,
        setData,
        activeTab,
        setActiveTab,
        selectedDay,
        setSelectedDay,
        selectedHabit,
        setSelectedHabit,
        mentalLoad,
        setMentalLoad,
        showMentalLoadModal,
        setShowMentalLoadModal,
        showCompletionModal,
        setShowCompletionModal,
        toggleHabitCompletion,
        updateMentalLoad,
        addNote,
        calculateCompletionRate,
        weeklyProgressCalculation
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabit = () => useContext(HabitContext);

export default HabitContext;