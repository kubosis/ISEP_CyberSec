// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Teams from "./components/Teams";
import Scoreboard from "./components/Rankings";
import TermsOfService from "./components/TermsOfService";
import AcceptableUsePolicy from "./components/AcceptableUsePolicy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import LegalNotice from "./components/LegalNotice";
import ForgotPassword from "./components/forgotpassword";
import Profile from "./components/Profile";
import JoinTeam from "./components/JoinTeam";
import AdminPage from "./components/AdminPage";
import ChangePassword from "./components/ChangePassword";
import NotFound from "./components/NotFound";
import TeamPage from "./components/TeamPage";
import ChallengesPage from "./components/ChallengesPage";
import Contact from "./components/Contact";

function AppContent() {
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [ctfActive, setCtfActive] = useState(true); // Track CTF status

  // On load: check cookies and fetch CTF status
  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    const declined = localStorage.getItem("cookiesDeclined");

    if (!accepted && !declined && location.pathname !== "/privacy-policy") {
      setShowBanner(true);
      document.body.style.overflow = "hidden";
    } else {
      setShowBanner(false);
      document.body.style.overflow = "auto";
    }

    // --- Backend note ---
    // Backend should provide an endpoint like /api/ctf-status that returns:
    // { active: true/false, endsAt: timestamp }
    // Admin panel should call another endpoint /api/ctf-start or /api/ctf-stop
    // which updates the active status and timer on the server.
    // Frontend fetches this endpoint on load or periodically to update ctfActive.

    // Example fetch (not implemented):
    // fetch("/api/ctf-status")
    //   .then(res => res.json())
    //   .then(data => setCtfActive(data.active))
    //   .catch(() => setCtfActive(false));

  }, [location]);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
    document.body.style.overflow = "auto";
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesDeclined", "true");
    setShowBanner(false);
    document.body.style.overflow = "auto";
  };

  // AdminRoute wrapper
  const AdminRoute = ({ children }) => {
    return isAdminLoggedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <>
      <Navbar ctfActive={ctfActive} />

      {/* Cookie banner */}
      {showBanner && (
        <div className="cookie-modal-overlay">
          <div className="cookie-modal">
            <p>
              We use cookies to keep you logged in. By using this site, you agree to our{" "}
              <a href="/privacy-policy" className="underline text-green-400">Privacy Policy</a>.
            </p>
            <div className="cookie-buttons">
              <button onClick={handleAccept} className="accept-btn">Accept</button>
              <button onClick={handleDecline} className="decline-btn">Refuse</button>
            </div>
          </div>
        </div>
      )}

      <main className={`flex-grow pt-40 overflow-y-auto px-4 md:px-8 lg:px-16 ${showBanner ? "blurred" : ""}`}>
        <Routes>
          {/* Home page always accessible */}
          <Route path="/" element={<Home ctfActive={ctfActive} />} />

          {/* Legal documents always accessible */}
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/acceptable-use-policy" element={<AcceptableUsePolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal-notice" element={<LegalNotice />} />

          {/* Gameplay routes */}
          <Route
            path="/Register"
            element={ctfActive ? <Register /> : <Navigate to="/" replace />}
          />
          <Route
            path="/Login"
            element={ctfActive ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/Teams"
            element={ctfActive ? <Teams /> : <Navigate to="/" replace />}
          />
          <Route
            path="/Rankings"
            element={ctfActive ? <Scoreboard /> : <Navigate to="/" replace />}
          />
          <Route
            path="/challenges"
            element={ctfActive ? <ChallengesPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/profile/:username"
            element={ctfActive ? <Profile /> : <Navigate to="/" replace />}
          />
          <Route
            path="/join-team"
            element={ctfActive ? <JoinTeam /> : <Navigate to="/" replace />}
          />
          <Route
            path="/forgotpassword"
            element={ctfActive ? <ForgotPassword /> : <Navigate to="/" replace />}
          />
          <Route
            path="/team/:teamName"
            element={ctfActive ? <TeamPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/contact"
            element={ctfActive ? <Contact /> : <Navigate to="/" replace />}
          />

          {/* Admin routes always accessible */}
          <Route path="/admin" element={<AdminPage setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
          <Route
            path="/admin/change-password/:userId"
            element={
              <AdminRoute>
                <ChangePassword isAdminLoggedIn={isAdminLoggedIn} />
              </AdminRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="mt-8 bg-[rgba(36,36,36,0.85)] backdrop-blur-md rounded-xl shadow-lg p-6 text-center text-gray-200 space-y-4 max-w-5xl mx-auto">
        <p className="font-medium text-sm text-center">
          Authors: Paweł Jamroziak, Jakub Sukdol, Balázs Vincze, Tóth Bertalan, Shane Samuel PRADEEP and Navin Rajendran in affiliation with Institut supérieur d’électronique de Paris
        </p>
        <div className="legal-links flex flex-wrap justify-center gap-4 text-sm">
          <a href="/terms-of-service" className="footer-link">Terms of Service (ToS)</a>
          <a href="/acceptable-use-policy" className="footer-link">Acceptable Use Policy (AUP)</a>
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          <a href="/legal-notice" className="footer-link">Legal Notice / Mentions Légales</a>
        </div>
        <p className="text-xs opacity-70 leading-snug max-w-xl mx-auto">
          Recommended: Desktop or laptop (dual-core 2 GHz CPU, 4 GB RAM) with a modern browser (Chrome, Firefox, Edge, Safari) and minimum 1024×768 resolution. Mobile devices are not supported.
        </p>
        <p className="opacity-80">© 2025 ISEP CTF Platform – All Rights Reserved</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}