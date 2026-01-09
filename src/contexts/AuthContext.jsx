import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem("lms_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("lms_user");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    // For MVP, create/login user with the provided details
    const userData = {
      id: Date.now().toString(),
      email,
      name: email.split("@")[0],
      role,
    };
    setUser(userData);
    localStorage.setItem("lms_user", JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const register = (name, email, password, role) => {
    const userData = {
      id: Date.now().toString(),
      email,
      name,
      role,
    };
    setUser(userData);
    localStorage.setItem("lms_user", JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lms_user");
  };

  const isAuthenticated = !!user;
  const isTeacher = user?.role === "teacher";
  const isStudent = user?.role === "student";

  return (
    <AuthContext.Provider
      value={{
        user,
        profile: user, // Alias for compatibility
        loading,
        isAuthenticated,
        isTeacher,
        isStudent,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
