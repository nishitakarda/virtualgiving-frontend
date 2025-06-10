import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from '../../components/LoadingSpinner';
import axiosInstance from "../../utils/axiosInstance";

const MentorshipManager = () => {

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/mentorships/my');

      if (response.status == 200) {
        console.log(response);
        
        setInternships(response.data);
      } else {
        console.log(response);
      }
    } catch (e) {
      toast.error(e.message);
    }
    finally {setLoading(false);}
  }

 useEffect(()=>{
  fetchInternships();
 },[]);

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Posted Internships
        </h1>

        <div className="overflow-x-auto">
          {
            internships.length != 0 ? <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-sm">
                <tr>
                  <th className="py-3 px-6 text-left">id</th>
                  <th className="py-3 px-6 text-left">Topic</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Max Participants</th>
                  <th className="py-3 px-6 text-left">Applications</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 dark:text-gray-100">
                {internships?.map((intern) => (
                  <tr key={intern?.id} className="border-t border-gray-300 dark:border-gray-700">
                    <td className="py-3 px-6">{intern?.id}</td>
                    <td className="py-3 px-6">{intern?.topic}</td>
                    <td className="py-3 px-6">{new Date(intern?.dateTime).toLocaleString() || 'unknown'}</td>
                    <td className="py-3 px-6">{intern?.maxParticipants}</td>
                    <td className="py-3 px-6">
                      <Link to={`/internship-application/1`}
                        className="text-blue-500 underline"
                      >
                        View Applications
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> : <div className="w-48 flex flex-col text-center gap-4  absolute top-[50%] left-[25%] md:left-[50%] -translate-y-[50%]">
              <img src="/not_found.webp" />
              <Link to={'/post-internship'} className="text-teal-600 border border-teal-600 p-4 rounded">Post Internships</Link>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default MentorshipManager;
