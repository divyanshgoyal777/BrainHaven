import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
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

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/profile/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load user profile.");
        setLoading(false);
      });
  }, [id]);

  const generateInitials = (firstName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    return firstInitial;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="bg-gray-700 text-gray-300 p-6 rounded-lg shadow-lg max-w-md w-full text-center animate-pulse">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="bg-gray-700 text-gray-300 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="text-lg font-semibold">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white mt-24">
        <header className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 py-6 shadow-lg">
          <div className="container mx-auto flex items-center space-x-6 px-4">
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-600 shadow-lg hover:scale-110 transition duration-300"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center text-2xl font-bold bg-gray-600 text-white rounded-full border-4 border-gray-600 shadow-lg">
                {generateInitials(user.firstName)}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 animate-pulse">
                {`${user.firstName} ${user.lastName}`}
              </h1>
              <p className="text-sm text-white">{user.email}</p>
            </div>
          </div>
        </header>

        <main className="container mx-auto py-10 px-6">
          <section className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4">
              About
            </h2>
            <p className="text-gray-300">{user.bio || "No bio provided."}</p>
          </section>

          <section className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4">
              Personal Details
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

          <section className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4">
              Social Links
            </h2>
            {!user.socialLinks.instagram &&
            !user.socialLinks.linkedIn &&
            !user.socialLinks.github ? (
              <p className="text-gray-300">No social links provided</p>
            ) : (
              <div className="flex space-x-4 text-2xl">
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
                    className="text-black hover:text-white transition duration-300 transform hover:scale-110"
                  >
                    <FaGithubSquare />
                  </a>
                )}
              </div>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
