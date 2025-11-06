import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import Heading from "../Sidebar/Heading";
import {
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  User,
  AlertCircle,
  Timer,
} from "lucide-react";
import LoadingSpiner from "../../../Components/Shareds/LoadingSpiner";

const MyContactRequest = () => {
  const { user } = UseAuth();
  const axiosPublic = UseAxiosPublic();

  // Fetch user's contact requests (all statuses)
  const { data: responseData, isLoading } = useQuery({
    queryKey: ["my-contact-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/payment/${user?.email}`);

      return res.data;
    },
  });

  const allPayments = responseData?.data || [];

  const getStatusBadge = (status) => {
    if (status === "approved") {
      return (
        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-2 justify-center rounded-full text-xs font-semibold">
          <CheckCircle size={14} />
          Approved
        </span>
      );
    } else if (status === "pending") {
      return (
        <span className="flex items-center gap-1 bg-blue-100 text-gray-700 px-3 py-2 justify-center rounded-full text-xs font-semibold">
          <Timer size={14} />
          Pending
        </span>
      );
    } else if (status === "rejected") {
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
    return <LoadingSpiner />;
  }

  return (
    <div>
      <Heading
        heading="My Contact Requests"
        subheading="View and manage your approved and rejected contact requests"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-semibold mb-1">
                Approved
              </p>
              <p className="text-3xl font-bold">
                {allPayments.filter((p) => p.status === "approved").length}
              </p>
            </div>
            <CheckCircle size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-semibold mb-1">
                Rejected
              </p>
              <p className="text-3xl font-bold">
                {allPayments.filter((p) => p.status === "rejected").length}
              </p>
            </div>
            <XCircle size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-semibold mb-1">
                Pending
              </p>
              <p className="text-3xl font-bold">
                {allPayments.filter((p) => p.status === "pending").length}
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
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No Contact Requests
            </h3>
            <p className="text-gray-500">
              You don't have any approved or rejected contact requests yet
            </p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className=" overflow-x-auto custom-scrollbar">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-rose-400 to-rose-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Biodata
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Contact Info
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Transaction ID
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allPayments.map((payment, index) => (
                    <tr
                      key={payment._id}
                      className={`hover:bg-rose-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={payment.biodata?.photo}
                            alt={payment.biodata?.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-rose-300"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {payment.biodata?.name || "N/A"}
                            </p>
                            <p className="text-xs text-gray-500">
                              ID: {payment.biodata?.biodataId || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-700 flex items-center gap-2">
                            <Mail size={14} className="text-rose-500" />
                            {payment.biodata?.ContactEmail || "N/A"}
                          </p>
                          <p className="text-sm text-gray-700 flex items-center gap-2">
                            <Phone size={14} className="text-rose-500" />
                            {payment.biodata?.MobileNumber || "N/A"}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-600 font-mono">
                          {payment.transactionId
                            ? `${payment.transactionId}`
                            : "N/A"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getStatusBadge(payment.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyContactRequest;
