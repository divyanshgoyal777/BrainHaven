import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";
import { useAuth } from "../../App";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import {
  FaPhoneAlt,
  FaCalendarAlt,
  FaLinkedin,
  FaGithubSquare,
} from "react-icons/fa";
import { FaLocationDot, FaSquareInstagram } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaGraduationCap, FaBookOpen, FaUniversity } from "react-icons/fa";

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
    skills: [],
    achievements: [],
    experience: [],
    projects: [],
  });

  const hiddenFields = [
    "password",
    "profilePhoto",
    "_id",
    "createdAt",
    "updatedAt",
    "__v",
  ];

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

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleExperienceChange = (e, index, field) => {
    const { value } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      experience: updatedExperience,
    }));
  };

  const handleProjectChange = (e, index, field) => {
    const { value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { companyName: "", role: "", duration: "", description: "" },
      ],
    }));
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      experience: updatedExperience,
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", link: "" }],
    }));
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));
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
    const token = localStorage.getItem("token");

    const incompleteProjects = formData.projects.some(
      (project) =>
        !project.title.trim() ||
        !project.description.trim() ||
        !project.link.trim()
    );

    const incompleteExperience = formData.experience.some(
      (exp) =>
        !exp.companyName.trim() ||
        !exp.role.trim() ||
        !exp.duration.trim() ||
        !exp.description.trim()
    );

    if (incompleteProjects) {
      toast.error(
        "Please fill in all project details or remove incomplete projects."
      );
      return;
    }

    if (incompleteExperience) {
      toast.error(
        "Please fill in all experience details or remove incomplete experience."
      );
      return;
    }

    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/userInformation`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-b-4 border-white w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <>
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

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-sm space-y-4 md:text-base md:space-y-6 max-w-md mx-auto">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-purple-400 text-lg" />
                <span className="text-white font-semibold">Phone:</span>{" "}
                <span className="text-gray-400">
                  {userData.phoneNumber || "Not provided"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-yellow-400 text-lg" />
                <span className="text-white font-semibold">DOB:</span>{" "}
                <span className="text-gray-400">
                  {userData.dateOfBirth || "Not provided"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaLocationDot className="text-green-400 text-lg" />
                <span className="text-white font-semibold">Address:</span>{" "}
                <span className="text-gray-400">
                  {userData.address || "Not provided"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BiSolidUserDetail className="text-blue-400 text-xl" />
                <span className="text-white font-semibold">Bio:</span>{" "}
                <span className="text-gray-400">
                  {userData.bio || "Not provided"}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] my-4"></div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-sm space-y-4 md:text-base md:space-y-6 max-w-md mx-auto">
              <h3 className="text-lg text-center font-semibold text-white md:text-xl">
                Education
              </h3>
              <div className="flex space-x-3 items-center">
                <FaGraduationCap className="text-green-500 text-lg" />
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">Degree:</span>
                  <span className="text-gray-400">
                    {userData.degree || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3 items-center">
                <FaBookOpen className="text-blue-500 text-lg" />
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">Branch:</span>
                  <span className="text-gray-400">
                    {userData.branch || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3 items-center">
                <FaUniversity className="text-purple-500 text-xl" />
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">College:</span>
                  <span className="text-gray-400">
                    {userData.collegeName || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3 items-center">
                <FaCalendarAlt className="text-yellow-500 text-lg" />
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">Semester:</span>
                  <span className="text-gray-400">
                    {userData.semester || "Not provided"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] my-4"></div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-sm space-y-4 md:text-base md:space-y-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-white text-center md:text-xl">
                Social Links
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center">
                  <FaSquareInstagram className="text-pink-500 mr-3 text-lg md:text-xl" />
                  {userData.socialLinks.instagram ? (
                    <a
                      href={userData.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition break-all"
                    >
                      {userData.socialLinks.instagram}
                    </a>
                  ) : (
                    <span className="text-gray-400">Not provided</span>
                  )}
                </div>

                <div className="flex items-center">
                  <FaLinkedin className="text-blue-600 mr-3 text-lg md:text-xl" />
                  {userData.socialLinks.linkedIn ? (
                    <a
                      href={userData.socialLinks.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition break-all"
                    >
                      {userData.socialLinks.linkedIn}
                    </a>
                  ) : (
                    <span className="text-gray-400">Not provided</span>
                  )}
                </div>

                <div className="flex items-center">
                  <FaGithubSquare className="text-black mr-3 text-lg md:text-xl" />
                  {userData.socialLinks.github ? (
                    <a
                      href={userData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition break-all"
                    >
                      {userData.socialLinks.github}
                    </a>
                  ) : (
                    <span className="text-gray-400">Not provided</span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] my-4"></div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-sm space-y-4 md:text-base md:space-y-6 max-w-md mx-auto">
              <h3 className="text-lg text-center font-semibold text-white md:text-xl">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2 text-gray-300">
                {userData.skills && userData.skills.length > 0
                  ? userData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-500 text-sm rounded-full text-white"
                      >
                        {skill}
                      </span>
                    ))
                  : "No skills provided"}
              </div>
            </div>

            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] my-4"></div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-sm space-y-4 md:text-base md:space-y-6 w-full mx-auto">
              <h3 className="text-lg text-center font-semibold text-white md:text-xl">
                Achievements
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300 w-full">
                {userData.achievements && userData.achievements.length > 0
                  ? userData.achievements.map((achievement, index) => (
                      <li key={index} className="break-words">
                        {achievement}
                      </li>
                    ))
                  : "No achievements provided"}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] my-4"></div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-sm space-y-4 md:text-base md:space-y-6 max-w-md mx-auto">
              <h3 className="text-lg text-center font-semibold text-white md:text-xl">
                Experience
              </h3>
              <ul className="space-y-4 text-gray-300">
                {userData.experience && userData.experience.length > 0
                  ? userData.experience.map((exp, index) => (
                      <li key={index} className="bg-gray-900 p-3 rounded-lg">
                        <h4 className="text-white font-semibold">
                          {exp.companyName}
                        </h4>
                        <p className="text-gray-400">{exp.role}</p>
                        <p className="text-gray-400">{exp.duration}</p>
                        <p className="text-gray-300">{exp.description}</p>
                      </li>
                    ))
                  : "No experience provided"}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-transparent via-white to-transparent w-full h-[1px] my-4"></div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-sm space-y-4 md:text-base md:space-y-6 max-w-md mx-auto">
              <h3 className="text-lg text-center font-semibold text-white md:text-xl">
                Projects
              </h3>
              <ul className="space-y-4 text-gray-300">
                {userData.projects && userData.projects.length > 0
                  ? userData.projects.map((project, index) => (
                      <li key={index} className="bg-gray-900 p-3 rounded-lg">
                        <h4 className="text-white font-semibold">
                          {project.title}
                        </h4>
                        <p className="text-gray-400">{project.description}</p>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {project.link}
                        </a>
                      </li>
                    ))
                  : "No projects provided"}
              </ul>
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
                if (
                  key === "socialLinks" ||
                  key === "skills" ||
                  key === "achievements" ||
                  key === "experience" ||
                  key === "projects"
                )
                  return null;
                return (
                  <div key={key} className="space-y-1">
                    <label className="block text-sm">
                      {capitalizeFirstLetter(key.replace(/([A-Z])/g, " $1"))}
                    </label>
                    <input
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Skills</label>
              <input
                type="text"
                value={formData.skills.join(", ")}
                onChange={(e) => handleArrayChange(e, "skills")}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter skills separated by commas"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Achievements</label>
              <input
                type="text"
                value={formData.achievements.join(", ")}
                onChange={(e) => handleArrayChange(e, "achievements")}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter achievements separated by commas"
              />
            </div>

            <div className="space-y-4">
              {formData.experience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-bold">Experience #{index + 1}</h3>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={exp.companyName}
                    onChange={(e) =>
                      handleExperienceChange(e, index, "companyName")
                    }
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(e, index, "role")}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) =>
                      handleExperienceChange(e, index, "duration")
                    }
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) =>
                      handleExperienceChange(e, index, "description")
                    }
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove Experience
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addExperience}
                className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {formData.projects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-bold">Project #{index + 1}</h3>
                  <input
                    type="text"
                    placeholder="Title"
                    value={project.title}
                    onChange={(e) => handleProjectChange(e, index, "title")}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <textarea
                    placeholder="Description"
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(e, index, "description")
                    }
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={project.link}
                    onChange={(e) => handleProjectChange(e, index, "link")}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove Project
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addProject}
                className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Project
              </button>
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
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder={`Enter Your ${capitalizeFirstLetter(
                      key
                    )} link`}
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default User;
