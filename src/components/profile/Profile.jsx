import React, { useState } from 'react';
import { User, Edit, Save, X } from 'lucide-react';
import { useHabit } from '../../context/HabitContext';

const Profile = () => {
  const { data, setData } = useHabit();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: data.user.name,
    topPriorities: [...data.user.topPriorities]
  });
  
  const handleSave = () => {
    setData({
      ...data,
      user: {
        ...data.user,
        name: editedUser.name,
        topPriorities: [...editedUser.topPriorities]
      }
    });
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedUser({
      name: data.user.name,
      topPriorities: [...data.user.topPriorities]
    });
    setIsEditing(false);
  };
  
  const handlePriorityChange = (index, value) => {
    const updatedPriorities = [...editedUser.topPriorities];
    updatedPriorities[index] = value;
    setEditedUser({
      ...editedUser,
      topPriorities: updatedPriorities
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">User Profile</h2>
          {isEditing ? (
            <div className="flex space-x-2">
              <button 
                onClick={handleSave}
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                <Save size={20} />
              </button>
              <button 
                onClick={handleCancel}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              <Edit size={20} />
            </button>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <div className="h-40 w-40 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={80} />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="mb-4">
              <h3 className="text-gray-500 mb-1">Name</h3>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="text-lg font-medium">{data.user.name}</p>
              )}
            </div>
            
            <div>
              <h3 className="text-gray-500 mb-1">Top Priorities</h3>
              {isEditing ? (
                <div className="space-y-2">
                  {editedUser.topPriorities.map((priority, index) => (
                    <input 
                      key={index}
                      type="text" 
                      value={priority}
                      onChange={(e) => handlePriorityChange(index, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ))}
                </div>
              ) : (
                <ul className="list-disc list-inside">
                  {data.user.topPriorities.map((priority, index) => (
                    <li key={index} className="text-lg">
                      {priority}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold mb-4">System Usage Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-blue-500 text-2xl font-bold">
              {data.habits.length}
            </div>
            <div className="text-gray-500">Active Habits</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-green-500 text-2xl font-bold">
              {data.user.projectCompletionHistory.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-gray-500">Completed Projects</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-purple-500 text-2xl font-bold">
              {Math.round(data.user.completionRates.reduce((a, b) => a + b, 0) / data.user.completionRates.length)}%
            </div>
            <div className="text-gray-500">Avg. Completion Rate</div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-yellow-500 text-2xl font-bold">
              {Math.round(data.user.mentalEnergyLog.filter(v => v !== null).reduce((a, b) => a + b, 0) / 
                data.user.mentalEnergyLog.filter(v => v !== null).length * 10) / 10}/10
            </div>
            <div className="text-gray-500">Avg. Mental Energy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;