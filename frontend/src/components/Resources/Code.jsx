import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Code = () => {
  const [categories, setCategories] = useState({});
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCategories, setIsFetchingCategories] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "BrainHaven - Code";
  }, []);

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
          `${import.meta.env.VITE_API_BASE_URL}/api/code/codeCategories`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
    if (!primaryCategory || !subCategory || !topic) {
      toast.error("Please select all the categories.");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to perform this action!");
        return;
      }

      const encodedPrimaryCategory = encodeURIComponent(primaryCategory);
      const encodedSubCategory = encodeURIComponent(subCategory);
      const encodedTopic = encodeURIComponent(topic);

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/code/codeSearch`,
        {
          params: {
            primaryCategory: encodedPrimaryCategory,
            subCategory: encodedSubCategory,
            topic: encodedTopic,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate(
        `/codes/${encodedPrimaryCategory}/${encodedSubCategory}/${encodedTopic}`,
        {
          state: { codeData: response.data },
        }
      );
    } catch (error) {
      console.error("Error fetching code:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch code snippets."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mt-32 px-8">
        <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
          Code
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

                {/* Ensure subCategories exist for the selected primaryCategory */}
                {categories[primaryCategory]?.subCategories?.map(
                  (subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                disabled={!subCategory}
              >
                <option value="">Select Topic</option>

                {/* Show topics only for the selected subCategory */}
                {categories[primaryCategory]?.subCategoryMap[subCategory]?.map(
                  (topic, index) => (
                    <option key={index} value={topic}>
                      {topic}
                    </option>
                  )
                )}

                {/* Show a fallback option if no topics are available */}
                {categories[primaryCategory]?.subCategoryMap[subCategory]
                  ?.length === 0 && (
                  <option disabled>No topics available</option>
                )}
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
    </>
  );
};

export default Code;
