import { React, useState, useCallback } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const resources = [
    "Diploma",
    "B-Tech",
    "Web Developing",
    "Software Developing",
  ];

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredResources = resources.filter((resource) =>
    resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="mt-32 px-8">
        <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-4xl md:text-5xl font-bold text-center sm:text-4xl">
          Resources
        </h1>
        <div className="my-8 w-full flex flex-col items-center">
          <div className="w-full">
            <input
              type="text"
              className="w-full p-4 border rounded-md text-black"
              placeholder="Search resources..."
              onChange={handleSearch}
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 my-14 gap-10">
            {loading ? (
              <div className="col-span-full flex items-center justify-center text-gray-500 text-xl">
                Loading resources...
              </div>
            ) : filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <button
                  key={index}
                  className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out"
                  aria-label={`Resource: ${resource}`}
                >
                  {resource}
                </button>
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center text-gray-500 text-xl">
                No resource found.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;