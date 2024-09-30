import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Datepicker,
  Select,
} from "flowbite-react";

export const DashVehicleSignUp = () => {
  const [formData, setFormData] = useState({});

  const handleTextboxDataChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);
  return (
    <div className="  max-w-lg p-3 mx-auto">
      <div>
        <div className="text-center text-teal-700 ">
          <h2 className=" font-bold text-3xl sm:text-5xl pt-10">
            Vehicle Registration
          </h2>
        </div>
      </div>

      <div className=" pt-14 ">
        <div>
          <form className="gap-4  ">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="no" value="Vehicle Number" />
              </div>
              <TextInput
                id="no"
                type="text"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="cNumber" value="Vehicle Chassie Number" />
              </div>
              <TextInput
                id="cNumber"
                type="text"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="date"
                  value="Date of Current Owner Brought Vehicle"
                />
              </div>
              <div>
                <Datepicker
                  onSelectedDateChanged={(date) => {
                    const dob =
                      date.getFullYear() +
                      "-" +
                      date.getMonth() +
                      "-" +
                      date.getDate();
                    setFormData({ ...formData, dob });
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Owner Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="moneeshakavindi"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="nic" value="Owner's NIC Number" />
              </div>
              <TextInput
                id="nic"
                type="text"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="phoneNumber" value="Owner's Phone Number" />
              </div>
              <TextInput
                id="phoneNumber"
                type="text"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Owner's email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="moneesha@gmail"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="model" value="Vehicle model" />
              </div>
              <Select id="model" required onChange={handleTextboxDataChange}>
                <option>Select Vehicle Model</option>
                <option>Car</option>
                <option>Van</option>
                <option>Bus</option>
              </Select>
            </div>

            <div className="pt-4 ">
              <Button type="submit" className="w-full">
                Register new account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
