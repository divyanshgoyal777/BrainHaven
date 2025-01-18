import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CodeUpload = () => {
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [codeItems, setCodeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [codeExist, setCodeExist] = useState(false);

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
      "jQuery",
      "GraphQL",
      "Gatsby",
      "Electron",
      "WebAssembly",
      "Redux",
      "Three.js",
      "D3.js",
      "Vuex",
      "Svelte",
      "Nuxt.js",
      "Meteor.js",
      "Laravel (PHP)",
      "Symfony (PHP)",
      "Ember.js",
      "Foundation",
      "Chakra UI",
      "Material-UI",
      "Ant Design",
      "Semantic UI",
      "Pug (Jade)",
      "Handlebars",
      "Mustache",
      "WebPack",
      "Parcel",
      "Vite",
      "Rollup.js",
      "Babel",
      "ESLint",
      "Prettier",
      "Tailwind CSS",
      "CSS Grid",
      "CSS Flexbox",
      "Framer Motion",
      "Motion UI",
      "Socket.io",
      "PWA (Progressive Web Apps)",
      "AMP (Accelerated Mobile Pages)",
      "Express Validator",
      "Cypress (Testing)",
      "Jest (Testing)",
      "Mocha (Testing)",
      "Chai (Testing)",
      "JQuery UI",
      "Storybook (UI Components)",
      "TestCafe",
      "Puppeteer",
      "React Native",
      "Flutter",
      "Ionic",
      "Cordova",
      "NextAuth.js",
      "Socket.IO",
      "Prisma",
      "Strapi (Headless CMS)",
      "Contentful (Headless CMS)",
      "Sanity (Headless CMS)",
      "Firebase",
      "Supabase",
      "Appwrite",
      "GraphQL Subscriptions",
      "WebRTC",
      "Webpack Dev Server",
      "React Router",
      "React Query",
      "Apollo Client",
      "Redux-Saga",
      "Redux-Thunk",
      "Recoil",
      "Zustand",
      "RxJS",
      "Express.js Middleware",
      "Server-Side Rendering (SSR)",
      "Static Site Generation (SSG)",
      "JAMstack",
      "Cloudflare Workers",
      "Netlify",
      "Vercel",
      "Firebase Hosting",
      "AWS Amplify",
      "Docker for Web Dev",
      "CI/CD for Web Development",
      "GitHub Actions",
      "GitLab CI/CD",
      "Bitbucket Pipelines",
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
      "Bit Manipulation",
      "Trie",
      "Segment Tree",
      "Fenwick Tree",
      "Union-Find",
      "Matrix Algorithms",
      "Topological Sort",
      "Heap",
      "Priority Queue",
      "AVL Tree",
      "Red-Black Tree",
      "B-Tree",
      "B+ Tree",
      "Trie",
      "KMP Algorithm",
      "Knuth-Morris-Pratt Algorithm",
      "Rabin-Karp Algorithm",
      "Manacher's Algorithm",
      "Floyd-Warshall Algorithm",
      "Bellman-Ford Algorithm",
      "Dijkstra's Algorithm",
      "A* Search Algorithm",
      "Kruskal’s Algorithm",
      "Prim’s Algorithm",
      "Ford-Fulkerson Algorithm",
      "Max Flow",
      "Min Cut",
      "Sieve of Eratosthenes",
      "Divide and Conquer",
      "Bitwise Operations",
      "Eulerian Path",
      "Hamiltonian Path",
      "Matrix Exponentiation",
      "Number Theory Algorithms",
      "Morris Traversal",
      "Bloom Filter",
      "Skip List",
      "Hash Map",
      "Circular Queue",
      "Deque",
      "Priority Search Trees",
      "Persistent Data Structures",
      "Advanced Graph Traversal",
      "Heavy-Light Decomposition",
      "Suffix Array",
      "Suffix Tree",
      "LCA (Lowest Common Ancestor)",
      "Maximal Flow Algorithms",
      "Randomized Algorithms",
      "Linear Programming",
      "Knapsack Problem",
      "Subset Sum Problem",
      "Longest Common Subsequence",
      "Longest Increasing Subsequence",
      "Longest Palindromic Subsequence",
      "Edit Distance",
      "Palindrome Partitioning",
      "String Matching Algorithms",
      "Wildcard Matching",
      "Matrix Chain Multiplication",
      "Graph Isomorphism",
      "Top-Down Dynamic Programming",
      "Bottom-Up Dynamic Programming",
      "Sliding Window Technique",
      "Two Pointer Technique",
      "Meet in the Middle",
      "Game Theory Algorithms",
      "Bellman-Ford Algorithm",
      "Topological Sort",
      "Euler Tour Technique",
      "Merging Intervals",
      "Counting Sort",
      "Radix Sort",
      "Bucket Sort",
      "Quickselect",
      "Knapsack DP",
      "Rod Cutting Problem",
      "Fibonacci Heap",
      "Disjoint Set Union (DSU)",
      "Kendall Tau Distance",
      "Trie Matching",
      "Splay Tree",
      "K-d Tree",
      "R-tree",
      "Fenwick Tree (Binary Indexed Tree)",
      "Fibonacci Numbers",
      "Bitwise DP",
      "Subarray Sum Problems",
      "Matrix Decomposition",
      "Hashing with Chaining",
      "Hashing with Open Addressing",
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
      "Perl",
      "Lua",
      "Scala",
      "Elixir",
      "Haskell",
      "Julia",
      "Dart",
      "SQL",
      "VHDL",
      "Solidity",
      "F#",
      "TypeScript",
    ],
    Databases: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "SQLite",
      "Firebase",
      "Redis",
      "Oracle",
      "MariaDB",
      "Cassandra",
      "Elasticsearch",
      "CouchDB",
      "Neo4j",
      "GraphQL Databases",
      "InfluxDB",
      "CockroachDB",
      "ArangoDB",
    ],
    "Cloud Computing": [
      "AWS",
      "Azure",
      "Google Cloud",
      "IBM Cloud",
      "DigitalOcean",
      "Heroku",
      "Docker",
      "Kubernetes",
      "Serverless Computing",
      "CloudFormation",
      "CloudFront",
      "GCP App Engine",
      "Cloud Functions",
    ],
    "Mobile Development": [
      "Android",
      "iOS",
      "Flutter",
      "React Native",
      "SwiftUI",
      "Xamarin",
      "Cordova",
      "Ionic",
      "NativeScript",
      "Kotlin Multiplatform",
    ],
    "Machine Learning & AI": [
      "Supervised Learning",
      "Unsupervised Learning",
      "Reinforcement Learning",
      "Deep Learning",
      "Neural Networks",
      "NLP",
      "Computer Vision",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Keras",
      "OpenCV",
      "Fast.ai",
      "XGBoost",
      "LightGBM",
      "Hugging Face",
      "GPT-3",
      "BERT",
      "AI Ethics",
      "MLOps",
      "AI for Edge Computing",
    ],
    DevOps: [
      "CI/CD",
      "Jenkins",
      "GitLab CI",
      "CircleCI",
      "Ansible",
      "Terraform",
      "Puppet",
      "Chef",
      "Nagios",
      "Prometheus",
      "Kubernetes",
      "Docker Swarm",
      "Vagrant",
      "GitOps",
      "Helm",
      "ArgoCD",
      "Vault",
      "OpenShift",
    ],
    "Blockchain & Cryptography": [
      "Blockchain Development",
      "Ethereum",
      "Solidity",
      "Smart Contracts",
      "Decentralized Finance (DeFi)",
      "NFTs",
      "Bitcoin",
      "Litecoin",
      "Ripple",
      "Hyperledger",
      "Chainlink",
      "Polkadot",
      "Web3.js",
      "IPFS",
      "ZK-Snarks",
      "Cryptography Algorithms",
      "Consensus Mechanisms",
    ],
    Cybersecurity: [
      "Ethical Hacking",
      "Penetration Testing",
      "OWASP Top 10",
      "Network Security",
      "Firewalls",
      "Cryptography",
      "Malware Analysis",
      "Incident Response",
      "Threat Hunting",
      "SIEM",
      "SOC Operations",
      "Identity and Access Management (IAM)",
      "Cloud Security",
      "Red Teaming",
      "Blue Teaming",
      "Zero Trust Architecture",
    ],
    "Game Development": [
      "Unity",
      "Unreal Engine",
      "Godot",
      "Game Design",
      "Cocos2d",
      "Blender (Game Design)",
      "3D Modeling",
      "Game Physics",
      "VR/AR Development",
      "AI in Games",
      "Game Monetization",
      "Multiplayer Networking",
      "Procedural Generation",
      "Game Prototyping",
    ],
    "UI/UX Design": [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Figma",
      "Sketch",
      "Adobe XD",
      "InVision",
      "Usability Testing",
      "Interaction Design",
      "Visual Design",
      "Information Architecture",
      "UI Design Systems",
      "UX Writing",
      "Design Thinking",
      "Accessibility (A11y)",
      "Motion Design",
    ],
  };

  const handleAddCodeItem = () => {
    setCodeItems([...codeItems, { title: "", code: "", description: "" }]);
  };

  const handleRemoveCodeItem = (index) => {
    setCodeItems(codeItems.filter((_, i) => i !== index));
  };

  const handleCodeItemChange = (index, field, value) => {
    const updatedItems = [...codeItems];
    updatedItems[index][field] = value;
    setCodeItems(updatedItems);
  };

  const prepareFormData = () => {
    const formData = new FormData();

    formData.append("primaryCategory", primaryCategory);
    formData.append("subCategory", subCategory);

    const serializedCodeItems = codeItems.map((item) => {
      let codeObject = [];

      if (primaryCategory === "Data Structures and Algorithms (DSA)") {
        codeObject.push(
          { language: "C", snippet: String(item.codeC || "") },
          { language: "C++", snippet: String(item.codeCpp || "") },
          { language: "Java", snippet: String(item.codeJava || "") },
          { language: "Python", snippet: String(item.codePython || "") }
        );
      } else {
        codeObject.push({
          language: subCategory,
          snippet: String(item.codeNormal || ""),
        });
      }

      return {
        title: String(item.title || ""),
        description: String(item.description || ""),
        code: codeObject,
      };
    });

    formData.append("codeItems", JSON.stringify(serializedCodeItems));

    return formData;
  };

  const sameResources = async (e, response) => {
    e.preventDefault();

    if (response === "yes") {
      const formData = prepareFormData();
      formData.append("overWrite", true);

      try {
        const token = localStorage.getItem("token");
        const retryResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/code/uploadCode`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
    } else {
      setCodeExist(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!primaryCategory) return toast.error("Select a primary category");
    if (!subCategory) return toast.error("Select a subcategory");
    if (codeItems.length === 0)
      return toast.error("Add at least one code item");

    for (const item of codeItems) {
      if (!item.title) return toast.error("Enter a title for all code items");
      if (!item.description)
        return toast.error("Provide a description for all items");
    }

    try {
      setIsLoading(true);
      const formData = prepareFormData();
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/code/uploadCode`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Code uploaded successfully!");
        setPrimaryCategory("");
        setSubCategory("");
        setCodeItems([]);
        setCodeExist(false);
      }
    } catch (error) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.message.includes("overwrite")
      ) {
        setCodeExist(true);
      } else {
        const errorMessage =
          error.response?.data?.error || "Upload failed. Try again!";
        toast.error(errorMessage);
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
                    Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      handleCodeItemChange(index, "title", e.target.value)
                    }
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter title for the code"
                    required
                  />
                </div>

                {primaryCategory === "Data Structures and Algorithms (DSA)" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        C Code
                      </label>
                      <textarea
                        value={item.codeC}
                        onChange={(e) =>
                          handleCodeItemChange(index, "codeC", e.target.value)
                        }
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        placeholder="Enter C code here..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        C++ Code
                      </label>
                      <textarea
                        value={item.codeCpp}
                        onChange={(e) =>
                          handleCodeItemChange(index, "codeCpp", e.target.value)
                        }
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        placeholder="Enter C++ code here..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Java Code
                      </label>
                      <textarea
                        value={item.codeJava}
                        onChange={(e) =>
                          handleCodeItemChange(
                            index,
                            "codeJava",
                            e.target.value
                          )
                        }
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        placeholder="Enter Java code here..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Python Code
                      </label>
                      <textarea
                        value={item.codePython}
                        onChange={(e) =>
                          handleCodeItemChange(
                            index,
                            "codePython",
                            e.target.value
                          )
                        }
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        placeholder="Enter Python code here..."
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Code Snippet
                    </label>
                    <textarea
                      value={item.codeNormal}
                      onChange={(e) =>
                        handleCodeItemChange(
                          index,
                          "codeNormal",
                          e.target.value
                        )
                      }
                      className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                      placeholder="Enter code snippet..."
                      required
                    />
                  </div>
                )}

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
        ) : (
          <div className="text-white flex flex-col justify-center">
            <div className="text-center text-2xl font-semibold">
              This Details is already exist.
            </div>
            <div className="text-center text-2xl font-semibold">
              Do you want to replace the Code?
            </div>
            <div className="my-6 w-[50%] m-auto flex flex-col gap-3 ">
              <button
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                onClick={(e) => sameResources(e, "yes")}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Yes, Replace"}
              </button>
              <button
                className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700"
                onClick={(e) => sameResources(e, "no")}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeUpload;
