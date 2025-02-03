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
    <form
      className="flex max-w-md flex-col gap-4"
      // onSubmit={makepayment(fineId)}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Your payment Id" />
        </div>
        <TextInput
          id="_id"
          type="text"
          value={fineId}
          onChange={(e) => {
            setFineId(e.target.value);
          }}
          required
          shadow
        />
      </div>

      <Button type="button" onClick={() => makepayment(fineId)}>
        Register new account
      </Button>
    </form>
  );
};
