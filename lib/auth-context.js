"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const TOKEN_KEY = "jwt_token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // ✅ Restore auth from token on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (storedToken) {
      setToken(storedToken);

      // attach globally
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setIsLoading(false);
  }, []);

  // ✅ LOGIN
  const signIn = async (email, password) => {
    const response = await axios.post(`${API}/api/users/login`, {
      email,
      password,
    });

    const { token: jwtToken, user: userData } = response.data;

    if (jwtToken) {
      localStorage.setItem(TOKEN_KEY, jwtToken);
      setToken(jwtToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    }

    if (userData) {
      setUser(userData);
    }

    return response.data;
  };

  // ✅ SIGN UP
  const signUp = async (name, email, phone, password) => {
    const response = await axios.post(`${API}/api/users/register`, {
      name,
      email,
      phone,
      password,
    });

    return response.data;
  };

  // ✅ LOGOUT
  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);

    delete axios.defaults.headers.common["Authorization"];

    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,

        // 🔥 IMPORTANT FIX: JWT alone defines authentication
        isAuthenticated: !!token,

        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}