import React, { useState } from 'react';
import { useHabit } from '../../context/HabitContext';
import Modal from '../common/Modal';

const HabitDetail = ({ habit, onClose }) => {
  const { addNote } = useHabit();
  const [newNote, setNewNote] = useState('');
  
  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote(habit.id, newNote);
      setNewNote('');
    }
  };
  
  return (
    <Modal isOpen={!!habit} onClose={onClose} title={habit?.name || ''}>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-700">Description</h3>
          <p className="text-gray-600">{habit?.description}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700">Frequency</h3>
          <p className="text-gray-600">{habit?.frequency}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700">Time Required</h3>
          <p className="text-gray-600">{habit?.timeRequired} minutes</p>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700">Current Streak</h3>
          <p className="text-gray-600">{habit?.streak} days</p>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700">Progress</h3>
          <div className="flex flex-wrap gap-1 mt-2">
            {habit?.progress.map((completed, index) => (
              <div 
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700">Resources</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {habit?.resources.map((resource, index) => (
              <li key={index}>{resource}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700">Notes</h3>
          {habit?.notes.length > 0 ? (
            <div className="space-y-2 mt-2">
              {habit.notes.map(note => (
                <div key={note.id} className="bg-gray-50 p-2 rounded text-sm">
                  <div className="text-gray-500 text-xs">
                    {new Date(note.date).toLocaleDateString()}
                  </div>
                  <div className="text-gray-700">{note.text}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No notes yet</p>
          )}
          
          <div className="mt-3">
            <textarea 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Add a new note..."
              rows="2"
            ></textarea>
            <button 
              className="mt-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleAddNote}
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default HabitDetail;