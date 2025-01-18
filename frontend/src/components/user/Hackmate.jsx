import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../App";
import axios from "axios";
import toast from "react-hot-toast";

const Hackmate = () => {
  const [teams, setTeams] = useState([]);
  const [teams2, setTeams2] = useState([]);
  const [joinedTeams, setJoinedTeams] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const { userEmail } = useAuth();
  const [confirm, setConfirm] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [edit, setEdit] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: [],
    lookingFor: "",
    teamNeeds: "",
    maxSize: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        if (!userEmail) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/userProfile`,
          {
            headers: {
              userEmail,
              Authorization: `Bearer ${token}`,
            },
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

  const handleEditTeam = (team) => {
    setSelectedTeam(team);
    setFormData({
      title: team.title,
      description: team.description,
      skillsRequired: team.skillsRequired,
      maxSize: team.maxSize,
      lookingFor: team.lookingFor,
      teamNeeds: team.teamNeeds,
    });
    setEdit(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      skillsRequired: value.split(",").map((skill) => skill.trim()),
    }));
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/hackmate/deleteTeam/${teamId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTeams((prevTeams) => prevTeams.filter((team) => team._id !== teamId));
      toast.success("Team deleted successfully!");
      setConfirm(false);
    } catch (error) {
      console.error("Error deleting team:", error);
      toast.error("Failed to delete team. Please try again.");
    }
  };

  const handlesaveChanges = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/hackmate/editTeam/${
          selectedTeam._id
        }`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Team updated successfully!");
      setEdit(false);
      setSelectedTeam(null);
      setFormData({
        title: "",
        description: "",
        skillsRequired: [],
        maxSize: 0,
        lookingFor: "",
        teamNeeds: "",
      });
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team._id === selectedTeam._id ? { ...team, ...formData } : team
        )
      );
    } catch (error) {
      console.error("Error updating team:", error);
      toast.error("Failed to update team. Please try again.");
    }
  };

  useEffect(() => {
    if (!userId) return;
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("You must be logged in to view your teams!");
          return;
        }

        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/hackmate/joinedHackmate/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTeams2(response.data);
      } catch (error) {
        if (error.response.status === 400) {
          setJoinedTeams(true);
        }
        console.error("Error fetching teams:", error);
        setError("Failed to load your teams. Please try again.");
      }
    };

    fetchTeams();
  }, [userId]);

  const handleLeaveTeam = async (teamId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/hackmate/leaveTeam/${teamId}/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTeams2((prevTeams) => prevTeams.filter((team) => team._id !== teamId));
      toast.success("Left team successfully!");
    } catch (error) {
      console.error("Error leaving team:", error);
      toast.error("Failed to leave team. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen text-white mt-14">
        <h1 className="text-3xl">Loading your teams...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white rounded-lg px-2 sm:px-4 py-8">
      <div className="my-5">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Your Created Hackmate</h1>
          <Link to="/hackmate/createTeam">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
              Create a Team
            </button>
          </Link>
        </div>

        {edit ? (
          <form
            onSubmit={handlesaveChanges}
            className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 text-white"
          >
            <h2 className="text-2xl font-bold">Edit Team</h2>
            <div>
              <label className="block text-sm font-medium mb-2">
                Team Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Skills Required (comma separated)
              </label>
              <input
                type="text"
                name="skillsRequired"
                value={formData.skillsRequired.join(", ")}
                onChange={handleSkillsChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Size</label>
              <input
                type="number"
                name="maxSize"
                value={formData.maxSize}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                max={10}
                min={1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Looking For
              </label>
              <input
                type="text"
                name="lookingFor"
                value={formData.lookingFor}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Team Needs
              </label>
              <input
                type="text"
                name="teamNeeds"
                value={formData.teamNeeds}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setEdit(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : teams.length === 0 ? (
          <div className="text-center text-xl text-gray-400">
            You have no team. Create a new one!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team._id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-[1.03] transition-transform duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {team.title}
                  </h3>
                  <button
                    onClick={() => handleEditTeam(team)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out"
                  >
                    Edit
                  </button>
                </div>
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
                <div className="text-sm text-gray-400 mb-4 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-300">
                      Team Size:{" "}
                    </span>
                    {`${team.members.length} / ${team.maxSize}`}
                  </div>
                  <div>
                    {team.pendingRequests.length > 0 && (
                      <div className="text-xs text-yellow-400">
                        {team.pendingRequests.length} Pending Requests
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-center">
                  <div className="flex flex-row justify-between items-center w-full gap-1">
                    <Link
                      to={`/hackmate/chat/${team._id}`}
                      className="bg-green-600 text-white text-center mb-2 px-2 sm:px-4 py-2 w-1/2 rounded-md shadow-md hover:bg-green-500 transition-colors"
                    >
                      Chat
                    </Link>

                    <Link
                      to={`/hackmate/team/${team._id}`}
                      className="bg-indigo-600 text-white text-center mb-2 px-2 sm:px-4 py-2 w-1/2 rounded-md shadow-md hover:bg-indigo-500 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>

                  <button
                    onClick={() => {
                      setConfirm(true);
                      setTeamToDelete(team._id);
                    }}
                    className="bg-red-600 text-white px-2 sm:px-4 py-2 w-full rounded-md shadow-md hover:bg-red-500 transition-colors"
                  >
                    Delete Team
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {confirm && teamToDelete && (
          <div className="fixed m-auto inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-700">
                Are you sure you want to delete this team?
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setConfirm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteTeam(teamToDelete)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {!joinedTeams ? (
        <div className="my-5">
          <h1 className="text-3xl font-bold mb-10">Your Hackmate Teams</h1>
          {Array.isArray(teams2) && teams2.length === 0 ? (
            <p>No teams found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(teams2) &&
                teams2.map((team) => (
                  <div
                    key={team._id}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-[1.03] transition-transform duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {team.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 mb-4">
                      {team.description || "No description available."}
                    </p>
                    <div className="text-sm text-gray-400 mb-2">
                      <span className="font-medium text-gray-300">Admin: </span>
                      <span className="font-semibold hover:text-white transition-all">
                        <Link to={`/user/${team.admin}`}>
                          {team.adminName || "N/A"}
                        </Link>
                      </span>
                    </div>
                    <div className="mb-4">
                      <span className="font-medium text-gray-300">
                        Skills Required:{" "}
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Array.isArray(team.skillsRequired) &&
                        team.skillsRequired.length > 0 ? (
                          team.skillsRequired.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-400">No skills specified.</p>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 mb-4">
                      <span className="font-medium text-gray-300">
                        Team Size:{" "}
                      </span>
                      {`${team.members.length} / ${team.maxSize || "Unknown"}`}
                    </div>

                    <div className="flex flex-col justify-between items-center">
                      <div className="flex flex-row justify-between items-center w-full gap-1">
                        <Link
                          to={`/hackmate/chat/${team._id}`}
                          className="bg-green-600 text-white text-center mb-2 px-2 sm:px-4 py-2 w-1/2 rounded-md shadow-md hover:bg-green-500 transition-colors"
                        >
                          Chat
                        </Link>

                        <Link
                          to={`/hackmate/team/${team._id}`}
                          className="bg-indigo-600 text-white text-center mb-2 px-2 sm:px-4 py-2 w-1/2 rounded-md shadow-md hover:bg-indigo-500 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                      <button
                        onClick={() => {
                          handleLeaveTeam(team._id);
                        }}
                        className="bg-red-600 text-white px-2 w-full sm:px-4 py-2 rounded-md shadow-md hover:bg-red-500 transition-colors"
                      >
                        Leave Team
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Hackmate;
