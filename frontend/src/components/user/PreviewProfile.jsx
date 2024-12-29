import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPhoneAlt,
  FaCalendarAlt,
  FaLinkedin,
  FaGithubSquare,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaUniversity,
  FaBookOpen,
  FaInstagram,
} from "react-icons/fa";

const PreviewProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/profile/${userId}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load user profile.");
        setLoading(false);
      });
  }, [userId]);

  const generateInitials = (firstName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    return firstInitial;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-900 to-blue-900">
        <div className="bg-gray-800 text-gray-300 p-6 rounded-lg shadow-lg max-w-md w-full text-center animate-pulse">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-900 to-blue-900">
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-900 to-blue-900">
        <div className="bg-gray-800 text-gray-300 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="text-lg font-semibold">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white mt-14 rounded-lg">
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-8 shadow-lg">
        <div className="container mx-auto flex items-center space-x-6 px-4">
          {user.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-lg hover:scale-110 hover:shadow-2xl transition-transform duration-300"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center text-2xl font-bold bg-gray-700 text-white rounded-full border-4 border-gray-300 shadow-lg">
              {generateInitials(user.firstName)}
            </div>
          )}
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 animate-text">
              {`${user.firstName} ${user.lastName}`}
            </h1>
            <p className="text-lg text-gray-200 mt-2">
              <span className="text-pink-300 font-medium">{user.email}</span>
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-10 px-6">
        <section className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4 text-purple-400 relative">
            About
            <span className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse"></span>
          </h2>
          <p className="text-gray-300 italic">
            {user.bio || "No bio provided."}
          </p>
        </section>

        <section className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4 text-purple-400 relative">
            Personal Details
            <span className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div className="space-y-2">
              <div className="flex items-center">
                <FaPhoneAlt className="text-blue-400 mr-2" />
                <span>Phone: {user.phoneNumber || "Not provided"}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-red-400 mr-2" />
                <span>Address: {user.address || "Not provided"}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-yellow-400 mr-2" />
                <span>DOB: {user.dateOfBirth || "Not provided"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaUniversity className="text-purple-400 mr-2" />
                <span>College: {user.collegeName || "Not provided"}</span>
              </div>
              <div className="flex items-center">
                <FaGraduationCap className="text-green-400 mr-2" />
                <span>Degree: {user.degree || "Not provided"}</span>
              </div>
              <div className="flex items-center">
                <FaBookOpen className="text-blue-400 mr-2" />
                <span>Branch: {user.branch || "Not provided"}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-yellow-400 mr-2" />
                <span>Semester: {user.semester || "Not provided"}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4 text-purple-400 relative">
            Social Links
            <span className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse"></span>
          </h2>
          {!user.socialLinks.instagram &&
          !user.socialLinks.linkedIn &&
          !user.socialLinks.github ? (
            <p className="text-gray-300 italic">No social links provided</p>
          ) : (
            <div className="flex space-x-6 text-3xl">
              {user.socialLinks.instagram && (
                <a
                  href={user.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-white transition duration-300 transform hover:scale-110"
                >
                  <FaInstagram />
                </a>
              )}
              {user.socialLinks.linkedIn && (
                <a
                  href={user.socialLinks.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-white transition duration-300 transform hover:scale-110"
                >
                  <FaLinkedin />
                </a>
              )}
              {user.socialLinks.github && (
                <a
                  href={user.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-white transition duration-300 transform hover:scale-110"
                >
                  <FaGithubSquare />
                </a>
              )}
            </div>
          )}
        </section>

        <section className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4 text-purple-400 relative">
            Achievements
            <span className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse"></span>
          </h2>
          <ul
            className={`list-disc space-y-2 text-gray-300 ${
              user.achievements && user.achievements.length > 0 ? "pl-5" : ""
            }`}
          >
            {user.achievements && user.achievements.length > 0 ? (
              user.achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="hover:text-purple-300 transition-all duration-200 ease-in-out"
                >
                  {achievement}
                </li>
              ))
            ) : (
              <p className="text-gray-400 italic">No achievements provided</p>
            )}
          </ul>
        </section>

        <section className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4 text-purple-400 relative">
            Experience
            <span className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse"></span>
          </h2>
          <ul className="space-y-4 text-gray-300">
            {user.experience && user.experience.length > 0 ? (
              user.experience.map((exp, index) => (
                <li
                  key={index}
                  className="bg-gray-900 p-4 rounded-lg transition-all duration-300 hover:bg-gray-800 shadow-md hover:shadow-lg"
                >
                  <h4 className="text-white font-semibold text-lg">
                    {exp.companyName}
                  </h4>
                  <p className="text-gray-400">{exp.role}</p>
                  <p className="text-gray-400">{exp.duration}</p>
                  <p className="text-gray-300 mt-2">{exp.description}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-400 italic">No experience provided</p>
            )}
          </ul>
        </section>

        <section className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4 text-purple-400 relative">
            Projects
            <span className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse"></span>
          </h2>
          <ul className="space-y-4 text-gray-300">
            {user.projects && user.projects.length > 0 ? (
              user.projects.map((project, index) => (
                <li
                  key={index}
                  className="bg-gray-900 p-4 rounded-lg transition-all duration-300 hover:bg-gray-800 shadow-md hover:shadow-lg"
                >
                  <h4 className="text-white font-semibold text-lg">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 mt-1">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500 hover:underline transition-all duration-200"
                  >
                    {project.link}
                  </a>
                </li>
              ))
            ) : (
              <p className="text-gray-400 italic">No projects provided</p>
            )}
          </ul>
        </section>

        <section className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4 text-purple-400 relative">
            Skills
            <span className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse"></span>
          </h2>
          <div className="flex flex-wrap gap-2 text-gray-300">
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-sm rounded-full text-white shadow-md hover:scale-105 transform transition-all duration-200"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-400 italic">No skills provided</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PreviewProfile;
