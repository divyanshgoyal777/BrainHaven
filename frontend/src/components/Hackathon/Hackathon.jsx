import React, { useEffect, useState } from "react";
import axios from "axios";

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

    useEffect(() => {
      document.title = "BrainHaven - Hackathon";
    }, []);


  return (
    <div>
      <div className="container mx-auto px-4 py-1 mt-24 mb-10 ">
        <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
          Hackathons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="bg-gradient-to-r from-slate-950 via-gray-900 to-gray-800 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 p-8"
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
              <a
                href={hackathon.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="mt-6 w-full py-3 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
                  Join Hackathon
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hackathon;
