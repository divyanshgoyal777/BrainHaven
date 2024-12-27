import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // Import react-hot-toast

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
  
    const { degree, branch, subject, semester, type, pages, resourceFile } = formData;
  
    // Validate pages field to ensure it's a number
    if (isNaN(pages) || pages <= 0) {
      setIsLoading(false);
      toast.error("Please enter a valid number of pages.");
      return;
    }
  
    // Validate file type to ensure it's a PDF
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
      const response = await axios.post("http://localhost:3000/api/resource/upload", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setIsLoading(false);
      setUploadStatus("File uploaded successfully!");
      console.log("Response:", response.data);
      toast.success("File uploaded successfully!");
  
      // Reset the form data and the file input after successful upload
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
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to upload file. Please try again.");
      toast.error("Failed to upload file. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Resources Upload
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Degree</label>
            <select
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
            <label className="block text-sm font-medium mb-2">Branch</label>
            <select
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
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
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
            <label className="block text-sm font-medium mb-2">Semester</label>
            <select
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
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
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
            <label className="block text-sm font-medium mb-2">No. of Pages</label>
            <input
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
            <label className="block text-sm font-medium mb-2">Upload File</label>
            <input
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
      </div>
    </div>
  );
};

export default ResourcesUpload;
