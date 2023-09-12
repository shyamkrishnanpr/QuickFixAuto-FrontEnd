import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TimeSlotSelection = ({ onTimeSlotSelect, onContinue }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const availableTimeSlots = [
    "09:00 AM-10:00 AM",
    "10:00 AM-11:00 AM",
    "12:00 PM-01:00 PM",
    "02:00 PM-03:00 PM",
   
  ];

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    onTimeSlotSelect(timeSlot);
  };
  const handleContinueClick = () => {
    if (selectedTimeSlot) {
      onContinue();
    } else {
      toast.error("please Pick a Date and Time..");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full mt-3 p-2 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-4">Pick Time Slot:</h3>
          <div className="grid grid-cols-2 gap-4">
            {availableTimeSlots.map((timeSlot) => (
              <div
                key={timeSlot}
                onClick={() => handleTimeSlotClick(timeSlot)}
                className={`p-3 rounded text-center cursor-pointer ${
                  timeSlot === selectedTimeSlot
                    ? "bg-gray-200 text-red-500 border-red-600 border-l-2"
                    : "bg-gray-200"
                }`}
              >
                {timeSlot}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={handleContinueClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default TimeSlotSelection;
