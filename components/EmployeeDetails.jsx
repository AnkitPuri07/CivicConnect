"use client";

import { motion } from "framer-motion";

const employees = [
  { id: 1, name: "Ramesh Adhikari", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150", role: "Municipal Officer", currentComplaints: 5, rating: 4.2 },
  { id: 2, name: "Pratima Upreti", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150", role: "Health Inspector", currentComplaints: 2, rating: 4.8 },
  { id: 3, name: "Bikash Thapa", image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150", role: "Sanitation Supervisor", currentComplaints: 8, rating: 3.9 },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function EmployeeDetails() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-3">Our Team</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">Meet the dedicated officials working to resolve your civic issues efficiently.</motion.p>
      </div>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <motion.div key={emp.id} variants={cardVariants} whileHover={{ y: -5, scale: 1.02 }} className="card rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <img src={emp.image} alt={emp.name} className="w-24 h-24 rounded-full object-cover border-3 border-blue-100 dark:border-blue-900 shadow-lg" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">{emp.name}</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">{emp.role}</p>
            <div className="flex justify-center gap-6 text-sm">
              <div className="text-center"><p className="font-semibold text-slate-800 dark:text-white">{emp.currentComplaints}</p><p className="text-slate-500 dark:text-zinc-400 text-xs">Active</p></div>
              <div className="text-center"><p className="font-semibold text-slate-800 dark:text-white">{emp.rating}</p><p className="text-slate-500 dark:text-zinc-400 text-xs">Rating</p></div>
            </div>
            <div className="flex justify-center mt-3 gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => <span key={star} className={star <= Math.round(emp.rating) ? "text-amber-400" : "text-slate-300 dark:text-zinc-600"}>★</span>)}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
