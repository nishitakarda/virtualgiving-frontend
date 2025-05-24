import React, { useState, useEffect } from "react";
import FiltersSidebar from "../../components/Internship/students/FiltersSidebar";
import InternshipCard from "../../components/Internship/students/InternshipCard";
import InternshipTopbar from "../../components/Internship/students/InternshipTopbar";

const staticInternships = [
  {
    //default for now(temporary)
    id: 1,
    companyId: "techcorp123",
    role: "Full Stack Developer",
    title: "Software Engineer Intern",
    companyName: "TechCorp",
    location: "Remote",
    type: "Full Time",
    duration: "3–6 months",
    salary: "20k-30k",
    description: "Work on scalable web apps.",
    logoUrl: "https://logo.clearbit.com/techcorp.com"
  },
  {
    id: 2,
    companyId: "codeworks456",
    role: "Backend Engineer",
    title: "Backend Engineer Intern",
    companyName: "CodeWorks",
    location: "Bangalore",
    type: "Part Time",
    duration: "2 months",
    salary: "10k-20k",
    description: "Develop RESTful APIs.",
    logoUrl: "https://logo.clearbit.com/codeworks.com"
  },
  {
    id: 3,
    companyId: "devstudio789",
    role: "Software Engineer",
    title: "Software Engineer Intern",
    companyName: "DevStudio",
    location: "Indore",
    type: "Freelance",
    duration: "Less than 2 months",
    salary: "0-10k",
    description: "Contribute to agile team development.",
    logoUrl: "https://logo.clearbit.com/devstudio.com"
  }
];

const currentUser = {
  id: "user123",
  fullName: "Aman Kumar",
  email: "aman@example.com",
  resumeLink: "https://example.com/resume.pdf"
};

const InternshipOpportunities = () => {
  const [filters, setFilters] = useState({
    category: "",
    type: [],
    location: "",
    duration: "",
    salary: [],
  });

  const [appliedInternships, setAppliedInternships] = useState([]);
  const [allInternships, setAllInternships] = useState([]);

  useEffect(() => {
    const storedInternships = JSON.parse(localStorage.getItem("postedInternships")) || [];

    const normalizedPosted = storedInternships.map((item, index) => ({
      ...item,
      id: `posted-${index}`,
    }));

    setAllInternships([...staticInternships, ...normalizedPosted]);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = (internship) => {
    if (!appliedInternships.find((i) => i.id === internship.id)) {
      setAppliedInternships([
        ...appliedInternships,
        {
          ...internship,
          appliedDate: new Date().toISOString().split("T")[0],
          status: "Pending",
          user: currentUser,
        },
      ]);
    }
  };

  const filteredInternships = allInternships.filter((job) => {
    return (
      (filters.category === "" || job.role === filters.category) &&
      (filters.type.length === 0 || filters.type.includes(job.type)) &&
      (filters.location === "" || job.location === filters.location) &&
      (filters.duration === "" || job.duration === filters.duration) &&
      (filters.salary.length === 0 || filters.salary.includes(job.salary))
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <InternshipTopbar />

      <div className="flex flex-1">
        <FiltersSidebar filters={filters} onFilterChange={handleFilterChange} />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Latest Internship Opportunities</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredInternships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                user={currentUser}
                onApply={handleApply}
                isApplied={appliedInternships.some((i) => i.id === internship.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InternshipOpportunities;
