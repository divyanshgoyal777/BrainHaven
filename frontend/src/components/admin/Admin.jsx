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
    <>
      <div className="min-h-screen text-white mt-32">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <button
              onClick={() => setActiveSection("home")}
              className={`flex items-center justify-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
                activeSection === "home"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <FaHome className="mr-2" />
              Home
            </button>
            <button
              onClick={() => setActiveSection("allUsers")}
              className={`flex items-center justify-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
                activeSection === "allUsers"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <FaUsers className="mr-2" />
              All Users
            </button>
            <button
              onClick={() => setActiveSection("uploadResources")}
              className={`flex items-center justify-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
                activeSection === "uploadResources"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <FaUpload className="mr-2" />
              Upload Resources
            </button>
            <button
              onClick={() => setActiveSection("deleteResources")}
              className={`flex items-center justify-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
                activeSection === "deleteResources"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <FaTrash className="mr-2" />
              Delete Resources
            </button>
            <button
              onClick={() => setActiveSection("uploadCode")}
              className={`flex items-center justify-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
                activeSection === "uploadCode"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <FaCode className="mr-2" />
              Upload Code
            </button>
            <button
              onClick={() => setActiveSection("deleteCode")}
              className={`flex items-center justify-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
                activeSection === "deleteCode"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <FaTrash className="mr-2" />
              Delete Code
            </button>
            <button
              onClick={() => setActiveSection("uploadHackathon")}
              className={`flex items-center justify-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
                activeSection === "uploadHackathon"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <img src={award} className="w-6 h-6 mr-2" alt="" />
              Upload Hackathon
            </button>
            <button
              onClick={() => setActiveSection("manageHackathon")}
              className={`flex items-center justify-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
                activeSection === "manageHackathon"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <img src={gear} className="w-6 h-6 mr-2  " alt="" />
              Manage Hackathon
            </button>
            <button
              onClick={() => setActiveSection("deleteHackmate")}
              className={`flex items-center justify-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
                activeSection === "deleteHackmate"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <FaTrash className="mr-2" />
              Delete Hackmate
            </button>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          {activeSection === "home" && (
            <section>
              <Home />
            </section>
          )}
          {activeSection === "allUsers" && (
            <section>
              <AllUsers />
            </section>
          )}
          {activeSection === "uploadResources" && (
            <section>
              <ResourcesUpload />
            </section>
          )}
          {activeSection === "deleteResources" && (
            <section>
              <ResourcesDelete />
            </section>
          )}
          {activeSection === "uploadCode" && (
            <section>
              <CodeUpload />
            </section>
          )}
          {activeSection === "deleteCode" && (
            <section>
              <CodeDelete />
            </section>
          )}
          {activeSection === "uploadHackathon" && (
            <section>
              <HackathonUpload />
            </section>
          )}
          {activeSection === "manageHackathon" && (
            <section>
              <HackathonManage />
            </section>
          )}
          {activeSection === "deleteHackmate" && (
            <section>
              <Hackmate />
            </section>
          )}
        </main>
      </div>
    </>
  );
};

export default Admin;
