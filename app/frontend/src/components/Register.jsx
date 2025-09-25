// Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { evaluatePassword } from "../utils/passwordUtils";

  // Security note for backend:
  // Password must meet the following rules before being accepted:
  // - At least 12 characters
  // - At least 1 uppercase letter
  // - At least 1 number
  // - At least 1 special character
  // Backend should enforce these rules as well, not just frontend.


export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Backend must also validate that:
  // - Username is unique
  // - Email is unique and valid
  // Frontend cannot guarantee this.


  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false); // tracks if password meets all requirements
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false); // tracks if password and confirmPassword match

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // Checking if passwords match
      setDoPasswordsMatch(updatedForm.password === updatedForm.confirmPassword);

      // Determining password strength
      if (name === "password") {
        const result = evaluatePassword(value); // On password input change, evaluate password strength and update messages
        setPasswordMessage(result.message);
        setPasswordStrength(result.strength);
        setIsPasswordValid(result.isValid);
      }

      return updatedForm;
    });
  };

// Frontend prevents submission if password is invalid or passwords don't match
// Backend will still validate all fields and reject invalid/duplicate data

  const handleSubmit = (e) => { 
    e.preventDefault();

    if (!isPasswordValid) {
      setErrorMessage("Password is not strong enough");
      setSuccessMessage("");
      return;
    }

    if (!doPasswordsMatch) {
      setErrorMessage("Passwords do not match");
      setSuccessMessage("");
      return;
    }

    // Backend integration point:
    // Replace this dummy logic with an API call to register a new user.
    // Example: await api.registerUser(formData);
    // Backend must also validate that:
    // - Username is unique
    // - Email is unique and valid
    // Frontend cannot guarantee this.


    setErrorMessage("");
    setSuccessMessage("Registration successful!");

    // Redirect after 1 second
    setTimeout(() => {
      navigate("/login"); // redirect to login page
    }, 1000);

    console.log(formData);
  };

  const getStrengthClass = () => {
    if (passwordStrength < 2) return "strength-weak";
    if (passwordStrength === 2 || passwordStrength === 3) return "strength-moderate";
    if (passwordStrength === 4) return "strength-strong";
    return "";
  };

  const isFormValid = isPasswordValid && doPasswordsMatch;

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}> 
          <input // These inputs are required; backend will also validate uniqueness and email format
            type="text" 
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {/* Submit button is enabled only if password is valid and passwords match */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`register-btn ${isFormValid ? "enabled-animation" : ""}`}
          >
            Register
          </button>
        </form>

        {/* Messages */} {/* Error/success messages fade in and disappear automatically on form updates */}
        {errorMessage && (
          <p className="fade-in error-text">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="fade-in success-text">{successMessage}</p>
        )}

        {/* Password strength visual indicator. Valid/invalid classes update dynamically as user types */}
        <div className="password-strength mt-2">
          <h3>Password Requirements</h3>
          <div className="strength-bar">
            <div
              className={`strength-bar-fill ${getStrengthClass()}`}
              style={{ width: `${(passwordStrength / 4) * 100}%` }}
            ></div>
          </div>
          <p>{passwordMessage}</p>
          <ul className="password-rules">
            <li className={formData.password.length >= 12 ? "valid" : "invalid"}>
              At least 12 characters
            </li>
            <li className={/[A-Z]/.test(formData.password) ? "valid" : "invalid"}>
              At least 1 uppercase letter
            </li>
            <li className={/[0-9]/.test(formData.password) ? "valid" : "invalid"}>
              At least 1 number
            </li>
            <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? "valid" : "invalid"}>
              At least 1 special character
            </li>
          </ul>

          {!doPasswordsMatch && formData.confirmPassword.length > 0 && (
            <p className="error-text">Passwords do not match</p>
          )}
        </div>

        <p className="mt-3">
          Already have an account? <Link to="/login" className="text-blue-400 underline">Login</Link>
        </p>
      </div>
    </div>
  );
}