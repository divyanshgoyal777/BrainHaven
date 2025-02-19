import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../App";
import { Link } from "react-router-dom";

const TeamViewer = () => {
  const { teamId } = useParams();
  const { userEmail } = useAuth();
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in to view this team!");
          return;
        }

        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/hackmate/teamProfile/${teamId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTeamData(response.data);
        document.title = `BrainHaven - ${response.data.title}`;
        setAdminId(response.data.admin);
      } catch (error) {
        console.error("Error fetching team data:", error);
        toast.error(
          error.response?.data.message || "Failed to fetch team details."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

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
        console.error("Failed to fetch user details:", err);
      }
    };

    fetchData();
  }, [userEmail]);

  useEffect(() => {
    if (teamData) {
      const isRequestSent = teamData.pendingRequests.some(
        (request) => request.userId === userId
      );
      setRequestStatus(isRequestSent ? "Request Sent" : null);
    }
  }, [teamData, userId]);

  const handleJoinRequest = async () => {
    setIsRequesting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to join a team.");
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/hackmate/joinTeam/${teamId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(
        response.data.message || "You have successfully joined the team."
      );
      setRequestStatus("Request Sent");
    } catch (error) {
      console.error("Error sending join request:", error);
      toast.error(
        error.response?.data.message ||
          "Failed to join the team. Please try again."
      );
    } finally {
      setIsRequesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <p className="text-center text-white animate-pulse">
          Loading team details...
        </p>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <p className="text-center text-red-500">
          Unable to load team details. Please try again later.
        </p>
      </div>
    );
  }

  const {
    title,
    description,
    adminName,
    lookingFor,
    skillsRequired,
    members,
    maxSize,
    teamNeeds,
    pendingRequests,
  } = teamData;

  const handleDeclineRequest = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/hackmate/declineRequest/${teamId}/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      setTeamData((prevData) => ({
        ...prevData,
        pendingRequests: prevData.pendingRequests.filter(
          (request) => request.userId !== userId
        ),
      }));
    } catch (error) {
      console.error("Error declining request:", error);
      toast.error(error.response?.data.message || "Failed to decline request");
    }
  };

  const handleAcceptRequest = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/hackmate/acceptRequest/${teamId}/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      setTeamData((prevData) => {
        const acceptedUser = prevData.pendingRequests.find(
          (request) => request.userId === userId
        );
        return {
          ...prevData,
          pendingRequests: prevData.pendingRequests.filter(
            (request) => request.userId !== userId
          ),
          members: [...prevData.members, acceptedUser],
        };
      });
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error(error.response?.data.message || "Failed to accept request");
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/hackmate/removeMember/${teamId}/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      setTeamData((prevData) => ({
        ...prevData,
        members: prevData.members.filter((member) => member.userId !== userId),
      }));
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error(error.response?.data.message || "Failed to remove member");
    }
  };

  return (
    <>
      <div className="min-h-screen py-12 px-4 sm:px-6 md:px-12 lg:px-16 mt-24">
        <div className="container mx-auto">
          <div className="bg-gray-800 p-6 sm:p-8 md:p-12 rounded-lg shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-6">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 mb-2">
                  <span className="font-medium text-gray-100">Admin:</span>{" "}
                  {adminName}
                </p>
                <p className="text-gray-400 mb-2">
                  <span className="font-medium text-gray-100">
                    Looking For:
                  </span>{" "}
                  {lookingFor}
                </p>
                <p className="text-gray-400 mb-2">
                  <span className="font-medium text-gray-100">Team Needs:</span>{" "}
                  {teamNeeds}
                </p>
              </div>
              <div>
                <p className="text-gray-400 mb-2">
                  <span className="font-medium text-gray-100">Team Size:</span>{" "}
                  {`${members.length} / ${maxSize}`}
                </p>
                <div>
                  <span className="font-medium text-gray-100">
                    Skills Required:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skillsRequired.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Members
              </h3>
              {members?.some((member) => member.userId === userId) ? (
                <>
                  <p className="text-green-400 font-bold mb-4">
                    You are a member of this Hackmate!
                  </p>
                  <ul className="space-y-2">
                    {members.map((member) => (
                      <li
                        key={member._id}
                        className="bg-gray-700 p-3 rounded-lg shadow-sm flex flex-col sm:flex-row items-center sm:justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-indigo-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold"></div>
                          <p className="font-semibold text-gray-300 hover:text-white">
                            <Link to={`/user/${member.userId}`}>
                              {member.userName}
                            </Link>
                          </p>
                        </div>
                        {adminId === userId && member.userId !== adminId && (
                          <button
                            onClick={() => handleRemoveMember(member.userId)}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-sm w-full sm:w-auto"
                          >
                            Remove
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-gray-400 font-bold">
                  You must be a member to view this team's members.
                </p>
              )}
            </div>

            {pendingRequests.length > 0 && adminId === userId && (
              <div className="mt-6">
                <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-3">
                  Pending Requests
                </h3>
                <ul className="space-y-2">
                  {pendingRequests.map((request) => (
                    <li
                      key={request.userId}
                      className="bg-gray-700 p-3 rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold"></div>
                        <p className="font-semibold text-gray-300 hover:text-white">
                          <Link to={`/user/${request.userId}`}>
                            {request.userName}
                          </Link>
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleAcceptRequest(request.userId)}
                          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-sm w-full sm:w-auto"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(request.userId)}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-sm w-full sm:w-auto"
                        >
                          Decline
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {adminId === userId ||
            members.some((member) => member.userId === userId) ? null : (
              <div className="mt-6">
                {requestStatus ? (
                  <p className="text-yellow-400 font-bold mb-4">
                    {requestStatus}
                  </p>
                ) : (
                  <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-sm w-full sm:w-auto"
                    onClick={handleJoinRequest}
                    disabled={isRequesting}
                  >
                    {isRequesting ? "Sending Request..." : "Send Join Request"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamViewer;
