import React from "react";

const sampleApplications = [
  //default for now
  {
    id: 1,
    company: "TechCorp",
    role: "Full Stack Developer",
    location: "Remote",
    dateApplied: "2025-05-20",
    status: "Pending",
  },
  {
    id: 2,
    company: "CodeWorks",
    role: "Backend Developer",
    location: "Bangalore",
    dateApplied: "2025-05-21",
    status: "Approved",
  },
  {
    id: 3,
    company: "Google",
    role: "Frontend Developer",
    location: "Delhi",
    dateApplied: "2025-05-22",
    status: "Rejected",
  },
];

const AppliedInternships = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Applied Internships
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Company</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Date Applied</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-100">
            {sampleApplications.map((app) => (
              <tr key={app.id} className="border-t border-gray-300 dark:border-gray-700">
                <td className="py-3 px-6">{app.company}</td>
                <td className="py-3 px-6">{app.role}</td>
                <td className="py-3 px-6">{app.location}</td>
                <td className="py-3 px-6">{app.dateApplied}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      app.status === "Approved"
                        ? "bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-200"
                        : app.status === "Rejected"
                        ? "bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-200"
                        : "bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedInternships;
