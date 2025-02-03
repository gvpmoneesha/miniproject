import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Success() {
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
    <div>
      <h2>Payment Successful!</h2>
      <p>Your fine has been updated.</p>
    </div>
  );
}
