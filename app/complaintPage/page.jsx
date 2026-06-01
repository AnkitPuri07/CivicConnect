"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/Toast";
import { FaUser, FaMapMarkerAlt, FaClipboardList, FaPaperPlane } from "react-icons/fa";

const categories = [
  { value: "road", label: "Road & Infrastructure" }, { value: "water", label: "Water Supply" }, { value: "electricity", label: "Electricity" },
  { value: "waste", label: "Waste Management" }, { value: "public_safety", label: "Public Safety" }, { value: "tax", label: "Tax Related" },
  { value: "citizen_services", label: "Citizen Services" }, { value: "property", label: "Property & Land" }, { value: "health", label: "Health Services" },
  { value: "environment", label: "Environmental" }, { value: "other", label: "Other" },
];

function ComplaintForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const toast = useToast();
  const [formData, setFormData] = useState({ title: "", location: "", category: "other", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categories.find(c => c.value === cat)) setFormData(prev => ({ ...prev, category: cat }));
  }, [searchParams]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) { toast.warning("Please sign in to file a complaint"); router.push("/login"); }
  }, [authLoading, isAuthenticated, router, toast]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error("Please sign in first"); return; }
    if (!validate()) { toast.error("Please fill in all required fields"); return; }
    setIsLoading(true);
    try {
      const { error } = await supabase.from("complaints").insert([{ user_id: user.id, title: formData.title, location: formData.location, category: formData.category, description: formData.description }]);
      if (error) throw error;
      toast.success("Complaint submitted successfully!");
      setFormData({ title: "", location: "", category: "other", description: "" });
      router.push("/track");
    } catch (err) { toast.error("Failed to submit complaint. Please try again."); } finally { setIsLoading(false); }
  };

  if (authLoading) return (<div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center"><span className="animate-spin text-2xl">⏳</span></div>);

  return (
    <section className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="card p-8">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Submit a Civic Complaint</h2>
          <p className="text-slate-600 dark:text-zinc-300 mb-6 leading-relaxed">Civic Connect allows citizens to report local issues directly to the concerned authorities. Your complaint helps improve public services.</p>
          <ul className="space-y-4 text-slate-700 dark:text-zinc-300">
            <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm flex-shrink-0">1</span><span>Verified complaints reach the right department</span></li>
            <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm flex-shrink-0">2</span><span>Track complaint status online in real-time</span></li>
            <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm flex-shrink-0">3</span><span>Faster resolution through digital reporting</span></li>
          </ul>
          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800"><p className="text-sm text-amber-800 dark:text-amber-200">Please provide accurate information for quicker action. All complaints are reviewed before assignment.</p></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="card p-8">
          <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Complaint Details</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div><label className="text-sm font-medium text-slate-600 dark:text-zinc-300 flex items-center gap-2 mb-1.5"><FaUser /> Complaint Title</label><input type="text" placeholder="Brief title for your complaint" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} disabled={isLoading} className={`input-field ${errors.title ? 'border-red-500' : ''}`} />{errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}</div>
            <div><label className="text-sm font-medium text-slate-600 dark:text-zinc-300 flex items-center gap-2 mb-1.5"><FaMapMarkerAlt /> Location</label><input type="text" placeholder="Area / Ward / City" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} disabled={isLoading} className={`input-field ${errors.location ? 'border-red-500' : ''}`} />{errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}</div>
            <div><label className="text-sm font-medium text-slate-600 dark:text-zinc-300 flex items-center gap-2 mb-1.5"><FaClipboardList /> Complaint Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} disabled={isLoading} className="input-field">{categories.map((cat) => (<option key={cat.value} value={cat.value}>{cat.label}</option>))}</select>
            </div>
            <div><label className="text-sm font-medium text-slate-600 dark:text-zinc-300 block mb-1.5">Complaint Description</label><textarea rows={4} placeholder="Describe the issue clearly with relevant details..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} disabled={isLoading} className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`} />{errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}</div>
            <motion.button type="submit" disabled={isLoading || !isAuthenticated} whileHover={{ scale: isLoading ? 1 : 1.01 }} whileTap={{ scale: isLoading ? 1 : 0.99 }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
              {isLoading ? (<><span className="animate-spin">⏳</span>Submitting...</>) : (<><FaPaperPlane /> Submit Complaint</>)}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default function ComplaintPage() {
  return (<Suspense fallback={<div className="min-h-screen pt-28 flex items-center justify-center"><span className="animate-spin text-2xl">⏳</span></div>}><ComplaintForm /></Suspense>);
}
