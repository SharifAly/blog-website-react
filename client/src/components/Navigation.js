import { NavLink } from "react-router-dom";
// import { useState } from "react";
import logo from "../pictures/logo/bloggen.png";

const Navigation = () => {
  return (
    <div>
      <nav className="shadow-md mb-10">
        <div className="nav flex items-center justify-between px-4 py-3">
          <div className="">
            <img className="h-16 w-16" src={logo} alt="Logo" />
          </div>

          <div className="flex space-x-4">
            <NavLink
              to="/"
              exact
              className="text-white hover:text-gray-500 px-3 py-2 text-sm font-medium"
            >
              Home
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
              to="/blog"
              className="text-white hover:text-gray-500 px-3 py-2 text-sm font-medium"
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
              to="/blog"
              className="text-white hover:text-gray-500 px-3 py-2 text-sm font-medium"
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
              to="/blog"
              className="text-white hover:text-gray-500 px-3 py-2 text-sm font-medium"
            >
              About
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
              to="/blog"
              className="text-white hover:text-gray-500 px-3 py-2 text-sm font-medium"
            >
              Contact
            </NavLink>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <NavLink
              to="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-full"
            >
              Sign in
            </NavLink>
          </div>
        </div>

        {/* <hr className="border-gray-200" /> */}
      </nav>
    </div>
  );
};

export default Navigation;
