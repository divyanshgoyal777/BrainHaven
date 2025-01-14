import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/img/BrainWaveFaviconNoBackground.png";
import { useAuth } from "../../../App";
import axios from "axios";
import logOut from "../../../assets/svg/logout.svg";
import admin from "../../../assets/svg/admin.svg";
import profile from "../../../assets/svg/newAccount.svg";
import road from "../../../assets/svg/road.svg";
import hand from "../../../assets/svg/hand.svg";
import book from "../../../assets/svg/book.svg";
import code from "../../../assets/svg/code.svg";
import faqs from "../../../assets/svg/faqs.svg";
import policy from "../../../assets/svg/policy.svg";
import terms from "../../../assets/svg/terms.svg";

const Navbar = () => {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoMenu, setIsLogoMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newAccounts, setNewAccounts] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    bio: "",
    collegeName: "",
    degree: "",
    branch: "",
    semester: "",
    rollNumber: "",
    dateOfBirth: "",
    socialLinks: {
      linkedIn: "",
      github: "",
      instagram: "",
    },
  });

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleLogoMenu = () => setIsLogoMenu((prev) => !prev);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      newAccounts === true ? navigate("/signup") : navigate("/login");
    }
  }, [isAuthenticated, newAccounts, navigate]);

  const firstLetter =
    isAuthenticated && userData?.firstName
      ? userData.firstName.charAt(0).toUpperCase()
      : "";

  const userProfileImage = userData?.profilePhoto ? (
    <img
      src={userData.profilePhoto}
      alt="User Profile"
      className="w-14 h-14 rounded-full object-cover"
    />
  ) : (
    <span className="text-2xl font-semibold rounded-full py-2 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      {firstLetter}
    </span>
  );

  const handleLogout = () => {
    logout();
    setIsLogoMenu(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        if (!userEmail) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`,
          {
            headers: { userEmail, Authorization: `Bearer ${token}` },
          }
        );

        setUserData(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

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
            {["Home", "Resources", "Code", "Roadmaps", "Hackathon"].map(
              (item) => (
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
              )
            )}
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
            <span onClick={toggleLogoMenu} className="cursor-pointer">
              {userProfileImage}
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
          <div className="fixed top-[6%] right-[5%] sm:w-[350px] bg-[#100924] p-6 z-50 rounded-2xl overflow-y-auto max-h-[95vh]">
            <div className="flex justify-evenly items-center gap-1 ">
              <Link to={`/user/${userData._id}`}>{userProfileImage}</Link>
              <div className="text-white flex flex-col justify-start text-center sm:text-start">
                <div className="font-semibold">
                  {userData.firstName} {userData.lastName}
                </div>
                <div className="text-[14px] sm:text-base">
                  <Link to={`/user/${userData._id}`}>{userData.email}</Link>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] mt-6 my-4"></div>
            <ul className=" text-gray-400 flex  flex-col gap-3 my-5">
              {(userEmail === "tonisha24680@gmail.com" ||
                userEmail === "animeshp1607@gmail.com") && (
                <li className="flex gap-5 items-center">
                  <div>
                    <img src={admin} alt="" className="ml-1 w-6 min-w-[24px]" />
                  </div>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `hover:text-white -ml-2 transition-all duration-300 ${
                        isActive ? "text-white" : ""
                      }`
                    }
                  >
                    Admin
                  </NavLink>
                </li>
              )}
              <li className="flex gap-5 items-center">
                <div>
                  <img
                    src={profile}
                    alt=""
                    className={({ isActive }) =>
                      `hover:text-white -ml-1 transition-all duration-300 ${
                        isActive ? "text-white" : ""
                      }`
                    }
                  />
                </div>
                <NavLink
                  to="/user"
                  className={({ isActive }) =>
                    `hover:text-white -ml-1 transition-all duration-300 ${
                      isActive ? "text-white" : ""
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="flex gap-5 items-center">
                <div className="min-w-[23px]">
                  <img src={book} alt="" className="ml-[1px] w-5 " />
                </div>
                <NavLink
                  to="/resources"
                  className={({ isActive }) =>
                    `hover:text-white -ml-1 transition-all duration-300 ${
                      isActive ? "text-white" : ""
                    }`
                  }
                >
                  Resources
                </NavLink>
              </li>
              <li className="flex gap-5 items-center">
                <div className="min-w-[23px]">
                  <img src={code} alt="" className="ml-[1px] w-5 " />
                </div>
                <NavLink
                  to="/code"
                  className={({ isActive }) =>
                    `hover:text-white -ml-1 transition-all duration-300 ${
                      isActive ? "text-white" : ""
                    }`
                  }
                >
                  Code
                </NavLink>
              </li>
              <li className="flex gap-5 items-center">
                <div>
                  <img
                    src={road}
                    alt=""
                    className="ml-[1px] w-5 min-w-[23px]"
                  />
                </div>
                <NavLink
                  to="/roadmaps"
                  className={({ isActive }) =>
                    `hover:text-white -ml-1 transition-all duration-300 ${
                      isActive ? "text-white" : ""
                    }`
                  }
                >
                  Roadmaps
                </NavLink>
              </li>
              <li className="flex gap-5 items-center">
                <div>
                  <img
                    src={hand}
                    alt=""
                    className="ml-[1px] w-5 min-w-[23px]"
                  />
                </div>
                <NavLink
                  to="/hackathon"
                  className={({ isActive }) =>
                    `hover:text-white -ml-1 transition-all duration-300 ${
                      isActive ? "text-white" : ""
                    }`
                  }
                >
                  Hackathon
                </NavLink>
              </li>
            </ul>
            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] mt-6 my-4"></div>
            <ul className=" text-gray-400 flex  flex-col gap-3  my-5">
              <li className="flex gap-5 items-center">
                <div className="min-w-[23px]">
                  <img src={faqs} alt="" className="ml-[1px] w-6 " />
                </div>
                <NavLink
                  to="/faqs"
                  className={({ isActive }) =>
                    `hover:text-white -ml-1 transition-all duration-300 ${
                      isActive ? "text-white" : ""
                    }`
                  }
                >
                  FAQs
                </NavLink>
              </li>
              <li className="flex gap-5 items-center">
                <div className="min-w-[23px]">
                  <img src={policy} alt="" className="ml-[1px] w-5 " />
                </div>
                <NavLink
                  to="/policy"
                  className={({ isActive }) =>
                    `hover:text-white -ml-1 transition-all duration-300 ${
                      isActive ? "text-white" : ""
                    }`
                  }
                >
                  Privacy Policy
                </NavLink>
              </li>
              <li className="flex gap-5 items-center">
                <div className="min-w-[22px]">
                  <img src={terms} alt="" className="ml-[3px] w-4 " />
                </div>
                <NavLink
                  to="/terms"
                  className={({ isActive }) =>
                    `hover:text-white -ml-1 transition-all duration-300 ${
                      isActive ? "text-white" : ""
                    }`
                  }
                >
                  Terms and Condition
                </NavLink>
              </li>
            </ul>
            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px]  my-4"></div>
            <ul className="text-gray-400 flex  flex-col gap-3  my-5">
              <li className="flex gap-5 items-center">
                <div>
                  <img
                    src={logOut}
                    alt=""
                    className="ml-[1px] w-4 min-w-[23px]"
                  />
                </div>
                <NavLink
                  onClick={handleLogout}
                  className="hover:text-white -ml-1 transition-all duration-300"
                >
                  Log Out
                </NavLink>
              </li>
            </ul>
            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] mt-6 my-4"></div>
            <div className="text-sm text-gray-400 text-center">
              &copy; {new Date().getFullYear()} BrainWave, All rights reserved.
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
