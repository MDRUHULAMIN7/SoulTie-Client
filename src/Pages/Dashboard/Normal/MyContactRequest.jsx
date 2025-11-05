import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import Heading from "../Sidebar/Heading";
import Swal from "sweetalert2";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Phone, 
  User,
  Trash2,
  RefreshCw,
  AlertCircle,
  Timer
} from "lucide-react";

const MyContactRequest = () => {
  const { user } = UseAuth();
  const axiosPublic = UseAxiosPublic();

  // Fetch user's contact requests (all statuses)
  const { data: responseData, refetch, isLoading } = useQuery({
    queryKey: ['my-contact-requests', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/payment/${user?.email}`);
      

      return res.data;
    }
  });

  const allPayments = responseData?.data || [];
  console.log(allPayments)
  // Filter out pending payments (show only approved/rejected)
  const myRequests = allPayments.filter((payment) => payment.status !== "pending");

  console.log('My Contact Requests:', myRequests);

  const handleDelete = async (payment) => {
    const statusLabel = payment.status === 'approved' ? 'approved' : 'rejected';
    
    const result = await Swal.fire({
      title: "Delete Contact Request?",
      html: `
        <div class="text-left space-y-2">
          <p><strong>Biodata:</strong> ${payment.biodata?.name || 'N/A'}</p>
          <p><strong>Status:</strong> <span class="capitalize font-semibold ${
            payment.status === 'approved' ? 'text-green-600' : 'text-red-600'
          }">${statusLabel}</span></p>
          <p><strong>Email:</strong> ${payment.biodata?.ContactEmail || 'N/A'}</p>
          <hr class="my-2"/>
          <p class="text-sm text-gray-600">This will permanently delete this ${statusLabel} contact request and remove your access.</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete It!",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosPublic.delete(`/payment-delete/${payment._id}`);
        
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted Successfully!",
            html: `
              <p>Contact request deleted</p>
              <p class="text-sm text-gray-600 mt-2">
                ${res.data.message}
              </p>
            `,
            showConfirmButton: false,
            timer: 2500,
            background: "#f0fdf4"
          });
          refetch();
        } else {
          throw new Error(res.data.message || 'Deletion failed');
        }
      } catch (error) {
        console.error('Delete error:', error);
        Swal.fire({
          icon: "error",
          title: "Deletion Failed",
          text: error.response?.data?.message || error.message || "Failed to delete contact request",
          confirmButtonColor: "#ef4444"
        });
      }
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'approved') {
      return (
        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-2 justify-center rounded-full text-xs font-semibold">
          <CheckCircle size={14} />
          Approved
        </span>
      );
    } else if (status === 'pending') {
      return (
        <span className="flex items-center gap-1 bg-blue-100 text-gray-700 px-3 py-2 justify-center rounded-full text-xs font-semibold">
          <Timer size={14} />
          Pending
        </span>
      );
    }
     else if (status === 'rejected') {
      return (
        <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-2 justify-center rounded-full text-xs font-semibold">
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin text-rose-500 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading your contact requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-4 lg:p-6">
      <div className="container mx-auto max-w-6xl">
        
        <Heading
          heading="My Contact Requests"
          subheading="View and manage your approved and rejected contact requests"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-semibold mb-1">Approved</p>
                <p className="text-3xl font-bold">
                  {allPayments.filter(p => p.status === 'approved').length}
                </p>
              </div>
              <CheckCircle size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-semibold mb-1">Rejected</p>
                <p className="text-3xl font-bold">
                  {allPayments.filter(p => p.status === 'rejected').length}
                </p>
              </div>
              <XCircle size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-semibold mb-1">Pending</p>
                <p className="text-3xl font-bold">
                  {allPayments.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <Clock size={32} />
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {allPayments.length < 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-rose-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Contact Requests</h3>
              <p className="text-gray-500">
                You don't have any approved or rejected contact requests yet
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-rose-400 to-rose-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Biodata</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Contact Info</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Transaction ID</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {allPayments.map((payment, index) => (
                      <tr key={payment._id} className={`hover:bg-rose-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        
                        {/* Biodata Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={payment.biodata?.photo} 
                              alt={payment.biodata?.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-rose-300"
                            />
                            <div>
                              <p className="font-semibold text-gray-800">{payment.biodata?.name || 'N/A'}</p>
                              <p className="text-xs text-gray-500">ID: {payment.biodata?.biodataId || 'N/A'}</p>
                            </div>
                          </div>
                        </td>

                        {/* Contact Info */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-700 flex items-center gap-2">
                              <Mail size={14} className="text-rose-500" />
                              {payment.biodata?.ContactEmail || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 flex items-center gap-2">
                              <Phone size={14} className="text-rose-500" />
                              {payment.biodata?.MobileNumber || 'N/A'}
                            </p>
                          </div>
                        </td>

                        {/* Transaction ID */}
                        <td className="px-6 py-4">
                          <p className="text-xs text-gray-600 font-mono">
                            {payment.transactionId ? `...${payment.transactionId.slice(-12)}` : 'N/A'}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 text-center">
                          {getStatusBadge(payment.status)}
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDelete(payment)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-gray-200">
                {myRequests.map((payment) => (
                  <div key={payment._id} className="p-4 hover:bg-rose-50 transition-colors">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={payment.biodata?.photo} 
                          alt={payment.biodata?.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-rose-300"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{payment.biodata?.name || 'N/A'}</p>
                          <p className="text-xs text-gray-500">ID: {payment.biodata?.biodataId || 'N/A'}</p>
                        </div>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>

                    {/* Contact Info */}
                    <div className="bg-rose-50 rounded-lg p-3 mb-3">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Contact Information</p>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700 flex items-center gap-2">
                          <Mail size={14} className="text-rose-500" />
                          {payment.biodata?.ContactEmail || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-700 flex items-center gap-2">
                          <Phone size={14} className="text-rose-500" />
                          {payment.biodata?.MobileNumber || 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(payment)}
                      className="w-full bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete Request
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyContactRequest;