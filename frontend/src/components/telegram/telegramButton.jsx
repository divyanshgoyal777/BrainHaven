import React from "react";
import { FaTelegramPlane } from "react-icons/fa";

const TelegramButton = () => {
  const telegramLink = "https://t.me/brainhaven";

  return (
    <a
      href={telegramLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 sm:bottom-5 bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg cursor-pointer transform transition-transform hover:scale-110"
      style={{
        right: "74px",
      }}
    >
      <FaTelegramPlane size={30} />
    </a>
  );
};

export default TelegramButton;
