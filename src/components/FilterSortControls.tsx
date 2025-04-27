import React from "react";

interface FilterSortControlsProps {
  onSort: (order: "newest" | "oldest") => void;
  onFilter: (severity: "All" | "Low" | "Medium" | "High") => void;
}

const FilterSortControls: React.FC<FilterSortControlsProps> = ({ onSort, onFilter }) => {
  return (
    <div className="flex justify-between mb-4">
      {/* Sorting controls */}
      <div>
        <button
          onClick={() => onSort("newest")}
          // className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Sort by Newest
        </button>
        <button
          onClick={() => onSort("oldest")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sort by Oldest
        </button>
      </div>

      {/* Filtering controls */}
      <div>
        <select
          onChange={(e) => onFilter(e.target.value as "All" | "Low" | "Medium" | "High")}
          className="px-4 py-2 rounded"
        >
          <option value="All">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortControls;
