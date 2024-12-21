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
  const [personal, setPersonal] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Personal Information");

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

  const hiddenFields = [
    "password",
    "_id",
    "profilePhoto",
    "createdAt",
    "updatedAt",
    "__v",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userEmail) return;

        console.log("Fetching user details with email:", userEmail);
        const response = await axios.get("http://localhost:3000/api/user/profile", {
          headers: { userEmail },
        });

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
        console.error("Error fetching user details:", err);
        setError("Failed to fetch user details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  const handleTabChange = (category) => {
    setActiveCategory(category);
    setPersonal(category === "Personal Information");
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/information",
        formData
      );
      console.log("User details updated:", response.data);
      toast.success("Save Changes Successfull");

      // Update the userData state immediately with the new formData
      setUserData((prevData) => ({
        ...prevData,
        ...formData,
        socialLinks: { ...prevData.socialLinks, ...formData.socialLinks }
      }));
    } catch (error) {
      console.error("Error updating user details:", error);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(`Error: ${errorMessage}`);

      setError("Failed to update user details. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="text-white text-center">
        <p>Loading user details...</p>
      </div>
    );
  }

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center my-10">
        <div className="h-[90vh] md:h-[75vh] lg:h-[140vh] bg-[#100924] w-[90vw] md:w-[32vw] text-gray-400 rounded-xl flex flex-col items-center justify-center px-8">
          <div className="w-28 h-28 rounded-full border-white border-2">
            <ImageUpload/>
          </div>
          <div className="flex flex-col items-center my-5">
            <h1 className=" text-2xl lg:text-3xl text-white font-semibold">
              {userData.firstName} {userData.lastName}
            </h1>
            <h2>{userData.email}</h2>
            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full my-3 m-auto h-[1px]"></div>
            <div className="flex flex-col w-full justify-start my-3 gap-1">
              <div className=" w-full flex justify-between ">
                <div className="text-white">Phone: <span className="text-gray-400">{userData.phoneNumber}</span></div>
                <div className="text-white">DOB: <span className="text-gray-400">{userData.dateOfBirth}</span></div>
              </div>
              <div className=" w-full flex flex-col justify-start gap-1 my-3">
                <div className="text-white w-full flex justify-start gap-1">
                  <div className="min-w-[75px]">Address:</div>
                  <div
                    className="text-gray-400 break-words overflow-hidden text-ellipsis max-h-20 w-full"
                    style={{ wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}
                  >
                    {userData.address}
                  </div>
                </div>
                <div className="text-white w-full flex justify-start gap-1">
                  <div className="min-w-[75px]">Bio:</div>
                  <div
                    className="text-gray-400 break-words overflow-hidden text-ellipsis max-h-20 w-full"
                    style={{ wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}
                  >
                    {userData.bio}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <h1 className="text-white text-lg font-semibold">Education :</h1>
              <div className=" flex flex-col justify-start gap-1 w-full my-1">
                <div className="text-white">Degree: <span className="text-gray-400">{userData.degree}</span></div>
                <div className="text-white flex justify-center gap-1"><div className="min-w-[130px]">College Name:</div> <div className="text-gray-400">{userData.collegeName}</div></div>
                <div className="text-white">Semester: <span className="text-gray-400">{userData.semester}</span></div>
                <div className="text-white">Branch: <span className="text-gray-400">{userData.branch}</span></div>
                <div className="text-white">Roll no: <span className="text-gray-400">{userData.rollNumber}</span></div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full my-6 m-auto h-[1px]"></div>
            <div className="flex flex-col justify-start space-y-2">
              <div className="text-white flex justify-start items-start">
                <div className="min-w-[100px]">LinkedIn:</div>
                <div
                  className="text-gray-400 break-words overflow-hidden text-ellipsis max-h-20 w-full"
                  style={{ wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}
                >
                  {userData.socialLinks.linkedIn}
                </div>
              </div>
              <div className="text-white flex justify-start items-start">
                <div className="min-w-[100px]">GitHub:</div>
                <div
                  className="text-gray-400 break-words overflow-hidden text-ellipsis max-h-20 w-full"
                  style={{ wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}
                >
                  {userData.socialLinks.github}
                </div>
              </div>
              <div className="text-white flex justify-start items-start">
                <div className="min-w-[100px]">Instagram:</div>
                <div
                  className="text-gray-400 break-words overflow-hidden text-ellipsis max-h-20 w-full"
                  style={{ wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}
                >
                  {userData.socialLinks.instagram}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[148vh] md:h-[75vh] lg:h-[140vh] bg-[#100924] w-[90vw] md:w-[60vw] text-white rounded-xl px-5 md:px-10">
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="p-4 space-y-4 ">
              <div className="flex justify-between w-full mt-5">
                <h1 className="text-3xl font-bold py-1">Edit Here</h1>
                <button
                  type="submit"
                  className="px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center font-medium rounded-lg shadow-md hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                {Object.keys(formData).map((key) => {
                  if(key === "socialLinks") {
                    return null;
                  }
                  return (
                    <div key={key} className="space-y-1">
                      <label className="block">
                        {capitalizeFirstLetter(key.replace(/([A-Z])/g, " $1"))}
                      </label>
                      <input
                        name={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                        className="border rounded-lg p-2 text-white bg-gray-800 border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white w-full"
                        style={{ userSelect: "text" }}
                        type="text"
                      />
                    </div>
                  );
                })}
              </div>
              {Object.keys(formData).map((key) => {
                if (key === "socialLinks") {
                  return (
                    <div key={key} className="space-y-3">
                      <h3 className="text-lg font-semibold">Social Links</h3>
                      {Object.keys(formData.socialLinks).map((platform) => (
                        <div
                          key={platform}
                          className="flex items-center flex-col md:flex-row md:space-x-[-30px]"
                        >
                          <label className="w-1/4 capitalize">{platform}</label>
                          <input
                            name={`socialLinks.${platform}`}
                            value={formData.socialLinks[platform]}
                            onChange={handleInputChange}
                            className="text-white rounded-lg bg-[#100924] border-2  w-full py-2 px-4 focus:outline-none focus:ring-2 "
                          />
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              })}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
