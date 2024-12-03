import React from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const FAQs = () => {
  const faqs = [
    {
      question: "What is Brainwave?",
      answer:
        "Brainwave is a dynamic platform designed to provide the latest resources, guide users with curated roadmaps, help them participate in hackathons, and enable seamless team creation for collaborative projects.",
    },
    {
      question: "How can I find resources on Brainwave?",
      answer:
        "Brainwave offers a comprehensive library of resources across various domains such as Web development, Diploma, B.Tech, and more. You can search, filter the resources that align with your interests and goals.",
    },
    {
      question: "What are roadmaps on Brainwave?",
      answer:
        "Roadmaps on Brainwave are step-by-step guides designed to help you master specific skills or domains. These roadmaps are curated by BrainWave.",
    },
    {
      question: "How do hackathons work on Brainwave?",
      answer:
        "Brainwave lists the latest hackathons happening. You can browse upcoming events, register directly through the platform, and create or join teams to compete in hackathons with like-minded individuals.",
    },
    {
      question: "How can I create a team for a hackathon?",
      answer:
        "To create a team, navigate to the 'Teams' section on Brainwave. Provide a team name, description, and add members by sending them invites. You can also accept or decline requests from others who wish to join your team.",
    },
    {
      question: "Can I join an existing team for a hackathon?",
      answer:
        "Yes, you can explore public teams in the 'Teams' section and request to join. Team admins can review and approve your request. Once approved, you’ll be added to the team and can start collaborating.",
    },
    {
      question: "Are there community features on Brainwave?",
      answer:
        "Absolutely! Brainwave fosters a collaborative environment where users can connect, share knowledge, and discuss projects. Join our community forums to engage with other innovators and learners.",
    },
    {
      question: "Is Brainwave free to use?",
      answer:
        "Brainwave offers both free and premium plans. While the free plan includes access to essential features, the premium plan unlocks advanced tools such as exclusive resources, premium roadmaps, and priority support.",
    },
    {
      question: "How do I stay updated about new features or hackathons?",
      answer:
        "You can subscribe to our newsletter or follow Brainwave on social media for the latest updates on features, resources, hackathons, and team collaboration tools.",
    },
  ];

  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
};

export default FAQs;
