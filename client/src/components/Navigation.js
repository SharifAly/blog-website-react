import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../pictures/logo-sharify.png";

const Navigation = () => {
  const [showNav, setShowNav] = useState(true);

  const toggleNavItems = () => {
    setShowNav(!showNav);
  };

  return (
    <nav>
      <div className="nav flex items-center justify-between px-4 py-3">
        <div className="">
          <img className="h-20 w-20" src={logo} alt="Logo" />
        </div>

        <div className="flex space-x-4">
          <NavLink
            to="/"
            exact
            className="text-white hover:text-gray-700 px-3 py-2 text-sm font-medium"
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className="text-white hover:text-gray-700 px-3 py-2 text-sm font-medium"
          >
            About
          </NavLink>
        </div>

        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-full">
            Sign in
          </button>
        </div>
      </div>

      <hr className="border-gray-200" />
    </nav>
  );
};

export default Navigation;
