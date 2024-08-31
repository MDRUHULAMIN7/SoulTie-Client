import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";

const BiodataCard = ({ data }) => {
  return (
    <Link
      to={`/detailprofile/${data?._id}`}
      className="group text-[#303032] hover:no-underline"
    >
      <div className="max-w-lg p-5 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-100 hover:shadow-2xl">
        {/* Header Section */}
        <div className="flex justify-between pb-4 border-b border-gray-200 mb-4">
          <div className="flex items-center gap-2">
            <p className="mb-0 text-lg font-semibold text-gray-700 capitalize">
              {data?.biodataType}
              <span className="ml-2 bg-rose-500 w-10 h-10 flex items-center justify-center text-white rounded-full">
                {data?.biodataId}
              </span>
            </p>
          </div>
          <Link to={`/detailprofile/${data?._id}`}>
            <button className="flex gap-2 items-center text-sm font-semibold text-rose-500 hover:text-rose-600">
              <ImProfile />
              View Profile
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-md">
            <img
              src={data?.photo}
              alt="Profile"
              className="group-hover:scale-110 transition-transform duration-500 object-cover object-center w-full h-72"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span>Age: {data?.Age}</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-4 space-y-2">
          <h3 className="text-2xl font-bold text-rose-500">{data?.Occupation}</h3>
          <p className="leading-snug text-gray-700 text-lg">
            Permanent Division: {data?.ParmanentDivison}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BiodataCard;
