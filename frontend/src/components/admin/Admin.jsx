import React, { useState } from "react";
import { FaUpload, FaHome, FaUsers, FaCode } from "react-icons/fa";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import ResourcesUpload from "./ResourcesUpload";
import Home from "./Home";
import AllUsers from "./AllUsers";
import CodeUpload from "./CodeUpload";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white mt-32">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button
              onClick={() => setActiveSection("home")}
              className={`flex items-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
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
              className={`flex items-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
                activeSection === "allUsers"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <FaUsers className="mr-2" />
              All Users
            </button>
            <button
              onClick={() => setActiveSection("resources")}
              className={`flex items-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
                activeSection === "resources"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <FaUpload className="mr-2" />
              Upload Resources
            </button>
            <button
              onClick={() => setActiveSection("code")}
              className={`flex items-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg shadow-md transition-all duration-300 ${
                activeSection === "code"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <FaCode className="mr-2" />
              Upload Code
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
          {activeSection === "resources" && (
            <section>
              <ResourcesUpload />
            </section>
          )}
          {activeSection === "code" && (
            <section>
              <CodeUpload />
            </section>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
