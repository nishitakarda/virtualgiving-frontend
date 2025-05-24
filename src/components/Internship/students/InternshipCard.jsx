import React, { useState, useEffect } from 'react';

const InternshipCard = ({ internship, user }) => {
  const [applied, setApplied] = useState(false);

  const localKey = `applied_${user?.id}_${internship?.title}`;

  useEffect(() => {
    const isApplied = localStorage.getItem(localKey);
    if (isApplied) setApplied(true);
  }, [localKey]);

  const handleApply = async () => {
    const payload = {
      userId: user?.id || 'unknown-user',
      internshipId: internship?.id || internship?.title || 'unknown-internship',
      companyId: internship?.companyId || 'unknown-company',
      fullName: user?.fullName,
      email: user?.email,
      resumeLink: user?.resumeLink,
    };

    try {

      alert('Applied Successfully! (Simulated)');
      setApplied(true);
      localStorage.setItem(localKey, 'true');

    } catch (err) {
      console.error(err);
      alert('Error occurred');
    }
  };

  return (
    <div className="w-full bg-white shadow-md border rounded-lg p-5 mb-6">
      <div className="flex items-start gap-4">
        <img
          src={internship.logoUrl }
          alt="Logo"
          className="w-14 h-14 rounded object-cover"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">
            {internship.title || internship.role}
          </h2>
          <p className="text-gray-500 font-medium">{internship.companyName || "Unknown Company"}</p>

          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <p>📍 {internship.location || "Unknown"} &nbsp; | &nbsp; 🕒 {internship.type || "N/A"}</p>
            <p>💰 Salary: {internship.salary || "Not specified"} &nbsp; | ⏳ Duration: {internship.duration || "N/A"}</p>
          </div>

          <p className="text-gray-700 mt-3 line-clamp-2">{internship.description || "No description provided."}</p>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        {applied ? (
          <button
            className="bg-gray-300 text-gray-700 font-medium px-6 py-2 rounded cursor-not-allowed"
            disabled
          >
            Already Applied
          </button>
        ) : (
          <button
            onClick={handleApply}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default InternshipCard;
