import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase";
import "./Login.css";

function Login({ setIsLoggedIn, setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update state in App.js
      setIsLoggedIn(true);
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });

      // Save to localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/"); // Redirect to home
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Error during login:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>

      {error && <p className="error-message">{error}</p>}

      <label htmlFor="email" className="input-label">
        Email
      </label>
      <input
        type="email"
        placeholder="Email"
        className="input-field"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="password" className="input-label">
        Password
      </label>
      <input
        type="password"
        placeholder="Password"
        className="input-field"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button
        className="login-button"
        onClick={handleLogin}
        disabled={loading} // Disable button when loading
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="footer-text">
        By logging in, you agree to our <b>Terms & Conditions</b>.
      </p>
    </div>
  );
}

export default Login;
