"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/Toast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

const categoryLabels = {
  tax: "Tax Related",
  citizen_services: "Citizen Services",
  property: "Property & Land",
  health: "Health Services",
  water: "Water & Sanitation",
  environment: "Environmental",
  road: "Road & Infrastructure",
  electricity: "Electricity",
  waste: "Waste Management",
  public_safety: "Public Safety",
  other: "Other",
};

const statusLabels = {
  pending: "Pending",
  in_progress: "In Progress",
  resolved: "Resolved",
};

export function ComplaintCard({ complaint, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editData, setEditData] = useState({
      title: complaint.complaintTitle || "",
      description: complaint.complaintDescription || "",
      category: complaint.complaintCategory || "",
      location: complaint.complaintLocation || "",
    });
  const toast = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In production, this would call Spring Boot backend
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("Complaint updated successfully");
      onUpdate({ ...complaint, ...editData });
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update complaint");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsSaving(true);
    try {
      // In production, this would call Spring Boot backend
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("Complaint deleted");
    onDelete(complaint.complaintId);
      setShowDeleteModal(false);
    } catch (err) {
      toast.error("Failed to delete complaint");
    } finally {
      setIsSaving(false);
    }
  };

  const formattedDate = complaint.createdAt
  ? new Date(complaint.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  : "Unknown Date";
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={isEditing ? "editing" : "viewing"}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="card p-6 overflow-hidden"
        >
          {isEditing ? (
            /* EDIT MODE */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-zinc-300 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  disabled={isSaving}
                  className="input-field"
                  placeholder="Complaint title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-zinc-300 mb-1.5">
                  Category
                </label>
                <select
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  disabled={isSaving}
                  className="input-field"
                >
                  <option value="road">Road & Infrastructure</option>
                  <option value="water">Water Supply</option>
                  <option value="electricity">Electricity</option>
                  <option value="waste">Waste Management</option>
                  <option value="public_safety">Public Safety</option>
                  <option value="tax">Tax Related</option>
                  <option value="citizen_services">Citizen Services</option>
                  <option value="property">Property & Land</option>
                  <option value="health">Health Services</option>
                  <option value="environment">Environmental</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-zinc-300 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  disabled={isSaving}
                  className="input-field"
                  placeholder="Location of issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-zinc-300 mb-1.5">
                  Description
                </label>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  disabled={isSaving}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Describe the issue..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving || !editData.title.trim()}
                  className="btn-primary flex-1"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* VIEW MODE */
            <>
              {/* Header */}
              <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white truncate">
                   {complaint.complaintTitle}
                  </h3>
                </div>
                <span className={`status-badge status-${complaint.complaintStatus?.toLowerCase()}`}>
                  {statusLabels[complaint.complaintStatus?.toLowerCase()] ||
                   complaint.complaintStatus}
              </span>
              </div>

              {/* Body */}
              <div className="space-y-3 mb-4">
                {/* Category Tag */}
                <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                  {categoryLabels[complaint.complaintCategory] || complaint.complaintCategory}
                </span>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-zinc-300 line-clamp-3">
                {complaint.complaintDescription || "No description provided"}                </p>

                {/* Location */}
                {complaint.complaintLocation && (
                        <p className="text-xs text-slate-500 dark:text-zinc-500 flex items-center gap-1">
                      <span>📍</span>
                        {complaint.complaintLocation}
                           </p>
                        )}

                {/* Date */}
                <p className="text-xs text-slate-400 dark:text-zinc-500">
                  Submitted on {formattedDate}
                </p>
              </div>

              {/* Footer Actions */}
              <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary text-sm py-2 px-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="text-sm py-2 px-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Complaint"
        message="Are you sure you want to delete this complaint? This action cannot be undone."
        confirmText="Delete"
        isLoading={isSaving}
      />
    </>
  );
}


