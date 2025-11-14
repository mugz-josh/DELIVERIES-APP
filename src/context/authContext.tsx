import React, { createContext, useContext, useState, ReactNode } from "react";

// ------------------- User Type -------------------
export interface User {
  name: string;
  email: string;
  role: "admin" | "driver" | "user";
  avatar?: string | null; // allow null
  phone?: string | null;   // allow phone field
}

// ------------------- Auth Context Type -------------------
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: ({ user, token }: { user: User; token: string }) => void;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

// ------------------- Create Context -------------------
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

// ------------------- Auth Provider -------------------
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token") || null;
  });

  const login = ({ user, token }: { user: User; token: string }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateUser = (updatedUser: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const newUser = { ...prev, ...updatedUser };
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ---------------- Hook to Use Auth Context ----------------
export const useAuth = () => useContext(AuthContext);
