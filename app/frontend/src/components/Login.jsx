// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Small component for showing feedback messages
function Feedback({ message, type }) {
  if (!message) return null;
  const className = type === "error" ? "error-text fade-in" : "success-text fade-in";
  return <p className={className}>{message}</p>;
}

export default function Login() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // API call loading state

  // Feedback messages
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Trim spaces immediately for input sanitization
    setFormData((prev) => ({ ...prev, [name]: value.trimStart() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      setErrorMessage("Please fill out all fields.");
      setSuccessMessage("");
      return;
    }

    setLoading(true); // Disable submit button and show spinner
    setErrorMessage("");
    setSuccessMessage("");

    // --- Backend Integration Notes ---
    // TODO: Replace this dummy login logic with a real API call
    // Example:
    // fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setLoading(false);
    //     if (data.success) {
    //       navigate("/"); // redirect to home/dashboard
    //     } else {
    //       setErrorMessage(data.message || "Invalid credentials.");
    //     }
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //     setErrorMessage("Server error. Try again later.");
    //   });

    // Dummy frontend login logic (kept for testing)
    setTimeout(() => {
      if (email === "user@example.com" && password === "123456") {
        setSuccessMessage("Logged in successfully!");
        setErrorMessage("");
        setLoading(false);
        setTimeout(() => navigate("/"), 1000);
      } else {
        setErrorMessage("Invalid email or password.");
        setSuccessMessage("");
        setLoading(false);
      }
    }, 800);
  };

  const handleForgotPassword = () => {
    // --- Backend Integration Note ---
    // Password reset is handled manually by the administrator.
    setTimeout(() => navigate("/forgotpassword"), 200);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="enabled-animation" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Feedback messages */}
        <Feedback message={errorMessage} type="error" />
        <Feedback message={successMessage} type="success" />

        <button
          type="button"
          onClick={handleForgotPassword}
          className="enabled-animation forgot-btn mt-3"
        >
          Forgot Password?
        </button>

        <p className="mt-3 text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}