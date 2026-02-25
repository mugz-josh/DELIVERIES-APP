// src/components/Auth.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle, Loader } from "lucide-react";
import "./Auth.css";

interface UserData {
  name?: string;
  email: string;
  password?: string;
  role?: "user" | "admin";
}

// Use local backend during development - connects to localhost:5000
const API_BASE = "http://localhost:5000/api/auth";

// Password strength checker
const checkPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 1) return { strength, label: "Weak", color: "#e74c3c" };
  if (strength <= 3) return { strength, label: "Medium", color: "#f39c12" };
  return { strength, label: "Strong", color: "#2ecc71" };
};

// Email validator
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Auth: React.FC = () => {
  const { login, user, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if already logged in - redirect to home
  const isAuthenticated = !!user && !!token;
  
  // Where to redirect after login (default to /home)
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/home";

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userData, setUserData] = useState<UserData>({ email: "", role: "user" });
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // New feature states
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<{ strength: number; label: string; color: string } | null>(null);
  const [shake, setShake] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Check password strength when password changes
  useEffect(() => {
    if (userData.password && !isLoginMode) {
      setPasswordStrength(checkPasswordStrength(userData.password));
    } else {
      setPasswordStrength(null);
    }
  }, [userData.password, isLoginMode]);

  const showMessage = (text: string, type: "error" | "success" = "error") => {
    setMessage({ text, type });
    if (type === "success") setTimeout(() => setMessage(null), 5000);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setMessage(null);
    setUserData({ email: "", role: "user" });
    setEmailError("");
    setPasswordStrength(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    
    // Real-time email validation
    if (name === "email" && value) {
      if (!isValidEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  // ---------------- Login ----------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = userData;

    console.log("🔐 [AUTH] Login attempt for:", email);

    if (!email || !password) {
      console.log("❌ [AUTH] Login failed: Missing email or password");
      showMessage("Please enter email and password");
      triggerShake();
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address");
      triggerShake();
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
        
        // Save user data - handle remember me
        const userInfo = {
          user: {
            name: data.data?.user?.name || "User",
            email: data.data?.user?.email || email,
            role: data.data?.user?.role || "user",
          },
          token: data.data?.token || "token",
        };
        
        login(userInfo);
        
        showMessage("✅ Login successful!", "success");
        
        // Redirect after a brief delay to show success message
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 800);
      } else {
        console.log("❌ [AUTH] Login failed:", data.message || "Invalid credentials");
        showMessage(data.message || "Invalid credentials");
        triggerShake();
      }
    } catch (err) {
      console.error("❌ [AUTH] Login error:", err);
      showMessage("Login failed. Please try again.");
      triggerShake();
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
      triggerShake();
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address");
      triggerShake();
      return;
    }

    if (password.length < 6) {
      showMessage("Password must be at least 6 characters");
      triggerShake();
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
        
        // Save user data
        login({
          user: {
            name: data.data?.user?.name || name,
            email: data.data?.user?.email || email,
            role: data.data?.user?.role || "user",
          },
          token: data.data?.token || "token",
        });
        
        showMessage("✅ Account created successfully!", "success");
        
        // Redirect after a brief delay to show success message
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 800);
      } else {
        console.log("❌ [AUTH] Signup failed:", data.message || "Registration failed");
        showMessage(data.message || "Registration failed");
        triggerShake();
      }
    } catch (err) {
      console.error("❌ [AUTH] Signup error:", err);
      showMessage("Registration failed. Please try again.");
      triggerShake();
    } finally {
      setIsLoading(false);
      console.log("📝 [AUTH] Signup process completed");
    }
  };

  // Don't render if already authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="auth-page-wrapper">
      {/* Animated Background */}
      <div className="auth-background">
        <div className="auth-bg-gradient auth-bg-gradient-1"></div>
        <div className="auth-bg-gradient auth-bg-gradient-2"></div>
        <div className="auth-bg-gradient auth-bg-gradient-3"></div>
      </div>

      <div className={`auth-container ${shake ? "shake" : ""}`}>
        <div className="auth-card">
          {/* Success Animation */}
          {message?.type === "success" && (
            <div className="success-animation">
              <CheckCircle className="success-icon" />
            </div>
          )}

          <h2>{isLoginMode ? "Welcome Back" : "Create Account"}</h2>
          <p className="auth-subtitle">
            {isLoginMode ? "Sign in to continue to QuickDeliver" : "Join QuickDeliver today"}
          </p>
          
          {message && (
            <div className={`message ${message.type}`}>
              <AlertCircle size={16} />
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={isLoginMode ? handleLogin : handleSignup}>
            {!isLoginMode && (
              <div className="input-group">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={userData.name || ""}
                  onChange={handleChange}
                  required={!isLoginMode}
                  className="with-icon"
                />
              </div>
            )}

            <div className="input-group">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={userData.email}
                onChange={handleChange}
                required
                className={`with-icon ${emailError ? "error" : ""}`}
              />
            </div>
            {emailError && <span className="field-error">{emailError}</span>}

            <div className="input-group">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={userData.password || ""}
                onChange={handleChange}
                required
                className="with-icon"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Strength Indicator (Signup only) */}
            {!isLoginMode && passwordStrength && userData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-fill" 
                    style={{ 
                      width: `${(passwordStrength.strength / 5) * 100}%`,
                      backgroundColor: passwordStrength.color 
                    }}
                  ></div>
                </div>
                <span className="strength-label" style={{ color: passwordStrength.color }}>
                  {passwordStrength.label}
                </span>
              </div>
            )}

            {/* Remember Me (Login only) */}
            {isLoginMode && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <button type="button" className="forgot-link">
                  Forgot Password?
                </button>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? (
                <>
                  <Loader className="spinner" size={18} />
                  Please wait...
                </>
              ) : isLoginMode ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="auth-switch">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" onClick={toggleMode} className="switch-button">
              {isLoginMode ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
