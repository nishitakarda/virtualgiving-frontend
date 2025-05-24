import React, { useState } from 'react';

const ViewApplications = () => {
  const [applications, setApplications] = useState([
    //default for now (temporary)
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
      status: 'Approved',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      category: 'Full Stack Developer',
      location: 'Delhi',
      resume: '/resumes/priya.pdf',
      status: 'Pending',
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">View Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left text-sm">
              <th className="px-4 py-3 border-b">#</th>
              <th className="px-4 py-3 border-b">Student Name</th>
              <th className="px-4 py-3 border-b">Category</th>
              <th className="px-4 py-3 border-b">Location</th>
              <th className="px-4 py-3 border-b">Resume</th>
              <th className="px-4 py-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app.id} className="text-sm text-gray-800">
                <td className="px-4 py-3 border-b">{index + 1}</td>
                <td className="px-4 py-3 border-b">{app.name}</td>
                <td className="px-4 py-3 border-b">{app.category}</td>
                <td className="px-4 py-3 border-b">{app.location}</td>
                <td className="px-4 py-3 border-b">
                  <a
                    href={app.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View PDF
                  </a>
                </td>
                <td className="px-4 py-3 border-b">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className={`w-32 px-2 py-1 border rounded text-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      app.status === 'Pending'
                        ? 'text-yellow-600 border-yellow-300'
                        : app.status === 'Approved'
                        ? 'text-green-600 border-green-300'
                        : 'text-red-600 border-red-300'
                    }`}
                  >
                    <option value="Pending" className="text-yellow-800">Pending</option>
                    <option value="Approved" className="text-green-600">Approved</option>
                    <option value="Rejected" className="text-red-600">Rejected</option>
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
