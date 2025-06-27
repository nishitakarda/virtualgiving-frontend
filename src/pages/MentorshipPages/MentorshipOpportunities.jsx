import { useEffect, useState } from "react";
import MentorshipCard from "../../components/Mentorship/students/MentorshipCard";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import { MdSchool, MdCalendarToday, MdPeopleAlt, MdSearch } from "react-icons/md";

const MentorshipOpportunities = () => {
  const [allMentorships, setAllMentorships] = useState([]);
  const [filteredMentorships, setFilteredMentorships] = useState([]);
  const [loading, setLoading] = useState(false);

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
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch mentorships");
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
        toast.success("Registered successfully");
      }
    } catch (error) {
      toast.error(error.message || "Registration failed");
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-6 sm:px-10">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Mentorship Opportunities
      </h1>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-6xl mx-auto">
        {/* Graduation Year */}
        <div className="relative">
          <MdSchool className="absolute top-3 left-3 text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            name="graduationYear"
            value={filters.graduationYear}
            onChange={handleFilterChange}
            placeholder="Graduation Year"
            className="pl-10 p-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Course */}
        <div className="relative">
          <MdSearch className="absolute top-3 left-3 text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            name="course"
            value={filters.course}
            onChange={handleFilterChange}
            placeholder="Course (e.g. CSE)"
            className="pl-10 p-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Date After */}
        <div className="relative">
          <MdCalendarToday className="absolute top-3 left-3 text-gray-500 dark:text-gray-300" />
          <input
            type="date"
            name="dateAfter"
            value={filters.dateAfter}
            onChange={handleFilterChange}
            className="pl-10 p-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Max Participants */}
        <div className="relative">
          <MdPeopleAlt className="absolute top-3 left-3 text-gray-500 dark:text-gray-300" />
          <input
            type="number"
            name="maxParticipants"
            value={filters.maxParticipants}
            onChange={handleFilterChange}
            placeholder="Max Participants"
            className="pl-10 p-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Mentorship Cards */}
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
        <div className="flex flex-col items-center mt-20 text-center gap-4">
          <img
            src="/not_found.webp"
            alt="Not Found"
            className="w-48 mx-auto opacity-70"
          />
          <p className="text-gray-600 dark:text-gray-300 text-lg">No mentorships found.</p>
        </div>
      )}
    </div>
  );
};

export default MentorshipOpportunities;
