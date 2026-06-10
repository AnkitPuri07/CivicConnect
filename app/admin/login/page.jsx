"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/api/admin/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("admin_token", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        router.push("/admin");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      console.error("Admin login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Admin Login
            </h1>
            <p className="text-slate-600 dark:text-zinc-400">
              Access the admin control panel
            </p>
          </div>

          {/* Error Container */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-lg flex gap-3 items-start"
            >
              <FiAlertCircle className="text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-rose-700 dark:text-rose-300">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
                Email
              </label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="input-field pl-11"
                  disabled={isLoading}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <FiLock className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-11 pr-11"
                  disabled={isLoading}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-400 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.99 }}
              className="btn-primary w-full mt-2 py-3"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Footer Back Link */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-zinc-700 text-center">
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              Back to{" "}
              <Link href="/" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Home
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}