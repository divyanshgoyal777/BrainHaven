import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import logo from "../../assets/img/BrainWaveFaviconNoBackground.png";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="mt-36 px-6 md:px-16 lg:px-24">
        <section className="Page-1 text-white mb-32">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold leading-tight mb-6">
                BrainWave – Ignite Your Tech Journey
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Your go-to platform for learning resources, coding roadmaps, and
                hackathon events.
              </p>
              <div className="flex flex-wrap gap-5 items-center">
                <Link to="/resources">
                  <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
                    Explore Resources
                  </button>
                </Link>
                <div className="text-gray-400">or</div>
                <Link to="/hackmate">
                  <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
                    Join a Hackathon
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={logo}
                alt="BrainWave Logo"
                className="w-[150px] md:w-[250px] lg:w-[300px] object-contain"
              />
            </div>
          </div>
        </section>
        <section className="Page-2 my-24 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            What is BrainWave?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            BrainWave is your ultimate hub for tech enthusiasts, offering
            resources, expert roadmaps, and event updates. Whether you're
            learning to code, preparing for a hackathon, or exploring the latest
            tech trends, we've got everything you need.
          </p>
        </section>
        <section className="Page-3 my-24 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Upcoming Hackathons & Events
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            Stay updated with the latest hackathons and tech events. Whether
            you're looking to participate in coding challenges, learn from top
            industry professionals, or network with fellow tech enthusiasts,
            this section keeps you informed on all the opportunities. Don’t miss
            out on the chance to showcase your skills and collaborate with
            others.
          </p>
          <Link to="/hackmate">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md my-6 hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
              View All Hackathons
            </button>
          </Link>
        </section>
        <section className="Page-4 my-24 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Join BrainWave Today
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            Ready to kick-start your tech journey or enhance your skills? Join
            BrainWave now and gain access to a wealth of resources, events, and
            expert advice tailored just for you.
          </p>
          <div className="mt-6">
            <p className="text-gray-400 mb-4">
              Sign up for free and start exploring.
            </p>
            <Link to="/signup">
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
                Get Started
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
