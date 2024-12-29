import React, { useState, useEffect, createContext, useContext } from "react";
import toast from "react-hot-toast";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GlobalOptionsContext = createContext();

const Resources = () => {
  const navigate = useNavigate();

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
        if (type === "Tutorials") {
          const videoLinks = response.data[0]?.videoLinks;
  
          if (!videoLinks || videoLinks.length === 0) {
            toast.error("No video links found.");
            return;
          }
  
          // Redirect to a page showing the video links
          const urlPath = `/resources/${degree}/${branch}/${semester}/${subject}/${type}/videos?videoLinks=${encodeURIComponent(
            JSON.stringify(videoLinks)
          )}`;
          navigate(urlPath);
        } else {
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
  
          const urlPath = `/resources/${degree}/${branch}/${semester}/${subject}/${type}?pdfUrls=${encodeURIComponent(
            JSON.stringify(modifiedUrls)
          )}&pdfPages=${pages}`;
  
          navigate(urlPath);
          setPdfUrl(modifiedUrls);
          setPdfPages(pages);
          setPdfShow(true);
        }
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
                <div className="flex flex-col items-center gap-5">
                  {pdfUrl.map((url, index) => (
                    <div key={index} className="w-full max-w-4xl">
                      <img
                        src={url}
                        title={`Resource PDF - Page ${index + 1}`}
                        className="w-full h-auto rounded-lg shadow-lg"
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
    setSelectedOptions((prev) => ({
      ...clearSelections(dropdownKey),
      ...prev,
      [dropdownKey]: value,
    }));
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
        <Dropdown
          label="Degree"
          options={dropdownData.degrees}
          value={selectedOptions.degree}
          onChange={(value) => handleDropdownChange("degree", value)}
        />
        <Dropdown
          label="Branch"
          options={filteredBranches}
          value={selectedOptions.branch}
          onChange={(value) => handleDropdownChange("branch", value)}
          disabled={!selectedOptions.degree}
        />
        <Dropdown
          label="Semester"
          options={filteredSemesters}
          value={selectedOptions.semester}
          onChange={(value) => handleDropdownChange("semester", value)}
          disabled={!selectedOptions.branch}
        />
        <Dropdown
          label="Subject"
          options={filteredSubjects}
          value={selectedOptions.subject}
          onChange={(value) => handleDropdownChange("subject", value)}
          disabled={!selectedOptions.semester}
        />
        <Dropdown
          label="Resource Type"
          options={filteredTypes}
          value={selectedOptions.type}
          onChange={(value) => handleDropdownChange("type", value)}
          disabled={!selectedOptions.subject}
        />
      </div>
    </div>
  );
};

const Dropdown = ({ label, options, value, onChange, disabled }) => (
  <div className="flex flex-col">
    <label className="mb-2">{label}:</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      disabled={disabled}
    >
      <option value="">Select an option</option>
      {options.length === 0 ? (
        <option disabled>No options available</option>
      ) : (
        options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))
      )}
    </select>
  </div>
);

export default Resources;
