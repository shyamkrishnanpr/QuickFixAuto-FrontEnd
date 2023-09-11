import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import { addAvailableSlotsApi } from "../../services/vendorAPI";
const Availability = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slotInputStart, setSlotInputStart] = useState("");
  const [slotInputEnd, setSlotInputEnd] = useState("");
  const [ampmStart, setAmPmStart] = useState("AM");
  const [ampmEnd, setAmPmEnd] = useState("AM");
  const [slotsWithDates, setSlotsWithDates] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
   

  console.log(slotsWithDates)
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotStartInputChange = (event) => {
    setSlotInputStart(event.target.value);
  };

  const handleSlotEndInputChange = (event) => {
    setSlotInputEnd(event.target.value);
  };

  const handleAmPmStartChange = (event) => {
    setAmPmStart(event.target.value);
  };

  const handleAmPmEndChange = (event) => {
    setAmPmEnd(event.target.value);
  };

  const handleAddSlot = () => {
    if (validateSlotInput(slotInputStart) && validateSlotInput(slotInputEnd)) {
      const dateKey = selectedDate.toISOString().split("T")[0]; 
      const newSlot = `[${slotInputStart}${ampmStart}:${slotInputEnd}${ampmEnd}]`;

     
      setSlotsWithDates((prevSlots) => ({
        ...prevSlots,
        [dateKey]: [...(prevSlots[dateKey] || []), newSlot],
      }));

      setSlotInputStart("");
      setSlotInputEnd("");
      setAmPmStart("AM");
      setAmPmEnd("AM");
      
    } else {
      setErrorMessage(
        "Invalid slot format. Please use HH:mm format (e.g., 9:00) and select AM or PM."
      );
    }
  };

  const validateSlotInput = (input) => {
    return (
      /^\d{1,2}:\d{2}$/.test(input) &&
      (ampmStart === "AM" || ampmStart === "PM") &&
      (ampmEnd === "AM" || ampmEnd === "PM")
    );
  };

  const handleSubmit = async()=>{
    try {
        const response = await addAvailableSlotsApi(slotsWithDates)
        setSuccessMessage('Slots added successfully.');
        setErrorMessage('');
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
    
    <div className="max-w-md mx-auto p-4 ">
      <h2 className="text-2xl font-semibold mb-4">Add Slots for a Date</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Select Date:</label>
        <DatePicker
          className="border rounded w-full py-2 px-3"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Slot Start Time (HH:mm):</label>
        <div className="flex space-x-2">
          <input
            className="border rounded w-1/2 py-2 px-3"
            type="text"
            value={slotInputStart}
            onChange={handleSlotStartInputChange}
          />
          <select
            className="border rounded w-1/2 py-2 px-3"
            value={ampmStart}
            onChange={handleAmPmStartChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Slot End Time (HH:mm):</label>
        <div className="flex space-x-2">
          <input
            className="border rounded w-1/2 py-2 px-3"
            type="text"
            value={slotInputEnd}
            onChange={handleSlotEndInputChange}
          />
          <select
            className="border rounded w-1/2 py-2 px-3"
            value={ampmEnd}
            onChange={handleAmPmEndChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={handleAddSlot}
      >
        Add Slot
      </button>
     
     
      {successMessage && (
        <div className="bg-green-200 text-green-800 border border-green-400 px-4 py-2 rounded mt-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-200 text-red-800 border border-red-400 px-4 py-2 rounded mt-4">
          {errorMessage}
        </div>
      )}
    </div>
    <div className="mt-4">
        {Object.keys(slotsWithDates).map((dateKey) => (
          <div key={dateKey} className="mb-4">
            <h3 className="text-lg font-semibold">
              {new Date(dateKey).toLocaleDateString()}
            </h3>
            <ul>
              {slotsWithDates[dateKey].map((slot, index) => (
                <li key={index}>{slot}</li>
              ))}
            </ul>
          </div>
        ))}
         <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
       onClick={handleSubmit}
      >
        submit
      </button>
      </div>

    
    </>
  );
};

export default Availability;
