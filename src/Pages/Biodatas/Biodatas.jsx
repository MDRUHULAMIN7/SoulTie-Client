import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Filter, X, ChevronLeft, ChevronRight, Users, MapPin, Briefcase, Heart, ChevronDown, ChevronUp } from "lucide-react";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import BiodataCard from "./BiodataCard";
import Heading from "../Dashboard/Sidebar/Heading";
import LoadingSpiner from "../../Components/Shareds/LoadingSpiner";

const Biodatas = () => {
  const { loading } = UseAuth();
  const axiosPublic = UseAxiosPublic();

  // Filter states
  const [filters, setFilters] = useState({
    biodataType: '',
    ageRange: '',
    division: '',
    race: '',
    occupation: '',
    role: '',
    page: 1,
    limit: 8
  });

  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    biodataType: true,
    ageRange: true,
    division: false,
    race: false,
    occupation: false,
    membership: false
  });

  // Toggle filter section
  const toggleFilterSection = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Fetch biodatas with filters and pagination
  const { data, isLoading, error } = useQuery({
    queryKey: ['biodatas', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.biodataType) params.append('biodataType', filters.biodataType);
      if (filters.ageRange) {
        const [min, max] = filters.ageRange.split('-');
        params.append('minAge', min);
        params.append('maxAge', max);
      }
      if (filters.division) params.append('division', filters.division);
      if (filters.race) params.append('race', filters.race);
      if (filters.occupation) params.append('occupation', filters.occupation);
      if (filters.role) params.append('role', filters.role);
      params.append('page', filters.page);
      params.append('limit', filters.limit);

      const res = await axiosPublic.get(`/biodatas?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true
  });

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value,
      page: 1
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      biodataType: '',
      ageRange: '',
      division: '',
      race: '',
      occupation: '',
      role: '',
      page: 1,
      limit: 8
    });
  };

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFiltersCount = [
    filters.biodataType,
    filters.ageRange,
    filters.division,
    filters.race,
    filters.occupation,
    filters.role
  ].filter(Boolean).length;

  if (loading || isLoading) {
    return <LoadingSpiner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 text-center">Failed to load biodatas. Please try again.</p>
        </div>
      </div>
    );
  }

  const biodatas = data?.data || [];
  const pagination = data?.pagination || {};

  // Filter section component
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Heading heading="All Biodatas" subheading="Find your perfect match from our verified members" />

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg w-full justify-center font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <Filter className="w-5 h-5" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-80 w-full ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
              <div className="p-6">
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-rose-500" />
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear All
                    </button>
                  )}
                </div>

                {/* Active Filters Count Badge */}
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
                        onClick={() => handleFilterChange('biodataType', type.toLowerCase())}
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
                        onClick={() => handleFilterChange('ageRange', range)}
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
                        onClick={() => handleFilterChange('division', division)}
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
                        onClick={() => handleFilterChange('race', religion)}
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
                    {['Engineer', 'Doctor', 'Teacher', 'Business', 'Government Service', 'Private Service', 'Student'].map((occupation) => (
                      <button
                        key={occupation}
                        onClick={() => handleFilterChange('occupation', occupation)}
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

                {/* Membership Type Filter */}
                <FilterSection title="Membership" icon={Filter} sectionKey="membership">
                  <div className="space-y-2">
                    {[
                      { value: 'premium', label: 'Premium Members', color: 'from-amber-400 to-amber-500' },
                      { value: 'requested', label: 'Requested', color: 'from-blue-400 to-blue-500' }
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleFilterChange('role', item.value)}
                        className={`w-full px-4 py-2.5 rounded-lg text-left font-medium transition-all ${
                          filters.role === item.value
                            ? `bg-gradient-to-r ${item.color} text-white shadow-md`
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-lg px-6 py-4 shadow-sm">
              <p className="text-gray-600 flex items-center gap-2">
                <Users className="w-5 h-5 text-rose-500" />
                <span>
                  Showing <span className="font-semibold text-gray-800">{biodatas.length}</span> of{' '}
                  <span className="font-semibold text-gray-800">{pagination.totalItems || 0}</span> biodatas
                </span>
              </p>
            </div>

            {/* Biodatas Grid */}
            {biodatas.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-4">
                  <Filter className="w-10 h-10 text-rose-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Biodatas Found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {biodatas.map((biodata) => (
                  <BiodataCard key={biodata._id} data={biodata} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={!pagination.hasPrevPage}
                  className={`p-2 rounded-lg border transition-all ${
                    pagination.hasPrevPage
                      ? 'border-rose-400 text-rose-500 hover:bg-rose-50'
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {[...Array(pagination.totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === pagination.totalPages ||
                    (page >= filters.page - 1 && page <= filters.page + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                          page === filters.page
                            ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-md'
                            : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === filters.page - 2 ||
                    page === filters.page + 2
                  ) {
                    return <span key={page} className="text-gray-400">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={!pagination.hasNextPage}
                  className={`p-2 rounded-lg border transition-all ${
                    pagination.hasNextPage
                      ? 'border-rose-400 text-rose-500 hover:bg-rose-50'
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Pagination Info */}
            {pagination.totalPages > 1 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Page {filters.page} of {pagination.totalPages}
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Biodatas;