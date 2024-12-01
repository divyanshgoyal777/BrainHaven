import {React, useEffect} from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
const Roadmaps = () => {
  useEffect(()=>{
    document.title="BrainWave-Roadmaps";
  },[]);
  return (
    <div>
      <Navbar/>
      <div className="mt-32 px-8">
        <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-4xl md:text-5xl font-bold text-center sm:text-4xl">Discover Your Path in Tech</h1>
        <div className="flex flex-col items-center md:gap-8 py-20 w-[75%] lg:w-[60%] m-auto ">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center w-[80vw] md:w-[60vw] py-4 px-3 sm:px-8  rounded-lg shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 transform hover:scale-105 transition duration-300 ease-in-out ">Your Roadmap to Success</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 px-4">
              <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out">Frontend Web Development</button>
              <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out">Backend Web Development</button>
              <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out">Full Stack Development</button>
              <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out ">Data Science</button>
              <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out">BLock Chain</button>
              <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out ">AI and ML</button>
            </div>
          </div>
          <div className="my-24 flex flex-col items-center">
          <h1 className=" text-2xl sm:text-3xl font-bold text-white text-center py-4 px-8 w-[80vw] sm:w-[60vw] rounded-lg shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 transform hover:scale-105 transition duration-300 ease-in-out ">Programming Languages</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 px-4">
              <button className="px-6 py-3  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out">Python</button>
              <button className="px-6 py-3  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out">JavaScript</button>
              <button className="px-6 py-3  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out">C</button>
              <button className="px-6 py-3  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out ">C++</button>
              <button className="px-6 py-3  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out">React</button>
              <button className="px-6 py-3  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out ">Node.js</button>
              <button className="px-6 py-3  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out ">Java</button>
              <button className="px-6 py-3  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out ">MongoDB</button>
              <button className="px-6 py-3  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out ">Git and Github</button>
              <button className="px-6 py-3  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out ">Data Structure and Algorithm</button>

            </div>
          </div>
         
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Roadmaps;
