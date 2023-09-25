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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedService = useSelector((state) => state.booking.selectService);

  

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [step, setStep] = useState(1);
  const [paymentError, setPaymentError] = useState("");

  const Total = selectedService[0]?.price;
  const vendorId = selectedService[0]?.vendorId._id

 
  
  const { serviceId } = useParams();
  
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
      vendorId:vendorId,
      selectedDate,
      selectedTimeSlot,
      selectedAddress,
      paymentMethod,
    };

    submitBookingDataApi(requestedData)
      .then((response) => {
        console.log(response, "at page res");
        if (response.message) {
          navigate("/user/confirmPage", {
            state: {
              selectedDate,
              selectedTimeSlot,
              selectedAddress,
            },
          });
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
        key: import.meta.env.VITE_KEY_ID,
        currency: result.data.data.currency,
        amount: result.data.data.amount,
        name: "QuickFixautos",
        description: "Wallet Transaction",

        order_id: result.data.data.id,
        handler: async function (response) {
          let packageDatas = {
            serviceId: serviceId,
            vendorId:vendorId,
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
              navigate("/user/confirmPage", {
                state: {
                  selectedDate,
                  selectedTimeSlot,
                  selectedAddress,
                },
              });
            })
            .catch((error) => {
              console.log(error);
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
      <div className="flex justify-center justify-items-center ">
        <h1 className="text-2xl text-red-700 font-bold">Book Your Service</h1>
      </div>
      <div className="flex mt-2">
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
            <div className="w-full   p-4 border rounded-lg shadow-lg">
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
            <div className="w-full  mt-3  p-4 border rounded-lg shadow-lg">
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
            <PaymentComponent
              onPlaceOrder={handlePaymentComplete}
              onPlaceOrders={handleClick}
            />
          )}
        </div>

        {selectedService.map((service, index) => (
          <div className="w-4/12   h-screen flex flex-col justify-items-start  items-center  ml-5 rounded-lg shadow-md">
            <img
              src={`http://localhost:3000/vehicleImages/${service.vehicleId.image}`}
              alt="Vehicle"
              className="w-10/12 h-auto  mb-1 mt-2"
            />

            <h3 className="text-md text-red-600 font-semibold mb-2">
              {" "}
              {service.vehicleId.brand} {service.vehicleId.model}
            </h3>
            <p className="text-md mb-2">
              Service Category:{service.categoryId.category}
            </p>

            <p className="text-md mb-2">
              Type: {service.subCategoryId.subCategory}
            </p>

            <p className="text-xl text-red-500 font-semibold">
              Price: {service.price}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Booking;
