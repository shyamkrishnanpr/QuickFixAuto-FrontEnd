import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchServiceDetailsAsync } from "../../store/reducers/user/UserServiceBookingSlice";
import { selectService } from "../../store/reducers/user/UserServiceBookingSlice";
import { submitBookingDataApi } from "../../services/userAPI";
import axios from "../../Axios/axios";

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
  const [paymentError, setPaymentError] = useState("");

  const Total = selectedService[0]?.price;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { serviceId } = useParams();
  console.log(serviceId, "in page");
  useEffect(() => {
    dispatch(fetchServiceDetailsAsync(serviceId));
  }, []);

  console.log(selectedService[0], "at abcde");
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

  const handlePaymentComplete = (paymentMethod) => {
    const requestedData = {
      serviceId: serviceId,
      selectedDate,
      selectedTimeSlot,
      selectedAddress,
      paymentMethod,
    };

    submitBookingDataApi(requestedData)
      .then((response) => {
        console.log(response, "at page res");
        if (response.message) {
          navigate("/user/confirmPage");
          console.log("booking succefful");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // useEffect(()=>{
  //   loadScript('https://checkout.razorpay.com/v1/checkout.js')
  // })

  async function handleClick() {
    let orderId =
      "OD" + Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razropay failed to load!!");
      return;
    }
    let paymetRes = {
      order_id: orderId,

      amount: Total,
      currency: "INR",
      payment_capture: 1,
    };

    try {
      const result = await axios.post("/user/orders", paymetRes);

      console.log(result, "result");

      const options = {
        key: "rzp_test_cSmUcIwFmaZtM2",
        currency: result.data.data.currency,
        amount: result.data.data.amount,
        name: "QuickFixautos",
        description: "Wallet Transaction",

        order_id: result.data.data.id,
        handler: async function (response) {
          let packageDatas = {
            serviceId: serviceId,
            selectedDate,
            selectedTimeSlot,
            selectedAddress,
          };

          axios
            .post("/user/order", {
              orderId: response.razorpay_order_id,
              packageDatas,
            })
            .then((response) => {
              const { _id } = response.data.data;
              console.log("responsedta", response);
              navigate("/user/confirmPage");
            })
            .catch((error) => {
             console.log(error)
            });
        },
        prefill: {
          name: "Shyam krishnan Pr",
          email: "projectshyam3@gmail.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
        modal: {
          ondismiss: function () {
            setPaymentError("Payment cancelled.");
            toast.error("Payment cancelled.");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex mt-2">
        {/* Left side content */}
        <div className="w-8/12">
          {step === 1 ? (
            <div>
              <DateSelection onDateSelect={handleDateSelect} />
              <TimeSlotSelection
                onTimeSlotSelect={handleTimeSlotSelect}
                onContinue={handleContinueToAddress}
              />
            </div>
          ) : (
            <div className="w-full ml-2 mt-3 p-4 border rounded-lg shadow-lg">
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
            <div className="w-full ml-2 mt-3  p-4 border rounded-lg shadow-lg">
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
            <PaymentComponent onPlaceOrder={handlePaymentComplete} />
          )}


<button
        className= "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          
        
        onClick={handleClick}
     
      >PAY NOW
        
      </button>

          <button onClick={handleClick}>pay</button>
        </div>

        {/* Right side div */}
        <div className="w-4/12 m-4 bg-gray-200">
          {/* Content for the right side */}
          {/* ... */}
        </div>
      </div>
    </>
  );
};

export default Booking;
