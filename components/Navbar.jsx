"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-4/5 md:w-full lg:w-4/5 rounded-xl
      bg-white/60 dark:bg-zinc-900/60
      backdrop-blur-xl
      border border-white/20 dark:border-zinc-700
      shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link href="/" className="text-xl font-semibold text-blue-600">
            CivicConnect
          </Link>

          <div className="hidden md:flex items-center gap-6 text-gray-700 dark:text-white">
            <Link href="/">Home</Link>
            <Link href="/complaintPage">Complaints</Link>
            <Link href="/track">Track Status</Link>
            <Link href="/about">About</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">

            {mounted && (
              <button
                onClick={toggle}
                className="px-4 py-2 rounded-md border dark:border-zinc-700"
              >
                {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
              </button>
            )}

            <Link href="/login">Login</Link>

            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Register
            </Link>
          </div>

          <button
            className="md:hidden text-gray-700 dark:text-white"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>
    </>
  );
}