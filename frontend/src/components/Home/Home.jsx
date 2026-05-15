import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../App";
import logo from "../../assets/img/BrainHavenFaviconNoBackground.png";
import "./Home.css";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import FeaturedRoadmaps from "./Swiper";

const Home = () => {
  const { isAuthenticated } = useAuth();

  const [stats, setStats] = useState({
    resources: 0,
    codeSnippets: 0,
  });

  useEffect(() => {
    document.title = "BrainHaven - Home";

    const fetchStats = async () => {
      try {
        const [resourcesRes, snippetsRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/resource/resourceCount`
          ),
          axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/code/codeCount`,
            {}
          ),
        ]);
        setStats({
          resources: resourcesRes.data || 0,
          codeSnippets: snippetsRes.data || 0,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setStats({ resources: 0, codeSnippets: 0 });
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      {!isAuthenticated && <Navbar />}

      <main className="mt-36 px-4 md:px-16 lg:px-24">
        <section className="Page-1 text-white mb-48">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
            <div className="md:w-2/3 mb-10 md:mb-0">
              <h1 className="text-[2.5rem] md:text-[3rem] font-bold leading-tight mb-6">
                BrainHaven – Ignite Your Tech Journey
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Your ultimate platform for learning resources, coding roadmaps,
                hackathon updates, team collaboration through Hackmate, and
                more.
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
                    Join HackMate Teams
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src={logo}
                alt="BrainHaven Logo"
                className="w-[150px] md:w-[200px] lg:w-[300px] object-contain"
              />
            </div>
          </div>
        </section>

        <section className="Page-2 my-24 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            What is BrainHaven? 🤔
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            BrainHaven is a comprehensive platform for tech enthusiasts. Access
            expert-curated learning resources, follow coding roadmaps, and get
            up-to-date hackathon details. Through Hackmate, you can create or
            join teams for hackathons and collaborate with like-minded
            individuals.
          </p>
        </section>

        <FeaturedRoadmaps />

        <section className="roadmap-section my-24 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Unlock Your Coding Roadmap 🛤️
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            Ready to level up? Dive into curated coding roadmaps and gain
            clarity on your tech career path. Track your progress and stay on
            the right track to becoming a tech professional.
          </p>
          <div className="mt-6">
            <Link to="/roadmaps">
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
                Explore Roadmaps
              </button>
            </Link>
          </div>
        </section>

        <section className="Page-3 my-24 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Upcoming Hackathons 🏆
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            Stay updated with the latest hackathons. Whether you're competing or
            networking, we provide all the details to get involved. Join teams
            through Hackmate and collaborate on exciting projects.
          </p>
          <Link to="/hackathon">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md my-6 hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
              View All Hackathons
            </button>
          </Link>
        </section>

        <section className="live-counter my-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Join BrainHaven’s Thriving Tech Community 🚀
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Become part of a rapidly growing network of developers, innovators,
            and tech enthusiasts who are shaping the future of technology!
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-8 rounded-2xl shadow-2xl w-80 transform hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-2xl font-bold text-gray-200 mb-4">
                📚 Total Resources
              </h3>
              <p className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 animate-pulse">
                {stats.resources}
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-900 to-teal-900 p-8 rounded-2xl shadow-2xl w-80 transform hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-2xl font-bold text-gray-200 mb-4">
                💻 Code Snippets
              </h3>
              <p className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500 animate-pulse">
                {stats.codeSnippets}
              </p>
            </div>
          </div>
        </section>

        <section className="community-section my-24 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5">
            Join the BrainHaven Telegram Community 💬
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl sm:max-w-3xl">
            Connect with like-minded tech enthusiasts, share resources,
            contribute ideas, and provide feedback to help BrainHaven grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 w-full sm:w-auto">
            <a
              href="https://t.me/brainhaven"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
                🚀 Contribute & Give Feedback
              </button>
            </a>
            <a
              href="https://t.me/brainhavenchat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
                💬 Join BrainHaven Chat Group
              </button>
            </a>
          </div>
        </section>

        {!isAuthenticated && (
          <section className="Page-4 my-24 flex flex-col justify-center items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
              Join BrainHaven Today 🌟
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
              Ready to kick-start your tech journey? Join BrainHaven today and
              unlock access to resources, roadmaps, hackathons, and HackMate to
              collaborate with others in the tech community.
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

      {!isAuthenticated && <Footer />}
    </>
  );
};

export default Home;
