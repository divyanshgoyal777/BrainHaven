import React, { useState } from "react";

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
    { id: 3, name: "Alice Brown", email: "alicebrown@example.com" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    console.log(`User with ID ${id} deleted.`);
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
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-b border-gray-700 ${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                    } hover:bg-gray-700 transition-all`}
                  >
                    <td className="px-4 py-4">{user.id}</td>
                    <td className="px-4 py-4">{user.name}</td>
                    <td className="px-4 py-4">{user.email}</td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleDelete(user.id)}
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
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-gray-800 rounded-lg shadow-lg mb-4 p-4"
            >
              <div className="flex justify-between mb-4">
                <p className="text-sm">
                  <span className="font-bold text-gray-300">ID:</span> {user.id}
                </p>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-md"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm mb-2">
                <span className="font-bold text-gray-300">Name:</span>{" "}
                {user.name}
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
