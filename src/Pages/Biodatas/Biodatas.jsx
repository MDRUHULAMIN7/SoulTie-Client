import { useQuery } from "@tanstack/react-query";
import {Filter} from "lucide-react"
import { useState } from "react";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import BiodataCard from "./BiodataCard";
import Heading from "../Dashboard/Sidebar/Heading";
import LoadingSpiner from "../../Components/Shareds/LoadingSpiner";
import FilterSidebar from "../../Components/Biodata/FilterSidebar";
import ResultsHeader from "../../Components/Biodata/ResultsHeader";
import Pagination from "../../Components/Biodata/Pagination";
import NoResults from "../../Components/Biodata/NoResults";


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

  // Fetch biodatas
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
    
        <Heading heading="All Biodatas" subheading="Find your perfect match from our verified members" />

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
         
          <FilterSidebar
            filters={filters}
            showFilters={showFilters}
            activeFiltersCount={activeFiltersCount}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />

          {/* Main Content */}
          <main className="flex-1">
          
            <ResultsHeader 
              biodatasCount={biodatas.length} 
              totalItems={pagination.totalItems || 0} 
            />

        
            {biodatas.length === 0 ? (
              <NoResults
                activeFiltersCount={activeFiltersCount}
                onClearFilters={clearFilters}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {biodatas.map((biodata) => (
                  <BiodataCard key={biodata._id} data={biodata} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              pagination={pagination}
              currentPage={filters.page}
              onPageChange={handlePageChange}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Biodatas;