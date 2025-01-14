import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/allUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const email = user.email || "";

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDelete = (id) => {
    const userToDelete = users.find((user) => user._id === id);
    const userName = `${userToDelete?.firstName || ""} ${
      userToDelete?.lastName || ""
    }`.trim();
    const confirmDelete = window.confirm(
      `Are you sure your want to delete user ${userName}?`
    );
    if (confirmDelete) {
      const token = localStorage.getItem("token");
      axios
        .delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/deleteUser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          setUsers(users.filter((user) => user._id !== id));
          toast.success(`User ${userName} deleted successfully!`);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("Failed to delete user.");
        });
    } else {
      toast.error("User deletion canceled.");
    }
  };

  return (
    <div className="min-h-full text-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          All Users
        </h1>
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg py-8 px-4">
          <div>
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-md focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="hidden md:block overflow-x-auto my-6 rounded-lg">
            <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-700 text-left text-sm uppercase text-gray-300">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`border-b border-gray-700 ${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                    } hover:bg-gray-700 transition-all`}
                  >
                    <td className="px-4 py-4">{index + 1}</td>{" "}
                    <td className="px-4 py-4">
                      <Link
                        to={`/user/${user._id}`}
                        className="text-blue-400 hover:underline"
                      >
                        {user.firstName} {user.lastName}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      {" "}
                      <Link
                        to={`/user/${user._id}`}
                        className="text-blue-400 hover:underline"
                      >
                        {user.email}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-md transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="block md:hidden mt-6">
          {filteredUsers.map((user, index) => (
            <div
              key={user._id}
              className="bg-gray-800 rounded-lg shadow-lg mb-4 p-4"
            >
              <div className="flex justify-between mb-4">
                <p className="text-sm">
                  <span className="font-bold text-gray-300">#:</span>{" "}
                  {index + 1}
                </p>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-md"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm mb-2">
                <span className="font-bold text-gray-300">Name:</span>{" "}
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm mb-2">
                <span className="font-bold text-gray-300">Email:</span>{" "}
                {user.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
