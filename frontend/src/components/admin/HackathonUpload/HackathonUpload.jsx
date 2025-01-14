import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const HackathonUpload = () => {
  const [hackathonData, setHackathonData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    isOnline: false,
    location: "",
    timing: "",
    prizeMoney: 0,
    teamSizeMax: 0,
    registerByDate: "",
    categories: [],
    eligibilityCriteria: "",
    registrationLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHackathonData({
      ...hackathonData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/hackathon/upload`,
          hackathonData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      toast.success("Hackathon uploaded successfully!");
      setHackathonData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        isOnline: false,
        location: "",
        timing: "",
        prizeMoney: 0,
        teamSizeMax: 0,
        registerByDate: "",
        categories: [],
        eligibilityCriteria: "",
        registrationLink: "",
      });
    } catch (error) {
      toast.error("Failed to upload hackathon. Please try again.", error);
    }
  };

  return (
    <>
    <div className="container mx-auto px-4 py-6 text-white">
     <div className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Upload Hackathon</div>
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">Hackathon Name</label>
        <input
        type="text"
        name="name"
        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={hackathonData.name}
        onChange={handleChange}
        placeholder="Hackathon Name"
        required
      />
        </div>
     
     <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
     <textarea
        name="description"
        value={hackathonData.description}
        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={handleChange}
        placeholder="Description"
        required
      />
     </div>
     
     <div>
        <label htmlFor="startDate" className="block text-sm font-medium mb-2">Start Date</label>
     <input
        type="date"
        name="startDate"
        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={hackathonData.startDate}
        onChange={handleChange}
        required
      />
     </div>
      
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium mb-2">End Date</label>
      <input
        type="date"
        name="endDate"
        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

        value={hackathonData.endDate}
        onChange={handleChange}
        required
      />
      </div>
      
      <div className=" flex items-center justify-start gap-5">
        <label htmlFor="isOnline" className="block text-sm font-medium mb-2">Is Online?</label>
      <input
        type="checkbox"
        name="isOnline"
        checked={hackathonData.isOnline}
        className=" w-4 h-4 scale-150 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

        onChange={(e) =>
          setHackathonData({ ...hackathonData, isOnline: e.target.checked })
        }
      />
      </div>
     
     {hackathonData.isOnline ? null : (
         <div>
         <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
      <input
         type="text"
         name="location"
         className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
 
         value={hackathonData.location}
         onChange={handleChange}
         placeholder="Location"
         required={!hackathonData.isOnline}
       />
      </div>
     )}  
     
     
     <div>
        <label htmlFor="timing" className="block text-sm font-medium mb-2">Timing</label>
     <input
        type="text"
        name="timing"
        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

        value={hackathonData.timing}
        onChange={handleChange}
        placeholder="Timing"
        required
      />
     </div>
     
     <div>
        <label htmlFor="prizeMoney" className="block text-sm font-medium mb-2">Prize Money</label>
     <input
        type="number"
        name="prizeMoney"
        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

        value={hackathonData.prizeMoney}
        onChange={handleChange}
        placeholder="Prize Money"
        required
      />
     </div>
     
     <div>
        <label htmlFor="teamSizeMax" className="block text-sm font-medium mb-2">Max Team Size</label>
     <input
        type="number"
        name="teamSizeMax"
        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

        value={hackathonData.teamSizeMax}
        onChange={handleChange}
        placeholder="Max Team Size"
        required
      />
     </div>
      
      <div>
        <label htmlFor="registerByDate" className="block text-sm font-medium mb-2">Register By Date</label>
      <input
        type="date"
        name="registerByDate"
        value={hackathonData.registerByDate}
        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

        onChange={handleChange}
        required
      />
      </div>
      
      <div>
      <label htmlFor="categories" className="block text-sm font-medium mb-2">Categories</label>
      <input
        type="text"
        name="categories"
        value={hackathonData.categories}
        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

        onChange={(e) =>
          setHackathonData({ ...hackathonData, categories: e.target.value.split(",") })
        }
        placeholder="Categories (comma-separated)"
        required
      />
      </div>
     
     <div>
     <label htmlFor="eligibilityCriteria" className="block text-sm font-medium mb-2">Eligibility Criteria</label>
     <textarea
        name="eligibilityCriteria"
        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

        value={hackathonData.eligibilityCriteria}
        onChange={handleChange}
        placeholder="Eligibility Criteria"
        required
      />
     </div>
     
     <div>
        <label htmlFor="registrationLink" className="block text-sm font-medium mb-2">Registration Link</label>
     <input
        type="url"
        name="registrationLink"
        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

        value={hackathonData.registrationLink}
        onChange={handleChange}
        placeholder="Registration Link"
        required
      />
     </div>
      
      <button type="submit"  className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg">Upload Hackathon</button>
    </form>
    </div>
    </>
  );
};

export default HackathonUpload;

