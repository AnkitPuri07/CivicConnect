"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaFileInvoice, FaUserShield, FaLandmark, FaHospital, FaWater, FaTree } from "react-icons/fa";

const complaintFields = [
  { id: 1, icon: FaFileInvoice, color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-950/30", category: "tax", title: "Tax Related Complaint", description: "Report issues related to municipal tax calculation or payment." },
  { id: 2, icon: FaUserShield, color: "text-emerald-500", bgColor: "bg-emerald-50 dark:bg-emerald-950/30", category: "citizen_services", title: "Citizen Services Complaint", description: "File complaints regarding citizen registration or ID services." },
  { id: 3, icon: FaLandmark, color: "text-amber-500", bgColor: "bg-amber-50 dark:bg-amber-950/30", category: "property", title: "Property & Land Complaint", description: "Raise issues related to land records or property ownership." },
  { id: 4, icon: FaHospital, color: "text-rose-500", bgColor: "bg-rose-50 dark:bg-rose-950/30", category: "health", title: "Health Services Complaint", description: "Submit complaints about hospitals or municipal health services." },
  { id: 5, icon: FaWater, color: "text-cyan-500", bgColor: "bg-cyan-50 dark:bg-cyan-950/30", category: "water", title: "Water & Sanitation Complaint", description: "Report water supply problems or sanitation-related issues." },
  { id: 6, icon: FaTree, color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-950/30", category: "environment", title: "Environmental Complaint", description: "Report pollution, waste management, or environmental concerns." },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function FieldForComplaint() {
  return (
    <section className="py-20 px-6" id="FieldForComplaint">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-3">Select Your Complaint Field</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">Choose the category that best fits your civic issue to ensure it reaches the right department.</motion.p>
      </div>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaintFields.map((field) => {
          const IconComponent = field.icon;
          return (
            <motion.div key={field.id} variants={cardVariants} whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center text-center card rounded-xl p-6 cursor-pointer">
              <div className={`w-16 h-16 rounded-xl ${field.bgColor} flex items-center justify-center mb-4`}>
                <IconComponent className={`w-8 h-8 ${field.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{field.title}</h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{field.description}</p>
              <div className="mt-4 text-blue-500 dark:text-blue-400 text-sm font-medium flex items-center gap-1 group">
                <Link href={`/complaintPage?category=${field.category}`}>File Complaint</Link>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
