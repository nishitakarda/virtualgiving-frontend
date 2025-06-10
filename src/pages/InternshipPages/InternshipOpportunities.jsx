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

  const fetchInternships = async () => {
    const response = await axiosInstance.get('/internships/all');
    if (response.status == 200) {
      setAllInternships(response.data);
    } else {
      console.log(response);
    }
  }
  useEffect(() => {
    fetchInternships();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = async (internship_id) => {
    try {
      const response = await axiosInstance.post(`/applications/apply/${internship_id}`);
      toast.success(response.data);
    }
    catch (e) {
      console.log(e);
      toast.error(e.response.data);
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
    <div className="flex flex-col grow">

      <div className="flex flex-1 ">
        <FiltersSidebar filters={filters} onFilterChange={handleFilterChange} />

        <main className="flex-1 p-6 md:p-8 relative">
          <h1 className="text-lg md:text-2xl mb-6">Latest Internship Opportunities</h1>

          {
            filteredInternships.length != 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredInternships.map((internship) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  handleApply={handleApply}
                  isApplied={appliedInternships.some((i) => i.id === internship.id)}
                />
              ))}
            </div> : <div className="w-48 flex flex-col text-center gap-4  absolute top-[50%] left-[25%] md:left-[35%]  -translate-y-[50%]">
              <img src="/not_found.webp" />
              <p to={'/internship-opportunities'} className=" rounded">Not Available</p>
            </div>
          }
        </main>
      </div>
    </div>
  );
};

export default InternshipOpportunities;
