import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Heading from "../Sidebar/Heading";
import Swal from "sweetalert2";

import {
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Calendar,
  CreditCard,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Shield,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";
import LoadingSpiner from "../../../Components/Shareds/LoadingSpiner";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";

const ApprovedContactRequest = () => {
  const axiosPublic = UseAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // Fetch all payments with pagination and filters
  const {
    data: paymentsData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["admin-payments", currentPage, statusFilter],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/payments", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            status: statusFilter === "all" ? undefined : statusFilter,
          },
        });
        return res.data;
      } catch (error) {
        console.error("Error fetching payments:", error);
        throw error;
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const payments = paymentsData?.data || [];
  const pagination = paymentsData?.pagination || {};

  // Filter payments by search term
  const filteredPayments = payments.filter((payment) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      payment.user?.email?.toLowerCase().includes(search) ||
      payment.user?.name?.toLowerCase().includes(search) ||
      payment.biodata?.biodataId?.toString().includes(search) ||
      payment.transactionId?.toLowerCase().includes(search)
    );
  });

  // Handle status change
  const handleStatusChange = async (payment, newStatus) => {
    const statusLabels = {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
    };

    // Confirmation dialog
    const result = await Swal.fire({
      title: `Change Status to ${statusLabels[newStatus]}?`,
      html: `
        <div class="text-left space-y-2">
          <p><strong>Current Status:</strong> <span class="capitalize">${
            payment.status
          }</span></p>
          <p><strong>New Status:</strong> <span class="capitalize">${newStatus}</span></p>
          <hr class="my-3"/>
          <p><strong>User:</strong> ${payment.user?.name || "N/A"}</p>
          <p><strong>Email:</strong> ${payment.user?.email || "N/A"}</p>
          <p><strong>Biodata:</strong> ${payment.biodata?.name || "N/A"} (ID: ${
        payment.biodata?.biodataId || "N/A"
      })</p>
          <p><strong>Amount:</strong> $${payment.amount || 0}</p>
          <p><strong>Transaction ID:</strong> ${
            payment.transactionId || "N/A"
          }</p>
        </div>
      `,
      icon:
        newStatus === "approved"
          ? "success"
          : newStatus === "rejected"
          ? "warning"
          : "info",
      showCancelButton: true,
      confirmButtonColor:
        newStatus === "approved"
          ? "#10b981"
          : newStatus === "rejected"
          ? "#ef4444"
          : "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, Set to ${statusLabels[newStatus]}`,
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosPublic.put("/payment/update-status", {
        paymentId: payment._id,
        newStatus: newStatus,
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Status Updated!",
          text: `Payment status changed to ${statusLabels[newStatus]}`,
          showConfirmButton: false,
          timer: 2000,
          background:
            newStatus === "approved"
              ? "#f0fdf4"
              : newStatus === "rejected"
              ? "#fef2f2"
              : "#eff6ff",
        });
        refetch();
      } else {
        throw new Error(res.data.message || "Status update failed");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to update payment status",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    if (status === "pending") {
      return (
        <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
          <Clock size={14} />
          Pending
        </span>
      );
    } else if (status === "approved") {
      return (
        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
          <CheckCircle size={14} />
          Approved
        </span>
      );
    } else if (status === "rejected") {
      return (
        <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
          <XCircle size={14} />
          Rejected
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
        <AlertCircle size={14} />
        Unknown
      </span>
    );
  };

  if (isLoading) {
    return <LoadingSpiner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Heading
          subheading="Review and manage contact information access requests"
          heading="Payment Management Dashboard"
        />
      </div>
      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/*  Filter */}
          <div className="flex-1">
            <label className="flex items-center gap-2 ">
              <Filter size={16} />
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="custom-input"
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending Only</option>
              <option value="approved">Approved Only</option>
              <option value="rejected">Rejected Only</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex-1">
            <label className="flex items-center gap-2 ">
              <Search size={16} />
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by email, name, biodata ID..."
              className="custom-input"
            />
          </div>

          {/* Refresh Button */}
          <div className="flex items-end">
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-rose-400 hover:bg-rose-500 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredPayments.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No Payment Requests
            </h3>
            <p className="text-gray-500">
              {statusFilter === "pending"
                ? "No pending payment requests at the moment"
                : "No payment requests found matching your filters"}
            </p>
          </div>
        ) : (
          <>
            {/*Table */}
            <div className=" overflow-x-auto custom-scrollbar">
              <table className="w-full">
                <thead className="bg-rose-400 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Biodata
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Payment Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      {" "}
                      Payment Date
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPayments.map((payment, index) => (
                    <tr
                      key={payment._id}
                      className={`hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      {/* User Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-semibold text-gray-800">
                              {payment.user?.name || "N/A"}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Mail size={12} />
                              {payment.user?.email || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Biodata Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-semibold text-gray-800">
                              Biodata ID: {payment.biodata?.biodataId || "N/A"}
                            </p>
                            <p className="text-sm text-gray-600">
                              {payment.biodata?.name || "N/A"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {payment.biodata?.ContactEmail || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Payment Info */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-green-600 text-lg">
                            ${payment.amount || 0}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <CreditCard size={12} />
                            {payment.transactionId
                              ? `...${payment.transactionId.slice(-8)}`
                              : "N/A"}
                          </p>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(payment.createdAt)}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        {getStatusBadge(payment.status)}
                      </td>

                      {/* Actions  Status Toggle Buttons */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              handleStatusChange(payment, "pending")
                            }
                            disabled={payment.status === "pending"}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                              payment.status === "pending"
                                ? "bg-yellow-200 text-yellow-600 cursor-not-allowed"
                                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            }`}
                            title="Set to Pending"
                          >
                            <Clock size={14} />
                            Pending
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(payment, "approved")
                            }
                            disabled={payment.status === "approved"}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                              payment.status === "approved"
                                ? "bg-green-200 text-green-600 cursor-not-allowed"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                            title="Approve"
                          >
                            <CheckCircle size={14} />
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(payment, "rejected")
                            }
                            disabled={payment.status === "rejected"}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                              payment.status === "rejected"
                                ? "bg-red-200 text-red-600 cursor-not-allowed"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            }`}
                            title="Reject"
                          >
                            <XCircle size={14} />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between bg-white rounded-xl shadow-lg p-4">
          <div className="text-sm text-gray-600">
            Showing page <strong>{pagination.currentPage}</strong> of{" "}
            <strong>{pagination.totalPages}</strong>
            <span className="ml-2">({pagination.totalItems} total items)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={!pagination.hasPrevPage}
              className="px-4 py-2 bg-rose-400 text-white rounded-lg font-semibold hover:bg-rose-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <span className="text-sm font-semibold text-gray-700 px-3">
              Page {pagination.currentPage}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={!pagination.hasNextPage}
              className="px-4 py-2 bg-rose-400 text-white rounded-lg font-semibold hover:bg-rose-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedContactRequest;
