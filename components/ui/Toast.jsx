"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { create } from "zustand";

export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (toast) => set((state) => ({ toasts: [...state.toasts, { id: Date.now(), ...toast }] })),
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export function Toast({ toast }) {
  const { removeToast } = useToastStore();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const bgColors = { success: "bg-emerald-500", error: "bg-red-500", warning: "bg-amber-500", info: "bg-blue-500" };
  const icons = { success: "✓", error: "✕", warning: "⚠", info: "ℹ" };

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className={`${bgColors[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]`}>
      <span className="text-lg font-bold">{icons[toast.type]}</span>
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button onClick={() => removeToast(toast.id)} className="text-white/80 hover:text-white">✕</button>
    </motion.div>
  );
}

export function ToastContainer() {
  const { toasts } = useToastStore();
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      <AnimatePresence>{toasts.map((toast) => <Toast key={toast.id} toast={toast} />)}</AnimatePresence>
    </div>
  );
}

export function useToast() {
  const { addToast } = useToastStore();
  return {
    success: (message) => addToast({ type: "success", message }),
    error: (message) => addToast({ type: "error", message }),
    warning: (message) => addToast({ type: "warning", message }),
    info: (message) => addToast({ type: "info", message }),
  };
}
