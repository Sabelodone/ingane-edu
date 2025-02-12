import React, { createContext, useContext, useState, useEffect } from "react";

// Create the authentication context
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate checking for an authenticated user (e.g., using localStorage or API)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    if (userData && userData.email) {  // basic check to ensure user data is valid
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));  // Store user in localStorage
    } else {
      console.error("Invalid user data");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access authentication state
export const useAuth = () => useContext(AuthContext);