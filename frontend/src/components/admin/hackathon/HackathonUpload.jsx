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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHackathonData({
      ...hackathonData,
      [name]:
        name === "prizeMoney" || name === "teamSizeMax" ? Number(value) : value,
    });
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!hackathonData.name) newErrors.name = "Hackathon name is required.";
    if (!hackathonData.description || hackathonData.description.length < 10)
      newErrors.description = "Description must be at least 10 characters.";
    if (!hackathonData.startDate)
      newErrors.startDate = "Start date is required.";
    if (!hackathonData.endDate) newErrors.endDate = "End date is required.";
    if (new Date(hackathonData.startDate) > new Date(hackathonData.endDate))
      newErrors.endDate = "End date must be after the start date.";
    if (!hackathonData.isOnline && !hackathonData.location)
      newErrors.location = "Location is required for offline events.";
    if (!hackathonData.timing) newErrors.timing = "Timing is required.";
    if (hackathonData.prizeMoney <= 0)
      newErrors.prizeMoney = "Prize money must be greater than 0.";
    if (hackathonData.teamSizeMax <= 0)
      newErrors.teamSizeMax = "Team size must be greater than 0.";
    if (!hackathonData.registerByDate)
      newErrors.registerByDate = "Registration deadline is required.";
    if (
      new Date(hackathonData.registerByDate) > new Date(hackathonData.startDate)
    )
      newErrors.registerByDate =
        "Registration deadline must be before the start date.";
    if (hackathonData.categories.length === 0)
      newErrors.categories = "At least one category is required.";
    if (!hackathonData.eligibilityCriteria)
      newErrors.eligibilityCriteria = "Eligibility criteria is required.";
    if (!hackathonData.registrationLink)
      newErrors.registrationLink = "Registration link is required.";
    else if (!/^https?:\/\/.+/.test(hackathonData.registrationLink))
      newErrors.registrationLink = "Invalid registration link format.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/hackathon/uploadHackathon`,
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
      toast.error("Failed to upload hackathon. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 text-white">
      <div className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        Upload Hackathon
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Hackathon Name
          </label>
          <input
            type="text"
            name="name"
            className={`w-full p-3 rounded-lg bg-gray-700 border ${
              errors.name ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={hackathonData.name}
            onChange={handleChange}
            placeholder="Enter Hackathon Name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            className={`w-full p-3 rounded-lg bg-gray-700 border ${
              errors.description ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={hackathonData.description}
            onChange={handleChange}
            placeholder="Provide a brief description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            className={`w-full p-3 rounded-lg bg-gray-700 border ${
              errors.startDate ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={hackathonData.startDate}
            onChange={handleChange}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium mb-2">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            className={`w-full p-3 rounded-lg bg-gray-700 border ${
              errors.endDate ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={hackathonData.endDate}
            onChange={handleChange}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="isOnline" className="text-sm font-medium">
            Is Online?
          </label>
          <input
            type="checkbox"
            name="isOnline"
            className="w-4 h-4"
            checked={hackathonData.isOnline}
            onChange={(e) =>
              setHackathonData({ ...hackathonData, isOnline: e.target.checked })
            }
          />
        </div>

        {!hackathonData.isOnline && (
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-2"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              className={`w-full p-3 rounded-lg bg-gray-700 border ${
                errors.location ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={hackathonData.location}
              onChange={handleChange}
              placeholder="Enter Event Location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="timing" className="block text-sm font-medium mb-2">
            Timing
          </label>
          <input
            type="text"
            name="timing"
            className={`w-full p-3 rounded-lg bg-gray-700 border ${
              errors.timing ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={hackathonData.timing}
            onChange={handleChange}
            placeholder="Enter Timing (e.g., 9 AM - 5 PM)"
          />
          {errors.timing && (
            <p className="text-red-500 text-sm">{errors.timing}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="prizeMoney"
            className="block text-sm font-medium mb-2"
          >
            Prize Money
          </label>
          <input
            type="number"
            name="prizeMoney"
            className={`w-full p-3 rounded-lg bg-gray-700 border ${
              errors.prizeMoney ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={hackathonData.prizeMoney}
            onChange={handleChange}
            placeholder="Enter Prize Money Amount"
          />
          {errors.prizeMoney && (
            <p className="text-red-500 text-sm">{errors.prizeMoney}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="teamSizeMax"
            className="block text-sm font-medium mb-2"
          >
            Max Team Size
          </label>
          <input
            type="number"
            name="teamSizeMax"
            className={`w-full p-3 rounded-lg bg-gray-700 border ${
              errors.teamSizeMax ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={hackathonData.teamSizeMax}
            onChange={handleChange}
            placeholder="Enter Max Team Size"
            min={1}
            max={10}
          />
          {errors.teamSizeMax && (
            <p className="text-red-500 text-sm">{errors.teamSizeMax}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="registerByDate"
            className="block text-sm font-medium mb-2"
          >
            Registration Deadline
          </label>
          <input
            type="date"
            name="registerByDate"
            className={`w-full p-3 rounded-lg bg-gray-700 border ${
              errors.registerByDate ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={hackathonData.registerByDate}
            onChange={handleChange}
          />
          {errors.registerByDate && (
            <p className="text-red-500 text-sm">{errors.registerByDate}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="categories"
            className="block text-sm font-medium mb-2"
          >
            Categories (Comma Separated)
          </label>
          <input
            type="text"
            name="categories"
            className={`w-full p-3 rounded-lg bg-gray-700 border ${
              errors.categories ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={hackathonData.categories.join(", ")}
            onChange={(e) =>
              setHackathonData({
                ...hackathonData,
                categories: e.target.value.split(",").map((c) => c.trim()),
              })
            }
            placeholder="Enter Categories (e.g., AI, ML, Web Development)"
          />
          {errors.categories && (
            <p className="text-red-500 text-sm">{errors.categories}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="eligibilityCriteria"
            className="block text-sm font-medium mb-2"
          >
            Eligibility Criteria
          </label>
          <textarea
            name="eligibilityCriteria"
            className={`w-full p-3 rounded-lg bg-gray-700 border ${
              errors.eligibilityCriteria ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={hackathonData.eligibilityCriteria}
            onChange={handleChange}
            placeholder="Enter Eligibility Criteria"
          />
          {errors.eligibilityCriteria && (
            <p className="text-red-500 text-sm">{errors.eligibilityCriteria}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="registrationLink"
            className="block text-sm font-medium mb-2"
          >
            Registration Link
          </label>
          <input
            type="url"
            name="registrationLink"
            className={`w-full p-3 rounded-lg bg-gray-700 border ${
              errors.registrationLink ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={hackathonData.registrationLink}
            onChange={handleChange}
            placeholder="Enter Registration Link (e.g., https://example.com)"
          />
          {errors.registrationLink && (
            <p className="text-red-500 text-sm">{errors.registrationLink}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
        >
          Upload Hackathon
        </button>
      </form>
    </div>
  );
};

export default HackathonUpload;
