import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../App";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userEmail } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userEmail) return;

        console.log("Fetching user details with email:", userEmail);
        const response = await axios.get(
          "http://localhost:3000/api/user/profile",
          {
            headers: {
              userEmail: userEmail,
            },
          }
        );

        setUserData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to fetch user details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  if (isLoading) {
    return (
      <div className="text-white text-center">
        <p>Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="text-white p-6 max-w-md mx-auto bg-gray-800 rounded shadow-md">
      {userData ? (
        <div>
          <h1 className="text-xl font-bold mb-4">User Profile</h1>
          <p>
            <strong>First Name:</strong> {userData.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {userData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default User;
