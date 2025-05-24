import React from "react";
import InternshipTopbar from "../../components/Internship/students/InternshipTopbar";

const sampleApplications = [
  //deafult for now
  {
    id: 1,
    company: "TechCorp",
    role: "Full Stack Developer",
    location: "Remote",
    dateApplied: "2025-05-20",
    status: "Pending"
  },
  {
    id: 2,
    company: "CodeWorks",
    role: "Backend Developer",
    location: "Bangalore",
    dateApplied: "2025-05-21",
    status: "Approved"
  },
  {
    id: 3,
    company: "Google",
    role: "Frontend Developer",
    location: "Delhi",
    dateApplied: "2025-05-22",
    status: "Rejected"
  }
];

const AppliedInternships = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <InternshipTopbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Applied Internships</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">Company</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">Date Applied</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {sampleApplications.map((app) => (
                <tr key={app.id} className="border-t">
                  <td className="py-3 px-6">{app.company}</td>
                  <td className="py-3 px-6">{app.role}</td>
                  <td className="py-3 px-6">{app.location}</td>
                  <td className="py-3 px-6">{app.dateApplied}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        app.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
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
    </div>
  );
};

export default AppliedInternships;
