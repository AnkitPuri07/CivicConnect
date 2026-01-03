import React from "react";
import {
  FaFileInvoice,
  FaUserShield,
  FaLandmark,
  FaHospital,
  FaWater,
  FaTree,
} from "react-icons/fa";

const complaintFields = [
  {
    id: 1,
    icon: <FaFileInvoice className="w-12 h-12 text-blue-600" />,
    title: "Tax Related Complaint",
    description: "Report issues related to municipal tax calculation or payment.",
  },
  {
    id: 2,
    icon: <FaUserShield className="w-12 h-12 text-green-600" />,
    title: "Citizen Services Complaint",
    description: "File complaints regarding citizen registration or ID services.",
  },
  {
    id: 3,
    icon: <FaLandmark className="w-12 h-12 text-yellow-600" />,
    title: "Property & Land Complaint",
    description: "Raise issues related to land records or property ownership.",
  },
  {
    id: 4,
    icon: <FaHospital className="w-12 h-12 text-red-600" />,
    title: "Health Services Complaint",
    description: "Submit complaints about hospitals or municipal health services.",
  },
  {
    id: 5,
    icon: <FaWater className="w-12 h-12 text-cyan-600" />,
    title: "Water & Sanitation Complaint",
    description: "Report water supply problems or sanitation-related issues.",
  },
  {
    id: 6,
    icon: <FaTree className="w-12 h-12 text-green-700" />,
    title: "Environmental Complaint",
    description: "Report pollution, waste management, or environmental concerns.",
  },
];

function FieldForComplaint() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Select Your Complaint Field
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {complaintFields.map((field) => (
          <div
            key={field.id}
            className="flex flex-col items-center text-center bg-slate-200 hover:bg-slate-100 rounded-xl
            hover:cursor-pointer shadow-md p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="mb-4">{field.icon}</div>

            <h3 className="text-xl font-semibold text-blue-400 lg:text-blue-500 mb-2">
              {field.title}
            </h3>

            <p className="text-gray-600 text-sm">{field.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FieldForComplaint;
