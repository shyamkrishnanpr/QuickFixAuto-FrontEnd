import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchServiceDetailsAsync } from "../../store/reducers/user/UserServiceBookingSlice";
import { selectService } from "../../store/reducers/user/UserServiceBookingSlice";
import DateSelection from "./DateSelection";
import TimeSlotSelection from "./TimeSlotSelection";
import AddressSelection from "./AddressSelection";
import PaymentComponent from "./PaymentComponent";

const Booking = () => {
  const selectedService = useSelector((state) => state.booking.selectService);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const { serviceId } = useParams();
  console.log(serviceId, "in page");
  useEffect(() => {
    dispatch(fetchServiceDetailsAsync(serviceId));
  }, []);

  console.log(selectedService, "at abcde");
  console.log(selectedDate, "date");
  console.log(selectedTimeSlot, "time");
  console.log(selectedAddress, "address");

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleContinueToAddress = () => {
    setStep(2);
  };
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };
  const handleContinueToPayment = () => {
    setStep(3);
  };

  const handlePaymentComplete=()=>{
     
  }

  return (
    <>
      {step === 1 ? (
        <div>
          <DateSelection onDateSelect={handleDateSelect} />
          <TimeSlotSelection
            onTimeSlotSelect={handleTimeSlotSelect}
            onContinue={handleContinueToAddress}
          />
        </div>
      ) : (
        <div className="w-8/12 ml-2 mt-3 p-4 border rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">
            Selected Date and Time of service
          </h3>
          <div className="flex flex-col">
            <div className="flex ">
              <p className="text-gray-700">Selected Date:</p>
              <p className="mb-2">{selectedDate}</p>
            </div>
            <div className="flex ">
              <p className="text-gray-700">Selected Time Slot:</p>
              <p>{selectedTimeSlot}</p>
            </div>
          </div>
        </div>
      )}

      {step === 2 ? (
        <div>
          <AddressSelection
            onAddressSelect={handleAddressSelect}
            onContinue={handleContinueToPayment}
          />
        </div>
      ) : (
        <div className="w-8/12 ml-2 mt-3  p-4 border rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Selected Address</h3>
          <div className="flex flex-col">
            <div className="flex ">
              <p className="text-gray-700">Address:</p>
              <p>{selectedAddress}</p>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <PaymentComponent onPaymentComplete={handlePaymentComplete}/>
      )}
    </>
  );
};

export default Booking;
