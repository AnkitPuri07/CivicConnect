import { FaUser, FaMapMarkerAlt, FaClipboardList, FaPaperPlane } from "react-icons/fa";

export default function ComplaintPage() {
  return (
    <section className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* Left Info Panel */}
        <div className="card p-8">
          <h2 className="text-3xl font-bold mb-4">
            Submit a Civic Complaint
          </h2>

          <p className="text-slate-600 dark:text-zinc-300 mb-6">
            Civic Connect allows citizens to report local issues directly to the
            concerned authorities. Your complaint helps improve public services.
          </p>

          <ul className="space-y-4 text-slate-700 dark:text-zinc-300">
            <li className="flex gap-3">
              <span className="text-blue-600">✔</span>
              Verified complaints reach the right department
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600">✔</span>
              Track complaint status online
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600">✔</span>
              Faster resolution through digital reporting
            </li>
          </ul>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-sm text-blue-800 dark:text-blue-200">
            ⚠ Please provide accurate information for quicker action.
          </div>
        </div>

        {/* Complaint Form */}
        <div className="card p-8">
          <h3 className="text-2xl font-semibold mb-6">
            Complaint Details
          </h3>

          <form className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-1">
                <FaUser /> Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-lg border border-slate-300 dark:border-zinc-700
                bg-white dark:bg-zinc-800
                text-black dark:text-white
                placeholder:text-slate-400 dark:placeholder:text-zinc-500
                px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-1">
                <FaMapMarkerAlt /> Location
              </label>

              <input
                type="text"
                placeholder="Area / Ward / City"
                className="w-full rounded-lg border border-slate-300 dark:border-zinc-700
                bg-white dark:bg-zinc-800
                text-black dark:text-white
                placeholder:text-slate-400 dark:placeholder:text-zinc-500
                px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-1">
                <FaClipboardList /> Complaint Category
              </label>

              <select className="w-full rounded-lg border border-slate-300 dark:border-zinc-700
              bg-white dark:bg-zinc-800
              text-black dark:text-white
              px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">

                <option>Select category</option>
                <option>Road & Infrastructure</option>
                <option>Water Supply</option>
                <option>Electricity</option>
                <option>Waste Management</option>
                <option>Public Safety</option>
                <option>Other</option>

              </select>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Complaint Description
              </label>

              <textarea
                rows="4"
                placeholder="Describe the issue clearly..."
                className="w-full rounded-lg border border-slate-300 dark:border-zinc-700
                bg-white dark:bg-zinc-800
                text-black dark:text-white
                placeholder:text-slate-400 dark:placeholder:text-zinc-500
                px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              ></textarea>
            </div>

            {/* Upload */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Attach Photo (Optional)
              </label>

              <label className="block cursor-pointer border-2 border-dashed border-slate-300 dark:border-zinc-700 rounded-xl p-6 text-center hover:border-blue-500 transition">
                <p className="text-sm text-slate-600 dark:text-zinc-300">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  JPG, PNG (max 5MB)
                </p>

                <input type="file" accept="image/" className="hidden" />
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2
              bg-blue-600 hover:bg-blue-700
              dark:bg-blue-500 dark:hover:bg-blue-600
              text-white font-medium py-3 rounded-xl transition"
            >
              <FaPaperPlane /> Submit Complaint
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}