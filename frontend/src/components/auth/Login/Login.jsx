import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaKey } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../App";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

   
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      const { success, token } = response.data;
      if (success) {
        login(token, email);  
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    document.title = "BrainWave - Log In";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 p-2">
      <div className="max-w-md w-full bg-gray-700 p-8 rounded-lg shadow-2xl border-2 border-transparent bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="relative mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <div className="flex items-center">
              <span className="absolute left-3 top-9 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full pl-10 px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="relative mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="flex items-center">
              <span className="absolute left-3 top-9 text-gray-400">
                <FaKey />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
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
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-500 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
