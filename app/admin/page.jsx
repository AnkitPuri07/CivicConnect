"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { AdminComplaintCard } from "@/components/AdminComplaintCard";
import { EmployeeDetails } from "@/components/EmployeeDetailsCard";
import { SkeletonGrid } from "@/components/ui/Skeleton";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { FiLogOut } from "react-icons/fi";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function AdminPage() {
  const router = useRouter();
  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("PENDING");
  const [isLoadingComplaints, setIsLoadingComplaints] = useState(true);
  const [isLoadingStaff, setIsLoadingStaff] = useState(true);
  const [error, setError] = useState("");

  const adminToken = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  // Wrapped in useCallback to prevent redeclaration on every render pass
  const fetchComplaints = useCallback(async () => {
    if (!adminToken) return;
    setIsLoadingComplaints(true);
    setError("");

    try {
      const response = await axios.get(
        `${API}/api/admin/complaints/status/${selectedStatus}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setComplaints(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError("Failed to load complaints. Please try again.");
      console.error("Fetch complaints error:", err);
      setComplaints([]);
    } finally {
      setIsLoadingComplaints(false);
    }
  }, [selectedStatus, adminToken]);

  const fetchStaff = useCallback(async () => {
    if (!adminToken) return;
    setIsLoadingStaff(true);

    try {
      const response = await axios.get(`${API}/api/admin/staff`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setStaffList(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Fetch staff error:", err);
      setStaffList([]);
    } finally {
      setIsLoadingStaff(false);
    }
  }, [adminToken]);

  // Combined Lifecycle Synchronization Hook
  useEffect(() => {
    if (!adminToken) {
      router.push("/admin/login");
      return;
    }

    fetchComplaints();
    
    // Only fetch staff array once on component mount
    if (staffList.length === 0 && isLoadingStaff) {
      fetchStaff();
    }
  }, [adminToken, selectedStatus, router, fetchComplaints, fetchStaff, staffList.length, isLoadingStaff]);

  const handleStatusUpdate = (complaintId, newStatus) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.complaintId === complaintId
          ? { ...c, complaintStatus: newStatus }
          : c
      )
    );
  };

  const handleStaffAssign = (complaintId, staffId) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.complaintId === complaintId
          ? { ...c, assignedStaffId: staffId }
          : c
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    // Wipe auth headers clean upon exit
    delete axios.defaults.headers.common["Authorization"];
    router.push("/");
  };

  if (!adminToken) {
    return null;
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header Layout */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-start mb-10"
        >
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 dark:text-zinc-400">
              Manage complaints and staff assignments
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="btn-secondary flex items-center gap-2 py-2.5"
          >
            <FiLogOut size={18} />
            Logout
          </motion.button>
        </motion.div>

        {/* Global Error Notice Overlay */}
        <AnimatePresence>
          {error && <ErrorBanner message={error} onRetry={fetchComplaints} />}
        </AnimatePresence>

        {/* Unified Custom Select Filter Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8"
        >
          <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-3">
            Filter by Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-field max-w-xs"
          >
            <option value="PENDING">PENDING</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </motion.div>

        {/* Complaints Grid Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Complaints ({selectedStatus})
          </h2>

          {isLoadingComplaints ? (
            <SkeletonGrid count={3} />
          ) : complaints.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-slate-600 dark:text-zinc-400">
                No complaints found with status: {selectedStatus}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {complaints.map((complaint, index) => (
                  <motion.div
                    key={complaint.complaintId}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <AdminComplaintCard
                      complaint={complaint}
                      staffList={staffList}
                      onStatusUpdate={handleStatusUpdate}
                      onStaffAssign={handleStaffAssign}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Staff Management Roster Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Staff Members
          </h2>

          {isLoadingStaff ? (
            <SkeletonGrid count={3} />
          ) : staffList.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-slate-600 dark:text-zinc-400">No staff members found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {staffList.map((staff, index) => (
                  <motion.div
                    key={staff.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <EmployeeDetails
                      id={staff.id}
                      name={staff.name}
                      email={staff.email}
                      department={staff.department}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}