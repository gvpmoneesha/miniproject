import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

export const Payment = () => {
  const [fineId, setFineId] = useState(null);
  const navigate = useNavigate();

  const makepayment = async (fineId) => {
    await fetch(`/api/v1/fine/getfinebyobjectid/${fineId}`)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);

        const stripe = await loadStripe(
          "pk_test_51QoKkWQ3LBNqJhduylwlLzPbiYCnBIpcfZMlmG5sWktjqNkt6UQqOzRuiBF31D9g6U83zgqbV4nm63zDHLVVvYlV00QHtT4bG4"
        );
        const response = await fetch("/api/pay/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        });

        const session = await response.json();
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          console.error("Error redirecting to checkout: ", result.error);
        } else {
          navigate("/");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-cyan-50 flex items-center justify-center p-6">
      <form
        className="flex max-w-md flex-col gap-6 bg-white p-8 rounded-2xl shadow-2xl"
        // onSubmit={makepayment(fineId)}
      >
        {/* Payment ID Input */}
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="email2"
              value="Your Payment ID"
              className="text-cyan-600 font-medium"
            />
          </div>
          <TextInput
            id="_id"
            type="text"
            value={fineId}
            onChange={(e) => {
              setFineId(e.target.value);
            }}
            required
            className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
            shadow
          />
        </div>

        {/* Submit Button */}
        <Button
          type="button"
          onClick={() => makepayment(fineId)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
