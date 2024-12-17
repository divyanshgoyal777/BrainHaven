import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser, FaKey } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from 'axios'

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignup = async(e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create a payload object
      const userData = {
        firstName,
        lastName,
        email,
        password
      };

      // Send POST request to the backend
      const response = await axios.post("http://localhost:5000/signup", userData);

      // Handle the response from the backend
      toast.success(response.data.message); // Show success toast message
      setLoading(false); // Stop loading state
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Backend error response
        toast.error(error.response.data.message);
      } else {
        // Frontend error (network, CORS, etc.)
        toast.error("An error occurred while signing up.");
      }
    }
  };

  useEffect(() => {
    document.title = "BrainWave - Sign Up";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 p-2">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-2xl border-2 border-transparent bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create New Account
        </h2>
        <form onSubmit={handleSignup}>
          <div className="mb-6 flex gap-4">
            <div className="relative w-1/2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-300"
              >
                First Name
              </label>
              <span className="absolute left-3 top-9 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full pl-10 px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="relative w-1/2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-300"
              >
                Last Name
              </label>
              <span className="absolute left-3 top-9 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full pl-10 px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="relative mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <span className="absolute left-3 top-9 text-gray-400">
              <FaEnvelope />
            </span>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full pl-10 px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="relative mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <span className="absolute left-3 top-9 text-gray-400">
              <FaKey />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full pl-10 px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 top-6 flex items-center text-lg cursor-pointer text-gray-400 hover:text-gray-200 transition-transform duration-200 transform hover:scale-110"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-500 font-semibold"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
