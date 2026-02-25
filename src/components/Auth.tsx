// src/components/Auth.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle, Loader } from "lucide-react";
import "./Auth.css";

// Custom Google Icon SVG
const GoogleIcon = () => (
  <svg className="social-icon google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// Custom Apple Icon SVG
const AppleIcon = () => (
  <svg className="social-icon apple-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#000000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

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
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Password requirements checklist
  const passwordRequirements = [
    { label: "At least 6 characters", met: (userData.password?.length || 0) >= 6 },
    { label: "At least 8 characters", met: (userData.password?.length || 0) >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(userData.password || "") },
    { label: "Contains number", met: /[0-9]/.test(userData.password || "") },
  ];

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
    setAcceptTerms(false);
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

  // Social Login Handler
  const handleSocialLogin = (provider: string) => {
    showMessage(`🚧 ${provider} login is not configured yet. Please use email login.`, "error");
    triggerShake();
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

    // Check terms acceptance
    if (!acceptTerms) {
      showMessage("Please accept the Terms & Conditions to continue");
      triggerShake();
      return;
    }

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

          {/* Social Login Buttons */}
          <div className="social-login-section">
            <button 
              type="button" 
              className="social-btn google-btn"
              onClick={() => handleSocialLogin("Google")}
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button 
              type="button" 
              className="social-btn apple-btn"
              onClick={() => handleSocialLogin("Apple")}
            >
              <AppleIcon />
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="auth-divider">
            <span>or {isLoginMode ? "sign in" : "sign up"} with</span>
          </div>

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

            {/* Password Requirements Checklist (Signup only) */}
            {!isLoginMode && userData.password && (
              <div className="password-requirements">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className={`requirement ${req.met ? "met" : ""}`}>
                    <span className="requirement-check">{req.met ? "✓" : "○"}</span>
                    <span>{req.label}</span>
                  </div>
                ))}
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

            {/* Terms & Conditions (Signup only) */}
            {!isLoginMode && (
              <div className="terms-section">
                <label className="checkbox-label terms-checkbox">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="terms-text">
                    I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms & Conditions</a> and <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                  </span>
                </label>
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
