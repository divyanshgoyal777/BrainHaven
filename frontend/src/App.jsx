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
import User from "./components/user/User";
import Admin from "./components/admin/Admin";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    if (storedToken && storedEmail) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUserEmail(storedEmail);
    }
  }, []);

  const login = (token, userEmail) => {
    const tokenWithoutBearer = token.split(" ")[1];
    localStorage.setItem("token", tokenWithoutBearer);
    localStorage.setItem("email", userEmail);
    setToken(token);
    setUserEmail(userEmail);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
    setUserEmail(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, userEmail, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const RouteGuard = ({ element, authOnly }) => {
  const { isAuthenticated } = useAuth();
  if (authOnly && isAuthenticated) return <Navigate to="/" replace />;
  if (!authOnly && !isAuthenticated) return <Navigate to="/login" replace />;
  return element;
};

const AdminRoute = ({ element }) => {
  const { userEmail } = useAuth();
  const adminOne = "tonisha24680@gmail.com";
  const adminTwo = "animeshp1607@gmail.com";
  if (userEmail !== adminOne && userEmail !== adminTwo) {
    return <Navigate to="/" replace />;
  }
  return element;
};

function AppRoutes() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<RouteGuard element={<Login />} authOnly />}
        />
        <Route
          path="/signup"
          element={<RouteGuard element={<Signup />} authOnly />}
        />
        <Route
          path="/resources"
          element={<RouteGuard element={<Resources />} />}
        />
        <Route
          path="/roadmaps"
          element={<RouteGuard element={<Roadmaps />} />}
        />
        <Route
          path="/roadmaps/:roadmapId"
          element={<RouteGuard element={<RoadmapDetails />} />}
        />
        <Route
          path="/hackmate"
          element={<RouteGuard element={<Hackmate />} />}
        />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/user" element={<RouteGuard element={<User />} />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
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
