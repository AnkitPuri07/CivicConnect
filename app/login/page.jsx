"use client";
import { useState } from "react";
import { loginUser } from "@/services/authService";
import Link from "next/link";
export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">

      {/* Card */}
      <div className="w-full card max-w-4xl rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center bg-blue-600 text-white p-10">
          <h1 className="text-3xl font-bold mb-4">Civic Connect</h1>
          <p className="text-blue-100 leading-relaxed">
            A centralized platform to connect citizens and authorities for efficient civic issue management.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-blue-100">
            <li>✔ Transparent complaint tracking</li>
            <li>✔ Faster issue resolution</li>
            <li>✔ Secure role-based access</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Login to continue to Civic Connect
          </p>

          <form className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500"

                             value={email}
                          onChange={(e) =>
                              setEmail(e.target.value)
                          }
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                          onChange={(e) =>
                              setPassword(e.target.value)
                          }
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold
                         hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Register */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/register" className="text-blue-600 font-medium hover:underline">
                Register
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}