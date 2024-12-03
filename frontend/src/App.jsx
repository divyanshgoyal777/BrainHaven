import React from "react";
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

function AppRoutes() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/roadmaps/:roadmapId" element={<RoadmapDetails />} />
        <Route path="/hackmate" element={<Hackmate />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
