"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiAlertCircle } from "react-icons/fi";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const statusColors = {
  PENDING: "status-pending",
  ASSIGNED: "status-in_progress",
  IN_PROGRESS: "status-in_progress",
  RESOLVED: "status-resolved",
};

export function AdminComplaintCard({
  complaint,
  staffList,
  onStatusUpdate,
  onStaffAssign,
}) {
  const [selectedStatus, setSelectedStatus] = useState(complaint.complaintStatus || "PENDING");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isAssigningStaff, setIsAssigningStaff] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleStatusUpdate = async () => {
    setError("");
    setSuccess("");
    setIsUpdatingStatus(true);

    try {
      await axios.put(
        `${API}/api/admin/complaints/${complaint.id}/status?status=${selectedStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );

      setSuccess("Status updated successfully");
      onStatusUpdate(complaint.id, selectedStatus);

      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
      console.error("Status update error:", err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleStaffAssign = async () => {
    if (!selectedStaff) {
      setError("Please select a staff member");
      return;
    }

    setError("");
    setSuccess("");
    setIsAssigningStaff(true);

    try {
      await axios.put(
        `${API}/api/admin/complaints/${complaint.id}/assign/${selectedStaff}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );

      setSuccess("Staff assigned successfully");
      onStaffAssign(complaint.id, selectedStaff);
      setSelectedStaff("");

      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign staff");
      console.error("Staff assign error:", err);
    } finally {
      setIsAssigningStaff(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="card p-6 hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              {complaint.complaintTitle}
            </h3>
            <span className={`status-badge ${statusColors[complaint.complaintStatus] || statusColors.PENDING}`}>
              {complaint.complaintStatus || "PENDING"}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-zinc-400 line-clamp-2 mb-3">
          {complaint.complaintDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
            {complaint.complaintCategory}
          </span>
        </div>
      </div>

      {/* Metadata */}
      <div className="space-y-2 mb-5 pb-5 border-b border-slate-200 dark:border-zinc-700">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400">
          <FiMapPin size={16} className="flex-shrink-0" />
          <span>{complaint.complaintLocation}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400">
          <FiCalendar size={16} className="flex-shrink-0" />
          <span>{formatDate(complaint.createdAt)}</span>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-lg flex gap-2 items-start"
        >
          <FiAlertCircle size={16} className="text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-rose-700 dark:text-rose-300">{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-lg"
        >
          <p className="text-xs text-green-700 dark:text-green-300">{success}</p>
        </motion.div>
      )}

      {/* Status Update Section */}
      <div className="mb-4 space-y-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
          Update Status
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="input-field text-sm"
        >
          <option value="PENDING">PENDING</option>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStatusUpdate}
          disabled={isUpdatingStatus}
          className="btn-primary w-full text-sm"
        >
          {isUpdatingStatus ? "Updating..." : "Update Status"}
        </motion.button>
      </div>

      {/* Staff Assignment Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
          Assign Staff
        </label>
        <select
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
          className="input-field text-sm"
        >
          <option value="">Select staff member...</option>
          {staffList.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name} (ID: {staff.id})
            </option>
          ))}
        </select>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStaffAssign}
          disabled={isAssigningStaff}
          className="btn-primary w-full text-sm"
        >
          {isAssigningStaff ? "Assigning..." : "Assign Staff"}
        </motion.button>
      </div>
    </motion.div>
  );
}
