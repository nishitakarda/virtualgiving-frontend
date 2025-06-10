import { FaClock, FaCoins } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { Link } from 'react-router-dom';

const InternshipCard = ({ internship, handleApply }) => {

  return (
    <div className="w-full bg-white dark:bg-gray-700/50 dark:text-white border border-gray-100 dark:border-gray-800 shadow-lg rounded-lg p-5 mb-6">
      <div className="flex items-start gap-4">


        <div className="flex-1">
          <h2 className="text-xl">
            {internship.title || internship.role}
          </h2>
          <p className="text-gray-500 dark:text-gray-200">posted by: <Link className='text-blue-400 underline' href="">{internship.postedBy?.email || "Unknown"}</Link></p>

          <div className="mt-2 flex gap-4 items-center text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <span className='bg-teal-900 text-teal-200 px-2 py-1 rounded-full'><MdLocationPin className='inline mr-1' /> {internship.location || "Unknown"} </span>
            <span className='bg-teal-900 text-teal-200 px-2 py-1 rounded-full'><FaCoins className='inline mr-1' />  {internship.salary || "Unpaid"} </span>
            <span className='bg-teal-900 text-teal-200 px-2 py-1 rounded-full'><FaClock className='inline mr-1' /> {internship.durationMonths || "N/A"}</span>
          </div>

          <p className="text-gray-700 dark:text-gray-100 mt-3 line-clamp-2">{internship.description || "No description provided."}</p>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={() => handleApply(internship?.id)}
          className="bg-gradient-to-r bg-teal-600 text-white font-semibold px-6 py-2 rounded hover:opacity-90 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;
