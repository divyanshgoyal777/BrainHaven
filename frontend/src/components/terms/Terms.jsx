import React from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import { useAuth } from "../../App";

const TermsAndConditions = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {!isAuthenticated && <Navbar />}
      <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
        <div className="max-w-6xl mx-auto mt-20">
          <h1 className="text-5xl font-bold text-center mb-12">
            Terms and Conditions
          </h1>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <p className="text-lg mb-8">
              By accessing and using BrainHaven, you agree to comply with the
              following Terms and Conditions. Please read them carefully before
              using the platform.
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">
              1. Use of Service
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              You agree to use BrainHaven only for lawful purposes and in a
              manner that does not infringe the rights of others or restrict
              their use of the platform. Prohibited activities include, but are
              not limited to:
              <ul className="list-disc pl-6 mt-4">
                <li>
                  Uploading, posting, or sharing harmful or unlawful content.
                </li>
                <li>Engaging in fraudulent activities.</li>
                <li>
                  Accessing unauthorized areas of the platform or attempting to
                  disrupt its normal functioning.
                </li>
              </ul>
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">
              2. Limitation of Liability
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              BrainHaven is not responsible for any damages, including but not
              limited to, loss of data, business interruption, or any other
              indirect, incidental, special, or consequential damages arising
              from the use or inability to use the platform, even if we have
              been advised of the possibility of such damages.
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">
              3. Changes to Terms
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              We reserve the right to update or modify these Terms and
              Conditions at any time. Any changes will be posted on this page,
              and the "Last Updated" date will be revised accordingly. By
              continuing to use the platform after any changes, you accept the
              revised Terms and Conditions.
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">
              4. Termination of Account
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              BrainHaven reserves the right to suspend or terminate your account
              and access to the platform if you violate these Terms and
              Conditions. In the event of termination, you must immediately
              cease using the platform and any content you have downloaded or
              accessed.
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">
              5. Privacy and Data Collection
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Your use of BrainHaven is also governed by our Privacy Policy,
              which outlines how we collect, use, and protect your personal
              data. Please review our Privacy Policy for more details on how we
              handle your information.
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">6. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you have any questions regarding these Terms and Conditions,
              please contact us at{" "}
              <a
                href="mailto:brainhaven777@gmail.com"
                className="text-blue-400"
              >
                brainhaven777@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      {!isAuthenticated && <Footer />}
    </>
  );
};

export default TermsAndConditions;
