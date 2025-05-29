import React, { useState } from 'react';

const ViewApplications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: 'Nishita Karda',
      category: 'Software Engineer',
      location: 'Remote',
      resume: '/resumes/nishita.pdf',
      status: 'Approved',
    },
    {
      id: 2,
      name: 'Rohan Mehta',
      category: 'Backend Developer',
      location: 'Bangalore',
      resume: '/resumes/rohan.pdf',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      category: 'Full Stack Developer',
      location: 'Delhi',
      resume: '/resumes/priya.pdf',
      status: 'Rejected',
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-sky-700 dark:text-sky-400 mb-6">
        View Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-sm">
            <tr>
              <th className="w-12 px-4 py-3 text-left">#</th>
              <th className="w-1/5 px-4 py-3 text-left">Student Name</th>
              <th className="w-1/5 px-4 py-3 text-left">Category</th>
              <th className="w-1/5 px-4 py-3 text-left">Location</th>
              <th className="w-1/5 px-4 py-3 text-left">Resume</th>
              <th className="w-1/5 px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-800 dark:text-gray-100">
            {applications.map((app, index) => (
              <tr
                key={app.id}
                className="border-t border-gray-300 dark:border-gray-700"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{app.name}</td>
                <td className="px-4 py-3">{app.category}</td>
                <td className="px-4 py-3">{app.location}</td>
                <td className="px-4 py-3">
                  <a
                    href={app.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View PDF
                  </a>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={app.status}
                    onChange={(e) =>
                      handleStatusChange(app.id, e.target.value)
                    }
                    className={`w-full px-2 py-1 border rounded text-sm bg-gray-100 focus:outline-none dark:bg-gray-700 focus:ring-2 focus:ring-blue-500
                      ${
                        app.status === 'Pending'
                          ? 'text-yellow-600 border-yellow-300'
                          : app.status === 'Approved'
                          ? 'text-green-600 border-green-300'
                          : 'text-red-600 border-red-300'
                      }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
