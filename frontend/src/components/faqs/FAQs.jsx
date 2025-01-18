import React, { useEffect } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import { useAuth } from "../../App";

const FAQs = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = "BrainHaven - FAQs";
  }, []);

  const faqs = [
    {
      question: "What is Brainhaven?",
      answer:
        "Brainhaven is an innovative platform designed to provide the latest resources, guide users with curated roadmaps, keep you updated on hackathons, and enable seamless team creation for collaborative projects.",
    },
    {
      question: "How can I find resources on Brainhaven?",
      answer:
        "Brainhaven offers an extensive library of resources across various domains such as web development, diplomas, B.Tech, and more. You can easily search and filter resources that align with your interests and goals.",
    },
    {
      question: "What are roadmaps on Brainhaven?",
      answer:
        "Roadmaps on Brainhaven are detailed, step-by-step guides that help you master specific skills or domains. These roadmaps are carefully curated by Brainhaven to provide a structured learning path.",
    },
    {
      question: "How do hackathons work on Brainhaven?",
      answer:
        "Brainhaven lists the latest hackathons happening around you. You can browse hackathon, register directly through their platforms, and create or join teams to compete with like-minded individuals.",
    },
    {
      question: "How can I create a team?",
      answer:
        "To create a team, go to the 'Hackmate' section on Brainhaven. Provide a team name, description, and send team link to members. You can also accept or decline requests from others who wish to join your team.",
    },
    {
      question: "Can I join an existing team for a hackathon?",
      answer:
        "Yes, you can explore public teams in the 'Hackmate' section and request to join. Team admins can review and approve your request. Once approved, you'll be added to the team and can start collaborating.",
    },
    {
      question: "Is there a community chat on Brainhaven?",
      answer:
        "Absolutely! Brainhaven features a community chat where every member can communicate with everyone. It’s a space to share knowledge, ask questions, and collaborate with fellow innovators and learners. Simply start the chat in the bottom right corner of the page to connecting!",
    },
    {
      question: "Is Brainhaven free to use?",
      answer:
        "Yes, Brainhaven is completely free to use. Enjoy access to essential features and resources at no cost. Don’t forget to share our platform with your friends, groups, and everyone you know to help us grow!",
    },
  ];

  return (
    <>
      {!isAuthenticated && <Navbar />}
      <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
        <div className="max-w-6xl mx-auto mt-20">
          <h1 className="text-5xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h1>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`mb-8 ${
                  index !== faqs.length - 1
                    ? "border-b border-gray-700 pb-6"
                    : ""
                }`}
              >
                <h2 className="text-2xl font-semibold mb-3">{faq.question}</h2>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isAuthenticated && <Footer />}
    </>
  );
};

export default FAQs;
