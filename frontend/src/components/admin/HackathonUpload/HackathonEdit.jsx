import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const HackathonEdit = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    isOnline: false,
    location: "",
    timing: "",
    prizeMoney: 0,
    teamSizeMax: 0,
    registerByDate: "",
    categories: "",
    eligibilityCriteria: "",
    registrationLink: "",
  });

  const fetchHackathons = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/allHackathon`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setHackathons(response.data || []);
    } catch (error) {
      console.error("Error fetching hackathons:", error);
      toast.error("Failed to fetch hackathons");
    } finally {
      setLoading(false);
    }
  };

  const deleteHackathon = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/deleteHackathon/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setHackathons(hackathons.filter((hackathon) => hackathon._id !== id));
      toast.success("Hackathon deleted successfully");
    } catch (error) {
      console.error("Error deleting hackathon:", error);
      toast.error("Failed to delete hackathon");
    }
  };

  const editHackathon = (hackathon) => {
    if (!hackathon) {
      toast.error("Please select a hackathon to edit.");
      return;
    }
    setEdit(true);
    setSelectedHackathon({ ...hackathon });
  };

  const saveHackathon = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication token is missing. Please log in.");
        return;
      }

      if (!selectedHackathon || !selectedHackathon._id) {
        toast.error("Selected hackathon is invalid or missing.");
        return;
      }

      console.log("Attempting to update Hackathon:", selectedHackathon);

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/hackathon/editHackathon/${selectedHackathon._id}`,
        selectedHackathon,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", response.data);

      if (response.status === 200) {
        if (!response.data || !response.data._id) {
          toast.error("Hackathon not found");
          return;
        }
        toast.success("Hackathon edited successfully");
        setEdit(false);
        fetchHackathons();
      } else {
        throw new Error(response.data.message || "Failed to edit hackathon");
      }
    } catch (error) {
      console.error("Error editing hackathon:", error);

      if (error.response) {
        toast.error(error.response.data.message || "Failed to edit hackathon");
      } else {
        toast.error("Failed to edit hackathon");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  

  useEffect(() => {
    fetchHackathons();
  }, []);


  return (
    <div className="min-h-screen text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Edit Hackathons
        </h1>
        {!edit ? (<div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg py-8 px-4">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            {loading ? (
              <div className="text-center text-xl text-blue-400 animate-pulse">
                Loading hackathons...
              </div>
            ) : hackathons.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {hackathons.map((hackathon) => (
                  <div
                    key={hackathon._id}
                    className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-all"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {hackathon.name}
                    </h3>
                    <p className="text-sm text-gray-300">
                      Date: {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                      {new Date(hackathon.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-300">
                      Location: {hackathon.isOnline ? "Online" : hackathon.location}
                    </p>
                    <div className="mt-4 flex gap-4">
                      <button
                        onClick={() => editHackathon(hackathon)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm shadow-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteHackathon(hackathon._id)}
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-lg text-gray-400">
                No hackathons found.
              </p>
            )}
          </div>
        </div>) : (<div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg py-8 px-4">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6">Edit Hackathon</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedHackathon.name}
                  onChange={(e) =>
                    setSelectedHackathon({
                      ...selectedHackathon,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
             
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  value={selectedHackathon.description}
                  onChange={(e) =>
                    setSelectedHackathon({


                      ...selectedHackathon,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formatDate(selectedHackathon.startDate)}
                  onChange={(e) =>
                    setSelectedHackathon({
                      ...selectedHackathon,
                      startDate: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  End Date
                </label>
                <input
                  type="date"
                  value={formatDate(selectedHackathon.endDate)}
                  onChange={(e) =>
                    setSelectedHackathon({
                      ...selectedHackathon,
                      endDate: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Is Online
                </label>
                <input
                  type="checkbox"
                  checked={selectedHackathon.isOnline}
                  onChange={(e) =>
                    setSelectedHackathon({
                      ...selectedHackathon,
                      isOnline: e.target.checked,
                    })
                  }
                  className="p-2 bg-gray-700 text-white"
                />
              </div>
             {selectedHackathon.isOnline ? null :(
               <div className="mb-4">
               <label className="block text-sm font-medium text-gray-300">
                 Location
               </label>
               <input

                 type="text"
                 value={selectedHackathon.location}
                 onChange={(e) =>
                   setSelectedHackathon({
                     ...selectedHackathon,
                     location: e.target.value,
                   })
                 }
                 className="w-full p-2 rounded-lg bg-gray-700 text-white"
               />
             </div>
             )} 
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Timing
                </label>
                <input
                  type="text"
                  value={selectedHackathon.timing}
                  onChange={(e) =>
                    setSelectedHackathon({
                      ...selectedHackathon,
                      timing: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Prize Money
                </label>
                <input
                  type="number"
                  value={selectedHackathon.prizeMoney}
                  onChange={(e) =>
                    setSelectedHackathon({
                      ...selectedHackathon,

                      prizeMoney: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Team Size Max
                </label>
                <input
                  type="number"
                  value={selectedHackathon.teamSizeMax}
                  onChange={(e) =>
                    setSelectedHackathon({
                      ...selectedHackathon,
                      teamSizeMax: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Register By Date
                </label>
                <input

                  type="date"
                  value={formatDate(selectedHackathon.registerByDate)}
                  onChange={(e) =>
                    setSelectedHackathon({
                      ...selectedHackathon,
                      registerByDate: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Categories
                </label>
                <input

                  type="text"
                  value={selectedHackathon.categories}
                  onChange={(e) =>
                    setSelectedHackathon({
                      ...selectedHackathon,
                      categories: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Eligibility Criteria
                </label>
                <input

                  type="text"
                  value={selectedHackathon.eligibilityCriteria}
                  onChange={(e) =>
                    setSelectedHackathon({
                      ...selectedHackathon,
                      eligibilityCriteria: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Registration Link
                </label>
                <input

                  type="text"
                  value={selectedHackathon.registrationLink}
                  onChange={(e) =>
                    setSelectedHackathon({
                      ...selectedHackathon,
                      registrationLink: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>

              {/* Add other fields as needed */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={saveHackathon}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setEdit(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default HackathonEdit;
