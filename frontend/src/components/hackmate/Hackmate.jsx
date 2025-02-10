import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Hackmate = () => {
  const [HackmateData, setHackmateData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHackmateData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in to perform this action!");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/hackmate/allHackmate`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;

        const availableTeams = data.filter(
          (team) => team.members.length < team.maxSize
        );

        setHackmateData(availableTeams);
        setFilteredData(availableTeams);
      } catch (error) {
        console.error("Error fetching Hackmate data:", error);
        toast.error(
          error.response?.data.message || "Failed to fetch Hackmate data."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchHackmateData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredTeams = HackmateData.filter((team) => {
      const searchString = `${team.title} ${team.description} ${
        team.adminName
      } ${team.skillsRequired.join(" ")}`.toLowerCase();
      return searchString.includes(event.target.value.toLowerCase());
    });
    setFilteredData(filteredTeams);
  };

  useEffect(() => {
    document.title = "BrainHaven - Hackmate";
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-1 mt-24 mb-10">
        <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
          Hackmate
        </h2>

        <div className="mb-10 flex justify-center">
          <div className="relative w-full sm:w-1/2 md:w-1/3">
            <input
              type="text"
              placeholder="Search Hackmate Teams..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-6 py-3 border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <Link to="/hackmate/createTeam">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
              Create a Team
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading ? (
            <p className="text-center text-lg text-gray-400">
              Loading teams...
              <Loader />
            </p>
          ) : filteredData.length > 0 ? (
            filteredData.map((team) => (
              <div
                key={team._id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-[1.03] transition-transform duration-300"
              >
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {team.title}
                </h3>
                <p className="text-gray-400 mb-4">{team.description}</p>
                <div className="text-sm text-gray-400 mb-2">
                  <span className="font-medium text-gray-300">Admin: </span>
                  <span className="font-semibold hover:text-white transition-all">
                    <Link to={`/user/${team.admin}`}>{team.adminName}</Link>
                  </span>
                </div>
                <div className="mb-4">
                  <span className="font-medium text-gray-300">
                    Skills Required:{" "}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {team.skillsRequired.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-400 mb-4">
                  <span className="font-medium text-gray-300">Team Size: </span>
                  {`${team.members.length} / ${team.maxSize}`}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/hackmate/team/${team._id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">
              No teams available. Create one now!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Hackmate;
