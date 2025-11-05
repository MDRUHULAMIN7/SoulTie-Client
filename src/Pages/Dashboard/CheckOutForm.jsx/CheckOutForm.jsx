import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const CheckOutForm = ({ biodataId }) => {
  const stripe = useStripe();
  const axiosPublic = UseAxiosPublic();
  const elements = useElements();
  const { user } = UseAuth();
  const [errors, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [transId, setTransId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Fetch biodata details
  const { data: fulldata } = useQuery({
    queryKey: ["fulldata", biodataId],
    enabled: !!user?.email && !!biodataId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/reqbiodatas-payment/${biodataId}`);
      return res.data;
    },
  });

  // Create payment intent on component mount
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .post("/create-payment-intent", { price: 5 })
        .then((res) => {
          console.log("Payment intent created:", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
          setTransId("");
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
          Swal.fire({
            icon: "error",
            title: "Payment Setup Failed",
            text: "Failed to initialize payment. Please refresh the page.",
            confirmButtonColor: "#ef4444",
          });
        });
    }
  }, [axiosPublic, user?.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const card = elements.getElement(CardElement);

    if (card === null) {
      setIsProcessing(false);
      return;
    }

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
      setIsProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // Confirm card payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log("[errorconfirm]", confirmError);
      setError(confirmError.message);
      setIsProcessing(false);
      return;
    }

    console.log("[paymentIntent]", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      setTransId(paymentIntent.id);

      // ✅ FIXED: Send correct data structure to backend
      const payment = {
        userEmail: user?.email,
        biodataId: parseInt(biodataId), // ✅ Convert to integer
        transactionId: paymentIntent.id,
        amount: 5,
      };

      try {
        const res = await axiosPublic.post("/payment", payment);

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Payment Successful!",
            html: `
              <div class="text-left space-y-2">
                <p><strong>Transaction ID:</strong> ${paymentIntent.id}</p>
                <p><strong>Amount:</strong> $5.00</p>
                <p class="text-yellow-600 font-semibold mt-4">⏳ Waiting for Admin Approval</p>
                <p class="text-sm text-gray-600">Your payment has been received. An admin will review and approve your request shortly.</p>
              </div>
            `,
            showConfirmButton: true,
            confirmButtonText: "Go to Biodatas",
            confirmButtonColor: "#f43f5e",
          });
          navigate("/biodatas");
        } else {
          throw new Error("Payment record creation failed");
        }
      } catch (err) {
        console.error("Payment save error:", err);
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Payment Processing Error",
          text:
            err.response?.data?.message ||
            "Failed to record payment. Please contact support with your transaction ID: " +
              paymentIntent.id,
          showConfirmButton: true,
          confirmButtonColor: "#ef4444",
        });
      }
    }

    setIsProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form
        className="bg-gradient-to-br from-rose-50 to-pink-100 p-8 rounded-2xl shadow-xl border-2 border-rose-200"
        onSubmit={handleSubmit}
      >
        {/* Payment Details */}
        <div className="bg-white rounded-xl p-6 mb-6 border-2 border-rose-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            Payment Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
              <span className="font-semibold text-gray-700">Biodata ID:</span>
              <span className="font-bold text-rose-600">{biodataId}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
              <span className="font-semibold text-gray-700">Biodata Name:</span>
              <span className="font-bold text-gray-800">
                {fulldata?.name || "Loading..."}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
              <span className="font-semibold text-gray-700">Your Email:</span>
              <span className="font-bold text-gray-800">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-300">
              <span className="font-semibold text-gray-700">Amount:</span>
              <span className="font-bold text-green-600 text-xl">$5.00</span>
            </div>
          </div>
        </div>

        {/* Card Element */}
        <div className="bg-white rounded-xl p-6 mb-6 border-2 border-rose-200">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Card Information
          </label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#374151",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  "::placeholder": {
                    color: "#9ca3af",
                  },
                  padding: "12px",
                },
                invalid: {
                  color: "#ef4444",
                  iconColor: "#ef4444",
                },
              },
            }}
            className="p-4 border-2 border-gray-300 rounded-lg focus:border-rose-400 transition-colors"
          />
        </div>

        {/* Error Message */}
        {errors && (
          <div className="mb-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
            <p className="text-red-700 text-sm font-semibold flex items-center gap-2">
              {errors}
            </p>
          </div>
        )}

        {/* Success Message */}
        {transId && (
          <div className="mb-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
            <p className="text-green-700 text-sm font-semibold flex items-center gap-2">
              Payment Successful! Transaction ID: {transId}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          className="w-full py-4 text-xl font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          type="submit"
          disabled={!stripe || !clientSecret || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-3">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing Payment...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              Pay $5.00
            </span>
          )}
        </button>

        {/* Info Text */}
        <p className="text-center text-xs text-gray-600 mt-4">
          Secure payment powered by Stripe • Your payment will be reviewed by
          admin
        </p>
      </form>
    </div>
  );
};

export default CheckOutForm;
