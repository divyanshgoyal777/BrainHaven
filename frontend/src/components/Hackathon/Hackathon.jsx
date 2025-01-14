import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const Hackathon = () => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/hackathon/allHackathon`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHackathons(response.data);
      } catch (error) {
        console.error("Failed to fetch hackathons:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSelectHackathon = (hackathon) => {
    console.log("Selected Hackathon:", hackathon);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-6 mt-24">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          Hackathons
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 p-6"
            >
              <h2 className="text-2xl font-semibold">{hackathon.name}</h2>
              <p className="text-sm text-gray-400 mt-2">
                {hackathon.description}
              </p>
              <p className="mt-3 text-sm text-gray-300">
                <strong>Date:</strong> {formatDate(hackathon.startDate)} to{" "}
                {formatDate(hackathon.endDate)}
              </p>
              <p className="mt-1 text-sm text-gray-300">
                <strong>Location:</strong>{" "}
                {hackathon.isOnline ? "Online" : hackathon.location}
              </p>
              <p className="mt-1 text-sm text-gray-300">
                <strong>Prize:</strong> {hackathon.prizeMoney}
              </p>
              <p className="mt-1 text-sm text-gray-300">
                <strong>Max Team Size:</strong> {hackathon.teamSizeMax}
              </p>
              <p className="mt-1 text-sm text-gray-300">
                <strong>Register by:</strong>{" "}
                {formatDate(hackathon.registerByDate)}
              </p>
              <p className="mt-1 text-sm text-gray-300">
                <strong>Eligibility:</strong> {hackathon.eligibilityCriteria}
              </p>
              <div className="mt-3">
                <p className="font-semibold text-sm text-gray-300">
                  Categories:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {hackathon.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 px-3 py-2 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleSelectHackathon(hackathon)}
                className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                <a
                  href={hackathon.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Hackathon
                </a>
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hackathon;
