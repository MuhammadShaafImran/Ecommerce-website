// components/ui/DealsDaySelector.jsx
import React from 'react';

const DealsDaySelector = ({ selectedDay, setSelectedDay }) => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
  return (
    <div className="flex justify-center space-x-2 mb-6">
      {days.map((day, index) => (
        <button
          key={index}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
            ${selectedDay === index 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            transition
          `}
          onClick={() => setSelectedDay(index)}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DealsDaySelector;