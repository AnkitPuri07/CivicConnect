"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/Toast";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API}/api/users/login`, { email, password });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("jwt_token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        if (user) localStorage.setItem("user_data", JSON.stringify(user));
      }

      toast.success("Welcome back!");
      router.push("/track");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Login failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full card max-w-4xl rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-blue-700 text-white p-10"
        >
          <h1 className="text-3xl font-bold mb-4">Civic Connect</h1>
          <p className="text-blue-100 leading-relaxed">
            A centralized platform to connect citizens and authorities for efficient civic issue management.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-blue-100">
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
              Transparent complaint tracking
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
              Faster issue resolution
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
              Secure role-based access
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 sm:p-10"
        >
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">
            Login to continue to Civic Connect
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-5"
            >
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-zinc-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-zinc-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 dark:text-zinc-400">
                <input type="checkbox" className="accent-blue-600 rounded" />
                Remember me
              </label>
              <Link href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.99 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
            <div className="flex items-center gap-3">
              <hr className="flex-grow border-slate-200 dark:border-zinc-700" />
              <span className="text-slate-400 text-sm">or</span>
              <hr className="flex-grow border-slate-200 dark:border-zinc-700" />
            </div>
            <p className="text-center text-sm text-slate-600 dark:text-zinc-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 font-medium hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
