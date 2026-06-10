"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto text-center mb-12 mt-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-3">About Civic Connect</h1>
        <p className="text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed">Civic Connect is a digital platform designed to bridge the gap between citizens and authorities by providing a transparent and efficient complaint management system.</p>
      </motion.div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="card p-8">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Our Mission</h2>
          <p className="text-slate-600 dark:text-zinc-300 leading-relaxed">Our mission is to empower citizens to raise civic issues easily while enabling authorities to track, manage, and resolve complaints in a structured and accountable manner.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="card p-8">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Technology Stack</h2>
          <ul className="space-y-3 text-slate-600 dark:text-zinc-300">
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full" />Frontend built with <span className="font-medium text-slate-800 dark:text-white">Next.js + React</span></li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full" />Styled using <span className="font-medium text-slate-800 dark:text-white">Tailwind CSS</span></li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full" />Animations powered by <span className="font-medium text-slate-800 dark:text-white">Framer Motion</span></li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full" />Backend by <span className="font-medium text-slate-800 dark:text-white">Supabase</span></li>
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="card p-8 md:col-span-2">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-6 text-center">Developers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
            <motion.div whileHover={{ scale: 1.02 }} className="border rounded-xl p-5 dark:border-zinc-700"><p className="font-semibold text-slate-800 dark:text-white mb-1">Sahaj Khadka</p><p className="text-sm text-slate-500 dark:text-zinc-400">Frontend & Integration</p></motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="border rounded-xl p-5 dark:border-zinc-700"><p className="font-semibold text-slate-800 dark:text-white mb-1">Ankit Puri </p><p className="text-sm text-slate-500 dark:text-zinc-400">Backend & API Development</p></motion.div>
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-14 text-center text-sm text-slate-500 dark:text-zinc-400">Built using Next.js, Supabase & Tailwind CSS</motion.div>
    </div>
  );
}
