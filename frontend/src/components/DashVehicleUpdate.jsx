import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Datepicker,
  Select,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

export const DashVehicleUpdate = () => {
  const [formData, setFormData] = useState({});

  const [searchId, setSearchId] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  const navigate = useNavigate();

  const handleTextboxDataChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSearchId = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearchVehicle = async (req, res) => {
    try {
      const res = await fetch(`/api/v1/vehicle/getvehicle/${searchId}`);

      if (!res.ok) {
        return;
      } else {
        const data = await res.json();
        setVehicle(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      console.log("There are no changes");
      return;
    }

    try {
      const res = await fetch(`/api/v1/vehicle/updatevehicle/${searchId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data);
      } else {
        console.log("Update is success");
      }
    } catch (error) {
      console.log("error here");
    }
  };

  console.log(searchId);
  console.log(formData);
  console.log(vehicle);

  return (
    <div className="  max-w-lg p-3 mx-auto">
      <div>
        <div className="text-center text-teal-700 ">
          <h2 className=" font-bold text-3xl sm:text-5xl pt-10">
            Vehicle Update
          </h2>
        </div>

        <div className="flex items-center gap-5  px-5 pt-24">
          <div className="mb-2 block">
            <Label
              value="
                 Vehicle Chassie No.-:"
            />
          </div>

          <div>
            <TextInput
              id="cNumber"
              type="text"
              required
              shadow
              onChange={handleSearchId}
            />
          </div>

          <div>
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={handleSearchVehicle}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className=" pt-14 ">
        <div>
          <form className="gap-4  " onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="no" value="Vehicle Number" />
              </div>
              <TextInput
                id="no"
                type="text"
                required
                shadow
                defaultValue={vehicle?.no || ""}
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
                defaultValue={vehicle?.cNumber || ""}
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
                  defaultValue={vehicle?.dateBrought || ""}
                  onSelectedDateChanged={(date) => {
                    const dateBrought =
                      date.getFullYear() +
                      "-" +
                      date.getMonth() +
                      "-" +
                      date.getDate();
                    setFormData({ ...formData, dateBrought });
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
                defaultValue={vehicle?.name || ""}
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
                defaultValue={vehicle?.nic || ""}
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
                defaultValue={vehicle?.phoneNumber}
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
                defaultValue={vehicle?.email || ""}
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="model" value="Vehicle model" />
              </div>
              <Select id="model" required onChange={handleTextboxDataChange}>
                <option>{vehicle?.model || "Select Vehicle Model"}</option>
                <option>Car</option>
                <option>Van</option>
                <option>Bus</option>
              </Select>
            </div>

            <div className="pt-4 ">
              <Button type="submit" className="w-full">
                Update Vehicle
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
