import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ResourcesDelete = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchResources = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/resource/allResources`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResources(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Failed to fetch resources");
      setLoading(false);
    }
  };

  const deleteResource = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/deleteResource/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Resource deleted successfully");
      setResources(resources.filter((resource) => resource._id !== id));
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Failed to delete resource");
    }
  };

  const filteredResources = resources
    .slice()
    .sort((a, b) => {
      const semA = parseInt(a.semester, 10);
      const semB = parseInt(b.semester, 10);
      return isNaN(semA) || isNaN(semB)
        ? a.semester.localeCompare(b.semester)
        : semA - semB;
    })
    .filter((resource) =>
      Object.values(resource).some((val) => {
        if (val == null) return false;
        return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="min-h-screen text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Delete Resources
        </h1>
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg py-8 px-4">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            {loading ? (
              <div className="text-center text-xl text-blue-400 animate-pulse">
                Loading resources...
              </div>
            ) : filteredResources.length > 0 ? (
              <div className="hidden lg:block">
                <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
                  <thead>
                    <tr className="bg-gray-700 text-sm text-gray-300 uppercase">
                      <th className="px-4 py-3 hidden lg:block">Index</th>
                      <th className="px-4 py-3">Subject</th>
                      <th className="px-4 py-3">Degree</th>
                      <th className="px-4 py-3">Branch</th>
                      <th className="px-4 py-3">Semester</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((resource, index) => (
                      <tr
                        key={resource._id}
                        className={`border-b border-gray-700 text-center ${
                          index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                        } hover:bg-gray-700 transition-all`}
                      >
                        <td className="px-4 py-4 hidden lg:block">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4">{resource.subject}</td>
                        <td className="px-4 py-4">{resource.degree}</td>
                        <td className="px-4 py-4">{resource.branch}</td>
                        <td className="px-4 py-4">{resource.semester}</td>
                        <td className="px-4 py-4">{resource.type}</td>

                        <td className="px-4 py-4">
                          <button
                            onClick={() => deleteResource(resource._id)}
                            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-md transition-all"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-lg text-gray-400">
                No resources found.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 lg:hidden">
              {filteredResources.map((resource, index) => (
                <div
                  key={resource._id}
                  className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-all"
                >
                  <h3 className="text-xl font-semibold text-white">
                    {index + 1}. {resource.subject}
                  </h3>
                  <p className="text-sm text-gray-300">
                    Degree: {resource.degree}
                  </p>
                  <p className="text-sm text-gray-300">
                    Branch: {resource.branch}
                  </p>
                  <p className="text-sm text-gray-300">
                    Semester: {resource.semester}
                  </p>
                  <p className="text-sm text-gray-300">Type: {resource.type}</p>
                  <button
                    onClick={() => deleteResource(resource._id)}
                    className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-md"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesDelete;
