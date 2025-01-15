import React, { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { useAuth } from "../../App";

const CreateHackmate = () => {
    const { userEmail } = useAuth();
    const [hackmateData, setHackmateData] = useState({
      title: "",
      description: "",
      maxSize: 0,
      skillsRequired: [], // Fixed property name
      lookingFor: "",
      teamNeeds: "",
    });
  
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setHackmateData({
        ...hackmateData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Combine firstName and lastName into name
      const combinedName = `${formData.firstName} ${formData.lastName}`;
      const payload = { ...hackmateData, name: combinedName };
  
      console.log("Form submitted:", payload);
  
      try {
        const token = localStorage.getItem("token");
  
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/hackmate/createTeam`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          toast.success("Hackmate created successfully!");
          setHackmateData({
            title: "",
            description: "",
            maxSize: 0,
            skillsRequired: [],
            lookingFor: "",
            teamNeeds: "",
          });
          console.log("Response from server:", response.data);
        }
      } catch (error) {
        toast.error("Failed to create hackmate!");
        console.error("Error creating hackmate:", error.response?.data || error.message);
      }
    };
  
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
  
          const { firstName, lastName } = response.data;
  
          // Log the firstName and lastName to the console
          console.log("Fetched First Name:", firstName);
          console.log("Fetched Last Name:", lastName);
  
          if (firstName && lastName) {
            setFormData({ firstName, lastName });
          } else {
            console.error("First name or last name is missing in the response.");
          }
        } catch (err) {
          console.error("Failed to fetch user details:", err);
        }
      };
  
      fetchData();
    }, [userEmail]);

  return (
    <div>
      <div>
        <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
          Create Hackmate
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 text-white"
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={hackmateData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              value={hackmateData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Max Size */}
          <div>
            <label
              htmlFor="maxSize"
              className="block text-sm font-medium mb-2"
            >
              Max Size
            </label>
            <input
              type="number"
              name="maxSize"
              value={hackmateData.maxSize}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Max Team Size"
              min={1}
              max={10}
            />
          </div>

          {/* Skill Required */}
          <div>
            <label
              htmlFor="skillsRequired"
              className="block text-sm font-medium mb-2"
            >
              Skill Required (Comma Separated)
            </label>
            <input
              type="text"
              name="skillsRequired"
              value={hackmateData.skillsRequired.join(", ")}
              onChange={(e) =>
                setHackmateData({
                  ...hackmateData,
                  skillsRequired: e.target.value.split(",").map((skill) => skill.trim()),
                })
              }
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Looking For */}
          <div>
            <label
              htmlFor="lookingFor"
              className="block text-sm font-medium mb-2"
            >
              Looking For
            </label>
            <input
              type="text"
              name="lookingFor"
              value={hackmateData.lookingFor}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Team Needs */}
          <div>
            <label htmlFor="teamNeeds" className="block text-sm font-medium mb-2">
              Team Needs
            </label>
            <input
              type="text"
              name="teamNeeds"
              value={hackmateData.teamNeeds}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHackmate;
