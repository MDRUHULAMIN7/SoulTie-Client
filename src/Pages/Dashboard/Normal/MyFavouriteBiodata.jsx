import { useEffect, useState } from "react";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAuth from "../../../Hooks/UseAuth";
import Heading from "../Sidebar/Heading";
import Swal from "sweetalert2";
import { Heart, Trash2, User, MapPin, Briefcase, Hash } from "lucide-react";
import LoadingSpiner from "../../../Components/Shareds/LoadingSpiner";

const MyFavouriteBiodata = () => {
  const axiosPublic = UseAxiosPublic();
  const { user } = UseAuth();
  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/favourites/${user?.email}`);
        setFavData(res.data);
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load favourite biodatas",
          background: "#fff1f2",
          color: "#be123c",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [axiosPublic, user?.email]);

  const handleDelete = async (id, name) => {
    Swal.fire({
      title: "Remove from Favourites?",
      text: `Are you sure you want to remove ${name}'s biodata from your favourites?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
      background: "#fff1f2",
      iconColor: "#f43f5e",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/favourites/${id}`);
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Removed!",
              text: "Biodata has been removed from your favourites",
              icon: "success",
              confirmButtonColor: "#f43f5e",
              background: "#fff1f2",
            });
            const remaining = favData.filter((data) => data.BiodataId !== id);
            setFavData(remaining);
          }
        } catch (err) {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to remove from favourites",
            background: "#fff1f2",
            color: "#be123c",
          });
        }
      }
    });
  };

  if (loading) {
    return <LoadingSpiner />;
  }

  return (
    <div className="">
      <Heading
        heading={"My Favourite Biodatas"}
        subheading={"Manage your saved biodatas for potential matches"}
      />
      {favData.length === 0 ? (
        <div className="text-center py-16  rounded-3xl border border-rose-100">
          <Heart className="w-20 h-20 text-rose-300 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-rose-400 mb-2">
            No Favourites Yet
          </h3>
          <p className="text-rose-500 max-w-md mx-auto">
            You haven't added any biodatas to your favourites. Start exploring
            and save potential matches!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-rose-100">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-rose-400 text-white">
                <tr className="text-left">
                  <th className="px-6 py-4 font-semibold ">Profile</th>
                  <th className="px-6 py-4 font-semibold ">Occupation</th>
                  <th className="px-6 py-4 font-semibold ">Biodata ID</th>
                  <th className="px-6 py-4 font-semibold ">Address</th>
                  <th className="px-6 py-4 font-semibold  text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100">
                {favData.map((biodata) => (
                  <tr
                    key={biodata._id}
                    className="hover:bg-rose-50 transition-colors duration-200"
                  >
                    {/* Name Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {biodata.Name}
                          </p>
                          <p className="text-sm text-rose-500 flex items-center">
                            <Heart className="w-3 h-3 mr-1" fill="#f43f5e" />
                            Favourite
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Occupation Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-rose-400" />
                        <span className="text-gray-700">
                          {biodata.Occupation || "Not specified"}
                        </span>
                      </div>
                    </td>

                    {/* Biodata ID Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4 text-rose-400" />
                        <span className="font-mono text-gray-700 bg-rose-50 px-2 py-1 rounded">
                          #{biodata.BiodataId}
                        </span>
                      </div>
                    </td>

                    {/* Address Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-rose-400" />
                        <span className="text-gray-700">
                          {biodata.ParmanentAddress || "Not specified"}
                        </span>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() =>
                            handleDelete(biodata.BiodataId, biodata.Name)
                          }
                          className="flex items-center space-x-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFavouriteBiodata;
