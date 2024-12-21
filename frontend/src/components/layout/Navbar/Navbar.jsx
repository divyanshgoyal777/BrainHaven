import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../../assets/img/BrainWaveFaviconNoBackground.png";
import { useAuth } from "../../../App";

const Navbar = () => {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoMenu, setIsLogoMenu] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleLogoMenu = () => setIsLogoMenu((prev) => !prev);

  const firstLetter =
    isAuthenticated && userEmail ? userEmail.charAt(0).toUpperCase() : "";

  const handleLogout = () => {
    logout();
    setIsLogoMenu(false);
  };

  return (
    <nav className="fixed top-0 w-full py-5 px-8 bg-[#100924] z-50">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="md:flex hidden">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-10" />
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 transition-transform duration-300 ${
                isMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex">
          <ul className="text-gray-400 flex gap-8 font-semibold">
            {["Home", "Resources", "Roadmaps", "Hackmate"].map((item) => (
              <li key={item}>
                <NavLink
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white"
                      : "hover:text-white transition-colors duration-300"
                  }
                  aria-label={item}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:hidden flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-10" />
          </Link>
        </div>

        <div className="flex gap-4">
          {!isAuthenticated ? (
            <>
              <NavLink to="/signup" aria-label="Sign Up">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-md transition-all duration-300 hover:scale-105">
                  Sign Up
                </button>
              </NavLink>
              <NavLink to="/login" aria-label="Log In">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-md transition-all duration-300 hover:scale-105">
                  Log In
                </button>
              </NavLink>
            </>
          ) : (
            <span
              onClick={toggleLogoMenu}
              className="text-2xl font-semibold rounded-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white cursor-pointer transition-all duration-300 hover:scale-105"
            >
              {firstLetter}
            </span>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div
            onClick={toggleMenu}
            className="fixed inset-0 bg-black opacity-50 z-40"
          />
          <div className="fixed top-0 left-0 w-full bg-[#100924] p-6 z-50">
            <div className="absolute top-4 right-4">
              <button onClick={toggleMenu} className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="text-gray-400 flex text-lg flex-col gap-6 font-semibold">
              {["Home", "Resources", "Roadmaps", "Hackmate"].map((item) => (
                <li key={item}>
                  <NavLink
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-white"
                        : "hover:text-white transition-colors duration-300"
                    }
                    aria-label={item}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {isLogoMenu && (
        <>
          <div
            onClick={toggleLogoMenu}
            className="fixed inset-0 bg-black opacity-50 z-40"
          />
          <div className="fixed top-0 right-0 sm:w-[35%] bg-[#100924] p-6 z-50 rounded-2xl">
            <div className="flex justify-between items-center">
              <span className="text-xl rounded-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                {firstLetter}
              </span>
              <button onClick={toggleLogoMenu} className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="text-gray-400 flex text-lg flex-col gap-6 font-semibold my-5">
              <li>
                <NavLink
                  to="/user"
                  className="hover:text-white transition-all duration-300"
                >
                  Profile Details
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/policy"
                  className="hover:text-white transition-all duration-300"
                >
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/terms"
                  className="hover:text-white transition-all duration-300"
                >
                  Terms and Conditions
                </NavLink>
              </li>
              <li
                onClick={handleLogout}
                className="hover:text-white transition-all duration-300 cursor-pointer"
              >
                Log Out
              </li>
            </ul>
            <div className="text-sm text-gray-400 text-center">
              © 2024 BrainWave, All rights reserved.
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
