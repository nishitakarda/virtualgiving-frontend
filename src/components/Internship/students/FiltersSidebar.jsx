import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const FiltersSidebar = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const updatedList = checked
      ? [...filters[name], value]
      : filters[name].filter((item) => item !== value);

    onFilterChange({
      target: {
        name,
        value: updatedList,
      },
    });
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden px-4 py-2 text-sm font-medium flex items-center gap-2 text-teal-700 dark:text-teal-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiFilter className="text-xl" />
        Filters
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 right-0 z-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-full w-4/5 max-w-sm p-6 transform transition-transform duration-300 ease-in-out shadow-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:w-[20%] md:block md:shadow-none md:p-8`}
      >
        {/* Close Button for Mobile */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h1 className="text-xl font-bold">Filters</h1>
          <button onClick={() => setIsOpen(false)}>
            <IoClose className="text-2xl" />
          </button>
        </div>

        <h1 className="text-xl font-bold mb-4 hidden md:block">Customize Your Search</h1>

        {/* Category */}
        <div className="mb-5">
          <label htmlFor="category" className="block text-sm font-semibold mb-1">
            Internship Category
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={onFilterChange}
            className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Backend Engineer">Backend Engineer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
          </select>
        </div>

        {/* Type */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-1">Internship Type</label>
          <div className="space-y-2">
            {["Full Time", "Part Time", "Freelance"].map((typeOption) => (
              <label key={typeOption} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="type"
                  value={typeOption}
                  checked={filters.type.includes(typeOption)}
                  onChange={handleCheckboxChange}
                  className="accent-teal-600"
                />
                {typeOption}
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-5">
          <label htmlFor="location" className="block text-sm font-semibold mb-1">
            Internship Location
          </label>
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={onFilterChange}
            className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All</option>
            <option value="Remote">Remote</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Indore">Indore</option>
          </select>
        </div>

        {/* Duration */}
        <div className="mb-5">
          <label htmlFor="duration" className="block text-sm font-semibold mb-1">
            Internship Duration
          </label>
          <select
            id="duration"
            name="duration"
            value={filters.duration}
            onChange={onFilterChange}
            className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All</option>
            <option value="Less than 2 months">Less than 2 months</option>
            <option value="2 months">2 months</option>
            <option value="3–6 months">3–6 months</option>
            <option value="More than 6 months">More than 6 months</option>
          </select>
        </div>

        {/* Salary */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-1">Salary Range</label>
          <div className="space-y-2">
            {["0-10k", "10k-20k", "20k-30k", "30k+"].map((salaryOption) => (
              <label key={salaryOption} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="salary"
                  value={salaryOption}
                  checked={filters.salary.includes(salaryOption)}
                  onChange={handleCheckboxChange}
                  className="accent-teal-600"
                />
                {salaryOption}
              </label>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default FiltersSidebar;
