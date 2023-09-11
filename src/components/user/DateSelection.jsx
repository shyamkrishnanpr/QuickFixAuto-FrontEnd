import React, { useState } from "react";

const DateSelection = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  today.setDate(today.getDate() + 1);

  const availableDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const formattedDate = date.toISOString().split("T")[0];
    availableDates.push(formattedDate);
  }

  console.log(availableDates,"AT PAGE ")
  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <>
        <div className="ml-2 mt-1 w-8/12">
      <h2 className="text-xl font-semibold mb-4">Select Date and Time of Service:</h2>
      <div className="flex space-x-4 ">
        {availableDates.map((date) => (
          <div
            key={date}
            onClick={() => handleDateClick(date)}
            className={`p-2 rounded cursor-pointer text-center ${
              date === selectedDate ? 'bg-gray-200 border-red-600 border-l-2 text-red-500' : 'bg-gray-200'
            }`}
          >
            <div className="text-xl w-24 font-semibold">{date.split('-')[2]}</div>
            {new Date(date).toLocaleString('default', { month: 'short'})}{"  "}
            {date.split('-')[0]}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default DateSelection;
