import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const Resources = () => {
  useEffect(() => {
    document.title = "BrainWave - Resource";
  }, []);

  const resources = [
    { heading: "Diploma", subheading: "Computer Science" },
    { heading: "Btech", subheading: "Computer Science" },
    { heading: "Web Developing", subheading: "Full Stack" },
    { heading: "Software Engineering", subheading: "Software" },
    { heading: "Programming", subheading: "Code" },
  ];
  

  return (
    <div className="text-white">
      <Navbar />
      <div className="mt-32 px-8">
        <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg">
          Resources
        </h1>
        <div className="flex flex-col items-center gap-16 py-16 w-[90%] lg:w-[75%] mx-auto">
          <ResourceCategory title="Choose Your Resource" items={resources} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ResourceCategory = ({ title, items }) => (
  <div className="w-full">
    <div className="text-2xl sm:text-3xl font-bold text-center py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
      {title}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 px-4">
      {items.map((item, index) => (
        <Link
          key={index}
          to={`/resources/${item.heading
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/\//g, "-")}|${item.subheading
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/\//g, "-")}`}
          className="px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-purple-600 hover:to-indigo-600 text-white text-center font-medium rounded-lg shadow-md hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
        >
          <h2 className="text-lg font-bold">{item.heading}</h2>
          <p className="text-sm text-gray-300">{item.subheading}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default Resources;
