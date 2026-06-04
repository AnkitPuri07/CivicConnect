"use client";

import { motion } from "framer-motion";

export function EmployeeDetails({ id, name, email, department, image = null }) {
  const defaultImage = "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150";

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="card rounded-xl p-6 text-center"
    >
      <div className="flex justify-center mb-4">
        <img
          src={image || defaultImage}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-3 border-blue-100 dark:border-blue-900 shadow-lg"
        />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
        {name}
      </h3>
      <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{department}</p>
      <p className="text-xs text-slate-600 dark:text-zinc-400 break-all">{email}</p>
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-zinc-700">
        <p className="text-xs text-slate-500 dark:text-zinc-400">ID: {id}</p>
      </div>
    </motion.div>
  );
}
