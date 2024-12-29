import React, { createContext, useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import Signup from "./components/auth/Signup/Signup";
import Login from "./components/auth/Login/Login";
import Home from "./components/home/Home";
import Resources from "./components/resources/Resources";
import PdfViewer from "./components/Resources/PdfViewer";
import Roadmaps from "./components/roadmaps/Roadmaps";
import RoadmapDetails from "./components/roadmaps/RoadmapDetail";
import Hackmate from "./components/hackmate/Hackmate";
import PageNotFound from "./components/PageNotFound";
import PrivacyPolicy from "./components/policy/policy";
import FAQs from "./components/faqs/faqs";
import TermsAndConditions from "./components/terms/Terms";
import User from "./components/user/Dashboard";
import Admin from "./components/admin/Admin";
import UrlViewer from "./components/Resources/UrlViewer";
import ChatButton from "./components/chat/ChatButton";
import UserProfile from "./components/user/UserProfile";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    if (storedToken && storedEmail) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUserEmail(storedEmail);
    }
    setLoading(false);
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
      {!loading && children}
    </AuthContext.Provider>
  );
};

const RouteGuard = ({ element, authOnly }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (authOnly && isAuthenticated)
    return <Navigate to={location.state?.from || "/"} replace />;
  if (!authOnly && !isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return element;
};

const AdminRoute = ({ element }) => {
  const { userEmail } = useAuth();
  const location = useLocation();
  const adminOne = "tonisha24680@gmail.com";
  const adminTwo = "animeshp1607@gmail.com";
  if (userEmail !== adminOne && userEmail !== adminTwo) {
    return <Navigate to={location.state?.from || "/"} replace />;
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
        <Route path="/resources/:degree/:branch/:semester/:subject/:type" element={<PdfViewer />} />
        <Route path="/resources/:degree/:branch/:semester/:subject/:type/videos" element={<UrlViewer />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/user" element={<RouteGuard element={<User />} />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const excludedPaths = ["/login", "/signup", "*"];
  const conditionallyVisiblePaths = ["/faqs", "/policy", "/terms"];
  const isChatButtonVisible =
    !excludedPaths.includes(location.pathname) &&
    (!conditionallyVisiblePaths.includes(location.pathname) || isAuthenticated);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <AppRoutes />
      {isChatButtonVisible && <ChatButton />}
    </>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}