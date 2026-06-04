"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { StaffComplaintCard } from "@/components/StaffComplaintCard";
import { SkeletonGrid } from "@/components/ui/Skeleton";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { FiLogOut } from "react-icons/fi";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function StaffPage() {
  const router = useRouter();
  const [staffId, setStaffId] = useState("");
  const [tempStaffId, setTempStaffId] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [isLoadingComplaints, setIsLoadingComplaints] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const staffToken = typeof window !== "undefined" ? localStorage.getItem("staff_token") : null;

  useEffect(() => {
    if (!staffToken) {
      router.push("/staff/login");
      return;
    }

    const storedStaffId = localStorage.getItem("staff_id");
    if (storedStaffId) {
      setStaffId(storedStaffId);
      fetchComplaints(storedStaffId);
    } else {
      setIsLoadingInitial(false);
    }
  }, [staffToken, router]);

  const fetchComplaints = async (id) => {
    setIsLoadingComplaints(true);
    setError("");

    try {
      const response = await axios.get(
        `${API}/api/staff/${id}/assignedComplaints`,
        {
          headers: {
            Authorization: `Bearer ${staffToken}`,
          },
        }
      );

      setComplaints(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError("Failed to load assigned complaints. Please try again.");
      console.error("Fetch complaints error:", err);
      setComplaints([]);
    } finally {
      setIsLoadingComplaints(false);
      setIsLoadingInitial(false);
    }
  };

  const handleSetStaffId = () => {
    if (!tempStaffId.trim()) {
      setError("Please enter a Staff ID");
      return;
    }

    setStaffId(tempStaffId);
    localStorage.setItem("staff_id", tempStaffId);
    setError("");
    setSuccess("Staff ID set successfully");
    setTimeout(() => setSuccess(""), 2000);
    fetchComplaints(tempStaffId);
    setTempStaffId("");
  };

  const handleStatusUpdate = (complaintId, newStatus) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId ? { ...c, complaintStatus: newStatus } : c
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("staff_token");
    localStorage.removeItem("staff_id");
    router.push("/");
  };

  if (!staffToken) {
    return null;
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-start mb-10"
        >
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Staff Dashboard
            </h1>
            <p className="text-slate-600 dark:text-zinc-400">
              View and manage your assigned complaints
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="btn-secondary flex items-center gap-2"
          >
            <FiLogOut size={18} />
            Logout
          </motion.button>
        </motion.div>

        {/* Error Banner */}
        <AnimatePresence>
          {error && <ErrorBanner message={error} />}
        </AnimatePresence>

        {/* Success Banner */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-lg"
            >
              <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Staff ID Input */}
        {!staffId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 card p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Enter Your Staff ID
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={tempStaffId}
                onChange={(e) => setTempStaffId(e.target.value)}
                placeholder="Enter staff ID..."
                className="input-field flex-1"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSetStaffId();
                  }
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSetStaffId}
                className="btn-primary"
              >
                Set ID
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Staff ID Display */}
        {staffId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              Viewing complaints for Staff ID: <span className="font-semibold">{staffId}</span>
              <button
                onClick={() => {
                  setStaffId("");
                  setComplaints([]);
                }}
                className="ml-4 text-blue-600 dark:text-blue-400 hover:underline text-xs"
              >
                Change ID
              </button>
            </p>
          </motion.div>
        )}

        {/* Complaints Section */}
        {staffId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Assigned Complaints
            </h2>

            {isLoadingComplaints || isLoadingInitial ? (
              <SkeletonGrid count={3} />
            ) : complaints.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-slate-600 dark:text-zinc-400">
                  No complaints assigned to you yet
                </p>
              </div>
            ) : (
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
                      <StaffComplaintCard
                        complaint={complaint}
                        staffId={staffId}
                        onStatusUpdate={handleStatusUpdate}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
