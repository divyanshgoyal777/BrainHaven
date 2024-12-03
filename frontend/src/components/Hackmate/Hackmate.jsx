import React, { useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import { FaUsers } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Hackathon = () => {
  const [hackathons, setHackathons] = useState([
    {
      id: 1,
      name: "AI Innovation Challenge",
      description:
        "Build innovative AI solutions to solve real-world problems. Focus on practical applications of machine learning and artificial intelligence.",
      date: "4/1/2024 - 4/3/2024",
      location: "Online",
      prize: "$10,000",
      maxTeamSize: 4,
      registerBy: "3/25/2024",
      categories: ["AI/ML", "Python", "Data Science"],
    },
    {
      id: 2,
      name: "DevFest 2024",
      description: "Showcase your development skills and win exciting prizes.",
      date: "15-12-2024",
      location: "Mumbai",
      prize: "$5000",
      maxTeamSize: 5,
      registerBy: "12/10/2024",
      categories: ["Web Development", "Frontend", "Backend"],
    },
    {
      id: 3,
      name: "Hack the Future",
      description: "Build innovative solutions to real-world problems.",
      date: "20-12-2024",
      location: "Bangalore",
      prize: "$7000",
      maxTeamSize: 6,
      registerBy: "12/15/2024",
      categories: ["AI/ML", "Blockchain", "IoT"],
    },
  ]);

  const [teams, setTeams] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [teamData, setTeamData] = useState({
    teamName: "",
    teamSize: "",
    members: "",
    timing: "",
  });

  const handleSelectHackathon = (hackathon) => {
    setSelectedHackathon(hackathon);
    setShowModal(true);
  };

  const validateDate = (date) => {
    const regex = /^([0-2][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    return regex.test(date);
  };

  const validateEmails = (emails) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.split(",").every((email) => emailRegex.test(email.trim()));
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();

    if (teamData.timing && !validateDate(teamData.timing)) {
      toast.error("Please enter a valid date in DD-MM-YYYY format.");
      return;
    }

    if (teamData.members && !validateEmails(teamData.members)) {
      toast.error("Please enter valid email addresses.");
      return;
    }

    const newTeam = {
      ...teamData,
      hackathonName: selectedHackathon.name,
    };

    setTeams([...teams, newTeam]);
    toast.success("Team created successfully!");

    setShowModal(false);
    setSelectedHackathon(null);
    setTeamData({
      teamName: "",
      teamSize: "",
      members: "",
      timing: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };

  const filteredHackathons = hackathons.filter((hackathon) =>
    hackathon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-8 mt-32">
        <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg">
          Hackathons
        </h1>
        <div className="mt-8">
          <input
            type="text"
            className="w-full p-4 border rounded-md text-black"
            placeholder="Search hackathons..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHackathons.length > 0 ? (
            filteredHackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                <h2 className="text-2xl font-semibold">{hackathon.name}</h2>
                <p className="text-sm text-gray-400">{hackathon.description}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Date: {hackathon.date}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Location: {hackathon.location}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Prize: {hackathon.prize}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Max Team Size: {hackathon.maxTeamSize}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Register by: {hackathon.registerBy}
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
                  <FaUsers className="mr-2" /> Join Hackathon
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center text-gray-500 text-xl">
              No hackathon found.
            </div>
          )}
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
                    max={selectedHackathon?.maxTeamSize}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="members"
                    className="block text-sm text-gray-300"
                  >
                    Add Members (Comma-separated emails)
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
                    Preferred Time to Meet (DD-MM-YYYY)
                  </label>
                  <input
                    type="text"
                    name="timing"
                    id="timing"
                    className="w-full mt-2 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={teamData.timing}
                    onChange={handleChange}
                    placeholder="e.g. 20-12-2024"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Create Team
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Hackathon;
