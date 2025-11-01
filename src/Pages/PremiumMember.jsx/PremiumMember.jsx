import { useEffect, useState } from "react";
import { Filter, SortAsc, SortDesc, Sparkles } from "lucide-react";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import BiodataCard from "../Biodatas/BiodataCard";
import Heading from "../Dashboard/Sidebar/Heading";
import { Link } from "react-router-dom";

const PremiumMember = () => {
  const axiosPublic = UseAxiosPublic();
  const [biodatas, setBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  useEffect(() => {
    fetchPremiumBiodats();
  }, []);

  const fetchPremiumBiodats = async (sort = null) => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = '/premium-biodatas';
      if (sort === 'asc') {
        endpoint = '/premium-biodatas?sortBy=age&order=asc';
      } else if (sort === 'desc') {
        endpoint = '/premium-biodatas?sortBy=age&order=desc';
      }

      const response = await axiosPublic.get(endpoint);
      setBiodatas(response.data);
    } catch (err) {
      setError('Failed to load premium biodatas. Please try again.');
      console.error('Error fetching biodatas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    fetchPremiumBiodats(order);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading Premium Members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 text-center">{error}</p>
          <button
            onClick={() => fetchPremiumBiodats()}
            className="mt-4 w-full px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
   
      <div className="mb-8">
        <Heading
          heading="Premium Biodatas"
          subheading="Discover verified premium members looking for their perfect match"
        />
      </div>

    
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-500" />
          <span className="text-gray-700 font-medium">
            {biodatas.length} Premium {biodatas.length === 1 ? 'Member' : 'Members'}
          </span>
        </div>

     
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
            <Filter className="w-4 h-4" />
            <span className="font-medium">
              {sortOrder === 'asc' ? 'Age: Low to High' : sortOrder === 'desc' ? 'Age: High to Low' : 'Sort by Age'}
            </span>
          </button>

       
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div className="py-2">
              <button
                onClick={() => handleSortChange('asc')}
                className={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-rose-50 transition-colors ${
                  sortOrder === 'asc' ? 'bg-rose-50 text-rose-600' : 'text-gray-700'
                }`}
              >
                <SortAsc className="w-4 h-4" />
                <span>Age: Low to High</span>
              </button>
              <button
                onClick={() => handleSortChange('desc')}
                className={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-rose-50 transition-colors ${
                  sortOrder === 'desc' ? 'bg-rose-50 text-rose-600' : 'text-gray-700'
                }`}
              >
                <SortDesc className="w-4 h-4" />
                <span>Age: High to Low</span>
              </button>
              {sortOrder && (
                <>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={() => handleSortChange(null)}
                    className="w-full px-4 py-2.5 text-left text-gray-500 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Clear Filter
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

 
      {biodatas?.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-rose-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Premium Members Found</h3>
          <p className="text-gray-500">Check back later for new premium profiles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {biodatas.slice(0, 6).map((data) => (
            <BiodataCard key={data._id} data={data} />
          ))}
        </div>
      )}


        <div className="text-center mt-10">
          <Link to={'/biodatas'} className="px-8 py-3 bg-white border-2 border-rose-400 text-rose-500 font-semibold rounded-lg hover:bg-rose-500 hover:text-white transition-all duration-300">
            View All Biodatas
          </Link>
        </div>
   
    </div>
  );
};

export default PremiumMember;