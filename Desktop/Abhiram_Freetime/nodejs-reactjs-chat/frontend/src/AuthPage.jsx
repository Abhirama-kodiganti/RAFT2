import { useState } from "react";
import axios from "axios";

function AuthPage({ onAuth }) {
  const [username, setUsername] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/authenticate", {
        username,
      });

      onAuth(response.data); // pass user data to App.jsx
    } catch (error) {
      console.log("Error:", error);
      alert("Authentication failed");
    }
  };

  return (
    <div className="background">
      <form className="form-card" onSubmit={onSubmit}>
        <div className="form-title">Welcome 👋</div>
        <div className="form-subtitle">Set a username to get started</div>

        <input
          className="auth-input"
          placeholder="Enter a username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
        />

        <button className="auth-button" type="submit">
          Enter
        </button>
      </form>
    </div>
  );
}

export default AuthPage;
