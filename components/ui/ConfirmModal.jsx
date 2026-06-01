"use client";

import { motion, AnimatePresence } from "framer-motion";

export function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", isLoading = false }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-6 max-w-md w-full border border-slate-200 dark:border-zinc-700">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <span className="text-2xl">⚠</span>
            </div>
            <h3 className="text-xl font-semibold text-center text-slate-800 dark:text-white mb-2">{title}</h3>
            <p className="text-center text-slate-600 dark:text-zinc-400 mb-6">{message}</p>
            <div className="flex gap-3">
              <button onClick={onClose} disabled={isLoading}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-zinc-600 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50">Cancel</button>
              <button onClick={onConfirm} disabled={isLoading}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {isLoading ? (<><span className="animate-spin">⏳</span> Deleting...</>) : (confirmText)}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
