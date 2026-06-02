"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const TOKEN_KEY = "jwt_token";
const USER_KEY = "user_data";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userData = localStorage.getItem(USER_KEY);

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Bind token for automatic extraction on refresh
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (e) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem(TOKEN_KEY);
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const signIn = async (email, password) => {
    const response = await axios.post(`${API}/api/users/login`, { email, password });
    const { token, user: userData } = response.data;

    if (token) {
      setAuthToken(token);
      if (userData) {
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        setUser(userData);
      }
    }
    return response.data;
  };

  const signUp = async (name, email, phone, password) => {
    const response = await axios.post(`${API}/api/users/register`, {
      name,
      email,
      phone,
      password,
    });
    return response.data;
  };

  const signOut = () => {
    setAuthToken(null);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
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