import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../pictures/logo/icons8-blogger-50 (1).png"
import picture from "../pictures/blog-images/sharif.jpg";
// import axios from "axios";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userData, setUserData] = useState("");
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="nav-container mt-4">
      <nav className="shadow-md mb-10">
        <div className="nav flex items-center justify-between px-4 py-3">
          <div className="flex justify-center items-center">
            {/* <div className="h-6 w-6 rounded-lg bg-gray-900 dark:bg-gray-50" /> */}
            <span className="font-semibold text-lg text-white">
            <NavLink to="/">
            <img src={logo} alt="logo" className="w-12 h-12" />
            </NavLink>
            </span>
          </div>

          <div className="flex space-x-4">
            <NavLink
              to="/blog"
              className="text-white hover:text-gray-500 px-3 py-2 text-base font-medium"
            >
              Blog
            </NavLink>
            <div className="text-gray-300 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                class="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </div>
            <NavLink
              to="/post"
              className="text-white hover:text-gray-500 px-3 py-2 text-base font-medium"
            >
              Post
            </NavLink>
            <div className="text-gray-300 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                class="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </div>

            <NavLink
              to="/contact"
              className="text-white hover:text-gray-500 px-3 py-2 text-base font-medium"
            >
              Contact
            </NavLink>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            {isLoggedIn ? (
              <div className="flex justify-between items-center">
                <NavLink to={`/profile/${localStorage.getItem("userId")}`}>
                  <div className="relative flex-shrink-0">
                    <img
                      src={picture}
                      alt=""
                      className="w-10 h-10 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                    />
                  </div>
                </NavLink>

                <button
                  className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 text-base font-medium rounded-full ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="dark:bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-base font-medium rounded-full"
              >
                Sign in
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
