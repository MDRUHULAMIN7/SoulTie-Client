import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import BiodataCard from "./BiodataCard";
import Heading from "../Dashboard/Sidebar/Heading";
import Swal from "sweetalert2";
import UserRole from "../../Hooks/UserRole";
import { useState } from "react";
import LoadingSpiner from "../../Components/Shareds/LoadingSpiner";
import { Heart, Lock, Unlock } from "lucide-react";

const DetailBiodata = () => {
  const { user } = UseAuth();
  const [role] = UserRole();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const axiosPublic = UseAxiosPublic();
  const { id } = useParams();

  // Fetch main biodata details
  const { data: biodata, isLoading: biodataLoading } = useQuery({
    queryKey: ['biodata', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/biodatas/${id}`);
      return res.data;
    },
    enabled: !!id
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
  const similarityCriteria = similarResponse?.criteria;

  // Fetch payment data 
  const { data: payments } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosPublic.get('/payments');
      return res.data;
    }
  });

  // Check if user has access to contact information
  const hasAccessToContact = () => {
    if (!biodata || !payments) return false;
    if (role[1] === 'premium') return true;
    const payment = payments.find(
      p => parseInt(p.biodataId) === biodata.biodataId
    );
    return !!payment;
  };

  const hasAccess = hasAccessToContact();

  // Handle add to favourites
  const handleAddToFavourites = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to login to add favourites",
        showConfirmButton: true
      });
      return;
    }

    const favouriteData = {
      Name: biodata?.name,
      BiodataId: biodata?.biodataId,
      ParmanentAddress: biodata?.ParmanentDivison,
      Occupation: biodata?.Occupation,
      useremail: user?.email
    };

    try {
      const res = await axiosPublic.post('/favourites', favouriteData);
      
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to Favourites Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (err) {
      if (err.response?.status === 403) {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Already Added to Favourites",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add to favourites",
          showConfirmButton: true
        });
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (biodataLoading) {
    return (
     <LoadingSpiner/>
    );
  }

  if (!biodata) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Biodata not found</h2>
          <Link to="/biodatas" className="text-rose-500 hover:text-rose-600 mt-4 inline-block">
            Return to Browse Biodatas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Heading 
        subheading="View detailed information about this biodata" 
        heading="Biodata Details"
      />

      <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg shadow-lg p-6 md:p-8 mb-12">

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b-2 border-rose-300">
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-32 h-32 lg:w-44 lg:h-44 object-cover border-4 border-white shadow-lg"
              src={biodata?.photo}
              alt={biodata?.name}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            <InfoCard label="Name" value={biodata?.name} />
            <InfoCard label="Biodata Type" value={biodata?.biodataType} />
            <InfoCard label="Birth Date" value={biodata?.birthDate?.slice(0, 10)} />
            <InfoCard label="Occupation" value={biodata?.Occupation} />
            <InfoCard label="Height" value={biodata?.Height} />
            <InfoCard label="Age" value={`${biodata?.Age} years`} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
          <InfoCard label="Permanent Division" value={biodata?.ParmanentDivison} />
          <InfoCard label="Weight" value={biodata?.Weight} />
          <InfoCard label="Present Division" value={biodata?.PresentDivison} />
          <InfoCard label="Race" value={biodata?.Race} />
          <InfoCard label="Father's Name" value={biodata?.FatherName} />
          <InfoCard label="Mother's Name" value={biodata?.MotherName} />
          <InfoCard label="Expected Partner Weight" value={biodata?.PartnerWeight} />
          <InfoCard label="Expected Partner Height" value={biodata?.PartnerHeight} />
          <InfoCard label="Expected Partner Age" value={`${biodata?.PartnerAge} years`} />
          
          {/* Contact Information Conditional Display */}
          {hasAccess ? (
            <>
              <InfoCard label="Contact Email" value={biodata?.ContactEmail} highlighted />
              <InfoCard label="Mobile Number" value={biodata?.MobileNumber} highlighted />
            </>
          ) : (
            <>
              <div className="bg-rose-200 rounded-lg p-4 border-2 border-rose-300">
                <p className="text-sm font-medium text-rose-800 flex items-center gap-x-2 "><Lock size={18}/> Contact Email</p>
                <p className="text-xs text-rose-600 mt-1">Premium Access Required</p>
              </div>
              <div className="bg-rose-200 rounded-lg p-4 border-2 border-rose-300">
                <p className="text-sm font-medium text-rose-800 flex items-center gap-x-2"><Lock size={18}/> Mobile Number</p>
                <p className="text-xs text-rose-600 mt-1">Premium Access Required</p>
              </div>
            </>
          )}
          <button
            onClick={handleAddToFavourites}
            className="bg-white flex items-center gap-x-2 hover:bg-rose-50 text-rose-600 font-semibold rounded-lg p-4 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-rose-300 hover:border-rose-400"
          >
            <Heart size={18}/> Add to Favourites
          </button>

          {!hasAccess && (
            <button
              onClick={openModal}
              className="bg-gradient-to-r flex items-center gap-x-2 from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold rounded-lg p-4 transition-all duration-200 shadow-md hover:shadow-lg col-span-1 md:col-span-2"
            >
              <Unlock size={18}/> Request Contact Information
            </button>
          )}
        </div>
      </div>

      {/* Payment Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 transform transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Contact Information Request
            </h2>
            
            <div className="bg-rose-50 border-2 border-rose-300 rounded-lg p-6 mb-6">
              <p className="text-center mb-2">
                <span className="text-3xl font-bold text-rose-500">$5</span>
              </p>
              <p className="text-gray-700 text-sm text-center leading-relaxed">
                After payment, you'll need to wait for admin approval. Once approved, 
                you'll be able to view the contact information.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <Link
                to={`/dashboard/payment/${biodata?.biodataId}`}
                className="flex-1 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-center"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Similar Biodatas Section */}
      <div className="mt-12">
        <Heading 
          subheading="Discover biodatas with similar age, height, and weight" 
          heading="Similar Biodatas"
        />

        {similarityCriteria && (
          <div className="bg-rose-50 border-2 border-rose-300 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 text-center">
              <span className="font-semibold text-rose-600">Matching Criteria:</span> {similarityCriteria.biodataType} • 
              Age: {similarityCriteria.ageRange} • 
              Height: {similarityCriteria.heightRange} • 
              Weight: {similarityCriteria.weightRange}
            </p>
          </div>
        )}
        
        {similarLoading ? (
         <LoadingSpiner/>
        ) : similarBiodatas && similarBiodatas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {similarBiodatas.map(data => (
              <BiodataCard key={data._id} data={data} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-rose-100 border-2 border-rose-300 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-rose-700 font-medium mb-2">No similar biodatas found</p>
              <p className="text-sm text-gray-600">
                Try browsing all biodatas to find more matches
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Link to="/biodatas">
            <button className="text-xl font-semibold text-rose-500 hover:text-rose-600 transition-colors duration-200 flex items-center gap-2">
              Browse All Biodatas 
              <span className="text-2xl">→</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// InfoCard Component
const InfoCard = ({ label, value, highlighted = false }) => {
  return (
    <div className={`rounded-lg p-4 transition-all duration-200 ${
      highlighted 
        ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300' 
        : 'bg-white shadow-sm hover:shadow-md border border-rose-200'
    }`}>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className={`text-base font-medium ${
        highlighted ? 'text-green-800' : 'text-gray-800'
      }`}>
        {value || 'N/A'}
      </p>
    </div>
  );
};

export default DetailBiodata;