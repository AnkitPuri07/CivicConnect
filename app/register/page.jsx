"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const router = useRouter();
  const toast = useToast();

  const validate = () => {
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format";
    if (!password) errors.password = "Password is required";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (!acceptTerms) errors.terms = "You must accept the terms";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/api/users/register`, {
        name,
        email,
        phone,
        password,
      });

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";

      if (err.response?.status === 409 || errorMsg.toLowerCase().includes("already")) {
        setFieldErrors({ email: "Email already in use" });
      }

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
            Register once to report issues, track complaints, and collaborate with local authorities.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-blue-100">
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
              Simple complaint submission
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
              Real-time status updates
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
              Secure and transparent system
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 sm:p-10"
        >
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Create an Account</h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">Join Civic Connect today</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-5"
            >
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

     <form onSubmit={handleSubmit} className="space-y-4">
  {/* Full Name Field */}
  <div>
    <label className="block text-sm font-medium text-slate-600 dark:text-zinc-300 mb-1.5">
      Full Name
    </label>
    <input
      type="text"
      placeholder="Your full name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      disabled={isLoading}
      className={`input-field ${fieldErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
    />
    {fieldErrors.name && (
      <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>
    )}
  </div>

  {/* Email Address Field */}
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
      className={`input-field ${fieldErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
    />
    {fieldErrors.email && (
      <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
    )}
  </div>

  {/* Phone Number Field */}
  <div>
    <label className="block text-sm font-medium text-slate-600 dark:text-zinc-300 mb-1.5">
      Phone Number
    </label>
    <input
      type="tel"
      placeholder="98XXXXXXXX"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      disabled={isLoading}
      className="input-field"
    />
  </div>

  {/* Password Field */}
  <div>
    <label className="block text-sm font-medium text-slate-600 dark:text-zinc-300 mb-1.5">
      Password
    </label>
    <input
      type="password"
      placeholder="Create a password (min 6 characters)"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      disabled={isLoading}
      className={`input-field ${fieldErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
    />
    {fieldErrors.password && (
      <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
    )}
  </div>

  {/* Confirm Password Field */}
  <div>
    <label className="block text-sm font-medium text-slate-600 dark:text-zinc-300 mb-1.5">
      Confirm Password
    </label>
    <input
      type="password"
      placeholder="Re-enter password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      disabled={isLoading}
      className={`input-field ${fieldErrors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
    />
    {fieldErrors.confirmPassword && (
      <p className="text-xs text-red-500 mt-1">{fieldErrors.confirmPassword}</p>
    )}
  </div>

  {/* Terms & Conditions Checkbox */}
  <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-zinc-400">
    <input
      type="checkbox"
      checked={acceptTerms}
      onChange={(e) => setAcceptTerms(e.target.checked)}
      disabled={isLoading}
      className="accent-blue-600 mt-1 rounded cursor-pointer"
    />
    <div>
      I agree to the{" "}
      <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
        Terms & Conditions
      </Link>
      {fieldErrors.terms && (
        <span className="text-red-500 block mt-1">{fieldErrors.terms}</span>
      )}
    </div>
  </div>

  {/* Form Submit Button */}
  <motion.button
    type="submit"
    disabled={isLoading}
    whileHover={{ scale: isLoading ? 1 : 1.01 }}
    whileTap={{ scale: isLoading ? 1 : 0.99 }}
    className="btn-primary w-full py-3"
  >
    {isLoading ? (
      <>
        <span className="animate-spin">⏳</span>
        Creating account...
      </>
    ) : (
      "Create Account"
    )}
  </motion.button>

  {/* Navigation Link */}
  <p className="text-center text-sm text-slate-600 dark:text-zinc-400">
    Already have an account?{" "}
    <Link href="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
      Sign in
    </Link>
  </p>
</form>
        </motion.div>
      </motion.div>
    </div>
  );
}
