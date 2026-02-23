// src/components/Auth.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "./Auth.css";

interface UserData {
  name?: string;
  email: string;
  password?: string;
  role?: "user" | "admin";
}

// Use your deployed backend URL
const API_BASE = "https://deliverieseasy.onrender.com/api/auth";

const Auth: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userData, setUserData] = useState<UserData>({ email: "", role: "user" });
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showMessage = (text: string, type: "error" | "success" = "error") => {
    setMessage({ text, type });
    if (type === "success") setTimeout(() => setMessage(null), 5000);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setMessage(null);
    setUserData({ email: "", role: "user" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // ---------------- Login ----------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = userData;

    console.log("🔐 [AUTH] Login attempt for:", email);

    if (!email || !password) {
      console.log("❌ [AUTH] Login failed: Missing email or password");
      showMessage("Please enter email and password");
      return;
    }

    setIsLoading(true);

    try {
      console.log("📤 [AUTH] Sending login request to:", `${API_BASE}/login`);
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      console.log("📥 [AUTH] Login response:", { status: res.status, success: data.success });

      if (res.ok && data.success) {
        console.log("✅ [AUTH] Login successful for:", email);
        login({
          user: {
            name: data.data?.user?.name || "User",
            email: data.data?.user?.email || email,
            role: data.data?.user?.role || "user",
          },
          token: data.data?.token || "token",
        });
        showMessage("✅ Login successful!", "success");
        navigate("/home");
      } else {
        console.log("❌ [AUTH] Login failed:", data.message || "Invalid credentials");
        showMessage(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("❌ [AUTH] Login error:", err);
      showMessage("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
      console.log("📝 [AUTH] Login process completed");
    }
  };

  // ---------------- Signup ----------------
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, role } = userData;

    console.log("📝 [AUTH] Signup attempt for:", email);

    if (!name || !email || !password) {
      console.log("❌ [AUTH] Signup failed: Missing required fields");
      showMessage("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      console.log("📤 [AUTH] Sending signup request to:", `${API_BASE}/register`);
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "user" }),
      });
      const data = await res.json();

      console.log("📥 [AUTH] Signup response:", { status: res.status, success: data.success });

      if (res.ok && data.success) {
        console.log("✅ [AUTH] Account created successfully for:", email);
        login({
          user: {
            name: data.data?.user?.name || name,
            email: data.data?.user?.email || email,
            role: data.data?.user?.role || "user",
          },
          token: data.data?.token || "token",
        });
        showMessage("✅ Account created successfully!", "success");
        navigate("/home");
      } else {
        console.log("❌ [AUTH] Signup failed:", data.message || "Registration failed");
        showMessage(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("❌ [AUTH] Signup error:", err);
      showMessage("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
      console.log("📝 [AUTH] Signup process completed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLoginMode ? "Sign In" : "Create Account"}</h2>
        {message && <p className={`message ${message.type}`}>{message.text}</p>}

        <form onSubmit={isLoginMode ? handleLogin : handleSignup}>
          {!isLoginMode && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userData.name || ""}
              onChange={handleChange}
              required={!isLoginMode}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password || ""}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Please wait..." : isLoginMode ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p>
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" onClick={toggleMode} className="switch-button">
            {isLoginMode ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
