import React, { useState } from "react"; 
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CodeUpload = () => {
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [codeItems, setCodeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [codeExist, setCodeExist]= useState(false);
  const [replace, setReplace]= useState(false);

  const categories = {
    "Web Development": [
      "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Angular", "Vue.js", "Node.js", "Express.js", "Tailwind CSS", "Bootstrap", "SASS/SCSS",
    ],
    "Data Structures and Algorithms (DSA)": [
      "Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs", "Hashing", "Sorting Algorithms", "Searching Algorithms", "Dynamic Programming", "Recursion", "Greedy Algorithms", "Backtracking",
    ],
    "Programming Languages": [
      "Python", "Java", "C", "C++", "C#", "JavaScript", "TypeScript", "Ruby", "Go", "Kotlin", "Swift", "PHP", "Rust", "R", "MATLAB",
    ],
  };

  const handleAddCodeItem = () => {
    setCodeItems([...codeItems, { codeImageUrl: null, code: "", description: "" }]);
  };

  const handleRemoveCodeItem = (index) => {
    setCodeItems(codeItems.filter((_, i) => i !== index));
  };

  const handleCodeItemChange = (index, field, value) => {
    const updatedItems = [...codeItems];
    updatedItems[index][field] = value;
    setCodeItems(updatedItems);
  };

  const sameResources=async(e,response)=>{
    e.preventDefault();
      

      if (response==="yes") {
        const formData = new FormData();
        formData.append("primaryCategory", primaryCategory);
        formData.append("subCategory", subCategory);
        formData.append("replace", true); 
        codeItems.forEach((item, index) => {
          formData.append("codeImageUrl", item.codeImageUrl);
          formData.append(`code[${index}]`, item.code);
          formData.append(`description[${index}]`, item.description);
        });

        try {
          const token = localStorage.getItem("token");
          const retryResponse = await axios.post( `${import.meta.env.VITE_API_BASE_URL}/api/code/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, 
            },
          });

          if (retryResponse.status === 200) {
            toast.success("Code replaced successfully!");
            setPrimaryCategory("");
            setSubCategory("");
            setCodeItems([]);
            setCodeExist(false);
          }
        } catch (retryError) {
          console.error("Retry failed:", retryError);
          toast.error("Failed to replace code. Try again!");
        }
      }
      else{
        setCodeExist(false);
      }
      
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    if (!primaryCategory) return toast.error("Select a primary category");
    if (!subCategory) return toast.error("Select a subcategory");
    if (codeItems.length === 0) return toast.error("Add at least one code item");
  
    for (const item of codeItems) {
      if (!item.codeImageUrl) return toast.error("Upload a code image for all items");
      if (!item.code || item.code.length < 10) return toast.error("Enter a valid code snippet for all items");
      if (!item.description) return toast.error("Provide a description for all items");
    }
  
    try {
      setIsLoading(true);
  
      // Construct FormData
      const formData = new FormData();
      formData.append("primaryCategory", primaryCategory);
      formData.append("subCategory", subCategory);
      codeItems.forEach((item, index) => {
        formData.append("codeImageUrl", item.codeImageUrl); // File upload
        formData.append(`code[${index}]`, item.code); // Code snippets
        formData.append(`description[${index}]`, item.description); // Descriptions
      });
  
      const token = localStorage.getItem("token");
      const response = await axios.post( `${import.meta.env.VITE_API_BASE_URL}/api/code/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (response.status === 200) {
        toast.success("Code uploaded successfully!");
        setPrimaryCategory("");
        setSubCategory("");
        setCodeItems([]);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        const existingCode = error.response.data.data;
  
        setCodeExist(true);
  
      
      } else {
        console.error("Upload failed:", error);
        toast.error("Upload failed. Try again!");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className="min-h-screen text-white">
      <Toaster />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Upload Code
        </h1>

      {!codeExist ? (
            <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Primary Category</label>
              <select
                value={primaryCategory}
                onChange={(e) => setPrimaryCategory(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Primary Category</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-2">Subcategory</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                disabled={!primaryCategory}
              >
                <option value="">Select Subcategory</option>
                {primaryCategory && categories[primaryCategory].map((subcategory) => (
                  <option key={subcategory} value={subcategory}>{subcategory}</option>
                ))}
              </select>
            </div>
  
            {codeItems.map((item, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Code Image</label>
                  <input
                    type="file"
                    onChange={(e) => handleCodeItemChange(index, "codeImageUrl", e.target.files[0])}
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    accept="image/*"
                    required
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium mb-2">Code Snippet</label>
                  <textarea
                    value={item.code}
                    onChange={(e) => handleCodeItemChange(index, "code", e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Enter code snippet..."
                    required
                  ></textarea>
                </div>
  
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleCodeItemChange(index, "description", e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Short description about the code"
                    required
                  />
                </div>
  
                <button
                  type="button"
                  onClick={() => handleRemoveCodeItem(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
  
            <button
              type="button"
              onClick={handleAddCodeItem}
              className="w-full bg-green-500 text-white py-2 rounded-lg"
            >
              Add Code
            </button>
  
            <div className="text-center mt-6">
              <button
                type="submit"
                className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg rounded-lg ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload Code"}
              </button>
            </div>
          </form>
      ):(
        <>
        <div className="text-white flex flex-col justify-center">
          <div>This Details is already exist.</div>
          <div>Do you want to replace the Code?</div>
        <button
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all"
          onClick={(e) => sameResources(e, "yes")}
        >
          yes
        </button>
        <button
          className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700"
          onClick={(e) => sameResources(e, "no")}
        >
          No
        </button>
        </div>
      </>

      )}
       
      </div>
    </div>
  );
};

export default CodeUpload;
