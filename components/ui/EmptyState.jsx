"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function EmptyState({ title = "No data found", description = "There's nothing here yet.", actionLabel, actionHref, onAction }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-32 h-32 mb-6 text-slate-300 dark:text-zinc-600">
        <svg viewBox="0 0 200 200" fill="currentColor">
          <circle cx="100" cy="80" r="50" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="8 4" />
          <path d="M70 160 L100 130 L130 160" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-zinc-400 mb-6 max-w-md">{description}</p>
      {actionLabel && (actionHref || onAction) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {actionHref ? (
            <Link href={actionHref} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              {actionLabel}
            </Link>
          ) : (
            <button onClick={onAction} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              {actionLabel}
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export function AuthRequiredState() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center py-16 px-4">
      <div className="w-24 h-24 mb-6 text-blue-500">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <rect x="20" y="50" width="60" height="40" rx="6" fill="currentColor" />
          <path d="M30 50 V35 a20 20 0 1 1 40 0 v15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="70" r="8" fill="white" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Authentication Required</h2>
      <p className="text-slate-600 dark:text-zinc-400 mb-8 max-w-md">Please sign in to access your complaints dashboard and track the status of your submissions.</p>
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">Sign In</Link>
        <Link href="/register" className="px-6 py-3 border border-slate-300 dark:border-zinc-600 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg font-medium transition-colors">Create Account</Link>
      </div>
    </motion.div>
  );
}
