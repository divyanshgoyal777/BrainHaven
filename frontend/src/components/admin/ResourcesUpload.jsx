import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const options = {
  degrees: {
    BTech: { name: "B.Tech", semesters: 8 },
    Diploma: { name: "Diploma", semesters: 6 },
  },
  branches: {
    CSE: "Computer Science",
    ECE: "Electronics",
    Mechanical: "Mechanical",
    Civil: "Civil",
  },
  types: {
    Practical: "Practical",
    Assignment: "Assignment",
    Exam: "Exam",
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
  });

  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [option, setOption] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      resourceFile: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus("");
    setIsLoading(true);

    const { degree, branch, subject, semester, type, pages, resourceFile } =
      formData;

    if (isNaN(pages) || pages <= 0) {
      setIsLoading(false);
      toast.error("Please enter a valid number of pages.");
      return;
    }

    if (resourceFile && resourceFile.type !== "application/pdf") {
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

    try {
      const response = await axios.post(
        "http://localhost:3000/api/resource/upload",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
        if (error.response.status === 400) {
          setOption(true);
        } else {
          setUploadStatus(error.response.data.message);
          toast.error(error.response.data.message);
        }
      } else {
        console.error("Error uploading file:", error);
        setUploadStatus("Failed to upload file. Please try again.");
        toast.error("Failed to upload file. Please try again.");
      }
    }
  };

  const sameResources = async (e, response) => {
    e.preventDefault();
    if (response === "yes") {
      const { degree, branch, subject, semester, type, pages, resourceFile } =
        formData;

      setYes(true);

      const formDataToSend = new FormData();
      formDataToSend.append("degree", degree);
      formDataToSend.append("branch", branch);
      formDataToSend.append("subject", subject);
      formDataToSend.append("semester", semester);
      formDataToSend.append("type", type);
      formDataToSend.append("pages", pages);
      formDataToSend.append("resourceFile", resourceFile);

      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/resource/replace",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
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
          Resources Upload
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

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="pages">
                No. of Pages
              </label>
              <input
                id="pages"
                type="text"
                name="pages"
                value={formData.pages}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Number of Pages"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="resourceFile"
              >
                Upload File
              </label>
              <input
                id="resourceFile"
                type="file"
                name="resourceFile"
                onChange={handleFileChange}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload Resource"}
            </button>
          </form>
        ) : (
          <div className="max-w-[35vw] mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
            <h1 className="text-3xl font-bold text-center">Alert</h1>
            <p className="text-center font-semibold my-4 max-w-[80%] m-auto">
              These Details is already exist. Click on "Yes" if you want to
              replace the file with that detail.
            </p>
            <div className=" flex flex-col gap-3">
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
            </div>
          </div>
        )}

        {uploadStatus && (
          <p className="text-center text-lg mt-4">{uploadStatus}</p>
        )}
      </div>
    </div>
  );
};

export default ResourcesUpload;
