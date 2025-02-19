import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import io from "socket.io-client";

const HackmateChat = () => {
  const { teamId } = useParams();
  const { userEmail } = useAuth();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    document.title = "BrainHaven - Hackmate Chat";
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("token");
      if (!userEmail || !token) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/userProfile`,
          {
            headers: {
              userEmail,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserId(response.data._id);
        setUserName(response.data.firstName + " " + response.data.lastName);
      } catch (error) {
        toast.error("Failed to fetch user details. Please try again.");
        console.error("Failed to fetch user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserId();
  }, [userEmail]);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token is missing.");
        return;
      }

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/hackmateChat/chat/${teamId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.messages) {
          setMessages(response.data.messages);
          scrollToBottom();
        } else {
          toast.error("No messages found.");
        }
      } catch (error) {
        toast.error(error.response?.data.error);
        console.error(
          "Failed to fetch messages:",
          error.response?.data || error
        );
      }
    };
    fetchMessages();
  }, [teamId]);

  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_API_BASE_URL}`);

    socket.current.on("hackmate previous messages", (messages) => {
      setMessages(messages);
      scrollToBottom();
    });

    socket.current.on("hackmate chat message", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          ...msg,
          senderName: msg.senderName || userName,
          timestamp: new Date().toISOString(),
        },
      ]);
      scrollToBottom();
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    try {
      const newMsg = {
        userId,
        senderName: userName,
        message: newMessage,
        teamId,
      };

      socket.current.emit("hackmate group chat message", newMsg);

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/hackmateChat/chat/${teamId}`,
        newMsg,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      toast.error("Failed to send message.");
      console.error("Failed to send message:", error.response?.data || error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-6 mt-24 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Chat Room</h1>
        <div className="bg-gray-800 p-4 rounded-lg mb-4 max-h-96 overflow-y-auto w-full max-w-md">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className="text-green-400">{msg.senderName}:</span>{" "}
              <span className="whitespace-pre-line">{msg.message}</span>
              <div className="text-xs text-gray-400">
                {formatDate(msg.timestamp)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2 w-full max-w-md flex-wrap">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-gray-700 p-3 rounded-lg text-white w-full sm:w-auto"
            placeholder="Type a message..."
            rows={1}
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 w-full sm:w-auto"
            disabled={!newMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default HackmateChat;
