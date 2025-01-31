import React from "react";
import { Alert, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const DashViolationTypeDelete = () => {
  const [violations, setViolations] = useState([]);
  const [error, setError] = useState(null);
  const [violationIdToDelete, setViolationIdToDelete] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchVioation = async () => {
      try {
        const res = await fetch("/api/v1/violation/getallrules");
        const data = await res.json();

        if (res.ok) {
          setViolations(data);
        }
      } catch (error) {
        setError(error);
      }
    };
    if (violationIdToDelete === "") {
      fetchVioation();
    }
  }, [violationIdToDelete]);

  const getDeleteViolation = async () => {
    try {
      if (violationIdToDelete === "") {
        return setError("Fill Serach field");
      }
      const res = await fetch(
        `/api/v1/violation/getrule/${violationIdToDelete}`
      );
      const data = await res.json();
      if (data.success == false) {
        return setError(data.messaage);
      }
      if (res.ok) {
        setViolations([data]);
        setError("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteViolation = async () => {
    setShowModal(false);
    try {
      console.log(violationIdToDelete);

      const res = await fetch(
        `/api/v1/violation/delete/${violationIdToDelete}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.messaage);
      } else {
        setError(data.messaage);
        setViolationIdToDelete("");
        console.log(violationIdToDelete);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen ">
      <div>
        <div className="text-center text-teal-700 ">
          <h2 className=" font-bold text-3xl sm:text-5xl pt-10">
            Delete Violation Rule And Information
          </h2>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center gap-10 mb-14 px-5 pt-14">
          <div className="mb-2 block">
            <Label value="ID" />
          </div>

          <div>
            <TextInput
              id="_id"
              type="text"
              required
              shawod
              onChange={(e) => {
                setViolationIdToDelete(e.target.value);
              }}
            />
          </div>

          <div>
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={getDeleteViolation}
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

      <div className="pt-2 table-auto overflow-x-auto md:w-full md:mx-auto p-6 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {violations.length > 0 ? (
          <>
            <Table hoverable className="shadow-md ">
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Type</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>

              {violations.map((violation) => (
                <Table.Body key={violation._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{violation._id}</Table.Cell>
                    <Table.Cell>{violation.type}</Table.Cell>
                    <Table.Cell>{violation.description}</Table.Cell>
                    <Table.Cell>{violation.price}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setViolationIdToDelete(violation._id);
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
          <p>No violations</p>
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
                <Button color="failure" onClick={handleDeleteViolation}>
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
