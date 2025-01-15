import React from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const Hackmate = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-1 mt-24 mb-10">
        <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
          Hackmate
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <p className="text-white">Hackmate.mapping</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hackmate;
