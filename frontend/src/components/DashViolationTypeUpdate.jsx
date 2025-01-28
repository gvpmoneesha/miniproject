import React from "react";
import { Alert, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const DashViolationTypeUpdate = () => {
  const [violations, setViolations] = useState([]);
  const [error, setError] = useState(null);
  const [violationIdToUpdate, setViolationIdToUpdate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [searchId, setSearchId] = useState(null);
  const [violation, setViolation] = useState(null);

  const navigate = useNavigate();

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
    if (violationIdToUpdate === "") {
      fetchVioation();
    }
  }, [violationIdToUpdate]);

  const handleClose = () => {
    setShowModal(false);
    window.location.reload();
  };

  const handleTextboxDataChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSearchId = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearchVehicle = async (req, res) => {
    try {
      const res = await fetch(`/api/v1/violation/getrule/${searchId}`);

      if (!res.ok) {
        return;
      } else {
        const data = await res.json();
        setViolation(data);
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
      const res = await fetch(`/api/v1/violation/update/${searchId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data);
      } else {
        console.log("Update is success");
        window.location.reload();
      }
    } catch (error) {
      console.log("error here");
    }
  };

  console.log(violations);

  return (
    <div className="min-h-screen   p-3 ">
      <div>
        <div className="text-center text-teal-700 ">
          <h2 className=" font-bold text-3xl sm:text-5xl pt-10">
            Update Violation and Rule Information
          </h2>
        </div>
      </div>

      {error && (
        <Alert color="failure" className="m-4">
          {error}
        </Alert>
      )}

      <div className="w-full pt-14 table-auto overflow-x-auto md:w-full md:mx-auto p-6 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {violations.length > 0 ? (
          <>
            <Table hoverable className="shadow-md ">
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Type</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Update</Table.HeadCell>
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
                          setViolationIdToUpdate(violation._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Update
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
            {!showForm ? (
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-gray-400 dark:text-gray-200 mb-4" />
                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                  Are you sure you want to update this violation?
                </h3>
                <div className="flex justify-center gap-5">
                  <Button color="failure" onClick={() => setShowForm(true)}>
                    Yes, I'm sure
                  </Button>
                  <Button color="gray" onClick={() => setShowModal(false)}>
                    No, Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-4">
                  Update Information of Violation
                </h2>

                <div className="flex items-center gap-5  px-3 pt-6">
                  <div className="mb-2 block">
                    <Label value="ID-:" />
                  </div>

                  <div>
                    <TextInput
                      id="_id"
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

                <form className="space-y-4  mt-8">
                  <div>
                    <div className="mb-2 block">
                      <Label value=" Violation Type" />
                    </div>
                    <TextInput
                      id="type"
                      type="text"
                      required
                      shadow
                      defaultValue={violation?.type || ""}
                      onChange={handleTextboxDataChange}
                    />
                  </div>

                  <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="5"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Discription of rule..."
                    defaultValue={violation?.description || ""}
                    onChange={handleTextboxDataChange}
                  ></textarea>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Price" />
                    </div>
                    <TextInput
                      id="price"
                      type="text"
                      required
                      shadow
                      defaultValue={violation?.price || ""}
                      onChange={handleTextboxDataChange}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button color="success" onClick={handleSubmit}>
                      Submit
                    </Button>
                    <Button color="gray" onClick={handleClose}>
                      Close
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
