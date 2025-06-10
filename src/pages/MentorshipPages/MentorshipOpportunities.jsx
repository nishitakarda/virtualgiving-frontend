import { useEffect, useState } from "react";
import MentorshipCard from "../../components/Mentorship/students/MentorshipCard";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";


const MentorshipOpportunities = () => {

  const [allMentorships, setAllMentorships] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchMentorships = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/mentorships/all');
      if (response.status == 200) {
        setAllMentorships(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMentorships();
  }, []);


  const handleApply = async (mentorship_id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/mentorship/registrations/request/${mentorship_id}`);
      if (response.status == 200) {
        toast.success('Registered Successfully')
      } else {
        console.log(response);
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />
  return (
    <div className="flex flex-col grow">
      <main className="flex-1 p-4  md:p-8">
        <h1 className="text-lg md:text-2xl mb-6">Latest Mentorship Opportunities</h1>
        {
          allMentorships.length != 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {allMentorships.map((mentorship) => (
                <MentorshipCard
                  key={mentorship.id}
                  mentorship={mentorship}
                  handleApply={handleApply}
                />
              ))}
            </div> : <div className="w-48 flex flex-col text-center gap-4  absolute top-[50%] left-[25%] md:left-[50%]  -translate-y-[50%]">
              <img src="/not_found.webp" />
              <p>Not Available </p>
            </div>
        }
      </main>
    </div>
  );
};

export default MentorshipOpportunities;
