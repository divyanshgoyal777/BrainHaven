import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../loader/Loader";

const RoadmapDetails = () => {
  const { roadmapId } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await fetch("/Roadmaps.json");
        if (!response.ok) throw new Error("Failed to fetch roadmaps");
        const data = await response.json();
        if (data[roadmapId]) {
          setRoadmap(data[roadmapId]);
        } else {
          throw new Error("Roadmap not found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRoadmap();
  }, [roadmapId]);

  if (error) return <div className="text-red-500 text-center p-6">{error}</div>;
  if (!roadmap) return <Loader />;

  return (
    <>
      <div className="min-h-screen px-6 py-12 text-white">
        <div className="max-w-4xl mx-auto mt-24">
          <h1 className="text-4xl font-extrabold mb-4 text-center">
            {roadmap.title}
          </h1>
          <p className="mt-4 text-lg leading-7 text-gray-300 text-center">
            {roadmap.description}
          </p>
          {roadmap.poster && (
            <div className="flex justify-center mt-8">
              <img
                src={`/${roadmap.poster}`}
                alt={roadmap.title}
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          )}
          <h2 className="text-3xl font-semibold mt-12 mb-6 text-gray-100">
            Steps to Follow:
          </h2>
          <ul className="space-y-4 text-lg text-gray-300">
            {roadmap.steps.map((step, index) => (
              <li
                key={index}
                className="flex items-center space-x-3 p-4 bg-gray-700/50 rounded-lg shadow hover:bg-gray-700 transition"
              >
                <span className="w-8 h-7 p-2 bg-blue-500 text-white flex items-center rounded-full font-bold">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RoadmapDetails;
