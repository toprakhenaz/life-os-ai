import React from 'react';

const ScheduleNotes = () => {
  const notes = [
    { id: 1, color: 'yellow', title: 'School Hours', content: 'Reserved for classes, no deep work scheduled' },
    { id: 2, color: 'green', title: 'Commute Time', content: '45 minutes each way, leveraged for audio learning' },
    { id: 3, color: 'blue', title: 'Gym Sessions', content: '3× weekly, scheduled to optimize recovery' },
    { id: 4, color: 'purple', title: 'Priority Focus', content: 'Influence practice and wealth building receive prime time slots' },
  ];
  
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Schedule Notes</h2>
      <div className="space-y-3">
        {notes.map(note => (
          <div 
            key={note.id} 
            className={`p-3 bg-${note.color}-50 border-l-4 border-${note.color}-500 rounded`}
          >
            <span className="font-medium">{note.title}:</span> {note.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleNotes;