import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import axios from "axios";

const Hackathon = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/hackathon/allHackathon`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setHackathons(response.data);
      } catch (error) {
        console.error("Failed to fetch hackathons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    document.title = "BrainHaven - Hackathon";
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredHackathons = hackathons.filter((hackathon) => {
    return new Date(hackathon.registerByDate) >= today;
  });

  useEffect(() => {
    if (selectedHackathon) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedHackathon]);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
        Hackathons
      </h2>
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader />
          <p className="text-center text-lg text-gray-400 mt-4">
            Loading hackathons...
          </p>
        </div>
      ) : filteredHackathons.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No hackathons available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="relative bg-gray-900 bg-opacity-80 backdrop-blur-md border border-gray-800 p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-purple-500 hover:bg-opacity-90 cursor-pointer overflow-hidden"
              onClick={() => setSelectedHackathon(hackathon)}
            >
              <h3 className="text-lg font-bold text-white">{hackathon.name}</h3>
              <p className="text-xs text-gray-400 mt-1">
                {formatDate(hackathon.startDate)} -{" "}
                {formatDate(hackathon.endDate)}
              </p>
              <p className="text-xs text-gray-300 mt-1">
                {hackathon.isOnline ? "Online" : hackathon.location}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {hackathon.categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 px-3 py-1 text-xs text-gray-200 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedHackathon && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4 z-50">
          <div className="bg-gray-900 bg-opacity-90 border border-gray-700 p-6 rounded-xl max-w-lg w-full relative shadow-2xl text-white animate-fadeIn scale-95 sm:scale-100">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
              onClick={() => setSelectedHackathon(null)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold">{selectedHackathon.name}</h2>
            <p className="text-sm text-gray-400 whitespace-pre-line mt-2 p-2 max-h-40 overflow-y-auto">
              {selectedHackathon.description}
            </p>

            <p className="mt-4 text-gray-300">
              <strong>📅 Date:</strong>{" "}
              {formatDate(selectedHackathon.startDate)} -{" "}
              {formatDate(selectedHackathon.endDate)}
            </p>
            <p className="mt-2 text-gray-300">
              <strong>📍 Location:</strong>{" "}
              {selectedHackathon.isOnline
                ? "Online"
                : selectedHackathon.location}
            </p>
            <p className="mt-2 text-gray-300">
              <strong>👥 Max Team Size:</strong> {selectedHackathon.teamSizeMax}
            </p>
            <p className="mt-2 text-gray-300">
              <strong>📝 Register by:</strong>{" "}
              {formatDate(selectedHackathon.registerByDate)}
            </p>
            <div className="mt-3">
              <p className="font-semibold text-gray-300">🏆 Categories:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedHackathon.categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 px-3 py-1 text-xs rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={selectedHackathon.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                🔗 Register Now
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hackathon;
