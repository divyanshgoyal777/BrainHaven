import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const ResourcesDetail = () => {
  const { resourceId } = useParams();
  const [activeCategory, setActiveCategory] = useState("Books"); // Default category
  const [data, setData] = useState(null); // State to store fetched data
<<<<<<< Updated upstream
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
=======
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
>>>>>>> Stashed changes

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
          const subjectData = resourceData[semester][subject];

          // Only include subjects where name contains the search query
          if (subject.toLowerCase().includes(searchQuery)) {
            semesterAcc[subject] = subjectData;
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Update the search term
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
            <ul className="flex text-white gap-10 font-semibold overflow-x-scroll sm:overflow-hidden m-auto w-[60%] sm:w-fit">
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
            placeholder="Search by subject, semester, unit, etc."
            value={searchTerm}
            onChange={handleSearchChange}
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
<<<<<<< Updated upstream
            searchQuery={searchQuery}
=======
            searchTerm={searchTerm} // Pass the search term to filter resources
>>>>>>> Stashed changes
          />
        </nav>
      </div>
      <Footer />
    </div>
  );
};

<<<<<<< Updated upstream
const ResourceDetailsCategory = ({ resourceId, data, activeCategory, searchQuery }) => {
=======
const ResourceDetailsCategory = ({ resourceId, data, activeCategory, searchTerm }) => {
>>>>>>> Stashed changes
  const qualification = resourceId.split("|")[0];
  const resourceData = data[qualification]?.[activeCategory]; // Filter based on active category

  if (!resourceData) {
    return (
      <div className="text-white">No data available for {activeCategory}.</div>
    );
  }

<<<<<<< Updated upstream
  const filteredData = (resourceData) => {
    // Filter data based on search query
    if (!searchQuery) return resourceData;

    return Object.keys(resourceData).reduce((acc, semester) => {
      const filteredSemester = Object.keys(resourceData[semester]).reduce(
        (semesterAcc, subject) => {
          const subjectData = resourceData[semester][subject];

          // Only include subjects where name contains the search query
          if (subject.toLowerCase().includes(searchQuery)) {
            semesterAcc[subject] = subjectData;
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
  
  // Filter the data if necessary
  const filteredCategoryData = filteredData(resourceData);

  return (
    <div className="my-5">
      {Object.keys(filteredCategoryData).map((semester, index) => (
        <div key={index} className="my-5">
          <h3 className="text-2xl font-semibold text-white mb-4">{semester}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {Object.keys(filteredCategoryData[semester]).map((subject, idx) => (
              <Link key={subject} to={`/resources/${resourceId}/${activeCategory}/${semester}/${subject}`} >
=======
  // Filter the data based on search term (search across subjects, semesters, and units)
  const filteredData = Object.keys(resourceData).reduce((acc, semester) => {
    const filteredSemester = Object.keys(resourceData[semester]).reduce((semesterAcc, subject) => {
      const filteredUnits = resourceData[semester][subject].Units.filter((unit) =>
        unit.toLowerCase().includes(searchTerm)
      );
      const subjectMatchesSearch = subject.toLowerCase().includes(searchTerm);
      const semesterMatchesSearch = semester.toLowerCase().includes(searchTerm);

      // Include the semester if it matches the search term or if any subject/unit matches
      if (
        semesterMatchesSearch ||
        subjectMatchesSearch ||
        filteredUnits.length > 0
      ) {
        semesterAcc[subject] = {
          Units: filteredUnits,
        };
      }

      return semesterAcc;
    }, {});

    // Include the semester if it has any filtered subjects
    if (Object.keys(filteredSemester).length > 0) {
      acc[semester] = filteredSemester;
    }

    return acc;
  }, {});

  if (Object.keys(filteredData).length === 0) {
    return <div className="text-white">No results found for "{searchTerm}".</div>;
  }

  return (
    <div className="my-5">
      {Object.keys(filteredData).map((semester, index) => (
        <div key={index} className="my-5">
          <h3 className="text-2xl font-semibold text-white mb-4">{semester}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {Object.keys(filteredData[semester]).map((subject, idx) => (
>>>>>>> Stashed changes
              <div
                key={idx}
                className="px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-purple-600 hover:to-indigo-600 text-white text-left font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
<<<<<<< Updated upstream
                 
                <strong className="block mb-4 text-lg text-purple-400">
               
                  {subject}
  
                </strong>
               
                {/* Removed Unit Buttons */}
=======
                {/* Subject Title */}
                <strong className="block mb-4 text-lg text-purple-400">{subject}</strong>
                {/* Unit Buttons */}
                <div className="flex flex-wrap gap-2">
                  {filteredData[semester][subject].Units.map((unit, unitIdx) => (
                    <button
                      key={unitIdx}
                      className="py-2 px-4 bg-indigo-600 hover:bg-purple-600 text-white text-sm rounded-md shadow-md transition-all duration-200"
                    >
                      {unit}
                    </button>
                  ))}
                </div>
>>>>>>> Stashed changes
              </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourcesDetail;
