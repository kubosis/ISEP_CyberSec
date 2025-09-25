// ChangePassword.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { evaluatePassword } from "../utils/passwordUtils";

export default function ChangePassword({ isAdminLoggedIn }) {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Redirect non-admins // Access control:
  // This component automatically redirects users who are not logged in as admin.
  // Backend should also verify admin privileges on the password-change API route.
  useEffect(() => {
    if (!isAdminLoggedIn) navigate("/");
  }, [isAdminLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // Check passwords match
      setDoPasswordsMatch(updatedForm.password === updatedForm.confirmPassword);

      // Evaluate strength if password changes
      // Security note for backend:
      // Password must meet the following rules before being accepted:
      // - At least 12 characters
      // - At least 1 uppercase letter
      // - At least 1 number
      // - At least 1 special character
      // Backend should enforce these rules as well, not just frontend.

      if (name === "password") {
        const result = evaluatePassword(value);
        setPasswordMessage(result.message);
        setPasswordStrength(result.strength);
        setIsPasswordValid(result.isValid);
      }

      return updatedForm;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!doPasswordsMatch) return;

    // Backend integration point:
    // Replace this placeholder with a call to your API endpoint for changing password.
    // Example: await api.changePassword(userId, formData.password);

    setSuccessMessage(`Password for user ${userId} changed successfully!`);
    setTimeout(() => setSuccessMessage(""), 3000);
    setFormData({ password: "", confirmPassword: "" });
    setPasswordStrength(0);
    setPasswordMessage("");
    setIsPasswordValid(false);
    setDoPasswordsMatch(false);
  };

  const getStrengthClass = () => {
    if (passwordStrength < 2) return "strength-weak";
    if (passwordStrength === 2 || passwordStrength === 3) return "strength-moderate";
    if (passwordStrength === 4) return "strength-strong";
    return "";
  };

  const isFormValid = isPasswordValid && doPasswordsMatch;

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <input // Input for new password. Backend must validate all rules.
            type="password"
            name="password"
            placeholder="New Password"
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
          <button
            type="submit"
            disabled={!isFormValid}
            className={`register-btn ${isFormValid ? "enabled-animation" : ""}`}
          >
            Change Password
          </button>
        </form>

        {/* Password strength + requirements */}
        <div className="password-strength">
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

          {/* Confirm password live feedback */}
          {!doPasswordsMatch && formData.confirmPassword.length > 0 && (
            <p className="error-text">Passwords do not match</p>
          )}
        </div>

        {successMessage && <p className="success-text mt-4">{successMessage}</p>}
      </div>
    </div>
  );
}