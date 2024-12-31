import React, { useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import toast from "react-hot-toast";
import CodeViewer from "./CodeViewer";

const Code = () => {
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [codes, setCodes] = useState([]);

  // Categories also fetched from backend like resources

  const categories = {
    "Web Development": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
    ],
    "Data Structures and Algorithms (DSA)": [
      "Arrays",
      "Stacks",
      "Graphs",
      "Sorting Algorithms",
      "Dynamic Programming",
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!primaryCategory) return toast.error("Select a primary category");
    if (!subCategory) return toast.error("Select a subcategory");

    setIsLoading(true);
  };

  return (
    <>
      <Navbar />
      <div className="mt-32 px-8">
        <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
          Fetch Code Snippets
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 text-white"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Primary Category
            </label>
            <select
              value={primaryCategory}
              onChange={(e) => setPrimaryCategory(e.target.value)}
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
              {primaryCategory &&
                categories[primaryCategory].map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg rounded-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Fetching..." : "Fetch Code"}
            </button>
          </div>
        </form>

        <div className="mt-10">
          {isLoading ? (
            <p className="text-center text-lg text-gray-400">Loading...</p>
          ) : codes.length === 0 ? (
            <p className="text-center text-lg text-gray-400">
              No code snippets found
            </p>
          ) : (
            <CodeViewer />
            // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            //   {codes.map((codeItem, index) => (
            //     <div
            //       key={index}
            //       className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-4"
            //     >
            //       <h3 className="text-lg font-bold text-blue-400">
            //         {codeItem.primaryCategory}
            //       </h3>
            //       <p className="text-sm text-gray-400">
            //         {codeItem.subCategory}
            //       </p>
            //       <img
            //         src={codeItem.codeImageUrl}
            //         alt="Code"
            //         className="w-full h-40 object-cover rounded-lg"
            //       />
            //       <pre className="bg-gray-700 p-3 rounded-lg overflow-x-auto text-sm">
            //         {codeItem.code}
            //       </pre>
            //       <p className="text-sm text-gray-300">
            //         {codeItem.description}
            //       </p>
            //     </div>
            //   ))}
            // </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Code;
