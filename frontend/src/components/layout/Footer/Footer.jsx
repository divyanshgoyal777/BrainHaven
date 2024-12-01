import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#10051a] text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">Contact Information</h3>
            <ul>
              <li className="mb-2">
                Email:{" "}
                <a
                  href="mailto:support@brainwave.com"
                  className="text-indigo-400 hover:underline"
                >
                  support@brainwave.com
                </a>
              </li>
              <li className="mb-2">
                Phone:{" "}
                <a
                  href="tel:+1234567890"
                  className="text-indigo-400 hover:underline"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                Address:{" "}
                <span className="text-gray-300">
                  123 BrainWave Street, Tech City
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Follow Us</h3>
            <ul>
              <li className="mb-2">
                LinkedIn:{" "}
                <a
                  href="https://linkedin.com/company/brainwave"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  BrainWave
                </a>
              </li>
              <li className="mb-2">
                Instagram:{" "}
                <a
                  href="https://instagram.com/brainwave"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  @brainwave
                </a>
              </li>
              <li>
                YouTube:{" "}
                <a
                  href="https://youtube.com/c/brainwave"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  BrainWave Channel
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Resources</h3>
            <ul>
              <li className="mb-2">
                FAQ:{" "}
                <a href="/faq" className="text-indigo-400 hover:underline">
                  Find answers to frequently asked questions about BrainWave.
                </a>
              </li>
              <li className="mb-2">
                Terms & Conditions:{" "}
                <a href="/terms" className="text-indigo-400 hover:underline">
                  Learn about the rules and policies that govern your use of
                  BrainWave.
                </a>
              </li>
              <li>
                Privacy Policy:{" "}
                <a
                  href="/privacy-policy"
                  className="text-indigo-400 hover:underline"
                >
                  Understand how we protect your data and privacy.
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 my-6"></div>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 text-center lg:text-left mb-4 lg:mb-0">
            © 2024 BrainWave, All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="/privacy-policy"
              className="text-gray-400 hover:text-white text-sm"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
