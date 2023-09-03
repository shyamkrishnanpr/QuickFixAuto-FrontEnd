import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { userLoginAsync ,requestOtpForPasswordResetAsync} from "../../store/reducers/user/UserRegistrationSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, resetPasswordEmail, isOtpSent, isOtpVerified } = useSelector(
    (state) => state.userAuth
  );

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("This is not a valid email.")
      .required("Enter a valid email address"),
    password: Yup.string()
      .min(6, "The password must be at least 6 characters.")
      .max(40, "The password must be at most 40 characters.")
      .required("Enter your password"),
  });

  const handleLogin = async (values) => {
    try {
      dispatch(userLoginAsync(values)).then((response) => {
        
        if (response.payload.success) {
          navigate("/user/dashboard");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPasswordClick = async () => {
    try {
      navigate("/user/forgot-password"); 
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <div className="flex  items-center justify-center min-h-screen bg-gray-100">
        <div className="flex w-full max-w-3xl">
          <div className="bg-gradient-to-tr from-black to-red-600 p-8 rounded-l-lg shadow-md w-1/2">
            <h4 className="text-white text-center text-2xl font-bold  mt-16">
              QuickFix Autos
            </h4>
            <br />
            <p className="text-white text-sm text-center mb-4">
              "Connect with Top-notch Service Stations! Register Now and Access
              a Network of Reliable Automotive Services for Your Vehicle."
              <br />
            </p>

            <p className="text-black text-center mb-4">
              Don't have an account.? <br />
              <Link
                to="/user/register"
                className="block text-white p-2 rounded"
              >
                Register here..
              </Link>
            </p>
          </div>
          <div className="bg-white p-8 rounded-r-lg shadow-md flex-1">
            <h2 className="text-2xl text-red-700 font-bold mb-4">Login</h2>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form className="space-y-4">
                <div>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    className="w-full p-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    className="w-full p-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <button
              onClick={handleForgotPasswordClick}
              className="block text-black p-2 rounded hover:text-red-700"
            >
              Forgot Password ...?
            </button>
                <button
                  className="w-full my-5 py-2 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </Form>
            </Formik>
            
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Login;
