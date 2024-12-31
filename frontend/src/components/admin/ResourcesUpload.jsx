import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const options = {
  degrees: {
    BTech: { name: "B.Tech", semesters: 8 },
    Diploma: { name: "Diploma", semesters: 6 },
    BSc: { name: "B.Sc", semesters: 6 },
    MSc: { name: "M.Sc", semesters: 4 },
    MBA: { name: "MBA", semesters: 4 },
    MTech: { name: "M.Tech", semesters: 4 },
    BA: { name: "B.A", semesters: 6 },
    MA: { name: "M.A", semesters: 4 },
    BCom: { name: "B.Com", semesters: 6 },
    MCom: { name: "M.Com", semesters: 4 },
  },
  branches: {
    CSE: "Computer Science Engineering",
    ECE: "Electronics and Communication Engineering",
    Mechanical: "Mechanical Engineering",
    Civil: "Civil Engineering",
    Electrical: "Electrical Engineering",
    IT: "Information Technology",
    Chemical: "Chemical Engineering",
    Biotechnology: "Biotechnology",
    Architecture: "Architecture",
    Robotics: "Robotics Engineering",
    Physics: "Physics",
    Chemistry: "Chemistry",
    Mathematics: "Mathematics",
    Biology: "Biology",
    Environmental: "Environmental Science",
    DataScience: "Data Science",
    Astronomy: "Astronomy",
    Accounting: "Accounting",
    Finance: "Finance",
    Marketing: "Marketing",
    HumanResources: "Human Resources",
    BusinessAnalytics: "Business Analytics",
    Economics: "Economics",
    History: "History",
    Literature: "Literature",
    Psychology: "Psychology",
    Sociology: "Sociology",
    PoliticalScience: "Political Science",
    Philosophy: "Philosophy",
    FineArts: "Fine Arts",
  },
  types: {
    Notes: "Lecture Notes",
    Practical: "Practical Manuals",
    Assignments: "Assignments",
    Projects: "Project Reports",
    QuestionPapers: "Previous Year Question Papers",
    EBooks: "E-Books",
    Tutorials: "Tutorials",
    MockTests: "Mock Tests",
    Exams: "Exam Preparation",
    Competitions: "Competitive Exams (e.g., GATE, GRE)",
    Certifications: "Online Certifications",
    Internships: "Internship Opportunities",
    Jobs: "Job Preparation Material",
    SoftSkills: "Soft Skills Resources",
    Coding: "Coding Challenges",
    Research: "Research Papers",
    Labs: "Lab Exercises",
  },
};

