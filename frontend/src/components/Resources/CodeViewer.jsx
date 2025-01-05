import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const CodeViewer = () => {
  const { primaryCategory, subCategory } = useParams();
  const [codeData, setCodeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCodes = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in to perform this action!");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/code/codeSearch`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { primaryCategory, subCategory },
          }
        );

        setCodeData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching codes:", error);
        toast.error(error.response?.data || "Failed to fetch codes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCodes();
  }, [primaryCategory, subCategory]);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(
      () => {
        toast.success("Code copied to clipboard!");
      },
      () => {
        toast.error("Failed to copy code!");
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="mt-32 px-4 md:px-8 w-full md:w-[80%] m-auto">
        <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-2xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
          Code Snippets for {primaryCategory} - {subCategory}
        </h2>

        {isLoading ? (
          <p className="text-center text-lg text-gray-400">Loading...</p>
        ) : codeData.length === 0 ? (
          <p className="text-center text-lg text-gray-400">
            No code snippets found
          </p>
        ) : (
          <div className="space-y-6">
            {codeData.map((data, index) => (
              <div key={index}>
                <h3 className="text-xl md:text-2xl text-white font-bold mb-4">
                  {data.primaryCategory} - {data.subCategory}
                </h3>
                <div className="space-y-4">
                  {data.codeItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-800 p-4 rounded-lg shadow-lg relative"
                    >
                      <h4 className="text-lg md:text-xl text-white font-bold mb-2">
                        {item.description || "Code Description"}
                      </h4>
                      <img
                        src={item.codeImageUrl}
                        alt={`Code Snippet ${idx + 1}`}
                        className="w-full h-auto rounded-lg mb-4"
                      />
                      <div className="relative">
                        <button
                          onClick={() =>
                            copyToClipboard(
                              item.code || "No code snippet available"
                            )
                          }
                          className="absolute top-3 right-3 md:top-5 md:right-5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-700 hover:shadow-xl transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                          📋 Copy Code
                        </button>

                        <pre className="bg-gray-900 text-white p-3 md:p-4 rounded-lg overflow-auto text-sm md:text-base">
                          <code>
                            {item.code || "No code snippet available"}
                          </code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CodeViewer;
