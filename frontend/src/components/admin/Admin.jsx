import React, { useState } from "react";
import { FaUpload, FaHome, FaUsers, FaCode, FaTrash } from "react-icons/fa";
import Home from "./home/Home";
import AllUsers from "./user/AllUsers";
import ResourcesUpload from "./resource/ResourcesUpload";
import ResourcesDelete from "./resource/ResourcesDelete";
import CodeUpload from "./code/CodeUpload";
import CodeDelete from "./code/CodeDelete";
import HackathonUpload from "./hackathon/HackathonUpload";
import HackathonManage from "./hackathon/HackathonManage";
import Hackmate from "./hackmate/Hackmate";
import award from "../../assets/svg/award.svg";
import gear from "../../assets/svg/gear.svg";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="min-h-screen text-white mt-32">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Home",
              icon: <FaHome className="mr-2" />,
              section: "home",
            },
            {
              label: "All Users",
              icon: <FaUsers className="mr-2" />,
              section: "allUsers",
            },
            {
              label: "Upload Resources",
              icon: <FaUpload className="mr-2" />,
              section: "uploadResources",
            },
            {
              label: "Delete Resources",
              icon: <FaTrash className="mr-2" />,
              section: "deleteResources",
            },
            {
              label: "Upload Code",
              icon: <FaCode className="mr-2" />,
              section: "uploadCode",
            },
            {
              label: "Delete Code",
              icon: <FaTrash className="mr-2" />,
              section: "deleteCode",
            },
            {
              label: "Upload Hackathon",
              icon: <img src={award} className="w-6 h-6 mr-2" alt="" />,
              section: "uploadHackathon",
            },
            {
              label: "Manage Hackathon",
              icon: <img src={gear} className="w-6 h-6 mr-2" alt="" />,
              section: "manageHackathon",
            },
            {
              label: "Delete Hackmate",
              icon: <FaTrash className="mr-2" />,
              section: "deleteHackmate",
            },
          ].map((button, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(button.section)}
              className={`flex items-center justify-center px-4 py-2 text-sm sm:text-base md:text-lg cursor-pointer rounded-md shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                activeSection === button.section
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {button.icon}
              {button.label}
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {activeSection === "home" && <Home />}
        {activeSection === "allUsers" && <AllUsers />}
        {activeSection === "uploadResources" && <ResourcesUpload />}
        {activeSection === "deleteResources" && <ResourcesDelete />}
        {activeSection === "uploadCode" && <CodeUpload />}
        {activeSection === "deleteCode" && <CodeDelete />}
        {activeSection === "uploadHackathon" && <HackathonUpload />}
        {activeSection === "manageHackathon" && <HackathonManage />}
        {activeSection === "deleteHackmate" && <Hackmate />}
      </main>
    </div>
  );
};

export default Admin;
