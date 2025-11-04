import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import {
  FaUser,
  FaVenusMars,
  FaBirthdayCake,
  FaBriefcase,
  FaRulerVertical,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaWeight,
  FaUsers,
  FaUserFriends,
  FaHeart,
  FaMobileAlt,
  FaEnvelope,
  FaCrown,
  FaStar,
  FaTimes,
  FaSync,
} from "react-icons/fa";
import LoadingSpiner from "../../../Components/Shareds/LoadingSpiner";

const ViewBiodata = () => {
  const { user } = UseAuth();
  const axiosPublic = UseAxiosPublic();

  const {
    data: mydata = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["mydata", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/view-biodatas/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handlePremiumRequest = async (id) => {
    const result = await Swal.fire({
      title: "Go Premium?",
      text: "Request premium status for your biodata to get more visibility",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ec4899",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Request Premium!",
      cancelButtonText: "Cancel",
      background: "#fdf2f8",
    });

    if (result.isConfirmed) {
      try {
        const updaterole = { updaterole: "requested" };
        const res = await axiosPublic.patch(`/biodataupdate/${id}`, updaterole);

        if (res.data.modifiedCount > 0) {
          await Swal.fire({
            title: "Premium Request Sent!",
            text: "Your request has been submitted for admin approval",
            icon: "success",
            confirmButtonColor: "#ec4899",
            background: "#fdf2f8",
          });
          refetch();
        }
      } catch (error) {
        Swal.fire({
          title: "Request Failed",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#ec4899",
        });
      }
    }
  };

  const handleWithdrawRequest = async (id) => {
    const result = await Swal.fire({
      title: "Withdraw Premium Request?",
      text: "Are you sure you want to withdraw your premium request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6b7280",
      cancelButtonColor: "#ec4899",
      confirmButtonText: "Yes, Withdraw!",
      cancelButtonText: "Cancel",
      background: "#fdf2f8",
    });

    if (result.isConfirmed) {
      try {
        const updaterole = { updaterole: "normal" };
        const res = await axiosPublic.patch(`/biodataupdate/${id}`, updaterole);

        if (res.data.modifiedCount > 0) {
          await Swal.fire({
            title: "Request Withdrawn!",
            text: "Your premium request has been withdrawn successfully",
            icon: "success",
            confirmButtonColor: "#6b7280",
            background: "#fdf2f8",
          });
          refetch();
        }
      } catch (error) {
        Swal.fire({
          title: "Withdrawal Failed",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#6b7280",
        });
      }
    }
  };

  if (isLoading) {
    return (
    <LoadingSpiner/>
    );
  }

  const getRoleBadge = (role) => {
    const roleConfig = {
      normal: {
        color: "bg-gray-100 text-gray-800 border border-gray-300",
        label: "Normal",
        icon: FaUser,
      },
      requested: {
        color: "bg-yellow-100 text-yellow-800 border border-yellow-300",
        label: "Pending Approval",
        icon: FaSync,
      },
      premium: {
        color:
          "bg-gradient-to-r from-rose-400 to-rose-500 text-white border border-rose-500",
        label: "Premium Member",
        icon: FaCrown,
      },
    };

    const config = roleConfig[role] || roleConfig.normal;
    const IconComponent = config.icon;

    return (
      <span
        className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${config.color}`}
      >
        <IconComponent className="text-sm" />
        {config.label}
      </span>
    );
  };

  const renderActionButton = () => {
    switch (mydata?.role) {
      case "normal":
        return (
          <button
            onClick={() => handlePremiumRequest(mydata?._id)}
            className="bg-gradient-to-r from-rose-400 to-rose-500 text-white px-8 py-3 rounded-full font-bold hover:from-rose-500 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2 mx-auto"
          >
            <FaStar />
            Upgrade to Premium
          </button>
        );

      case "requested":
        return (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => handleWithdrawRequest(mydata?._id)}
              className="bg-gray-500 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
            >
              <FaTimes />
              Withdraw Request
            </button>
            <div className="text-yellow-600 bg-yellow-50 px-4 py-3 rounded-full border border-yellow-200 flex items-center gap-2">
              <FaSync className="animate-spin" />
              Under Review
            </div>
          </div>
        );

      case "premium":
        return (
          <div className="text-center">
            <div className="bg-gradient-to-r from-rose-400 to-rose-500 text-white px-6 py-3 rounded-full font-bold inline-flex items-center gap-2 mb-3">
              <FaCrown />
              Premium Member
            </div>
            <p className="text-rose-600 text-sm">
              You're enjoying premium benefits!
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className=" mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-rose-400 to-rose-500 p-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-lg"
                src={mydata.photo || "/default-avatar.png"}
                alt={mydata.name}
              />
              {mydata.role === "premium" && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                  <FaCrown className="text-white text-sm" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold">
                  {mydata?.name}
                </h1>
                {getRoleBadge(mydata?.role)}
              </div>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <InfoCard
              icon={FaVenusMars}
              label="Biodata Type"
              value={mydata?.biodataType}
              color="rose"
            />
            <InfoCard
              icon={FaBirthdayCake}
              label="Date of Birth"
              value={mydata?.birthDate?.slice(0, 10)}
              color="rose"
            />
            <InfoCard
              icon={FaBriefcase}
              label="Occupation"
              value={mydata?.Occupation}
              color="rose"
            />
            <InfoCard
              icon={FaRulerVertical}
              label="Age & Height"
              value={`${mydata?.Age} yrs, ${mydata?.Height}`}
              color="rose"
            />
          </div>

          {/* Information Sections */}
          <div className="space-y-6">
            <Section title="Personal Information" icon={FaUser}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoCard
                  icon={FaWeight}
                  label="Weight"
                  value={mydata?.Weight}
                />
                <InfoCard icon={FaUsers} label="Race" value={mydata?.Race} />
                <InfoCard
                  icon={FaUserFriends}
                  label="Father's Name"
                  value={mydata?.FatherName}
                />
                <InfoCard
                  icon={FaUserFriends}
                  label="Mother's Name"
                  value={mydata?.MotherName}
                />
              </div>
            </Section>

            <Section title="Location Information" icon={FaMapMarkerAlt}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  icon={FaMapMarkerAlt}
                  label="Permanent Division"
                  value={mydata?.ParmanentDivison}
                />
                <InfoCard
                  icon={FaMapMarkerAlt}
                  label="Present Division"
                  value={mydata?.PresentDivison}
                />
              </div>
            </Section>

            <Section title="Contact Information" icon={FaEnvelope}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  icon={FaEnvelope}
                  label="Email"
                  value={mydata?.ContactEmail}
                />
                <InfoCard
                  icon={FaMobileAlt}
                  label="Mobile"
                  value={mydata?.MobileNumber}
                />
              </div>
            </Section>

            <Section title="Partner Expectations" icon={FaHeart}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard
                  icon={FaRulerVertical}
                  label="Expected Height"
                  value={mydata?.PartnerHeight}
                />
                <InfoCard
                  icon={FaWeight}
                  label="Expected Weight"
                  value={mydata?.PartnerWeight}
                />
                <InfoCard
                  icon={FaCalendarAlt}
                  label="Expected Age"
                  value={mydata?.PartnerAge}
                />
              </div>
            </Section>
          </div>

          {/* Premium Action Section */}
          <div className="mt-8 bg-gradient-to-r from-rose-400 to-rose-500 rounded-2xl p-6 text-white text-center">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <FaCrown className="text-2xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {mydata?.role === "premium"
                  ? "Premium Member"
                  : "Premium Status"}
              </h3>
              <p className="text-rose-100 mb-6 opacity-90">
                {mydata?.role === "normal"
                  ? "Get more visibility and priority in search results with Premium status"
                  : mydata?.role === "requested"
                  ? "Your premium request is under review by our admin team"
                  : "You're enjoying exclusive premium benefits and increased visibility"}
              </p>

              {renderActionButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-xl p-6 border border-rose-100 shadow-sm">
    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <Icon className="text-rose-500" />
      {title}
    </h2>
    {children}
  </div>
);

// Reusable Info Card Component
const InfoCard = ({ icon: Icon, label, value, color = "rose" }) => (
  <div className="bg-rose-50 rounded-lg p-4 border border-rose-100 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3">
      <div className={`bg-rose-100 p-2 rounded-lg`}>
        <Icon className={`text-rose-500 text-sm`} />
      </div>
      <div>
        <p className="text-sm text-rose-600 font-semibold">{label}</p>
        <p className="text-gray-800 font-medium">{value || "Not specified"}</p>
      </div>
    </div>
  </div>
);

export default ViewBiodata;
