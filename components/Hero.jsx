"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative mt-20 px-6 md:px-10 lg:px-16 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="relative space-y-6 text-center lg:text-left">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-block uppercase tracking-wider text-sm text-blue-600 dark:text-blue-400 font-medium">Civic Engagement Platform</motion.span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-800 dark:text-white">
            Connecting Citizens<br />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="text-blue-500">With Local Governance</motion.span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-600 dark:text-zinc-300 max-w-md mx-auto lg:mx-0 text-lg">
            Report issues, track complaints, and stay informed about civic developments in your area — all in one place.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-wrap justify-center lg:justify-start gap-4">
            <motion.a href="#FieldForComplaint" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/25">Get Started</motion.a>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-slate-300 dark:border-zinc-600 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors font-medium text-slate-700 dark:text-zinc-300">Learn More</motion.button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="hidden lg:block relative h-[450px]">
          <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
            src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Civic Connect" className="w-full h-full object-cover rounded-2xl shadow-2xl" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none" />
        </motion.div>
      </div>
      <div className="absolute inset-0 lg:hidden -z-10">
        <div className="w-full h-full bg-cover bg-center rounded-2xl" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/60 dark:from-zinc-900/80 dark:via-zinc-900/70 dark:to-zinc-900/60 rounded-2xl" />
      </div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl -z-10" />
    </div>
  );
}
