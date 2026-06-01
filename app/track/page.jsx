"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { ComplaintCard } from "@/components/ComplaintCard";
import { AuthRequiredState, EmptyState } from "@/components/ui/EmptyState";
import { SkeletonGrid } from "@/components/ui/Skeleton";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import Link from "next/link";

// Mock data for demo - in production this would come from Spring Boot backend
const mockComplaints = [
  {
    id: "1",
    tracking_id: "CC-2024-0001",
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues near the intersection of Main and Oak Street.",
    category: "road",
    location: "Main Street & Oak Avenue",
    status: "pending",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    tracking_id: "CC-2024-0002",
    title: "Broken Street Light",
    description: "Street light has been out for over a week on Pine Road.",
    category: "electricity",
    location: "Pine Road, Block 12",
    status: "in_progress",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function TrackPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchComplaints();
    } else if (!authLoading && !isAuthenticated) {
      setIsLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  // In production, this would fetch from Spring Boot backend
  const fetchComplaints = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Use mock data for now
      setComplaints(mockComplaints);
    } catch (err) {
      setError("Failed to load your complaints. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateComplaint = (updatedComplaint) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === updatedComplaint.id ? updatedComplaint : c))
    );
  };

  const handleDeleteComplaint = (id) => {
    setComplaints((prev) => prev.filter((c) => c.id !== id));
  };

  // STATE 1: Unauthenticated User
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4">
        <AuthRequiredState />
      </div>
    );
  }

  // Loading state for auth check
  if (authLoading) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SkeletonGrid count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Track Your Complaints
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Monitor the status of your submitted complaints and manage them here.
          </p>
        </motion.div>

        {/* Error Banner */}
        <AnimatePresence>
          {error && <ErrorBanner message={error} onRetry={fetchComplaints} />}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && <SkeletonGrid count={3} />}

        {/* STATE 2: Authenticated User with Zero Complaints */}
        <AnimatePresence mode="wait">
          {!isLoading && complaints.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EmptyState
                title="You haven't filed any complaints yet"
                description="Ready to make a difference? Submit your first complaint and help improve your community."
                actionLabel="File Your First Complaint"
                actionHref="/complaintPage"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* STATE 3: Authenticated User with Complaints */}
        <AnimatePresence>
          {!isLoading && complaints.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  {complaints.length} {complaints.length === 1 ? "complaint" : "complaints"} found
                </p>
                <Link
                  href="/complaintPage"
                  className="btn-primary text-sm py-2 px-4"
                >
                  + New Complaint
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {complaints.map((complaint, index) => (
                    <motion.div
                      key={complaint.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ComplaintCard
                        complaint={complaint}
                        onUpdate={handleUpdateComplaint}
                        onDelete={handleDeleteComplaint}
                      />
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
