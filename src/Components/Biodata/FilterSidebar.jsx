import { useState } from "react";
import { Filter, X, Users, MapPin, Briefcase, Heart, ChevronDown, ChevronUp } from "lucide-react";

const FilterSidebar = ({ filters, showFilters, activeFiltersCount, onFilterChange, onClearFilters }) => {
  const [expandedFilters, setExpandedFilters] = useState({
    biodataType: true,
    ageRange: true,
    division: false,
    race: false,
    occupation: false,
    membership: false
  });


  const toggleFilterSection = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };


  const FilterSection = ({ title, icon: Icon, sectionKey, children }) => (
    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => toggleFilterSection(sectionKey)}
        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-rose-500" />
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</span>
        </div>
        {expandedFilters[sectionKey] ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expandedFilters[sectionKey] && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <aside
      className={`lg:w-80 w-full ${
        showFilters ? 'block' : 'hidden lg:block'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto custom-scrollbar">
        <div className="p-6">
      
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Filter className="w-5 h-5 text-rose-500" />
              Filters
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={onClearFilters}
                className="text-sm text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {activeFiltersCount > 0 && (
            <div className="mb-6 px-4 py-2 bg-rose-50 rounded-lg border border-rose-200">
              <p className="text-sm text-rose-600 font-medium">
                {activeFiltersCount} {activeFiltersCount === 1 ? 'filter' : 'filters'} active
              </p>
            </div>
          )}

          {/* Biodata Type Filter */}
          <FilterSection title="Biodata Type" icon={Users} sectionKey="biodataType">
            <div className="space-y-2">
              {['Male', 'Female'].map((type) => (
                <button
                  key={type}
                  onClick={() => onFilterChange('biodataType', type.toLowerCase())}
                  className={`w-full px-4 py-2.5 rounded-lg text-left font-medium transition-all ${
                    filters.biodataType === type.toLowerCase()
                      ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Age Range Filter */}
          <FilterSection title="Age Range" icon={Users} sectionKey="ageRange">
            <div className="space-y-2">
              {['18-25', '26-30', '31-35', '36-40', '41-50', '50-100'].map((range) => (
                <button
                  key={range}
                  onClick={() => onFilterChange('ageRange', range)}
                  className={`w-full px-4 py-2.5 rounded-lg text-left font-medium transition-all ${
                    filters.ageRange === range
                      ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {range === '50-100' ? '50+ years' : `${range} years`}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Division Filter */}
          <FilterSection title="Division" icon={MapPin} sectionKey="division">
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'].map((division) => (
                <button
                  key={division}
                  onClick={() => onFilterChange('division', division)}
                  className={`w-full px-4 py-2.5 rounded-lg text-left font-medium transition-all ${
                    filters.division === division
                      ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {division}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Religion/Race Filter */}
          <FilterSection title="Religion" icon={Heart} sectionKey="race">
            <div className="space-y-2">
              {['Muslim', 'Hindu', 'Christian', 'Buddhist'].map((religion) => (
                <button
                  key={religion}
                  onClick={() => onFilterChange('race', religion)}
                  className={`w-full px-4 py-2.5 rounded-lg text-left font-medium transition-all ${
                    filters.race === religion
                      ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {religion}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Occupation Filter */}
          <FilterSection title="Occupation" icon={Briefcase} sectionKey="occupation">
            <div className="space-y-2">
              {[
                'Engineer', 'Doctor', 'teacher', 'Business', 'Government Service', 
                'housewife', 'student', 'driver', 'Web developer', 'Hacker', 'farmer'
              ].map((occupation) => (
                <button
                  key={occupation}
                  onClick={() => onFilterChange('occupation', occupation)}
                  className={`w-full px-4 py-2.5 rounded-lg text-left font-medium transition-all ${
                    filters.occupation === occupation
                      ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {occupation}
                </button>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;