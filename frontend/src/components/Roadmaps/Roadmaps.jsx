import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const Roadmaps = () => {
  useEffect(() => {
    document.title = "BrainWave - Roadmaps";
  }, []);

  const careerPaths = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "DevOps",
    "Data Science",
    "Blockchain",
    "AI and Machine Learning",
    "Cybersecurity",
  ];

  const programmingLanguages = [
    "Python",
    "JavaScript",
    "TypeScript",
    "C",
    "C++",
    "Java",
    "Rust",
    "Go",
    "Swift",
    "Kotlin",
    "Ruby",
    "PHP",
  ];

  const technologies = [
    "React",
    "Vue",
    "Angular",
    "Svelte",
    "Node.js",
    "Django",
    "Flask",
    "Spring Boot",
    "Docker",
    "Kubernetes",
    "Git and GitHub",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "Redis",
    "AWS",
    "Google Cloud",
    "Azure",
    "Data Structures and Algorithms",
  ];

  return (
    <div className="text-white">
      <Navbar />
      <div className="mt-32 px-8">
        <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg">
          Discover Your Path in Tech
        </h1>
        <div className="flex flex-col items-center gap-16 py-16 w-[90%] lg:w-[75%] mx-auto">
          <RoadmapCategory title="Career Paths" items={careerPaths} link />
          <RoadmapCategory
            title="Programming Languages"
            items={programmingLanguages}
            link
          />
          <RoadmapCategory
            title="Technologies & Tools"
            items={technologies}
            link
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const RoadmapCategory = ({ title, items, link }) => (
  <div className="w-full">
    <h1 className="text-2xl sm:text-3xl font-bold text-center py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
      {title}
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 px-4">
      {items.map((item, index) => (
        <Link
          key={index}
          to={`/roadmaps/${item
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/\//g, "-")}`}
          className="px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-purple-600 hover:to-indigo-600 text-white text-center font-medium rounded-lg shadow-md hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
        >
          {item}
        </Link>
      ))}
    </div>
  </div>
);

export default Roadmaps;
