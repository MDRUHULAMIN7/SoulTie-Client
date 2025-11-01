import { Filter } from "lucide-react";

const NoResults = ({ activeFiltersCount, onClearFilters }) => {
  return (
    <div className="text-center py-16 rounded-2xl shadow-lg">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-4">
        <Filter className="w-10 h-10 text-rose-500" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Biodatas Found</h3>
      <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
      {activeFiltersCount > 0 && (
        <button
          onClick={onClearFilters}
          className="px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default NoResults;