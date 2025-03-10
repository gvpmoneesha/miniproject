import React from "react";
import { Alert, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export const DashVehicleDelete = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const getDeleteVehile = async () => {
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

  const handleDeleteVehicle = async () => {
    setShowModal(false);
    try {
      console.log(vehicleIdToDelete);

      const res = await fetch(`/api/v1/vehicle/delete/${vehicleIdToDelete}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.messaage);
      } else {
        setError(data.messaage);
        setVehicleIdToDelete("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      <div>
        <div className="text-center text-teal-700">
          <h2 className="font-bold text-3xl sm:text-5xl pt-10">
            Vehicle Delete
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
              onClick={getDeleteVehile}
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
                <Table.HeadCell>Delete</Table.HeadCell>
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
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setVehicleIdToDelete(vehicle._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </>
        ) : (
          <p>No vehicles</p>
        )}

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />

          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto h-14 w-14 dark:text-gray-200 text-gray-400 mb-4" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-center gap-5">
                <Button color="failure" onClick={handleDeleteVehicle}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
