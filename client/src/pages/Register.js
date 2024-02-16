import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// state hold the register user data from input fields

const Register = () => {
  const [regData, setRegData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
  });

  // function to update the state from input fields

  const handleInputChange = (e) => {
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
    });
  };

  // initialize useNavigate to render login after registered

  const navigate = useNavigate();

  // function to submit the data to backend

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate the input fields, before send data, if its not complete, is stoping the code
    if (!regData.f_name) {
      toast("Please enter your first name");
      return;
    } else if (!regData.l_name) {
      toast("Please enter your last name");
      return;
    } else if (!regData.email) {
      toast("Please enter your email address");
      return;
    } else if (!regData.password) {
      toast("Please enter your password");
      return;
    } else if (regData.password.length < 6) {
      toast("Password must be at least 6 characters");
      return;
    }

    // post request to send data to backend

    axios
      .post("http://localhost:5000/register", regData)
      .then(() => {
        toast("Registration successful");
        // set the input fields to empty after registration
        setRegData({
          f_name: "",
          l_name: "",
          email: "",
          password: "",
        });
        // navigate to login after succesfull registration
        navigate("/login");
      })
      // if the email already exists, is stopping the code and show the message
      .catch((error) => {
        if (error.response.status === 400) {
          toast(error.response.data);
        }
      });
  };

  return (
    <>
      <ToastContainer />

      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign up</h1>
            {/* <p className="text-sm dark:text-gray-400">Sign up for free</p> */}
          </div>
          {/* form to register the user */}
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label for="f_name" className="block mb-2 text-sm">
                  First Name
                </label>
                <input
                  type="text"
                  name="f_name"
                  id="f_name"
                  placeholder="John"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  onChange={handleInputChange}
                  value={regData.f_name}
                />
              </div>
              <div>
                <label for="l_name" className="block mb-2 text-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  name="l_name"
                  id="l_name"
                  placeholder="Doe"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  onChange={handleInputChange}
                  value={regData.l_name}
                />
              </div>
              <div>
                <label for="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john.doe@example.com"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  onChange={handleInputChange}
                  value={regData.email}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label for="password" className="text-sm">
                    Password
                  </label>
                  <Link
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs hover:underline dark:text-gray-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  onChange={handleInputChange}
                  value={regData.password}
                  autoComplete="on"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 hover:dark:bg-violet-600 dark:text-gray-900"
                >
                  Sign up
                </button>
              </div>
              <p className="px-6 text-sm text-center dark:text-gray-400">
                You are are a member ?{" "}
                <Link
                  rel="noopener noreferrer"
                  to="/login"
                  className="hover:underline dark:text-violet-400"
                >
                  Sign in
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
// json data to insert to register user from form
// {
//   "f_name": "sharif",
//   "l_name": "aly",
//   "email": "sharif.aly_@outlook.com",
//   "role": "User",
//   "password": "1234"
// }
