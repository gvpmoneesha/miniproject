import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";

export const Payment = () => {
  const [fineId, setFineId] = useState(null);

  const makepayment = async () => {};

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
