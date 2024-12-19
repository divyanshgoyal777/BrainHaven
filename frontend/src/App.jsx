import React, { createContext, useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import Signup from "./components/auth/Signup/Signup";
import Login from "./components/auth/Login/Login";
import Home from "./components/home/Home";
import Resources from "./components/resources/Resources";
import Roadmaps from "./components/roadmaps/Roadmaps";
import RoadmapDetails from "./components/roadmaps/RoadmapDetail";
import Hackmate from "./components/hackmate/Hackmate";
import PageNotFound from "./components/PageNotFound";
import PrivacyPolicy from "./components/policy/policy";
import FAQs from "./components/faqs/faqs";
import TermsAndConditions from "./components/terms/Terms";
import ResourcesDetail from "./components/resources/ResourcesDetail";
import ResourcePdf from "./components/resources/ResourcePdf";
import User from "./components/user/User"

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail]= useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    if (token) {
      setIsAuthenticated(true);
      if (email) setUserEmail(email);
    }
  }, []);

  const login = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userEmail", email); 
    setIsAuthenticated(true);
    setUserEmail(email);
    
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserEmail("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const AuthOnlyRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : element;
};

function AppRoutes() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthOnlyRoute element={<Login />} />} />
        <Route
          path="/signup"
          element={<AuthOnlyRoute element={<Signup />} />}
        />
        <Route
          path="/resources"
          element={<ProtectedRoute element={<Resources />} />}
        />
        <Route
          path="/resources/:resourceId"
          element={<ProtectedRoute element={<ResourcesDetail />} />}
        />
        <Route
          path="/resources/:resourceId/:section/:activeSemester/:selectedSubject"
          element={<ProtectedRoute element={<ResourcePdf />} />}
        />
        <Route
          path="/roadmaps"
          element={<ProtectedRoute element={<Roadmaps />} />}
        />
        <Route
          path="/roadmaps/:roadmapId"
          element={<ProtectedRoute element={<RoadmapDetails />} />}
        />
        <Route
          path="/hackmate"
          element={<ProtectedRoute element={<Hackmate />} />}
        />
        <Route path="/faqs" element={<ProtectedRoute element={<FAQs />} />} />
        <Route
          path="/policy"
          element={<ProtectedRoute element={<PrivacyPolicy />} />}
        />
         <Route
          path="/user"
          element={<ProtectedRoute element={<User />} />}
        />
        <Route
          path="/terms"
          element={<ProtectedRoute element={<TermsAndConditions />} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
