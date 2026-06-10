"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user, signOut, isLoading } = useAuth();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") document.documentElement.classList.add("dark");
    }
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const handleSignOut = async () => { try { await signOut(); } catch (err) { console.error(err); } };

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-lg" : "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md"} border-b border-slate-200/50 dark:border-zinc-800/50`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">CivicConnect</Link>
        <div className="hidden md:flex items-center gap-8 text-slate-800 dark:text-slate-100">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Home</Link>
          <Link href="/complaintPage" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Complaints</Link>
          <Link href="/track" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Track Status</Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">About</Link>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggle}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors text-sm">
            {mounted ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
          </motion.button>
          {!isLoading && isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-zinc-400">{user?.email?.split("@")[0]}</span>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSignOut}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors text-sm">Sign Out</motion.button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Login</Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-block">Register</Link>
              </motion.div>
            </>
          )}
        </div>
        <button className="md:hidden text-slate-700 dark:text-white p-2" onClick={() => setOpen(!open)}>
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="px-6 py-4 space-y-4">
              <Link href="/" onClick={() => setOpen(false)} className="block text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
              <Link href="/complaintPage" onClick={() => setOpen(false)} className="block text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">Complaints</Link>
              <Link href="/track" onClick={() => setOpen(false)} className="block text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">Track Status</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="block text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">About</Link>
              <hr className="border-slate-200 dark:border-zinc-800" />
              {!isLoading && isAuthenticated ? (
                <button onClick={() => { handleSignOut(); setOpen(false); }} className="block w-full text-left text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">Sign Out</button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="block text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">Login</Link>
                  <Link href="/register" onClick={() => setOpen(false)} className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center">Register</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
