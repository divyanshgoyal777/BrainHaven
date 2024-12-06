import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const ResourcesDetail = () => {
  const { resourceId } = useParams();
  const [activeCategory, setActiveCategory] = useState("Notes"); // Default category
  const [data, setData] = useState(null); // State to store fetched data
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    // Fetch data from the public folder
    fetch("/resourcesData.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching resource data:", error));
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category); // Store the clicked category
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // Update search query
  };

  const filteredData = (resourceData) => {
    // Filter data based on search query
    if (!searchQuery) return resourceData;

    return Object.keys(resourceData).reduce((acc, semester) => {
      const filteredSemester = Object.keys(resourceData[semester]).reduce(
        (semesterAcc, subject) => {
          const filteredUnits = resourceData[semester][subject].Units.filter(
            (unit) => unit.toLowerCase().includes(searchQuery)
          );
          if (filteredUnits.length > 0) {
            semesterAcc[subject] = { Units: filteredUnits };
          }
          return semesterAcc;
        },
        {}
      );
      if (Object.keys(filteredSemester).length > 0) {
        acc[semester] = filteredSemester;
      }
      return acc;
    }, {});
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="mt-40 flex justify-center items-center flex-col my-28">
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg">
            {resourceId.split("|")[0].toUpperCase().replace("-", " ")}
          </h1>
          <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {resourceId.split("|")[1].toUpperCase()}
          </h2>
        </div>
        <div className="my-8">
          <nav>
            <ul className="flex text-white gap-10 font-semibold">
              {[
                "Books",
                "Notes",
                "Assignment",
                "Practical",
                "Papers",
                "Playlist",
              ].map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer ${
                    activeCategory === category
                      ? "text-purple-500 font-bold"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="my-9">
          <input
            type="text"
            placeholder="Search... "
            className="w-[70vw] py-3 px-2 rounded-md"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <nav className="text-white my-10">
          <ResourceDetailsCategory
            resourceId={resourceId}
            data={data}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
          />
        </nav>
      </div>
      <Footer />
    </div>
  );
};

const ResourceDetailsCategory = ({ resourceId, data, activeCategory }) => {
  const qualification = resourceId.split("|")[0];
  const resourceData = data[qualification]?.[activeCategory]; // Filter based on active category

  if (!resourceData) {
    return (
      <div className="text-white">No data available for {activeCategory}.</div>
    );
  }

  // Filter the data if necessary. If you want to apply any additional filtering logic, you can do it here
  const filteredData = resourceData; // Currently, it's just assigned as is, modify this if needed

  return (
    <div className="my-5">
      {Object.keys(filteredData).map((semester, index) => (
        <div key={index} className="my-5">
          <h3 className="text-2xl font-semibold text-white mb-4">{semester}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {Object.keys(filteredData[semester]).map((subject, idx) => (
              <div
                key={idx}
                className="px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-purple-600 hover:to-indigo-600 text-white text-left font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {/* Subject Title */}
                <strong className="block mb-4 text-lg text-purple-400">
                  {subject}
                </strong>
                {/* Unit Buttons */}
                <div className="flex flex-wrap gap-2">
                  {filteredData[semester][subject].Units.map(
                    (unit, unitIdx) => (
                      <button
                        key={unitIdx}
                        className="py-2 px-4 bg-indigo-600 hover:bg-purple-600 text-white text-sm rounded-md shadow-md transition-all duration-200"
                      >
                        {unit}
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourcesDetail;
