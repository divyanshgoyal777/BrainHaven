import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Navbar from '../layout/Navbar/Navbar';
import Footer from '../layout/Footer/Footer';

const CodeViewer = () => {
  const { primaryCategory, subCategory } = useParams(); // Extract URL parameters
  const [codeData, setCodeData] = useState([]); // Store the fetched code data
  const [isLoading, setIsLoading] = useState(false); // Loading state

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

        setCodeData(response.data); // Set the fetched code data
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

  return (
    <>
      <Navbar />
      <div className="mt-32 px-8 w-[80%] m-auto">
        <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
          Code Snippets for {primaryCategory} - {subCategory}
        </h2>

        {isLoading ? (
          <p className="text-center text-lg text-gray-400">Loading...</p>
        ) : codeData.length === 0 ? (
          <p className="text-center text-lg text-gray-400">No code snippets found</p>
        ) : (
          <div className="space-y-6">
            {codeData.map((data, index) => (
              <div key={index}>
                <h3 className="text-2xl text-white font-bold mb-4">
                  {data.primaryCategory} - {data.subCategory}
                </h3>
                <div className="space-y-4">
                  {data.codeItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-800 p-4 rounded-lg shadow-lg"
                    >
                      <h4 className="text-xl text-white font-bold mb-2">
                        {item.description || "Code Description"}
                      </h4>
                      <img
                        src={item.codeImageUrl}
                        alt={`Code Snippet ${idx + 1}`}
                        className="w-full h-auto rounded-lg mb-4"
                      />
                      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-auto">
                        <code>{item.code || "No code snippet available"}</code>
                      </pre>
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
