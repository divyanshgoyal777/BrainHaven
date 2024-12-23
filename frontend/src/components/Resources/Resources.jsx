import React, { useState, useEffect, createContext, useContext } from "react";
import toast from "react-hot-toast";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

export const GlobalOptionsContext = createContext();

const Resources = () => {
  useEffect(() => {
    document.title = "BrainWave - Resource";
  }, []);

  const [selectedOptions, setSelectedOptions] = useState({
    Degree: "",
    Branch: "",
    Semester: "",
    Subject: "",
    Type: "",
  });

  const handleSubmit = () => {
    const { Degree, Branch, Semester, Subject, Type } = selectedOptions;
  
    if (Degree && Branch && Semester && Subject && Type) {
      console.log("Selected Options:", selectedOptions);
      toast.success("Infomation Submitted");
    } else {
     toast.error("Please fill in all the required fields before submitting.");
    }
  };
  

  return (
    <GlobalOptionsContext.Provider value={{ selectedOptions, setSelectedOptions }}>
      <div className="text-white">
        <Navbar />
        <div className="mt-32 px-8">
          <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg">
            Resources
          </h1>
          <div className="flex flex-col items-center gap-16 py-5 w-[90%] lg:w-[60%] mx-auto">
            <ResourceCategory />
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded"
            >
              Submit
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </GlobalOptionsContext.Provider>
  );
};

const ResourceCategory = () => {
  const { selectedOptions, setSelectedOptions } = useContext(GlobalOptionsContext);

  const dropdownOptions = {
    Degree: ["Diploma", "B-Tech"],
    Branch: ["Computer Science", "Electrical", "Mechanical", "Chemical"],
  };

  const subjectOptions = {
    "Computer Science": {
      "1": ["Introduction to Programming", "Discrete Mathematics"],
      "2": ["Data Structures", "Computer Networks"],
      "3": ["Operating Systems", "Database Systems"],
    },
    Electrical: {
      "1": ["Basic Electrical Engineering", "Mathematics I"],
      "2": ["Circuit Analysis", "Signals and Systems"],
      "3": ["Electromagnetics", "Power Systems"],
    },
  };

  const typeOptions = ["Notes", "Books", "Question Papers", "Videos", "Assignment"];

  const handleDropdownChange = (dropdownKey, value) => {
    setSelectedOptions((prev) => {
      const updatedState = { ...prev, [dropdownKey]: value };

      if (dropdownKey === "Degree") {
        updatedState.Branch = "",
        updatedState.Semester = "";
        updatedState.Subject = "";
        updatedState.Type = "";
      } else if (dropdownKey === "Branch") {
        updatedState.Semester = "";
        updatedState.Subject = "";
        updatedState.Type = "";
      } else if (dropdownKey === "Semester") {
        updatedState.Subject = "";
        updatedState.Type = "";
      } else if (dropdownKey === "Subject") {
        updatedState.Type = "";
      }

      return updatedState;
    });
  };

  const semesterOptions = selectedOptions.Degree === "Diploma" ? Array.from({ length: 6 }, (_, i) => (i + 1).toString()) : Array.from({ length: 8 }, (_, i) => (i + 1).toString());

  const filteredSubjects =
    subjectOptions[selectedOptions.Branch]?.[selectedOptions.Semester] || [];

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center gap-6 flex-wrap">
        {Object.keys(dropdownOptions).map((key, index) => (
          <div key={index} className="flex flex-col">
            <label className="mb-2">{key}:</label>
            <select
              value={selectedOptions[key]}
              onChange={(e) => handleDropdownChange(key, e.target.value)}
              className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
            >
              <option value="">Select an option</option>
              {dropdownOptions[key]?.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex flex-col">
          <label className="mb-2">Semester:</label>
          <select
            value={selectedOptions.Semester}
            onChange={(e) => handleDropdownChange("Semester", e.target.value)}
            className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
            disabled={!selectedOptions.Degree}
          >
            <option value="">Select a semester</option>
            {semesterOptions.map((semester, i) => (
              <option key={i} value={semester}>
                Semester {semester}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2">Subject:</label>
          <select
            value={selectedOptions.Subject}
            onChange={(e) => handleDropdownChange("Subject", e.target.value)}
            className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
            disabled={!filteredSubjects.length}
          >
            <option value="">Select a subject</option>
            {filteredSubjects.map((subject, i) => (
              <option key={i} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2">Type:</label>
          <select
            value={selectedOptions.Type}
            onChange={(e) => handleDropdownChange("Type", e.target.value)}
            className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
            disabled={!selectedOptions.Subject}
          >
            <option value="">Select a type</option>
            {typeOptions.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Resources;
