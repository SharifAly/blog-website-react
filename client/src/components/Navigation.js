import { NavLink } from "react-router-dom";
// import { useState } from "react";

const Navigation = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <nav className="shadow-md mb-10">
        <div className="nav flex items-center justify-between px-4 py-3">
          <div className="flex justify-center items-center">
            <div className="h-6 w-6 rounded-lg bg-gray-900 dark:bg-gray-50" />
            <span className="font-semibold text-lg text-white">Blog</span>
          </div>

          <div className="flex space-x-4">
            <NavLink
              to="/"
              exact
              className="text-white hover:text-gray-500 px-3 py-2 font-medium text-base"
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
              to="/blog"
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
              to="/blog"
              className="text-white hover:text-gray-500 px-3 py-2 text-base font-medium"
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
            <NavLink
              to="/login"
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-base font-medium rounded-full"
            >
              Sign in
            </NavLink>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-base font-medium rounded-full"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* <hr className="border-gray-200" /> */}
      </nav>
    </div>
  );
};

export default Navigation;
