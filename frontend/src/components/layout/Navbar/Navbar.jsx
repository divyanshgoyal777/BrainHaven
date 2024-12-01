import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/img/BrainWaveFaviconNoBackground.png";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-center absolute top-0 h-[12%] w-[100%] py-5 px-8 items-center m-auto gap-48">
        <div className="text-white">
          <img src={logo} alt="Logo" className="w-10" />
        </div>
        <div className="flex">
          <ul className="text-gray-400 flex justify-evenly gap-12 font-semibold">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : "hover:text-white transition-colors duration-200"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : "hover:text-white transition-colors duration-200"
                }
              >
                Resources
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/roadmaps"
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : "hover:text-white transition-colors duration-200"
                }
              >
                Roadmaps
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hackmate"
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : "hover:text-white transition-colors duration-200"
                }
              >
                Hackmate
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex gap-4">
          <NavLink to="/signup">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-md">
              Sign Up
            </button>
          </NavLink>
          <NavLink to="/login">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-md">
              Log In
            </button>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
