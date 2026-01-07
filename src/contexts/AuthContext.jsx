import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Mock users data
const MOCK_USERS = [
  {
    id: "1",
    email: "teacher@shikkhok.com",
    password: "teacher123",
    name: "রফিকুল ইসলাম",
    role: "teacher",
    avatar: null,
  },
  {
    id: "2",
    email: "student@shikkhok.com",
    password: "student123",
    name: "আবদুল করিম",
    role: "student",
    avatar: null,
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("lms_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        avatar: foundUser.avatar,
      };
      setUser(userSession);
      localStorage.setItem("lms_user", JSON.stringify(userSession));
      return { success: true, user: userSession };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const register = async (name, email, password, role) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if user exists
    const existingUser = MOCK_USERS.find((u) => u.email === email);
    if (existingUser) {
      return { success: false, error: "Email already registered" };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role,
      avatar: null,
    };

    MOCK_USERS.push({ ...newUser, password });

    setUser(newUser);
    localStorage.setItem("lms_user", JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lms_user");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isTeacher: user?.role === "teacher",
    isStudent: user?.role === "student",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
