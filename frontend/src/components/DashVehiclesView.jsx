import React from "react";
import { Alert, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export const DashVehiclesView = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch("/api/v1/vehicle/getallvehicles");
        const data = await res.json();

        if (res.ok) {
          setVehicles(data);
        }
      } catch (error) {
        setError(error);
      }
    };
    if (vehicleIdToDelete === "") {
      fetchVehicle();
    }
  }, [vehicleIdToDelete]);

  const getVehicle = async () => {
    try {
      if (vehicleIdToDelete === "") {
        return setError("Fill Serach field");
      }
      const res = await fetch(
        `/api/v1/vehicle/getvehicle/${vehicleIdToDelete}`
      );
      const data = await res.json();
      if (data.success == false) {
        return setError(data.messaage);
      }
      if (res.ok) {
        setVehicles([data]);
        setError("");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="min-h-screen">
      <div>
        <div className="text-center text-teal-700">
          <h2 className="font-bold text-3xl sm:text-5xl pt-10">
            View Vehicles
          </h2>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center gap-10 mb-14 px-5 pt-10">
          <div className="mb-2 block">
            <Label value="Vehicle Chassie Number" />
          </div>

          <div>
            <TextInput
              id="cNumber"
              type="text"
              required
              shawod
              onChange={(e) => {
                setVehicleIdToDelete(e.target.value);
              }}
            />
          </div>

          <div>
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={getVehicle}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <Alert color="failure" className="m-4">
          {error}
        </Alert>
      )}

      <div className="table-auto overflow-x-scroll md:w-full md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {vehicles.length > 0 ? (
          <>
            <Table hoverable className="shadow-md ">
              <Table.Head>
                <Table.HeadCell>Vehicle Number</Table.HeadCell>
                <Table.HeadCell>Vehicle Chassie Number</Table.HeadCell>
                <Table.HeadCell>Date of Brought</Table.HeadCell>
                <Table.HeadCell>Owner's name</Table.HeadCell>
                <Table.HeadCell>Owner's NIC</Table.HeadCell>
                <Table.HeadCell>Owner's email</Table.HeadCell>
                <Table.HeadCell>Owner's Phone Number</Table.HeadCell>
                <Table.HeadCell>Vehicle model</Table.HeadCell>
              </Table.Head>

              {vehicles.map((vehicle) => (
                <Table.Body key={vehicle._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{vehicle.no}</Table.Cell>
                    <Table.Cell>{vehicle.cNumber}</Table.Cell>
                    <Table.Cell>
                      {new Date(vehicle.dateBrought).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{vehicle.name}</Table.Cell>
                    <Table.Cell>{vehicle.nic}</Table.Cell>
                    <Table.Cell>{vehicle.email}</Table.Cell>
                    <Table.Cell>{vehicle.phoneNumber}</Table.Cell>
                    <Table.Cell>{vehicle.model}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </>
        ) : (
          <p>No vehicles</p>
        )}
      </div>
    </div>
  );
};
