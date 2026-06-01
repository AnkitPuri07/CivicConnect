"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-blue-600 to-blue-700 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold mb-4">Civic Connect</h2>
          <p className="text-blue-100 leading-relaxed text-sm">A digital platform that enables citizens to register complaints, track their status, and collaborate with authorities for efficient civic issue resolution.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
          <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="text-blue-100 hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/complaintPage" className="text-blue-100 hover:text-white transition-colors">File Complaint</Link></li>
            <li><Link href="/track" className="text-blue-100 hover:text-white transition-colors">Track Status</Link></li>
            <li><Link href="/about" className="text-blue-100 hover:text-white transition-colors">About</Link></li>
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h3 className="font-semibold mb-4 text-white">Account</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/login" className="text-blue-100 hover:text-white transition-colors">Sign In</Link></li>
            <li><Link href="/register" className="text-blue-100 hover:text-white transition-colors">Create Account</Link></li>
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <h3 className="font-semibold mb-4 text-white">Built With</h3>
          <ul className="space-y-3 text-sm text-blue-100">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-300 rounded-full" />Next.js + React</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-300 rounded-full" />Tailwind CSS</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-300 rounded-full" />Framer Motion</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-300 rounded-full" />Supabase</li>
          </ul>
        </motion.div>
      </div>
      <div className="border-t border-blue-500/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-blue-100">
          <p>© {currentYear} Civic Connect. All rights reserved.</p>
          <p className="text-blue-200">Developed by Ankit Puri, Sahaj Khadka & Aashish Thapa Magar</p>
        </div>
      </div>
    </footer>
  );
}
