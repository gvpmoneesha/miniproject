import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

export default function Success() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) return;

      try {
        // const response = await fetch(`/api/payment-status/${sessionId}`);
        // const data = await response.json();
        // if (data.success) {
        //   console.log("Payment successful, updating fine status...");

        await fetch("/api/pay/update-fine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log("Success:", data))
          .catch((error) => console.error("Error:", error));
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-cyan-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-3xl font-bold text-teal-700 mb-4">
          Payment Successful!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Your fine has been updated.
        </p>

        {/* Back to Dashboard Button */}
        <Link to="/">
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 ">
            Back to Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
}
