import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { vendorLoginAsync } from "../../store/reducers/vendor/AuthSlice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.vendorAuth);
  
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("This is not a valid email.")
      .required("Enter a valid email address"),
    password: Yup.string()
      .min(6, "The password must be at least 6 characters.")
      .max(40, "The password must be at most 40 characters.")
      .required("Enter your password"),
  });

  const handleLogin =  (values) => {

      dispatch(vendorLoginAsync(values)).then((response) => {
        console.log("resonse in login page", response);
        if (response.payload?.success) {
          navigate("/vendor/dashboard");
        }
      }).catch((error)=>{
        console.log(error)
      })
   
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
              Don't have an account.? <br />
              <Link
                to="/vendor/register"
                className="block text-white p-2 rounded"
              >
                Register here..
              </Link>
            </p>
          </div>
          <div className="bg-white p-8 rounded-r-lg shadow-md flex-1">
            <h2 className="text-2xl text-blue-500 font-bold mb-4">Login</h2>
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
                  className="w-full my-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
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
