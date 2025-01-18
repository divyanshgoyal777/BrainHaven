import React, { useState, useEffect } from "react";
import User from "./User";
import PreviewProfile from "./PreviewProfile";
import Hackmate from "./Hackmate";
import { useAuth } from "../../App";
import axios from "axios";
import toast from "react-hot-toast";
import { FaHome, FaUserEdit, FaEye, FaHandshake } from "react-icons/fa";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { userEmail } = useAuth();

    useEffect(() => {
      document.title = "BrainHaven - Dashboard";
    }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        if (!userEmail) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/userProfile`,
          {
            headers: { userEmail, Authorization: `Bearer ${token}` },
          }
        );

        setUserData(response.data);
      } catch (err) {
        toast.error("Failed to fetch user details. Please try again.");
        console.error("Failed to fetch user details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  return (
    <>
      <div className="min-h-screen mt-20 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-x-6 md:space-y-0 text-lg font-medium mb-8">
            <button
              className={`${
                activeTab === "home"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300"
              } py-2 px-4 rounded-md shadow-md hover:bg-blue-500 transition-all duration-300 transform hover:scale-105`}
              onClick={() => setActiveTab("home")}
            >
              <FaHome className="inline-block mr-2" /> Home
            </button>
            <button
              className={`${
                activeTab === "hackmate"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300"
              } py-2 px-4 rounded-md shadow-md hover:bg-blue-500 transition-all duration-300 transform hover:scale-105`}
              onClick={() => setActiveTab("hackmate")}
            >
              <FaHandshake className="inline-block mr-2" /> Hackmate
            </button>
            <button
              className={`${
                activeTab === "editProfile"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300"
              } py-2 px-4 rounded-md shadow-md hover:bg-blue-500 transition-all duration-300 transform hover:scale-105`}
              onClick={() => setActiveTab("editProfile")}
            >
              <FaUserEdit className="inline-block mr-2" /> Edit Profile
            </button>
            <button
              className={`${
                activeTab === "previewProfile"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300"
              } py-2 px-4 rounded-md shadow-md hover:bg-blue-500 transition-all duration-300 transform hover:scale-105`}
              onClick={() => setActiveTab("previewProfile")}
            >
              <FaEye className="inline-block mr-2" /> Preview Profile
            </button>
          </div>

          <div className="rounded-lg shadow-md">
            {activeTab === "home" && (
              <div className="flex flex-col items-center gap-2 text-center text-3xl md:text-4xl lg:text-5xl mt-20 font-bold">
                <span className="text-blue-500">
                  Hello, {userData.firstName} {userData.lastName}!
                </span>
                <span className="text-white">Welcome to your Dashboard!</span>
              </div>
            )}
            {activeTab === "hackmate" && <Hackmate />}
            {activeTab === "editProfile" && <User />}
            {activeTab === "previewProfile" && (
              <PreviewProfile userId={userData._id} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
