import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAuth from "../../../Hooks/UseAuth";
import Heading from "../Sidebar/Heading";
import Swal from "sweetalert2";
import {
  FaUserShield,
  FaCrown,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import LoadingSpiner from "../../../Components/Shareds/LoadingSpiner";

const ManageUsers = () => {
  const axiosPublic = UseAxiosPublic();
  const { user, loading } = UseAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const {
    refetch,
    data: usersResponse,
    isLoading,
  } = useQuery({
    queryKey: ["users", currentPage, searchTerm],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/manageusers?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`
      );
      console.log(res)
      return res.data;
    },
  });

  const users = usersResponse || [];
  const totalPages = usersResponse?.pagination?.totalPages || 1;
  const totalUsers = usersResponse?.pagination?.totalItems || 0;
  const currentPageNum = usersResponse?.pagination?.currentPage || 1;

  // Handle Make Admin
  const handleMakeAdmin = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const action = newRole === "admin" ? "Admin" : "Regular User";

    Swal.fire({
      title: "Are you sure?",
      text: `Change this user's role to ${action}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fb7185",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: `Yes, make ${action}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updaterole = { updaterole: newRole };
          const res = await axiosPublic.patch(`/userupdate/${id}`, updaterole);

          if (res.data.modifiedCount > 0 || res.data.success) {
            await refetch();
            Swal.fire({
              title: "Success!",
              text: `User is now ${action}`,
              icon: "success",
              confirmButtonColor: "#fb7185",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonColor: "#fb7185",
          });
        }
      }
    });
  };

  // Handle Make Premium
  const handleMakePremium = async (id, currentStatus) => {
    const newStatus = currentStatus === "premium" ? "normal" : "premium";
    const action = newStatus === "premium" ? "Premium" : "Normal";

    Swal.fire({
      title: "Are you sure?",
      text: `Change this user's membership to ${action}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fb7185",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: `Yes, make ${action}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updaterole = { updaterole: newStatus };
          const res = await axiosPublic.patch(
            `/userupdatepremium/${id}`,
            updaterole
          );
            console.log(res)
          if (res.data.modifiedCount > 0 || res.data.success) {
            await refetch();
            Swal.fire({
              title: "Success!",
              text: `User is now ${action} member`,
              icon: "success",
              confirmButtonColor: "#fb7185",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonColor: "#fb7185",
          });
        }
      }
    });
  };
  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (isLoading) {
    return <LoadingSpiner />;
  }

  return (
    <div className="mx-auto">
      <Heading
        heading="Manage Users"
        subheading="Control user roles and membership status"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-rose-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {totalUsers}
              </p>
            </div>
            <div className="bg-rose-100 p-4 rounded-full">
              <FaUserShield className="text-rose-500 text-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg mb-8 border-2 border-rose-200">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 border-2 bg-slate-50 border-gray-200 rounded-lg focus:outline-none focus:border-rose-400 transition-colors"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-rose-200">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-rose-400 to-rose-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  User Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Admin Role
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  UserType
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Update UserType
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users?.data.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users?.data?.map((userData) => (
                  <tr
                    key={userData._id}
                    className="hover:bg-rose-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                          <span className="text-rose-600 font-bold">
                            {userData?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-gray-800">
                          {userData?.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {userData?.email}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            handleMakeAdmin(userData?._id, userData?.roll)
                          }
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${
                            userData?.roll === "admin"
                              ? "bg-blue-500 text-white shadow-md"
                              : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                          }`}
                        >
                          {userData?.roll === "admin" ? (
                            <span className="flex items-center gap-2">
                              <MdAdminPanelSettings /> Admin
                            </span>
                          ) : (
                            <span>Make Admin</span>
                          )}
                        </button>
                      </div>
                    </td>
             <td className="px-6 py-4">
  <div className="flex justify-center">
    <button
      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105
        ${
          userData?.type === "premium"
            ? "bg-yellow-500 text-white"
            : userData?.type === "requested"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
    >
      {userData?.type === "premium"
        ? "Premium"
        : userData?.type === "requested"
        ? "Requested"
        : "Normal"}
    </button>
  </div>
</td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            handleMakePremium(userData?._id, userData?.type)
                          }
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${
                            userData?.type === "premium"
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md"
                              : "bg-gray-200 text-gray-700 hover:bg-yellow-100"
                          }`}
                        >
                          {userData?.type === "premium" ? (
                            <span className="flex items-center gap-2">
                              Make  Normal
                            </span>
                          ) : (
                            <span>Make Premium</span>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination  */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-rose-600">
            {users?.data?.length}
          </span>{" "}
          of <span className="font-semibold text-rose-600">{totalUsers}</span>{" "}
          users
          {searchTerm && ` (filtered)`}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-rose-500 text-white hover:bg-rose-600"
              }`}
            >
              <FaChevronLeft />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex gap-2">
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageClick(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    currentPage === pageNum
                      ? "bg-rose-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-rose-100"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-rose-500 text-white hover:bg-rose-600"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
