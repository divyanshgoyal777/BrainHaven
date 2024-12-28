import React, { useState, useEffect, createContext, useContext } from "react";
import toast from "react-hot-toast";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import axios from "axios";

export const GlobalOptionsContext = createContext();

const Resources = () => {
  useEffect(() => {
    document.title = "BrainWave - Resource";
  }, []);

  const [selectedOptions, setSelectedOptions] = useState({
    degree: "",
    branch: "",
    semester: "",
    subject: "",
    type: "",
  });

  const [dropdownData, setDropdownData] = useState({
    degrees: [],
    branches: {},
    semesters: {},
    subjects: {},
    types: [],
  });

  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfPages, setPdfPages] = useState(0);
  const [pdfShow, setPdfShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/resource/options")
      .then((response) => {
        console.log(response.data);
        setDropdownData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dropdown options:", error);
        toast.error("Failed to load options.");
        setLoading(false);
      });
  }, []);

  const handleSubmit = () => {
    const { degree, branch, semester, subject, type } = selectedOptions;
    if (!degree || !branch || !semester || !subject || !type) {
      toast.error("Please fill in all the options.");
      return;
    }

    axios
      .get("http://localhost:3000/api/resource/search", {
        params: selectedOptions,
      })
      .then((response) => {
        const cloudinaryUrl = response.data[0]?.cloudinary_url;
        const pages = response.data[0]?.pages;

        if (!cloudinaryUrl || !pages) {
          toast.error("No valid PDF or pages information found.");
          return;
        }

        const modifiedUrls = [];
        for (let i = 1; i <= pages; i++) {
          const modifiedUrl = cloudinaryUrl.replace(
            "/upload",
            `/upload/f_auto/pg_${i}`
          );
          modifiedUrls.push(modifiedUrl);
        }
        setPdfUrl(modifiedUrls);
        setPdfPages(pages);
        setPdfShow(true);
      })
      .catch((error) => {
        console.error("Error submitting search:", error);
        toast.error("Failed to fetch resources.");
      });
  };

  return (
    <GlobalOptionsContext.Provider
      value={{ selectedOptions, setSelectedOptions, dropdownData }}
    >
      <div className="text-white">
        <Navbar />
        <div className="mt-32 px-8">
          {pdfShow ? (
            pdfUrl && pdfUrl.length > 0 ? (
              <div className="pdf-container mt-10 px-1">
                <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
                  Resource PDF
                </h2>
                <div
                  className="pdf-pages-container overflow-y-auto"
                  style={{ maxHeight: "100vh" }}
                >
                  {pdfUrl.map((url, index) => (
                    <div key={index} className="pdf-page-wrapper">
                      <iframe
                        src={url}
                        width="100%"
                        height="60vh"
                        frameBorder="0"
                        title={`Resource PDF - Page ${index + 1}`}
                        style={{ marginBottom: "20px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-center mt-4">
                No PDF available to display.
              </p>
            )
          ) : (
            <div>
              <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg">
                Resources
              </h1>
              <div className="flex flex-col bg-gray-800 p-6 rounded-lg items-center gap-16 py-5 w-[90%] lg:w-[60%] my-10 mx-auto">
                {loading ? (
                  <p className="text-gray-400">Loading options...</p>
                ) : (
                  <ResourceCategory />
                )}
                <button
                  onClick={handleSubmit}
                  className="flex items-center px-6 py-3 text-sm md:text-base lg:text-lg cursor-pointer rounded-lg transition-all duration-300 bg-indigo-600 text-white shadow-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </GlobalOptionsContext.Provider>
  );
};

const ResourceCategory = () => {
  const { selectedOptions, setSelectedOptions, dropdownData } =
    useContext(GlobalOptionsContext);

  const clearSelections = (key) => {
    const updatedState = { ...selectedOptions, [key]: "" };
    if (key === "degree")
      updatedState.branch =
        updatedState.semester =
        updatedState.subject =
        updatedState.type =
          "";
    if (key === "branch")
      updatedState.semester = updatedState.subject = updatedState.type = "";
    if (key === "semester") updatedState.subject = updatedState.type = "";
    if (key === "subject") updatedState.type = "";
    return updatedState;
  };

  const handleDropdownChange = (dropdownKey, value) => {
    setSelectedOptions(clearSelections(dropdownKey));
    setSelectedOptions((prev) => ({ ...prev, [dropdownKey]: value }));
  };

  const filteredBranches = dropdownData.branches[selectedOptions.degree] || [];
  const semesterKey = `${selectedOptions.degree}_${selectedOptions.branch}`;
  const filteredSemesters = dropdownData.semesters[semesterKey] || [];
  const subjectKey = `${semesterKey}_${selectedOptions.semester}`;
  const filteredSubjects = dropdownData.subjects[subjectKey] || [];
  const typeKey = `${subjectKey}_${selectedOptions.subject}`;
  const filteredTypes = dropdownData.types[typeKey] || [];

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center gap-6 flex-wrap">
        <div className="flex flex-col">
          <label className="mb-2">Degree:</label>
          <select
            value={selectedOptions.degree}
            onChange={(e) => handleDropdownChange("degree", e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a degree</option>
            {dropdownData.degrees.map((degree, i) => (
              <option key={i} value={degree}>
                {degree}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2">Branch:</label>
          <select
            value={selectedOptions.branch}
            onChange={(e) => handleDropdownChange("branch", e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!selectedOptions.degree}
          >
            <option value="">Select a branch</option>
            {filteredBranches.length === 0 ? (
              <option disabled>No options available</option>
            ) : (
              filteredBranches.map((branch, i) => (
                <option key={i} value={branch}>
                  {branch}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2">Semester:</label>
          <select
            value={selectedOptions.semester}
            onChange={(e) => handleDropdownChange("semester", e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!selectedOptions.branch}
          >
            <option value="">Select a semester</option>
            {filteredSemesters.length === 0 ? (
              <option disabled>No options available</option>
            ) : (
              filteredSemesters.map((semester, i) => (
                <option key={i} value={semester}>
                  Semester {semester}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2">Subject:</label>
          <select
            value={selectedOptions.subject}
            onChange={(e) => handleDropdownChange("subject", e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!selectedOptions.semester}
          >
            <option value="">Select a subject</option>
            {filteredSubjects.length === 0 ? (
              <option disabled>No subjects available</option>
            ) : (
              filteredSubjects.map((subject, i) => (
                <option key={i} value={subject}>
                  {subject}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2">Resource Type:</label>
          <select
            value={selectedOptions.type}
            onChange={(e) => handleDropdownChange("type", e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!selectedOptions.subject}
          >
            <option value="">Select a type</option>
            {filteredTypes.length === 0 ? (
              <option disabled>No resource types available</option>
            ) : (
              filteredTypes.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Resources;
