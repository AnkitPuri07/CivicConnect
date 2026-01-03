"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed top-0 left-1/2 -translate-x-1/2 z-50 w-4/5 md:w-full lg:w-4/5 rounded">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-xl font-semibold text-blue-600">
            CivicConnect
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-700">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/complaints" className="hover:text-blue-600">Complaints</Link>
            <Link href="/track" className="hover:text-blue-600">Track Status</Link>
            <Link href="/about" className="hover:text-blue-600">About</Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full">

          {/* Close */}
          <button
            className="self-end text-gray-600 mb-6"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          {/* Links */}
          <nav className="flex flex-col gap-4 text-gray-700">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/complaints" onClick={() => setOpen(false)}>Complaints</Link>
            <Link href="/track" onClick={() => setOpen(false)}>Track Status</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          </nav>

          {/* Auth */}
          <div className="mt-auto flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-center border border-blue-600 text-blue-600 py-2 rounded-md"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="text-center bg-blue-600 text-white py-2 rounded-md"
            >
              Register
            </Link>
          </div>

        </div>
      </aside>
    </>
  );
}
