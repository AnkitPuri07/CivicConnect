"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { ComplaintCard } from "@/components/ComplaintCard";
import { AuthRequiredState, EmptyState } from "@/components/ui/EmptyState";
import { SkeletonGrid } from "@/components/ui/Skeleton";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import Link from "next/link";

export default function TrackPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) { fetchComplaints(); }
    else if (!authLoading && !isAuthenticated) { setIsLoading(false); }
  }, [isAuthenticated, user, authLoading]);

  const fetchComplaints = async () => {
    setIsLoading(true);
    setError("");
    try {
      const { data, error: fetchError } = await supabase.from("complaints").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (fetchError) throw fetchError;
      setComplaints(data || []);
    } catch (err) { setError("Failed to load your complaints. Please try again."); } finally { setIsLoading(false); }
  };

  const handleUpdateComplaint = (updatedComplaint) => { setComplaints((prev) => prev.map((c) => (c.id === updatedComplaint.id ? updatedComplaint : c))); };
  const handleDeleteComplaint = (id) => { setComplaints((prev) => prev.filter((c) => c.id !== id)); };

  if (!authLoading && !isAuthenticated) { return (<div className="min-h-screen pt-28 pb-16 px-4"><AuthRequiredState /></div>); }
  if (authLoading) { return (<div className="min-h-screen pt-28 pb-16 px-4"><div className="max-w-7xl mx-auto"><SkeletonGrid count={3} /></div></div>); }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Track Your Complaints</h1>
          <p className="text-slate-500 dark:text-zinc-400">Monitor the status of your submitted complaints and manage them here.</p>
        </motion.div>
        <AnimatePresence>{error && <ErrorBanner message={error} onRetry={fetchComplaints} />}</AnimatePresence>
        {isLoading && <SkeletonGrid count={3} />}
        <AnimatePresence mode="wait">
          {!isLoading && complaints.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <EmptyState title="You haven't filed any complaints yet" description="Ready to make a difference? Submit your first complaint and help improve your community." actionLabel="File Your First Complaint" actionHref="/complaintPage" />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isLoading && complaints.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-slate-500 dark:text-zinc-400">{complaints.length} {complaints.length === 1 ? "complaint" : "complaints"} found</p>
                <Link href="/complaintPage" className="btn-primary text-sm py-2 px-4">+ New Complaint</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {complaints.map((complaint, index) => (
                    <motion.div key={complaint.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                      <ComplaintCard complaint={complaint} onUpdate={handleUpdateComplaint} onDelete={handleDeleteComplaint} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
