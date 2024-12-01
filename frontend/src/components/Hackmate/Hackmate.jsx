import React, { useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import { FaUsers } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Hackmate = () => {
  const [hackathons, setHackathons] = useState([
    {
      id: 1,
      name: "Hackathon 1",
      description: "Description for Hackathon 1",
      date: "10-12-2024",
    },
    {
      id: 2,
      name: "Hackathon 2",
      description: "Description for Hackathon 2",
      date: "15-12-2024",
    },
  ]);

  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [teamData, setTeamData] = useState({
    teamName: "",
    teamSize: "",
    hackathonName: "",
    timing: "",
    members: "",
  });

  const handleSelectHackathon = (hackathon) => {
    setSelectedHackathon(hackathon);
  };

  const validateDate = (date) => {
    const regex = /^([0-2][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    return regex.test(date);
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();

    if (teamData.timing && !validateDate(teamData.timing)) {
      toast.error("Please enter a valid date in DD-MM-YYYY format.");
      return;
    }

    console.log("Team Created:", teamData);
    toast.success("Team created successfully!");

    setShowModal(false);
    setSelectedHackathon(null);
    setTeamData({
      teamName: "",
      teamSize: "",
      hackathonName: "",
      timing: "",
      members: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Navbar />
      <div className="container mx-auto p-6 mt-20">
        <h1 className="text-4xl font-semibold text-center mb-8">Hackmate</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer"
              onClick={() => handleSelectHackathon(hackathon)}
            >
              <h2 className="text-2xl font-semibold">{hackathon.name}</h2>
              <p className="text-sm text-gray-400">{hackathon.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Date: {hackathon.date}
              </p>
              {selectedHackathon && selectedHackathon.id === hackathon.id && (
                <button
                  className="mt-4 flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => setShowModal(true)}
                >
                  <FaUsers className="mr-2" /> Create Team
                </button>
              )}
            </div>
          ))}
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold text-center mb-6">
                Create Team for {selectedHackathon?.name}
              </h3>
              <form onSubmit={handleCreateTeam}>
                <div className="mb-4">
                  <label
                    htmlFor="teamName"
                    className="block text-sm text-gray-300"
                  >
                    Team Name
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    id="teamName"
                    className="w-full mt-2 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={teamData.teamName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="teamSize"
                    className="block text-sm text-gray-300"
                  >
                    Team Size
                  </label>
                  <input
                    type="number"
                    name="teamSize"
                    id="teamSize"
                    className="w-full mt-2 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={teamData.teamSize}
                    onChange={handleChange}
                    min="2"
                    max="6"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="members"
                    className="block text-sm text-gray-300"
                  >
                    Add Members (Comma separated emails)
                  </label>
                  <input
                    type="text"
                    name="members"
                    id="members"
                    className="w-full mt-2 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add member emails"
                    value={teamData.members || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="timing"
                    className="block text-sm text-gray-300"
                  >
                    Last Joining Date (Optional)
                  </label>
                  <input
                    placeholder="DD-MM-YYYY"
                    type="text"
                    name="timing"
                    id="timing"
                    className="w-full mt-2 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={teamData.timing || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Create Team
                  </button>
                </div>
              </form>
              <button
                className="w-full py-2 text-center bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Hackmate;
