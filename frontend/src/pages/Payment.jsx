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
        const stripe = await loadStripe(
          "pk_test_51QDSHeHb7zo8fEZFbxxkIwWyjKctjLwBEKBgMy4qfwiIqonZaYvKPbo3iLPzyRt2JQPeHVXp2oYejLH2CXwDQ90H00ZZcndNl2"
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
      onSubmit={makepayment(fineId)}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Your email" />
        </div>
        <TextInput
          id="_id"
          type="text"
          value={fineId}
          placeholder="name@flowbite.com"
          onChange={(e) => {
            setFineId(e.target.value);
          }}
          required
          shadow
        />
      </div>

      <Button type="submit">Register new account</Button>
    </form>
  );
};
