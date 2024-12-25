import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";
import { useAuth } from "../../App";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import {
  FaPhoneAlt,
  FaCalendarAlt,
  FaLinkedin,
  FaGithubSquare,
} from "react-icons/fa";
import { FaLocationDot, FaSquareInstagram } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaGraduationCap, FaBookOpen, FaUniversity } from "react-icons/fa";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userEmail } = useAuth();
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

  const hiddenFields = [
    "password",
    "profilePhoto",
    "_id",
    "createdAt",
    "updatedAt",
    "__v",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        if (!userEmail) return;
        const response = await axios.get(
          "http://localhost:3000/api/user/profile",
          {
            headers: { userEmail, Authorization: `Bearer ${token}` },
          }
        );

        setUserData(response.data);

        const filteredData = Object.keys(response.data).reduce((acc, key) => {
          if (!hiddenFields.includes(key)) {
            acc[key] = response.data[key];
          }
          return acc;
        }, {});

        setFormData(filteredData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch user details. Please try again.");
        toast.error("Failed to fetch user details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("socialLinks.")) {
      const [_, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.firstName.trim()) errors.push("First name is required.");
    if (!formData.lastName.trim()) errors.push("Last name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.push("Invalid email format.");
    if (formData.phoneNumber && !/^\d{10,15}$/.test(formData.phoneNumber))
      errors.push("Phone number must be between 10 and 15 digits.");
    if (
      formData.dateOfBirth &&
      !/^\d{2}-\d{2}-\d{4}$/.test(formData.dateOfBirth)
    ) {
      errors.push("Date of birth must be in DD-MM-YYYY format.");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/information",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Save Changes Successful");
      setUserData((prevData) => ({
        ...prevData,
        ...formData,
        socialLinks: { ...prevData.socialLinks, ...formData.socialLinks },
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(`Error: ${errorMessage}`);
      setError("Failed to update user details. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-b-4 border-white w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center mt-20 px-5 py-10">
        <div className="bg-[#100924] text-gray-400 rounded-xl p-5 w-full lg:w-1/3">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full border-white border-2 overflow-hidden">
              <img
                src={userData.profilePhoto || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <ImageUpload />
            <h1 className="text-2xl lg:text-3xl text-white font-semibold mt-4">
              {userData.firstName} {userData.lastName}
            </h1>
            <h2 className="mt-1">{userData.email}</h2>

            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] my-4"></div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-sm space-y-4 md:text-base md:space-y-6 max-w-md mx-auto">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-purple-400" />
                <span className="text-white font-semibold">Phone:</span>{" "}
                <span className="text-gray-400">
                  {userData.phoneNumber || "Not provided"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-yellow-400" />
                <span className="text-white font-semibold">DOB:</span>{" "}
                <span className="text-gray-400">
                  {userData.dateOfBirth || "Not provided"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaLocationDot className="text-green-400" />
                <span className="text-white font-semibold">Address:</span>{" "}
                <span className="text-gray-400">
                  {userData.address || "Not provided"}
                </span>
              </div>
              <div className="flex gap-2">
                <BiSolidUserDetail className="text-blue-400" />
                <span className="text-white font-semibold">Bio:</span>{" "}
                <span className="text-gray-400">
                  {userData.bio || "Not provided"}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] my-4"></div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-sm space-y-4 md:text-base md:space-y-6 max-w-md mx-auto">
              <h3 className="text-lg text-center font-semibold text-white md:text-xl">
                Education
              </h3>
              <div className="flex space-x-3">
                <FaGraduationCap className="text-green-500" />
                <div className="flex gap-2">
                  <span className="text-white font-semibold">Degree:</span>
                  <span className="text-gray-400">
                    {userData.degree || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <FaBookOpen className="text-blue-500" />
                <div className="flex gap-2">
                  <span className="text-white font-semibold">Branch:</span>
                  <span className="text-gray-400">
                    {userData.branch || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <FaUniversity className="text-purple-500" />
                <div className="flex gap-2">
                  <span className="text-white font-semibold">College:</span>
                  <span className="text-gray-400">
                    {userData.collegeName || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <FaCalendarAlt className="text-yellow-500" />
                <div className="flex gap-2">
                  <span className="text-white font-semibold">Semester:</span>
                  <span className="text-gray-400">
                    {userData.semester || "Not provided"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] my-4"></div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-sm space-y-4 md:text-base md:space-y-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-white text-center md:text-xl">
                Social Links
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center">
                  <FaSquareInstagram className="text-pink-500 mr-3 text-lg md:text-xl" />
                  {userData.socialLinks.instagram ? (
                    <a
                      href={userData.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition break-all"
                    >
                      {userData.socialLinks.instagram}
                    </a>
                  ) : (
                    <span className="text-gray-400">Not provided</span>
                  )}
                </div>
                <div className="flex items-center">
                  <FaLinkedin className="text-blue-600 mr-3 text-lg md:text-xl" />
                  {userData.socialLinks.linkedIn ? (
                    <a
                      href={userData.socialLinks.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition break-all"
                    >
                      {userData.socialLinks.linkedIn}
                    </a>
                  ) : (
                    <span className="text-gray-400">Not provided</span>
                  )}
                </div>
                <div className="flex items-center">
                  <FaGithubSquare className="text-black mr-3 text-lg md:text-xl" />
                  {userData.socialLinks.github ? (
                    <a
                      href={userData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition break-all"
                    >
                      {userData.socialLinks.github}
                    </a>
                  ) : (
                    <span className="text-gray-400">Not provided</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#100924] text-white rounded-xl p-5 w-full lg:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Edit Here</h1>
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(formData).map((key) => {
                if (key === "socialLinks") return null;
                return (
                  <div key={key} className="space-y-1">
                    <label className="block text-sm">
                      {capitalizeFirstLetter(key.replace(/([A-Z])/g, " $1"))}
                    </label>
                    <input
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Social Links</h3>
              {Object.keys(formData.socialLinks).map((key) => (
                <div key={key} className="space-y-1">
                  <label className="block text-sm capitalize">{key}</label>
                  <input
                    name={`socialLinks.${key}`}
                    value={formData.socialLinks[key]}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder={`Enter Your ${capitalizeFirstLetter(
                      key
                    )} link`}
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
