import React from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import { useAuth } from "../../App";

const PrivacyPolicy = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {!isAuthenticated && <Navbar />}
      <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
        <div className="max-w-6xl mx-auto mt-20">
          <h1 className="text-5xl font-bold text-center mb-12">
            Privacy Policy
          </h1>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <p className="text-lg mb-8">
              Welcome to Brainwave! Your privacy is important to us. This
              Privacy Policy outlines how we collect, use, and protect your
              information.
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              - **Personal Information:** When you sign up or use our platform,
              we collect personal details such as your name, email address, and
              account information. <br />- **Usage Data:** We also collect
              non-personal information about how you interact with our platform,
              such as browsing activity, IP addresses, device types, and
              referring URLs.
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Your information is used to provide and improve our services,
              enhance your user experience, and keep you informed about updates.
              This includes:
              <ul className="list-disc pl-6 mt-4">
                <li>
                  Personalizing your content and recommendations based on your
                  interests.
                </li>
                <li>
                  Communicating important updates, changes, and promotions.
                </li>
                <li>Improving the platform's performance and features.</li>
              </ul>
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">
              3. Data Security
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              We take data security seriously and implement advanced measures to
              protect your personal information. However, no method of
              transmission or electronic storage is 100% secure. While we strive
              to use commercially acceptable means to protect your information,
              we cannot guarantee absolute security.
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">
              4. Sharing Your Information
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              We do not sell, rent, or trade your personal information to third
              parties. However, we may share your information with trusted
              partners or service providers who assist us in operating the
              platform, providing services, or analyzing usage data. These third
              parties are obligated to keep your information confidential and
              only use it for specified purposes.
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">
              5. Your Choices
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              You have the right to:
              <ul className="list-disc pl-6 mt-4">
                <li>Access and update your account information.</li>
                <li>Opt-out of marketing communications at any time.</li>
                <li>
                  Request deletion of your account and personal data (subject to
                  legal obligations).
                </li>
              </ul>
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">6. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you have any questions, concerns, or requests regarding your
              privacy or this policy, please feel free to contact us at{" "}
              <a href="mailto:support@brainwave.com" className="text-blue-400">
                support@brainwave.com
              </a>
              .
            </p>

            <h2 className="text-3xl font-semibold mt-8 mb-4">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Brainwave reserves the right to update or modify this Privacy
              Policy at any time. Any changes will be posted on this page, and
              the "Last Updated" date will be revised accordingly. We encourage
              you to review this page periodically to stay informed about how we
              protect your data.
            </p>
          </div>
        </div>
      </div>
      {!isAuthenticated && <Footer />}
    </>
  );
};

export default PrivacyPolicy;
