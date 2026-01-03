import React from "react";

const employees = [
  {
    id: 1,
    name: "Ramesh Adhikari",
    image: "https://via.placeholder.com/150",
    currentComplaints: 5,
    review: "★★★★☆ (4.2/5)",
  },
  {
    id: 2,
    name: "Sita Sharma",
    image: "https://via.placeholder.com/150",
    currentComplaints: 2,
    review: "★★★★★ (4.8/5)",
  },
  {
    id: 3,
    name: "Bikash Thapa",
    image: "https://via.placeholder.com/150",
    currentComplaints: 8,
    review: "★★★☆☆ (3.9/5)",
  },
];

function EmployeeDetails() {
  return (
    <section className="bg-slate-200 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Employee Details
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white rounded-xl shadow-md p-6 text-center
            transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Image */}
            <div className="flex justify-center mb-4">
              <img
                src={emp.image}
                alt={emp.name}
                className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
              />
            </div>

            {/* Name */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {emp.name}
            </h3>

            {/* Current Complaints */}
            <p className="text-gray-600 text-sm mb-1">
              Current Complaints:{" "}
              <span className="font-medium text-gray-800">
                {emp.currentComplaints}
              </span>
            </p>

            {/* Review */}
            <p className="text-sm text-gray-500">
              Review: {emp.review}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EmployeeDetails;
