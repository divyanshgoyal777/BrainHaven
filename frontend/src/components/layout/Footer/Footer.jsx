import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/BrainWaveFaviconNoBackground.png";

const Footer = () => {
  return (
    <footer className="bg-[#10051a] text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Link to="/" aria-label="BrainWave Home">
              <img src={logo} alt="BrainWave Logo" className="w-10 mb-3" />
            </Link>
            <p className="text-gray-400 mb-3">
              BrainWave – Ignite Your Tech Journey
            </p>
            <p className="text-sm text-gray-500">
              Created with dedication by{" "}
              <a
                href="https://www.linkedin.com/in/divyanshgoyal777/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
                aria-label="Divyansh Goyal's LinkedIn"
              >
                Divyansh Goyal
              </a>{" "}
              and{" "}
              <a
                href="https://www.linkedin.com/in/animesh-prakash-139b47309/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
                aria-label="Animesh Prakash's LinkedIn"
              >
                Animesh Prakash
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Contact Information</h3>
            <ul>
              <li className="mb-2">
                Email:{" "}
                <a
                  href="mailto:support@brainwave.com"
                  className="text-indigo-400 hover:underline"
                  aria-label="Email Support"
                >
                  support@brainwave.com
                </a>
              </li>
              <li className="mb-2">
                Phone:{" "}
                <span className="text-indigo-400">
                  +91 81789 68185, +91 98717 52660
                </span>
              </li>
              <li>
                Address:{" "}
                <span className="text-indigo-400">
                  123 BrainWave Street, Tech City
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Resources</h3>
            <ul>
              <li className="mb-2">
                <Link
                  to="/faqs"
                  className="text-indigo-400 hover:underline"
                  aria-label="FAQs"
                >
                  FAQs
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/policy"
                  className="text-indigo-400 hover:underline"
                  aria-label="Privacy Policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-indigo-400 hover:underline"
                  aria-label="Terms and Conditions"
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 my-6"></div>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 text-center lg:text-left mb-4 lg:mb-0">
            &copy; {new Date().getFullYear()} BrainWave, All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              to="/faqs"
              className="text-gray-400 hover:text-white text-sm"
              aria-label="Privacy Policy"
            >
              FAQs
            </Link>
            <Link
              to="/policy"
              className="text-gray-400 hover:text-white text-sm"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white text-sm"
              aria-label="Terms of Service"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
