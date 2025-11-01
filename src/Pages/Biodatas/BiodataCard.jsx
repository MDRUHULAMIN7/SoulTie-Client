import { useState } from 'react';
import { Eye, MapPin, Briefcase, Calendar, Crown } from 'lucide-react';

const BiodataCard = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isPremium = data?.role === 'premium';

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-rose-200">
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-lg">
          <Crown className="w-3.5 h-3.5 text-white" />
          <span className="text-xs font-bold text-white">PREMIUM</span>
        </div>
      )}


      <div className="absolute top-4 right-4 z-20 flex items-center justify-center w-12 h-12 bg-rose-500 text-white font-bold text-sm rounded-full shadow-lg border-2 border-white">
        #{data?.biodataId}
      </div>

      {/* Image Section */}
      <div className="relative h-80 overflow-hidden bg-gray-100">

        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              style={{
                animation: 'shimmer 2s infinite',
              }}
            />
 
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full animate-pulse flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        )}

        <img
          src={data?.photo || 'https://via.placeholder.com/400x500?text=No+Image'}
          alt={`${data?.biodataType} Profile`}
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0 absolute'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
          loading="lazy"
        />

        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-50 to-rose-100">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-rose-200 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-sm text-rose-500 font-medium">Image unavailable</p>
            </div>
          </div>
        )}
        
        {imageLoaded && !imageError && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  data?.biodataType?.toLowerCase() === 'male' 
                    ? 'bg-blue-500/80 backdrop-blur-sm' 
                    : 'bg-pink-500/80 backdrop-blur-sm'
                }`}>
                  {data?.biodataType}
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                  <Calendar className="w-3 h-3" />
                  {data?.Age} years
                </div>
              </div>
            
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-rose-50 rounded-lg flex-shrink-0">
            <MapPin className="w-5 h-5 text-rose-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Location</p>
            <p className="text-sm font-semibold text-gray-800 truncate">
              {data?.ParmanentDivison || 'Not specified'}
            </p>
          </div>
        </div>

    
        {data?.Occupation && (
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-rose-50 rounded-lg flex-shrink-0">
              <Briefcase className="w-5 h-5 text-rose-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Profession</p>
              <p className="text-sm capitalize font-semibold text-gray-800 truncate">
                {data?.Occupation}
              </p>
            </div>
          </div>
        )}

       
        <a
          href={`/detailprofile/${data?._id}`}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-rose-500/30 hover:scale-105 transition-all duration-300 group/button"
        >
          <Eye className="w-4 h-4 group-hover/button:scale-110 transition-transform" />
          <span>View Full Profile</span>
        </a>
      </div>



      {/* Inline Styles  Animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BiodataCard;