import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../App";
import axios from "axios";
import toast from "react-hot-toast";

const Hackmate = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const { userEmail } = useAuth();

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
        setUserId(response.data._id);
      } catch (err) {
        toast.error("Failed to fetch user details. Please try again.");
        console.error("Failed to fetch user details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("You must be logged in to view your teams!");
          return;
        }

        if (!userId) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/hackmate/userTeam`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { userId },
          }
        );
        console.log(userId);
        console.log(response.data);
        setTeams(response.data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setError("Failed to load your teams. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="min-h-screen text-white mt-14">
        <h1 className="text-3xl">Loading your teams...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white mt-14">
        <h1 className="text-3xl">{error}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white rounded-lg px-4 py-8">
      <div className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold mb-6">Your Hackmate</h1>
        <Link to="/hackmate/createTeam">
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
            Create a Team
          </button>
        </Link>
      </div>
      {teams.length === 0 ? (
        <p>You have not created any teams yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teams.map((team) => (
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
                {team.pendingRequests.length > 0 && (
                  <div className="text-xs text-yellow-400">
                    {team.pendingRequests.length} Pending Requests
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hackmate;
