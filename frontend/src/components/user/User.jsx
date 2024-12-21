import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../App";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userEmail } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    bio: "",
    collegeName: "",
    degree: "",
    branch: "",
    semester: "",
    rollNumber: "",
    dateOfBirth: "",
    socialLinks: {
      linkedIn: "",
      github: "",
      instagram: "",
    },
  });

  const hiddenFields = ["password", "_id", "createdAt", "updatedAt", "__v"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userEmail) return;
        const response = await axios.get(
          "http://localhost:3000/api/user/profile",
          {
            headers: { userEmail },
          }
        );

        setUserData(response.data);

        const filteredData = Object.keys(response.data).reduce((acc, key) => {
          if (!hiddenFields.includes(key)) {
            acc[key] = response.data[key];
          }
          return acc;
        }, {});

        setFormData(filteredData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch user details. Please try again.");
        toast.error("Failed to fetch user details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("socialLinks.")) {
      const [_, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.firstName.trim()) errors.push("First name is required.");
    if (!formData.lastName.trim()) errors.push("Last name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.push("Invalid email format.");
    if (formData.phoneNumber && !/^\d{10,15}$/.test(formData.phoneNumber))
      errors.push("Phone number must be between 10 and 15 digits.");
   if (
     formData.dateOfBirth &&
     !/^\d{2}-\d{2}-\d{4}$/.test(formData.dateOfBirth)
   ) {
     errors.push("Date of birth must be in DD-MM-YYYY format.");
   }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/information",
        formData
      );

      toast.success("Save Changes Successful");
      setUserData((prevData) => ({
        ...prevData,
        ...formData,
        socialLinks: { ...prevData.socialLinks, ...formData.socialLinks },
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(`Error: ${errorMessage}`);
      setError("Failed to update user details. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="text-white text-center mt-10">
        <p>Loading user details...</p>
      </div>
    );
  }

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-center justify-center px-5 py-10">
      <div className="bg-[#100924] text-gray-400 rounded-xl p-5 w-full lg:w-1/3">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full border-white border-2 overflow-hidden">
            <img
              src={userData.profilePhoto || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <ImageUpload />
          <h1 className="text-2xl lg:text-3xl text-white font-semibold mt-4">
            {userData.firstName} {userData.lastName}
          </h1>
          <h2 className="mt-1">{userData.email}</h2>
          <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] my-4"></div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-white">Phone:</span>{" "}
              <span className="text-gray-400">{userData.phoneNumber}</span>
            </div>
            <div>
              <span className="text-white">DOB:</span>{" "}
              <span className="text-gray-400">{userData.dateOfBirth}</span>
            </div>
            <div>
              <span className="text-white">Address:</span>{" "}
              <span className="text-gray-400">{userData.address}</span>
            </div>
            <div>
              <span className="text-white">Bio:</span>{" "}
              <span className="text-gray-400">{userData.bio}</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] my-4"></div>

          <h3 className="text-lg font-semibold text-white">Education:</h3>
          <div className="text-sm space-y-1">
            <div>
              <span className="text-white">Degree:</span>{" "}
              <span className="text-gray-400">{userData.degree}</span>
            </div>
            <div>
              <span className="text-white">College:</span>{" "}
              <span className="text-gray-400">{userData.collegeName}</span>
            </div>
            <div>
              <span className="text-white">Semester:</span>{" "}
              <span className="text-gray-400">{userData.semester}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#100924] text-white rounded-xl p-5 w-full lg:w-2/3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Edit Here</h1>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => {
              if (key === "socialLinks") return null;
              return (
                <div key={key} className="space-y-1">
                  <label className="block text-sm">
                    {capitalizeFirstLetter(key.replace(/([A-Z])/g, " $1"))}
                  </label>
                  <input
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              );
            })}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Social Links</h3>
            {Object.keys(formData.socialLinks).map((key) => (
              <div key={key} className="space-y-1">
                <label className="block text-sm capitalize">{key}</label>
                <input
                  name={`socialLinks.${key}`}
                  value={formData.socialLinks[key]}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
