import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const Code = () => {
  const [categories, setCategories] = useState({});
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCategories, setIsFetchingCategories] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsFetchingCategories(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in to perform this action!");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/code/categories`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error(
          error.response?.data.message || "Failed to fetch categories."
        );
      } finally {
        setIsFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleFetchCode = async () => {
    if (!primaryCategory || !subCategory) {
      toast.error("Please select both Primary Category and Subcategory.");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to perform this action!");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/code/codeSearch`,
        {
          params: { primaryCategory, subCategory },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate(`/codes/${primaryCategory}/${subCategory}`, {
        state: { codeData: response.data },
      });
    } catch (error) {
      console.error("Error fetching code:", error);
      toast.error(
        error.response?.data.message || "Failed to fetch code snippets."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-32 px-8">
        <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
          Fetch Code Snippets
        </h2>

        {isFetchingCategories ? (
          <p className="text-center text-lg text-gray-400">
            Loading categories...
          </p>
        ) : (
          <form className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 text-white">
            <div>
              <label className="block text-sm font-medium mb-2">
                Primary Category
              </label>
              <select
                value={primaryCategory}
                onChange={(e) => {
                  setPrimaryCategory(e.target.value);
                  setSubCategory("");
                }}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Primary Category</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Subcategory
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                disabled={!primaryCategory}
                required
              >
                <option value="">Select Subcategory</option>
                {(categories[primaryCategory] || []).map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleFetchCode}
                className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg rounded-lg ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Loading..." : "Fetch Code"}
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Code;
