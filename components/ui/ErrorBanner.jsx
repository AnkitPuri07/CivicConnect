"use client";

import { motion } from "framer-motion";

export function ErrorBanner({ message, onRetry }) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="text-red-500 text-xl">⚠</div>
        <div className="flex-1">
          <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">Something went wrong</h4>
          <p className="text-sm text-red-600 dark:text-red-300">{message || "Unable to load data. Please try again."}</p>
        </div>
        {onRetry && (
          <button onClick={onRetry} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">Retry</button>
        )}
      </div>
    </motion.div>
  );
}
