"use client";
import { useState } from "react";
import { registerUser } from "@/services/authService";
import Link from "next/link";
export default function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await registerUser({
      name,
      email,
      phone,
      password
    });

    console.log(response);
    alert("Registration Successful");
  } catch (error) {
    console.error(error);
    alert("Registration Failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">

      {/* Card */}
      <div className="w-full card max-w-4xl rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 mt-20">

        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center bg-blue-600 text-white p-10">
          <h1 className="text-3xl font-bold mb-4">Civic Connect</h1>
          <p className="text-blue-100 leading-relaxed">
            Register once to report issues, track complaints, and collaborate with local authorities.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-blue-100">
            <li>✔ Simple complaint submission</li>
            <li>✔ Real-time status updates</li>
            <li>✔ Secure and transparent system</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create an Account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Join Civic Connect today
          </p>

          <form className="space-y-5" onSubmit={handleRegister}>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                             value={name}
                          onChange={(e) =>
                              setName(e.target.value)
                          }
              />
            </div>

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

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="98XXXXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                             value={phone}
                          onChange={(e) =>
                              setPhone(e.target.value)
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
                placeholder="Create a password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500"

                             value={password}
                          onChange={(e) =>
                              setPassword(e.target.value)
                          }
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500"

                             value={confirmPassword}
                          onChange={(e) =>
                              setConfirmPassword(e.target.value)
                          }
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" className="accent-blue-600 mt-1" />
              <p>
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </a>
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold
                         hover:bg-blue-700 transition"
            >
              Register
            </button>

            {/* Login Redirect */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-medium hover:underline">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}