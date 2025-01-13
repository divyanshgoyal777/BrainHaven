import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CodeDelete = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCodes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/allCode`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCodes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching codes:", error);
      toast.error("Failed to fetch codes");
      setLoading(false);
    }
  };

  const deleteCode = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/deleteCode/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Code deleted successfully");
      setCodes(codes.filter((code) => code._id !== id));
    } catch (error) {
      console.error("Error deleting code:", error);
      toast.error("Failed to delete code");
    }
  };

  const filteredCodes = codes.filter((code) =>
    Object.values(code).some((val) => {
      if (val == null) return false;
      return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  useEffect(() => {
    fetchCodes();
  }, []);

  return (
    <div className="min-h-screen text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Delete Code
        </h1>
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg py-8 px-4">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            {loading ? (
              <div className="text-center text-xl text-blue-400 animate-pulse">
                Loading codes...
              </div>
            ) : filteredCodes.length > 0 ? (
              <>
                <div className="hidden md:block">
                  <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
                    <thead>
                      <tr className="bg-gray-700 text-sm text-gray-300 uppercase">
                        <th className="px-4 py-3">Primary Category</th>
                        <th className="px-4 py-3">Sub Category</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCodes.map((code, index) => (
                        <tr
                          key={code._id}
                          className={`border-b border-gray-700 text-center ${
                            index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                          } hover:bg-gray-700 transition-all`}
                        >
                          <td className="px-4 py-4">{code.primaryCategory}</td>
                          <td className="px-4 py-4">{code.subCategory}</td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => deleteCode(code._id)}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 md:hidden">
                  {filteredCodes.map((code) => (
                    <div
                      key={code._id}
                      className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-all"
                    >
                      <h3 className="text-xl font-semibold text-white">
                        {code.primaryCategory}
                      </h3>
                      <p className="text-sm text-gray-300">
                        Sub Category: {code.subCategory}
                      </p>
                      <button
                        onClick={() => deleteCode(code._id)}
                        className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-lg text-gray-400">
                No codes found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeDelete;
