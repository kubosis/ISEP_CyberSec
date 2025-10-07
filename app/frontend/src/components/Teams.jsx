// Teams.jsx
import React, { useState } from "react";

export default function Teams() {
  const [teamName, setTeamName] = useState("");
  const [teamPassword, setTeamPassword] = useState("");
  const [inviteToken, setInviteToken] = useState(""); // unique token placeholder
  const [message, setMessage] = useState("");

  // Handles team creation (frontend demo only)
  const handleCreateTeam = () => {
    if (!teamName || !teamPassword) {
      setMessage("Please enter both team name and password.");
      return;
    }
    if (teamPassword.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    // --- Backend note ---
    // Backend should provide endpoint: POST /api/teams/create
    // with { teamName, teamPassword }
    // Response: { inviteToken }
    // Backend must handle:
    // 1. Password hashing
    // 2. Token uniqueness
    // 3. Persistence in database

    // Generate a fake token for demo purposes
    const fakeToken = Math.random().toString(36).substring(2, 10); 
    setInviteToken(fakeToken);

    setMessage(
      `Team "${teamName}" created! Invite link generated. Save this link because you cannot come back!`
    );
  };

  // Construct invite link (frontend-only)
  const inviteLink = inviteToken ? `${window.location.origin}/join-team?token=${inviteToken}` : "";

  return (
    <div className="register-container">
      <div className="register-card profile-card">
        <h2 className="profile-username">Teams</h2>

        {/* Team creation form */}
        <div className="profile-stats">
          <h3>Create a Team</h3>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Team Password (min 8 characters)"
            value={teamPassword}
            onChange={(e) => setTeamPassword(e.target.value)}
          />
          <button onClick={handleCreateTeam} className="enabled-animation">
            Create Team
          </button>
        </div>

        {/* Display invite link if generated */}
        {inviteLink && (
          <div className="profile-stats">
            <h3>Invite Link</h3>
            <input type="text" value={inviteLink} readOnly className="readonly-input"/>
            <p>Share this link with your friends to join the team.</p>
          </div>
        )}

        {/* Feedback message */}
        {message && <p className="error-text">{message}</p>}
      </div>
    </div>
  );
}