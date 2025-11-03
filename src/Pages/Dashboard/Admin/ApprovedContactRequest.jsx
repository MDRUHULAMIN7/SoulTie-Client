import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAuth from "../../../Hooks/UseAuth";
import Heading from "../Sidebar/Heading";
import Swal from "sweetalert2";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaIdCard,
  FaTimesCircle,
} from "react-icons/fa";
import { MdPending, MdVerified } from "react-icons/md";

const ApprovedContactRequest = () => {
  const axiosPublic = UseAxiosPublic();
  const { user } = UseAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const {
    data: paymentsResponse,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["payments", currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/payments?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res?.data;
    },
  });

  const allPayments = paymentsResponse?.data || [];
  const pagination = paymentsResponse?.pagination || {};

  const totalPages = pagination.totalPages || 1;
  const totalItems = pagination.totalItems || 0;

  const isApproved = (status) => {
    return status && (status.includes("aprove") || status.includes("approved"));
  };

  const handleToggleStatus = async (payment) => {
    const biodataId = payment.biodataId;
    const isCurrentlyApproved = isApproved(payment?.status);
    const actionText = isCurrentlyApproved ? "Revoke" : "Approve";

    Swal.fire({
      title: `${actionText} Contact Request?`,
      text: isCurrentlyApproved
        ? "This will revoke access to contact information"
        : "User will be able to access contact information",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: isCurrentlyApproved ? "#f59e0b" : "#10b981",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: `Yes, ${actionText}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updateData = {
            biodataId: biodataId,
          };
          const res = await axiosPublic.put("/payment/approve", updateData);

          if (res.data.success) {
            await refetch();
            Swal.fire({
              title: "Success!",
              text: res.data.message,
              icon: "success",
              confirmButtonColor: "#fb7185",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: res.data.message || "Failed to update status",
              icon: "error",
              confirmButtonColor: "#fb7185",
            });
          }
        } catch (error) {
          console.error("Error updating status:", error);
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <Heading
        heading="Contact Requests"
        subheading="Approve or manage contact information requests"
      />

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-lg xl:overflow-hidden border-2 border-rose-200">
        <div className="overflow-x-scroll custom-scrollbar">
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
                  Biodata ID
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Biodata Name
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allPayments.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No contact requests found
                  </td>
                </tr>
              ) : (
                allPayments?.map((payment) => {
                  const isCurrentlyApproved = isApproved(payment?.status);

                  return (
                    <tr
                      key={payment._id}
                      className="hover:bg-rose-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                            <span className="text-rose-600 font-bold">
                              {payment?.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium text-gray-800">
                            {payment?.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {payment?.email}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full font-semibold text-sm flex items-center gap-2">
                            <FaIdCard /> {payment?.biodataId}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {payment?.biodtaName}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {!isCurrentlyApproved ? (
                            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-sm">
                              <MdPending className="text-lg" /> Pending
                            </span>
                          ) : (
                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-sm">
                              <MdVerified className="text-lg" /> Approved
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleToggleStatus(payment)}
                            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2 ${
                              !isCurrentlyApproved
                                ? "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white"
                                : "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white"
                            }`}
                          >
                            {!isCurrentlyApproved ? (
                              <>
                                <FaCheckCircle /> Approve
                              </>
                            ) : (
                              <>
                                <FaTimesCircle /> Revoke
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination  */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Page{" "}
          <span className="font-semibold text-rose-600">
            {pagination.currentPage || 1}
          </span>{" "}
          of <span className="font-semibold text-rose-600">{totalPages}</span> •
          Showing{" "}
          <span className="font-semibold text-rose-600">
            {allPayments.length}
          </span>{" "}
          of <span className="font-semibold text-rose-600">{totalItems}</span>{" "}
          requests
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

export default ApprovedContactRequest;
