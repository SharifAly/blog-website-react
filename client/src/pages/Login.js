import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  // State to hold login form data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes and update state
  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", loginData, { withCredentials: true })
      .then((res) => {
        console.log("Login successful:", res.data);
        console.log("User ID:", res.data.userId); // Debugging log
        setLoginData({
          email: "",
          password: "",
        });
        setTimeout(() => { 
          // FIXME - The redirect is not working, 
          // but the login is successful, 
          // if I redirect directly the localStorage is empty
          navigate("/");
        }, 500);
        console.log("Before localStorage update");
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userId", res.data.userId);
        console.log("After localStorage update");
        window.location.reload(false);
      })
      .catch((err) => {
        console.error("Login failed:", err); // Debugging log
        toast("Wrong email or password!");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign in</h1>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="john.doe@example.com"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleInputChange}
                    value={loginData.email}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm">
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
                    placeholder="******"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleInputChange}
                    value={loginData.password}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 hover:dark:bg-violet-600 dark:text-gray-900"
                  >
                    Sign in
                  </button>
                </div>
                <p className="px-6 text-sm text-center dark:text-gray-400">
                  Don't have an account yet?
                  <Link
                    rel="noopener noreferrer"
                    to="/register"
                    className="hover:underline dark:text-violet-400"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;