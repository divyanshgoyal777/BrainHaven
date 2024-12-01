import { React, useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const resources = [
    "Diploma",
    "B-Tech",
    "Web Developing",
    "Software Developing",
  ];

  const filteredResources = resources.filter((resources) =>
    resources.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <Navbar />
      <div className="mt-40">
        <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-4xl md:text-5xl font-bold text-center sm:text-4xl">Notes</h1>
        <div className="my-16 w-[80%] m-auto flex flex-col items-center">
          <div className="">
            <form action="" onSubmit={(e) => e.preventDefault()} className="flex gap-6">
              <input type="text" placeholder="Search" name="" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-[60vw] py-3 px-3 rounded-md" />
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-md" type="submit">Search</button>
            </form>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 my-20 gap-10">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <button
                  key={index}
                  className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out"
                >
                  {resource}
                </button>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-2">
                No resources found.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Resources;
