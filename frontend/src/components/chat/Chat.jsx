import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useAuth } from "../../App";
import io from "socket.io-client";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import BrainHavenFaviconNoBackground from "../../assets/img/BrainHavenFaviconNoBackground.png";

const socket = io(`${import.meta.env.VITE_API_BASE_URL}`);

const Chat = ({ isOpen, toggleChat }) => {
  const { userEmail } = useAuth();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [userPic, setUserPic] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/chat/chatMessages`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserMessages(response.data);
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/userProfile`,
          {
            headers: { userEmail, Authorization: `Bearer ${token}` },
          }
        );
        setUserPic(
          response.data.profilePhoto || userEmail.charAt(0).toUpperCase()
        );
        setUserName(response.data.firstName + " " + response.data.lastName);
        setUserId(response.data._id);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchMessages();
    fetchUserProfile();

    socket.on("chat message", (msg) => {
      if (msg.chatType === "group") {
        setUserMessages((prevMessages) => [...prevMessages, msg]);
        scrollToBottom();
      }
    });

    return () => {
      socket.off("chat message");
    };
  }, [userEmail]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      user: userName,
      msg: message,
      userPic: userPic || userEmail.charAt(0).toUpperCase(),
      chatType: "group",
      userId: userId,
      createdAt: new Date().toISOString(),
    };

    socket.emit("group chat message", newMessage);
    setMessage("");
    scrollToBottom();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const renderUserPic = (pic, userId) => {
    const profileLink = `/user/${userId}`;
    if (pic.length === 1) {
      return (
        <Link to={profileLink}>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
            {pic}
          </div>
        </Link>
      );
    } else {
      return (
        <Link to={profileLink}>
          <img src={pic} alt="Profile" className="w-10 h-10 rounded-full" />
        </Link>
      );
    }
  };

  return (
    <div
      className={`z-50 fixed bottom-0 right-0 w-full h-[90vh] max-w-[85vw] md:max-w-4xl bg-gray-900 text-white shadow-xl rounded-t-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between rounded-t-lg">
        <img
          src={BrainHavenFaviconNoBackground}
          alt="BrainHaven Logo"
          width={30}
        />
        <h3 className="text-lg font-bold bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent ">
          BrainHaven Chat
        </h3>
        <IoMdClose
          size={24}
          className="cursor-pointer hover:text-gray-300"
          onClick={toggleChat}
        />
      </div>

      <div
        className="p-4 overflow-y-auto flex-1"
        style={{ maxHeight: "calc(90vh - 150px)" }}
      >
        <div className="space-y-2">
          {userMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.user === userName ? "justify-end" : "justify-start"
              }`}
            >
              {msg.user !== userName && (
                <div className="mr-2">
                  {renderUserPic(msg.userPic, msg.userId)}
                </div>
              )}
              <div
                className={`bg-gray-700 p-3 rounded-lg max-w-[75%] ${
                  msg.user === userName ? "rounded-tr-none" : "rounded-tl-none"
                }`}
              >
                <p className="font-semibold text-sm">{msg.user}</p>
                <p className="text-sm">{msg.msg}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {format(new Date(msg.createdAt), "MMM dd, yyyy hh:mm a")}
                </p>
              </div>
              {msg.user === userName && (
                <div className="ml-2">
                  {renderUserPic(msg.userPic, msg.userId)}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all duration-300"
          >
            <IoSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
