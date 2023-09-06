import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { vendorSignUpAsync } from "../../store/reducers/vendor/AuthSlice";
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.vendorAuth);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "The username must be at least 3 characters.")
      .max(20, "The username must be at most 20 characters.")
      .required("Please enter your name"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("Add your registered email "),
    password: Yup.string()
      .min(6, "The password must be at least 6 characters.")
      .max(40, "The password must be at most 40 characters.")
      .required("Enter your password"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
      .min(6, "The password must be at least 6 characters.")
      .max(40, "The password must be at most 40 characters.")
      .required("Confirm the password"),

    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits.")
      .required("Enter your mobile number"),
  });

  const handleSubmit = (values) => {
    dispatch(vendorSignUpAsync(values))
      .then((response) => {
        if (response?.payload?.success) {
          navigate("/vendor/otp");
        } 
      })
      .catch((error) => {
        console.log(error);
       
      });
  };
  

  return (
    <>
    
    <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex w-full max-w-3xl">
          <div className="bg-gradient-to-tr from-blue-950 to-blue-500 p-8 rounded-l-lg shadow-md w-1/2">
            <h4 className="text-white text-center text-2xl font-bold  mt-16">
              QuickFix Autos
            </h4>
            <br />
            <p className="text-white text-sm text-center mb-4">
              Join as a vendor and expand your reach in the automotive service
              industry. <br />
              Reach more customers and manage bookings efficiently.
              <br />
            </p>

            <p className="text-black text-center mb-4">
              Already have an account.? <br />

              <Link to="/vendor/login" className="block text-white p-2 rounded">
              Login here..
          </Link>

            </p>
          </div>
          <div className="bg-white p-8 rounded-r-lg shadow-md flex-1">
            <h2 className="text-2xl text-blue-500 font-bold mb-4">
              Registration
            </h2>
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-4">
                <div>
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Full name"
                    className="w-full p-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border  rounded-lg"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <Field
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone number"
                    className="w-full p-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border  rounded-lg"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-2 border rounded-lg border-color: #002D74; outline: none; "
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full"
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
