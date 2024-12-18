import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "./authSlice";
import logo from "../pictures/logo/icons8-blogger-50 (1).png";
import picture from "../pictures/blog-images/avatar-1577909_640.png";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';


const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loggedIn, setLoggedIn] = useState(false);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  

  useEffect(() => {
    // Check localStorage and sync with Redux state
    const storedUserId = localStorage.getItem("userId");
    const storedLoggedIn = localStorage.getItem("loggedIn");

    if (storedLoggedIn === "true" && storedUserId) {
      dispatch(login({ userId: storedUserId }));
    }
  }, [dispatch]);

  const handleLogout = () => {
    // Clear localStorage and update Redux state
    localStorage.removeItem("userId");
    localStorage.removeItem("loggedIn");
    dispatch(logout());
    toast("You are signed out!");
  };

  return (
    <div className="nav-container shadow-2xl">
      <nav className="shadow-md mb-10 bg-gray-800 text-white">
        <div className="flex items-center justify-between px-4 py-3">
          {/* //FIXME - Fix the localStorage clear click on logo and logout  */}
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center text-2xl font-bold">
              The&nbsp;<img src={logo} alt="logo" className="w-8 h-8" /> log
            </NavLink>
          </div>
           {/* Hamburger Menu Button */}
           <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Links (Desktop) */}

          {/* Navigation Links */}
          <div className="hidden lg:flex space-x-4">
            <NavLink to="/blog" className="hover:text-gray-400 px-3 py-2 text-base font-medium">
              Blog
            </NavLink>
            <NavLink to="/post" className="hover:text-gray-400 px-3 py-2 text-base font-medium">
              Post
            </NavLink>
            <NavLink to="/contact" className="hover:text-gray-400 px-3 py-2 text-base font-medium">
              Contact
            </NavLink>
          </div>

          {/* Profile/Login Section */}
          <div className="hidden lg:flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center">
                <NavLink to={`/profile/${userId}`}>
                  <img src={picture} alt="Profile" className="w-10 h-10 rounded-full border" />
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 text-base font-medium rounded-full ml-3"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-base font-medium rounded-full"
              >
                Sign in
              </NavLink>
            )}
          </div>
        </div>
        {/* Responsive Menu Links */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-900">
            <NavLink
              to="/blog"
              className="block px-4 py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </NavLink>
            <NavLink
              to="/post"
              className="block px-4 py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Post
            </NavLink>
            <NavLink
              to="/contact"
              className="block px-4 py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
            {isLoggedIn || loggedIn ? (
              <div className="block px-4 py-2">
                <NavLink
                  to={`/profile/${localStorage.getItem("userId")}`}
                  className="text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <div className="flex items-center gap-4 mb-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mt-2 bg-blue-700 hover:bg-blue-800 text-white p-4 py-2 text-center rounded-full"
                >
                  Logout
                </button>
                  </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="block px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full w-24 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