const ResourcesUpload = () => {
  const [formData, setFormData] = useState({
    degree: "",
    branch: "",
    subject: "",
    semester: "",
    type: "",
    pages: "",
    resourceFile: null,
    videoLinks: [""],
  });

  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState(false);
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (name === "videoLinks") {
      const updatedLinks = [...formData.videoLinks];
      updatedLinks[dataset.index] = value;
      setFormData((prev) => ({
        ...prev,
        videoLinks: updatedLinks,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      resourceFile: e.target.files[0],
    }));
  };

  const addVideoLink = () => {
    setFormData((prev) => ({
      ...prev,
      videoLinks: [...prev.videoLinks, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus("");
    setIsLoading(true);

    const {
      degree,
      branch,
      subject,
      semester,
      type,
      pages,
      resourceFile,
      videoLinks,
    } = formData;

    if (type !== "Tutorials" && (isNaN(pages) || pages <= 0)) {
      setIsLoading(false);
      toast.error("Please enter a valid number of pages.");
      return;
    }

    if (
      type !== "Tutorials" &&
      resourceFile &&
      resourceFile.type !== "application/pdf"
    ) {
      setIsLoading(false);
      toast.error("Please upload a PDF file.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("degree", degree);
    formDataToSend.append("branch", branch);
    formDataToSend.append("subject", subject);
    formDataToSend.append("semester", semester);
    formDataToSend.append("type", type);
    formDataToSend.append("pages", pages);
    formDataToSend.append("resourceFile", resourceFile);
    formDataToSend.append("videoLinks", JSON.stringify(videoLinks));

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/resource/upload`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      setUploadStatus("File uploaded successfully!");
      toast.success("File uploaded successfully!");

      setFormData({
        degree: "",
        branch: "",
        subject: "",
        semester: "",
        type: "",
        pages: "",
        resourceFile: null,
        videoLinks: [""],
      });
    } catch (error) {
      if (error.response.status === 400) {
        setOption(true);
      }
      setIsLoading(false);
      if (error.response) {
        setUploadStatus(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setUploadStatus("Failed to upload file. Please try again.");
        toast.error("Failed to upload file. Please try again.");
      }
    }
  };

  const sameResources = async (e, response) => {
    e.preventDefault();
    if (response === "yes") {
      const {
        degree,
        branch,
        subject,
        semester,
        type,
        pages,
        resourceFile,
        videoLinks,
      } = formData;

      setYes(true);

      const formDataToSend = new FormData();
      formDataToSend.append("degree", degree);
      formDataToSend.append("branch", branch);
      formDataToSend.append("subject", subject);
      formDataToSend.append("semester", semester);
      formDataToSend.append("type", type);
      formDataToSend.append("pages", pages);
      formDataToSend.append("resourceFile", resourceFile);
      formDataToSend.append("videoLinks", JSON.stringify(videoLinks));

      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/resource/replace`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setIsLoading(false);
        setUploadStatus("File uploaded successfully!");
        console.log("Response:", response.data);
        toast.success("File uploaded successfully!");
        setFormData({
          degree: "",
          branch: "",
          subject: "",
          semester: "",
          type: "",
          pages: "",
          resourceFile: null,
        });
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          console.error("Error response:", error.response);
          setUploadStatus(
            error.response.data.message || "Error during file upload."
          );
          toast.error(
            error.response.data.message || "Error during file upload."
          );
        } else {
          console.error("Error:", error);
          setUploadStatus("Failed to upload file. Please try again.");
          toast.error("Failed to upload file. Please try again.");
        }
      }
    } else if (response === "no") {
      setNo(true);
      setFormData({
        degree: "",
        branch: "",
        subject: "",
        semester: "",
        type: "",
        pages: "",
        resourceFile: null,
      });
    }

    setOption(false);
  };

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Upload Resources
        </h1>

        {!option ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
          >
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="degree"
              >
                Degree
              </label>
              <select
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Degree</option>
                {Object.entries(options.degrees).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="branch"
              >
                Branch
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select Branch</option>
                {Object.entries(options.branches).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Subject"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="semester"
              >
                Semester
              </label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                disabled={!formData.degree}
              >
                <option value="">Select Semester</option>
                {formData.degree &&
                  Array.from(
                    { length: options.degrees[formData.degree].semesters },
                    (_, i) => i + 1
                  ).map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="type">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Type</option>
                {Object.entries(options.types).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {formData.type === "Tutorials" && (
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="videoLinks"
                >
                  Video Links
                </label>
                {formData.videoLinks.map((link, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      name="videoLinks"
                      data-index={index}
                      value={link}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter video link ${index + 1}`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVideoLink}
                  className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg"
                >
                  Add Another Video Link
                </button>
              </div>
            )}

            {formData.type !== "Tutorials" && (
              <>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="pages"
                  >
                    Number of Pages
                  </label>
                  <input
                    id="pages"
                    type="number"
                    name="pages"
                    value={formData.pages}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter number of pages"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="resourceFile"
                  >
                    Upload Resource (PDF)
                  </label>
                  <input
                    id="resourceFile"
                    type="file"
                    name="resourceFile"
                    onChange={handleFileChange}
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    accept=".pdf"
                    disabled={formData.type === "Tutorials"}
                  />
                </div>
              </>
            )}

            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload Resource"}
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-[35vw] mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
            <h1 className="text-3xl font-bold text-center">Alert</h1>
            <p className="text-center font-semibold my-4 max-w-[80%] m-auto">
              These Details is already exist. Click on "Yes" if you want to
              replace the file with that detail.
            </p>
            <div className=" flex flex-col gap-3">
              {isLoading ? (
                <>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all">
                    Uploading...
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                    onClick={(e) => sameResources(e, "yes")}
                  >
                    Yes
                  </button>
                  <button
                    className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700"
                    onClick={(e) => sameResources(e, "no")}
                  >
                    No
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesUpload;
