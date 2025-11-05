// DetailBiodata.jsx - Complete Implementation with Payment Workflow
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import BiodataCard from "./BiodataCard";
import Heading from "../Dashboard/Sidebar/Heading";
import Swal from "sweetalert2";
import { useState } from "react";
import LoadingSpiner from "../../Components/Shareds/LoadingSpiner";
import { 
  Heart, Lock, Unlock, User, Calendar, Ruler, Scale, MapPin, Users, Phone, Mail,
  Crown, Star, Clock, CheckCircle, DollarSign, Briefcase, AlertCircle
} from "lucide-react";

const DetailBiodata = () => {
  const { user } = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch main biodata details
  const { data: biodata, isLoading: biodataLoading } = useQuery({
    queryKey: ['biodata', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/biodatas/${id}`);
      return res.data;
    },
    enabled: !!id
  });
  // Check biodata access - This is the KEY query that determines everything
  const { data: accessData, isLoading: accessLoading } = useQuery({
    queryKey: ['biodata-access', user?.email, biodata?.biodataId],
    queryFn: async () => {
      if (!user?.email || !biodata?.biodataId) return null;
      
      const res = await axiosPublic.get(`/check-biodata-access`, {
        params: {
          userEmail: user.email,
          biodataId: biodata.biodataId
        }
      });
      return res.data;
    },
    enabled: !!user?.email && !!biodata?.biodataId,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });
  // Fetch similar biodatas 
  const { data: similarResponse, isLoading: similarLoading } = useQuery({
    queryKey: ['similar-biodatas', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/biodatas/${id}/similar?limit=3`);
      return res.data;
    },
    enabled: !!id
  });

  const similarBiodatas = similarResponse?.data || [];

  // WORKFLOW LOGIC - Determine current state
  const isPremiumUser = accessData?.isPremium || false;
  const hasAccess = accessData?.hasAccess || false;
  const hasPendingRequest = accessData?.hasPendingRequest || false;
  const accessType = accessData?.accessType || 'none';

  // Determine which contact information to show
  const hasAccessToContact = isPremiumUser || hasAccess;

  // Handle add to favourites
  const handleAddToFavourites = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to login to add favourites",
        showConfirmButton: true,
        background: "#fdf2f8",
        confirmButtonColor: "#ec4899"
      });
      return;
    }

    const favouriteData = {
      Name: biodata?.name,
      BiodataId: biodata?.biodataId,
      ParmanentAddress: biodata?.ParmanentDivison,
      Occupation: biodata?.Occupation,
      useremail: user?.email,
      BiodataPhoto: biodata?.photo,
      BiodataType: biodata?.biodataType,
      Age: biodata?.Age
    };

    try {
      const res = await axiosPublic.post('/favourites', favouriteData);
      
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to Favourites Successfully",
          showConfirmButton: false,
          timer: 1500,
          background: "#fdf2f8"
        });
      }
    } catch (err) {
      if (err.response?.status === 403) {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Already Added to Favourites",
          showConfirmButton: false,
          timer: 1500,
          background: "#fdf2f8"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add to favourites",
          showConfirmButton: true,
          background: "#fdf2f8",
          confirmButtonColor: "#ec4899"
        });
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (biodataLoading || accessLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
        <LoadingSpiner />
      </div>
    );
  }

  if (!biodata) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-rose-100">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-rose-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Biodata Not Found</h2>
          <p className="text-gray-600 mb-6">The biodata you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/biodatas" 
            className="bg-gradient-to-r from-rose-400 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-500 hover:to-rose-600 transition-all duration-200 inline-block"
          >
            Browse All Biodatas
          </Link>
        </div>
      </div>
    );
  }

  return (
      <div className="mx-auto p-2 md:p-4 lg:p-6">
        <div className="mb-8">
          <Heading 
            subheading="View detailed information about this biodata" 
            heading="Biodata Details"
          />
        </div>
        
        {/* Premium User Banners */}
        {isPremiumUser && (
          <div className="mb-6 rounded-2xl p-4 text-center shadow-lg bg-gradient-to-r from-amber-400 to-amber-500 text-white">
            <div className="flex items-center justify-center gap-3">
              <Crown size={24} />
              <p className="font-bold text-lg">
                 Premium Member - Full Access to All Contact Information
              </p>
            </div>
          </div>
        )}
        {hasAccess && !isPremiumUser && (
          <div className="mb-6 rounded-2xl p-4 text-center shadow-lg bg-gradient-to-r from-green-400 to-green-500 text-white">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle size={24} />
              <p className="font-bold text-lg">
                 Paid Access - Contact Information Unlocked
              </p>
            </div>
          </div>
        )}
        {hasPendingRequest && !hasAccessToContact && (
          <div className="mb-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-2xl p-4 text-center shadow-lg">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <Clock size={24} />
                <p className="font-bold text-lg"> Payment Pending Admin Approval</p>
              </div>
              <p className="text-yellow-100 text-sm">
                Your $5 payment has been received and is awaiting admin approval
              </p>
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden mb-8">
          
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-rose-400 to-rose-500 p-6 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <img
                  className="rounded-full w-24 h-24 lg:w-32 lg:h-32 object-cover border-4 border-white shadow-lg"
                  src={biodata?.photo}
                  alt={biodata?.name}
                />
                {hasAccessToContact && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
                    <Unlock size={16} className="text-white" />
                  </div>
                )}
                {hasPendingRequest && !hasAccessToContact && (
                  <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2 shadow-lg">
                    <Clock size={16} className="text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold">{biodata?.name}</h1>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                    {biodata?.biodataType}
                  </span>
                
                </div>
                <p className="text-rose-100 text-lg opacity-90">Biodata ID: {biodata?.biodataId}</p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                    <Calendar size={12} className="inline mr-1" />
                    {biodata?.Age} years
                  </span>
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                    <Ruler size={12} className="inline mr-1" />
                    {biodata?.Height}
                  </span>
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                    <Scale size={12} className="inline mr-1" />
                    {biodata?.Weight}
                  </span>
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                    <Briefcase size={12} className="inline mr-1" />
                    {biodata?.Occupation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Biodata Information Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoCard icon={User} label="Full Name" value={biodata?.name} />
              <InfoCard icon={Calendar} label="Date of Birth" value={biodata?.birthDate?.slice(0, 10)} />
              <InfoCard icon={Users} label="Biodata Type" value={biodata?.biodataType} />
              <InfoCard icon={Ruler} label="Height" value={biodata?.Height} />
              <InfoCard icon={Scale} label="Weight" value={biodata?.Weight} />
              <InfoCard icon={Calendar} label="Age" value={`${biodata?.Age} years`} />
              <InfoCard icon={MapPin} label="Permanent Division" value={biodata?.ParmanentDivison} />
              <InfoCard icon={MapPin} label="Present Division" value={biodata?.PresentDivison} />
              <InfoCard icon={Users} label="Race/Religion" value={biodata?.Race} />
              <InfoCard icon={User} label="Father's Name" value={biodata?.FatherName} />
              <InfoCard icon={User} label="Mother's Name" value={biodata?.MotherName} />
              <InfoCard icon={Briefcase} label="Occupation" value={biodata?.Occupation} />
              <InfoCard icon={Ruler} label="Expected Partner Height" value={biodata?.PartnerHeight} />
              <InfoCard icon={Scale} label="Expected Partner Weight" value={biodata?.PartnerWeight} />
              <InfoCard icon={Calendar} label="Expected Partner Age" value={`${biodata?.PartnerAge} years`} />

              {/* CONTACT INFORMATION - CONDITIONAL RENDERING BASED ON ACCESS */}
              {hasAccessToContact ? (
                <>
                  <InfoCard 
                    icon={Mail} 
                    label="Contact Email" 
                    value={biodata?.ContactEmail}
                    highlighted 
                  />
                  <InfoCard 
                    icon={Phone} 
                    label="Mobile Number" 
                    value={biodata?.MobileNumber}
                    highlighted 
                  />
                  {isPremiumUser && (
                    <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-100 p-2 rounded-lg">
                          <Crown className="text-amber-600" size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
                            Premium Access
                          </p>
                          <p className="text-sm font-medium text-amber-800">
                            Full contact access granted
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <LockedInfoCard 
                    icon={Mail}
                    label="Contact Email"
                    message={user ? "$5 Payment Required" : "Login Required"}
                    status={hasPendingRequest ? "pending" : "locked"}
                  />
                  <LockedInfoCard 
                    icon={Phone}
                    label="Mobile Number" 
                    message={user ? "$5 Payment Required" : "Login Required"}
                    status={hasPendingRequest ? "pending" : "locked"}
                  />
                  <div className="bg-rose-50 rounded-xl p-4 border-2 border-rose-300">
                    <div className="flex items-center gap-3">
                      <div className="bg-rose-100 p-2 rounded-lg">
                        <DollarSign className="text-rose-600" size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-rose-700 uppercase tracking-wide mb-1">
                          Access Cost
                        </p>
                        <p className="text-sm font-medium text-rose-800">
                          $5 one-time payment
                        </p>
                        <p className="text-xs text-rose-600 mt-1">
                          {hasPendingRequest ? "Awaiting admin approval" : "Required for contact access"}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ACTION BUTTONS - WORKFLOW CONTROL */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              
              {/* Add to Favourites - Always available */}
              <button
                onClick={handleAddToFavourites}
                className="bg-white flex items-center justify-center gap-3 hover:bg-rose-50 text-rose-600 font-semibold rounded-xl py-4 px-8 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-rose-300 hover:border-rose-400"
              >
                <Heart size={20} />
                Add to Favourites
              </button>

              {/* WORKFLOW: Pay Button - Show if logged in, not premium, no access, no pending request */}
              {user && !isPremiumUser && !hasAccess && !hasPendingRequest && (
                <button
                  onClick={openModal}
                  className="bg-gradient-to-r flex items-center justify-center gap-3 from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold rounded-xl py-4 px-8 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <DollarSign size={20} />
                  Pay $5 to Unlock Contact
                </button>
              )}

              {/* WORKFLOW: Pending Status - Show if has pending request but no access */}
              {hasPendingRequest && !hasAccess && (
                <button
                  disabled
                  className="bg-gradient-to-r flex items-center justify-center gap-3 from-yellow-400 to-yellow-500 text-white font-semibold rounded-xl py-4 px-8 transition-all duration-200 shadow-md opacity-90 cursor-not-allowed"
                >
                  <Clock size={20} />
                  Payment Pending Approval
                </button>
              )}

              {/* WORKFLOW: Login Button - Show if not logged in */}
              {!user && (
                <Link
                  to="/login"
                  className="bg-gradient-to-r flex items-center justify-center gap-3 from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold rounded-xl py-4 px-8 transition-all duration-200 shadow-md hover:shadow-lg text-center"
                >
                  <User size={20} />
                  Login to Purchase Access
                </Link>
              )}

              {/* WORKFLOW: Access Granted Status - Show if has access */}
              {hasAccessToContact && (
                <div className={`rounded-xl p-4 flex items-center justify-center gap-3 border-2 ${
                  isPremiumUser 
                    ? 'bg-amber-50 border-amber-300' 
                    : 'bg-green-50 border-green-300'
                }`}>
                  {isPremiumUser ? <Crown className="text-amber-500" size={20} /> : <CheckCircle className="text-green-500" size={20} />}
                  <span className={`font-semibold ${isPremiumUser ? 'text-amber-700' : 'text-green-700'}`}>
                    {isPremiumUser ? 'Premium Access Granted' : 'Contact Access Granted'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="text-rose-500" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Unlock Contact Information
                </h2>
                <p className="text-gray-600">
                  Pay $5 to access contact details for this biodata
                </p>
              </div>
              
              <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-rose-500 mb-2">$5</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-center justify-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      One-time payment for this biodata
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Access to email and mobile number
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <AlertCircle size={16} className="text-yellow-600" />
                      Admin approval required after payment
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700 text-center">
                    <strong>Biodata ID:</strong> {biodata?.biodataId} • 
                    <strong> Name:</strong> {biodata?.name}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <Link
                    to={`/dashboard/payment/${biodata?.biodataId}`}
                    onClick={closeModal}
                    className="flex-1 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2"
                  >
                    <DollarSign size={18} />
                    Continue to Payment
                  </Link>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  You'll be redirected to our secure payment page
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Similar Biodatas Section */}
        <div className="mt-12">
          <Heading 
            subheading="Discover biodatas with similar preferences and characteristics" 
            heading="Similar Profiles"
          />
          
          {similarLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpiner />
            </div>
          ) : similarBiodatas && similarBiodatas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {similarBiodatas.map(data => (
                <BiodataCard key={data._id} data={data} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-rose-100 border-2 border-rose-300 rounded-xl p-8 max-w-md mx-auto">
                <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-rose-500" size={24} />
                </div>
                <p className="text-rose-700 font-semibold mb-2">No similar biodatas found</p>
                <p className="text-sm text-gray-600 mb-4">
                  We couldn't find any profiles matching the current criteria
                </p>
                <Link 
                  to="/biodatas"
                  className="text-rose-500 hover:text-rose-600 font-medium text-sm"
                >
                  Browse All Biodatas →
                </Link>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <Link to="/biodatas">
              <button className="bg-gradient-to-r from-rose-400 to-rose-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-rose-500 hover:to-rose-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-3">
                <Star size={20} />
                Explore More Biodatas
                <span className="text-lg">→</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
   
  );
};

// InfoCard Component
const InfoCard = ({ icon: Icon, label, value, highlighted = false }) => {
  return (
    <div className={`rounded-xl p-4 transition-all duration-200 border-2 ${
      highlighted 
        ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300 shadow-md' 
        : 'bg-white border-rose-100 hover:shadow-md hover:border-rose-200'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          highlighted ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'
        }`}>
          <Icon size={18} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className={`text-sm font-medium ${
            highlighted ? 'text-green-800' : 'text-gray-800'
          }`}>
            {value || 'Not specified'}
          </p>
        </div>
      </div>
    </div>
  );
};

// LockedInfoCard Component
const LockedInfoCard = ({ icon: Icon, label, message, status = "locked" }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-300",
          textColor: "text-yellow-700",
          icon: Clock
        };
      case "locked":
      default:
        return {
          bgColor: "bg-rose-50",
          borderColor: "border-rose-300",
          textColor: "text-rose-700",
          icon: Lock
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <div className={`${config.bgColor} rounded-xl p-4 border-2 ${config.borderColor}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${status === "pending" ? "bg-yellow-200 text-yellow-600" : "bg-rose-200 text-rose-600"}`}>
          <Icon size={18} />
        </div>
        <div className="flex-1">
          <p className={`text-xs font-semibold ${config.textColor} uppercase tracking-wide mb-1 flex items-center gap-2`}>
            <StatusIcon size={14} />
            {label}
          </p>
          <p className={`text-xs ${config.textColor} font-medium`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailBiodata;