import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../App";

const CreateHackmate = () => {
  const { userEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [hackmateData, setHackmateData] = useState({
    title: "",
    description: "",
    maxSize: 0,
    skillsRequired: [],
    lookingFor: "",
    teamNeeds: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHackmateData({
      ...hackmateData,
      [name]: value,
    });
  };

  // Form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !hackmateData.title ||
      !hackmateData.description ||
      !hackmateData.maxSize ||
      hackmateData.skillsRequired.length === 0 ||
      !hackmateData.lookingFor ||
      !hackmateData.teamNeeds ||
      !formData.firstName ||
      !formData.lastName
    ) {
      toast.error("Please fill out all the required fields!");
      setIsLoading(false); // Reset loading state if validation fails
      return;
    }

    const combinedName = `${formData.firstName} ${formData.lastName}`;
    const payload = { ...hackmateData, name: combinedName };

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
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create hackmate!"
      );
      console.error(
        "Error creating hackmate:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  // Fetch user profile details
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

  // Set page title
  useEffect(() => {
    document.title = "BrainHaven - Create Hackmate";
  }, []);

  return (
    <div className="container mx-auto px-4 py-1 mt-24 mb-10">
      <div>
        <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
          Create Hackmate
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 text-white"
        >
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={hackmateData.title}
              onChange={handleChange}
              placeholder="Enter Team Title"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              placeholder="Enter Team Description"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="maxSize" className="block text-sm font-medium mb-2">
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
                  skillsRequired: e.target.value
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter((skill) => skill !== ""), // Remove empty values
                })
              }
              placeholder="Enter Skills Required"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              placeholder="Enter What You're Looking For"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="teamNeeds"
              className="block text-sm font-medium mb-2"
            >
              Team Needs
            </label>
            <input
              type="text"
              name="teamNeeds"
              value={hackmateData.teamNeeds}
              onChange={handleChange}
              placeholder="Enter Team Needs"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold py-3 rounded-lg`}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="ml-2">Creating Hackmate...</span>
              </div>
            ) : (
              "Create Hackmate"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHackmate;
