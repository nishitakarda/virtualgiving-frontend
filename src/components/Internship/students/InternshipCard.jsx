import { motion } from 'framer-motion';
import { FaClock, FaCoins } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { Link } from 'react-router-dom';

const InternshipCard = ({ internship, handleApply }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full bg-white/90 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow px-6 py-6 md:py-8"
    >
      <div className="flex flex-col md:flex-row md:justify-between  gap-4">

        {/* LEFT SECTION */}
        <div className="flex-1">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white mb-1">
            {internship.title || internship.role}
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Posted by:
            <Link
              to="#"
              className="ml-1 text-blue-500 hover:underline break-words"
            >
              {internship.postedBy?.email || 'Unknown'}
            </Link>
          </p>

          <div className="flex flex-wrap gap-3 mb-4 text-sm">
            <span className="inline-flex items-center gap-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100 px-3 py-1 rounded-full">
              <MdLocationPin size={16} />
              {internship.location || 'Unknown'}
            </span>
            <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded-full">
              <FaCoins size={14} />
              {internship.salary || 'Unpaid'}
            </span>
            <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full">
              <FaClock size={14} />
              {internship.durationMonths ? `${internship.durationMonths} months` : 'N/A'}
            </span>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed line-clamp-3 max-w-3xl">
            {internship.description || 'No description provided.'}
          </p>
        </div>

        {/* RIGHT SECTION - BUTTON */}
        <div className="flex gap-4 justify-start md:justify-end md:items-start">
          <button
            onClick={() => handleApply(internship?.id)}
            className="bg-gradient-to-tr from-blue-500 to-blue-700 text-white font-semibold  px-6 py-2.5 rounded-lg mt-4 lg:mt-0 hover:scale-105 transition-transform shadow-sm"
          >
            Apply Now
          </button>
           <button
            onClick={() => handleApply(internship?.id)}
            className="border-2 border-blue-600 text-blue-600 font-semibold  px-6 py-2.5 rounded-lg mt-4 lg:mt-0 hover:scale-105 transition-transform shadow-sm"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
