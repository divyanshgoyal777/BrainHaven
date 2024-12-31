import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const CodeUpload = () => {
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [codeItems, setCodeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = {
    "Web Development": [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Angular",
      "Vue.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Bootstrap",
      "SASS/SCSS",
    ],
    "Data Structures and Algorithms (DSA)": [
      "Arrays",
      "Linked Lists",
      "Stacks",
      "Queues",
      "Trees",
      "Graphs",
      "Hashing",
      "Sorting Algorithms",
      "Searching Algorithms",
      "Dynamic Programming",
      "Recursion",
      "Greedy Algorithms",
      "Backtracking",
    ],
    "Programming Languages": [
      "Python",
      "Java",
      "C",
      "C++",
      "C#",
      "JavaScript",
      "TypeScript",
      "Ruby",
      "Go",
      "Kotlin",
      "Swift",
      "PHP",
      "Rust",
      "R",
      "MATLAB",
    ],
    "Mobile App Development": [
      "React Native",
      "Flutter",
      "Kotlin",
      "Swift",
      "Android SDK",
      "iOS Development",
      "Xamarin",
      "Ionic",
    ],
    "Database Management": [
      "SQL",
      "NoSQL",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Firebase",
      "Redis",
      "Cassandra",
      "Oracle DB",
    ],
    "Cloud Computing": [
      "AWS",
      "Google Cloud Platform",
      "Microsoft Azure",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Serverless Computing",
      "Firebase",
    ],
    "DevOps and Automation": [
      "Jenkins",
      "GitHub Actions",
      "Ansible",
      "Terraform",
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
    ],
    "Artificial Intelligence (AI)": [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing (NLP)",
      "Computer Vision",
      "Reinforcement Learning",
      "AI Ethics",
      "OpenAI APIs",
      "TensorFlow",
      "PyTorch",
    ],
    "Data Science": [
      "Data Visualization",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Data Cleaning",
      "Data Analysis",
      "Big Data",
      "Hadoop",
      "Spark",
    ],
    Cybersecurity: [
      "Ethical Hacking",
      "Network Security",
      "Cryptography",
      "Penetration Testing",
      "Malware Analysis",
      "Firewall Configurations",
      "OWASP Top 10",
      "Cybersecurity Tools",
    ],
    "Blockchain Development": [
      "Ethereum",
      "Solidity",
      "Smart Contracts",
      "Bitcoin",
      "Hyperledger",
      "NFT Development",
      "Web3.js",
      "Truffle",
      "Hardhat",
    ],
    "Game Development": [
      "Unity",
      "Unreal Engine",
      "Game Physics",
      "2D Game Development",
      "3D Game Development",
      "Godot",
      "Cocos2d",
      "Pygame",
    ],
    "UI/UX Design": [
      "Wireframing",
      "Prototyping",
      "Figma",
      "Adobe XD",
      "Sketch",
      "Usability Testing",
      "Interaction Design",
      "User Research",
    ],
    Others: [
      "General Programming",
      "Coding Challenges",
      "Interview Questions",
      "Competitive Programming",
      "Open Source Projects",
    ],
  };

  const handleAddCodeItem = () => {
    setCodeItems([
      ...codeItems,
      { codeImageUrl: null, code: "", description: "" },
    ]);
  };

  const handleRemoveCodeItem = (index) => {
    setCodeItems(codeItems.filter((_, i) => i !== index));
  };

  const handleCodeItemChange = (index, field, value) => {
    const updatedItems = [...codeItems];
    updatedItems[index][field] = value;
    setCodeItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!primaryCategory) return toast.error("Select a primary category");
    if (!subCategory) return toast.error("Select a subcategory");
    if (codeItems.length === 0)
      return toast.error("Add at least one code item");

    for (const item of codeItems) {
      if (!item.codeImageUrl)
        return toast.error("Upload a code image for all items");
      if (!item.code || item.code.length < 10)
        return toast.error("Enter a valid code snippet for all items");
      if (!item.description)
        return toast.error("Provide a description for all items");
    }

    setIsLoading(true);
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Uploading...",
      success: "Code uploaded successfully!",
      error: "Upload failed. Try again!",
    });

    setTimeout(() => {
      setPrimaryCategory("");
      setSubCategory("");
      setCodeItems([]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="min-h-screen text-white">
        <Toaster />
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Upload Code
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                Primary Category
              </label>
              <select
                value={primaryCategory}
                onChange={(e) => setPrimaryCategory(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Primary Category</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Subcategory
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                disabled={!primaryCategory}
              >
                <option value="">Select Subcategory</option>
                {primaryCategory &&
                  categories[primaryCategory].map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
              </select>
            </div>

            {codeItems.map((item, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Code Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleCodeItemChange(
                        index,
                        "codeImageUrl",
                        e.target.files[0]
                      )
                    }
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    accept="image/*"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Code Snippet
                  </label>
                  <textarea
                    value={item.code}
                    onChange={(e) =>
                      handleCodeItemChange(index, "code", e.target.value)
                    }
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Enter code snippet..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleCodeItemChange(index, "description", e.target.value)
                    }
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
        </div>
      </div>
    </>
  );
};

export default CodeUpload;
