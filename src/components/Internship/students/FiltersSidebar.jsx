import React from "react";

const FiltersSidebar = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const updatedList = checked
      ? [...filters[name], value]
      : filters[name].filter((item) => item !== value);

    onFilterChange({
      target: {
        name,
        value: updatedList,
      }
    });
  };

  return (
    <aside className="w-64 p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold mb-4">Customize Your Search</h1>

      <div className="mb-4">
        <label htmlFor="category" className="block text-md font-semibold">
          Internship Category
        </label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={onFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Backend Engineer">Backend Engineer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-md font-semibold mb-1">Internship Type</label>
        <div className="space-y-1">
          {["Full Time", "Part Time", "Freelance"].map((typeOption) => (
            <label key={typeOption} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="type"
                value={typeOption}
                checked={filters.type.includes(typeOption)}
                onChange={handleCheckboxChange}
                className="accent-sky-600"
              />
              <span>{typeOption}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-md font-semibold">
          Internship Location
        </label>
        <select
          id="location"
          name="location"
          value={filters.location}
          onChange={onFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Remote">Remote</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Indore">Indore</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="duration" className="block text-md font-semibold">
          Internship Duration
        </label>
        <select
          id="duration"
          name="duration"
          value={filters.duration}
          onChange={onFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Less than 2 months">Less than 2 months</option>
          <option value="2 months">2 months</option>
          <option value="3–6 months">3–6 months</option>
          <option value="More than 6 months">More than 6 months</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-md font-semibold mb-1">Salary Range</label>
        <div className="space-y-1">
          {[
            "0-10k",
            "10k-20k",
            "20k-30k",
            "30k+",
          ].map((salaryOption) => (
            <label key={salaryOption} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="salary"
                value={salaryOption}
                checked={filters.salary.includes(salaryOption)}
                onChange={handleCheckboxChange}
                className="accent-sky-600"
              />
              <span>{salaryOption}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
