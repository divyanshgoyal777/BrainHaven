import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const Hackathon = () => {
  const [hackathons, setHackathons] = useState([]); // State to hold hackathon data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/hackathon/search`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHackathons(response.data); // Set the fetched data in state
      } catch (error) {
        console.error("Failed to fetch hackathons:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSelectHackathon = (hackathon) => {
    console.log("Selected Hackathon:", hackathon); // Handle hackathon selection logic
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-6 mt-24">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">
          Hackathons
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              <h2 className="text-2xl font-semibold">{hackathon.name}</h2>
              <p className="text-sm text-gray-400">{hackathon.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Date: {formatDate(hackathon.startDate)} to{" "}
                {formatDate(hackathon.endDate)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Location: {hackathon.isOnline ? "Online" : hackathon.location}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Prize: {hackathon.prizeMoney}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Max Team Size: {hackathon.teamSizeMax}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Register by: {formatDate(hackathon.registerByDate)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
              Eligibility Criteria: {hackathon.eligibilityCriteria}
              </p>
              <div className="mt-2">
                <p className="font-semibold text-sm">Categories:</p>
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
                className="mt-4 flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <a href={hackathon.registrationLink  } target="_blank" rel="noopener noreferrer">
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
