import { useEffect, useState } from "react";
import FiltersSidebar from "../../components/Internship/students/FiltersSidebar";
import InternshipCard from "../../components/Internship/students/InternshipCard";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(true);

  const fetchInternships = async () => {
    try {
      const response = await axiosInstance.get('/internships/all');
      if (response.status === 200) {
        setAllInternships(response.data);
      } else {
        toast.error("Failed to fetch internships.");
      }
    } catch (error) {
      console.error("Error fetching internships:", error);
      toast.error("Something went wrong while fetching internships.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;

    if (Array.isArray(filters[name])) {
      const updatedArray = checked
        ? [...filters[name], value]
        : filters[name].filter((item) => item !== value);
      setFilters((prev) => ({ ...prev, [name]: updatedArray }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleApply = async (internship_id) => {
    try {
      const response = await axiosInstance.post(`/applications/apply/${internship_id}`);
      toast.success(response.data || "Applied successfully!");
      setAppliedInternships((prev) => [...prev, { id: internship_id }]);
    } catch (error) {
      console.error("Error applying:", error);
      toast.error(error?.response?.data || "Application failed");
    }
  };

  const filteredInternships = allInternships.filter((job) => {
    return (
      (!filters.category || job.role === filters.category) &&
      (filters.type.length === 0 || filters.type.includes(job.type)) &&
      (!filters.location || job.location === filters.location) &&
      (!filters.duration || job.duration === filters.duration) &&
      (filters.salary.length === 0 || filters.salary.includes(job.salary))
    );
  });

  return (
    <div className="flex flex-col grow min-h-screen">
      <div className="flex flex-1 flex-col md:flex-row">
        <FiltersSidebar filters={filters} onFilterChange={handleFilterChange} />

        <main className="flex-1 p-6 md:p-8 relative">

          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-300">Loading internships...</p>
          ) : filteredInternships.length > 0 ? (
            <div className=" gap-6">
              {filteredInternships.map((internship) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  handleApply={handleApply}
                  isApplied={appliedInternships.some((i) => i.id === internship.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 absolute inset-0">
              <img src="/not_found.webp" alt="Not Found" className="w-40 h-40 object-contain opacity-75" />
              <p className="text-lg text-gray-500 dark:text-gray-300">No internships found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InternshipOpportunities;
