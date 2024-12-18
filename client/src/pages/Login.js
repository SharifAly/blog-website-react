import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../components/authSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  // State to store login data
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  // Redux dispatch function
  const dispatch = useDispatch();

  // Handle input change and update state
  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", loginData, { withCredentials: true })
      .then((res) => {
        console.log("Login successful:", res.data);
        // Store user data in local storage
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("loggedIn", true);
        // Dispatch login action to Redux store
        dispatch(login({ userId: res.data.userId }));
        // Reset login form
        setLoginData({ email: "", password: "" });
        // Show success toast notification
        toast.success("Login successful!");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        // Show error toast notification
        toast.error("Wrong email or password!");
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
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 hover:dark:bg-violet-600 dark:text-gray-900"
                >
                  Sign in
                </button>
                <p className="px-6 text-sm text-center dark:text-gray-400">
                  Don't have an account yet?{" "}
                  <a href="/register" className="hover:underline dark:text-violet-400">
                    Sign up
                  </a>
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

