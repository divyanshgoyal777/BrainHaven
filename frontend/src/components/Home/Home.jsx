import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../App";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import logo from "../../assets/img/BrainWaveFaviconNoBackground.png";
import "./Home.css";

const Home = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    document.title = "BrainWave - Home";
  }, []);

  return (
    <>
      <Navbar />
      <main className="mt-36 px-4 md:px-16 lg:px-24">
        <section className="Page-1 text-white mb-48">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
            <div className="md:w-2/3 mb-10 md:mb-0">
              <h1 className="text-[2.5rem] md:text-[3rem] font-bold leading-tight mb-6">
                BrainWave – Ignite Your Tech Journey
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                The ultimate platform for learning resources, coding roadmaps,
                and up-to-date hackathon information.
              </p>
              <div className="flex flex-wrap flex-col md:flex-row gap-5 items-center justify-center md:justify-start">
                <Link to="/resources">
                  <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
                    Explore Resources
                  </button>
                </Link>
                <div className="text-gray-400">or</div>
                <Link to="/hackmate">
                  <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
                    Find a Hackathon
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src={logo}
                alt="BrainWave Logo"
                className="w-[150px] md:w-[200px] lg:w-[300px] object-contain"
              />
            </div>
          </div>
        </section>
        <section className="Page-2 my-24 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            What is BrainWave?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            BrainWave is your ultimate destination for tech enthusiasts. We
            provide expert-curated resources, comprehensive coding roadmaps, and
            the latest hackathon information. While we don't yet organize
            hackathons, we bring you all the details you need to stay updated
            and participate in ongoing events. In the future, we plan to host
            our own hackathons, so stay tuned!
          </p>
        </section>
        <section className="Page-3 my-24 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Upcoming Hackathons
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            Stay informed about the latest hackathons. Whether you're
            participating in coding challenges or networking with fellow tech
            enthusiasts, we provide all the information you need to get
            involved. Don’t miss out on your chance to showcase your skills and
            collaborate with others.
          </p>
          <Link to="/hackmate">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md my-6 hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
              View All Hackathons
            </button>
          </Link>
        </section>
        <section className="roadmap-section my-24 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Unlock Your Coding Roadmap
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            Ready to level up your skills? Dive into curated coding roadmaps
            tailored to your learning goals. Follow expert paths and stay on
            track to become a tech professional.
          </p>
          <div className="mt-6">
            <Link to="/roadmaps">
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
                Roadmaps
              </button>
            </Link>
          </div>
        </section>
        {!isAuthenticated && (
          <section className="Page-4 my-24 flex flex-col justify-center items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
              Join BrainWave Today
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
              Ready to kick-start your tech journey or enhance your skills? Join
              BrainWave today and unlock access to a wealth of resources, coding
              roadmaps, and expert advice tailored just for you.
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
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
