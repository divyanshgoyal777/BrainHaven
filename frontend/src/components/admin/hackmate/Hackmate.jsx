import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Hackmate = () => {
  const [HackmateData, setHackmateData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHackmateData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in to view teams!");
          return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/hackmate/allHackmate`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHackmateData(response.data);
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

  const deleteHackmate = async (teamId, teamTitle) => {
    if (
      window.confirm(
        `Are you sure that you want to delete the "${teamTitle}" team?`
      )
    ) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in to delete a team!");
          return;
        }
        await axios.delete(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/admin/deleteHackmate/${teamId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success(`Team "${teamTitle}" deleted successfully!`);
        setHackmateData((prev) => prev.filter((team) => team._id !== teamId));
      } catch (error) {
        console.error("Error deleting Hackmate team:", error);
        toast.error(
          error.response?.data.message || "Failed to delete the Hackmate team."
        );
      }
    } else {
      toast.error("Team deletion cancelled");
    }
  };

  return (
    <div className="min-h-screen text-white py-6">
      <h1 className="text-4xl font-bold text-center mb-10 p-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        Manage Hackmate Teams
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading ? (
          <p className="text-center text-gray-400">Loading teams...</p>
        ) : HackmateData.length > 0 ? (
          HackmateData.map((team) => (
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
              {team.skillsRequired.length > 0 && (
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
              )}
              <div className="text-sm text-gray-400 mb-4">
                <span className="font-medium text-gray-300">Team Size: </span>
                {`${team.members.length} / ${team.maxSize}`}
              </div>
              <div className="flex justify-between items-center">
                <Link
                  to={`/hackmate/team/${team._id}`}
                  target="_blank"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={() => deleteHackmate(team._id, team.title)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-500 transition-colors"
                >
                  Delete
                </button>

                
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-lg font-medium">
            No teams available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Hackmate;
