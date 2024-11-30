import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function PageNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="text-center p-8">
        <h1 className="text-9xl font-extrabold text-gray-600 mb-4 animate-pulse">
          404
        </h1>
        <p className="text-2xl font-semibold mb-6 text-gray-300">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-400 mb-6">
          It seems you've wandered off into uncharted territory.
        </p>
        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          <FaHome />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
