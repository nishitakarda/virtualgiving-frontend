import { useEffect, useState } from "react";
import MentorshipCard from "../../components/Mentorship/students/MentorshipCard";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";

const MentorshipOpportunities = () => {
  const [allMentorships, setAllMentorships] = useState([]);
  const [filteredMentorships, setFilteredMentorships] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    graduationYear: "",
    course: "",
    dateAfter: "",
    maxParticipants: "",
  });

  const fetchMentorships = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/mentorships/all');
      if (response.status === 200) {
        setAllMentorships(response.data);
        setFilteredMentorships(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentorships();
  }, []);

  const handleApply = async (mentorship_id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/mentorship/registrations/request/${mentorship_id}`);
      if (response.status === 200) {
        toast.success("Registered Successfully");
      } else {
        console.log(response);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const result = allMentorships.filter((m) => {
      const byGradYear = filters.graduationYear
        ? m.postedBy?.graduationYear?.toString() === filters.graduationYear
        : true;

      const byCourse = filters.course
        ? m.postedBy?.course?.toLowerCase().includes(filters.course.toLowerCase())
        : true;

      const byDate = filters.dateAfter
        ? new Date(m.dateTime) >= new Date(filters.dateAfter)
        : true;

      const byParticipants = filters.maxParticipants
        ? parseInt(m.maxParticipants || 0) <= parseInt(filters.maxParticipants)
        : true;

      return byGradYear && byCourse && byDate && byParticipants;
    });

    setFilteredMentorships(result);
  }, [filters, allMentorships]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col grow">
      <main className="flex-1 p-4 md:p-8">
        {/* Filters */}
        <div className="mb-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="graduationYear"
            value={filters.graduationYear}
            onChange={handleFilterChange}
            placeholder="Graduation Year (e.g. 2023)"
            className="border p-2 rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <input
            type="text"
            name="course"
            value={filters.course}
            onChange={handleFilterChange}
            placeholder="Course (e.g. CSE)"
            className="border p-2 rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <input
            type="date"
            name="dateAfter"
            value={filters.dateAfter}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <input
            type="number"
            name="maxParticipants"
            value={filters.maxParticipants}
            onChange={handleFilterChange}
            placeholder="Max Participants"
            className="border p-2 rounded-lg dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Cards */}
        {filteredMentorships.length > 0 ? (
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-6">
            {filteredMentorships.map((mentorship) => (
              <MentorshipCard
                key={mentorship.id}
                mentorship={mentorship}
                handleApply={handleApply}
              />
            ))}
          </div>
        ) : (
          <div className="w-48 flex flex-col text-center gap-4 absolute top-[50%] left-[25%] md:left-[50%] -translate-y-[50%]">
            <img src="/not_found.webp" alt="Not Found" />
            <p>Not Available</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MentorshipOpportunities;
