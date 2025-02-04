import React from "react";
import { Alert, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const DashBlockFineUpdate = () => {
  const [fines, setFines] = useState([]);
  const [error, setError] = useState(null);
  const [fineIdToUpdate, setFineIdToUpdate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [searchId, setSearchId] = useState(null);
  const [fine, setFine] = useState(null);

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const res = await fetch("/api/v1/fine/getblockfines");
        const data = await res.json();

        if (res.ok) {
          setFines(data);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchFines();
  }, []);

  const handleTextboxDataChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClose = () => {
    setShowModal(false);
    window.location.reload();
  };

  const handleSearchFine = async (id) => {
    try {
      setSearchId(id);
      await fetch(`/api/v1/fine/getblockfine/${id}`).then(async (res) => {
        if (!res.ok) {
          return;
        } else {
          await res.json().then((data) => {
            setFine(data);

            setShowModal(true);
          });
        }
      });
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
      const res = await fetch(`/api/v1/fine/updateblockfines/${searchId}`, {
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

  return (
    <div className="min-h-screen md:max-w-5xl">
      <div>
        <div className="text-center text-teal-700">
          <h2 className="font-bold text-3xl sm:text-5xl pt-10">
            View Block Fines
          </h2>
        </div>
      </div>

      {error && (
        <Alert color="failure" className="m-4">
          {error}
        </Alert>
      )}

      <div className="table-auto overflow-x-scroll md:w-full md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 md:max-h-[98vh] overflow-y-scroll pt-16">
        {fines.length > 0 ? (
          <>
            <Table hoverable className="shadow-md ">
              <Table.Head>
                <Table.HeadCell>Driver Id</Table.HeadCell>
                <Table.HeadCell>Driver Name</Table.HeadCell>
                <Table.HeadCell>Vehicle Number</Table.HeadCell>
                <Table.HeadCell>Issue Date</Table.HeadCell>
                <Table.HeadCell>Time</Table.HeadCell>
                <Table.HeadCell>Place</Table.HeadCell>
                <Table.HeadCell>Expire Date</Table.HeadCell>
                <Table.HeadCell>Violation</Table.HeadCell>
                <Table.HeadCell>Charge</Table.HeadCell>
                <Table.HeadCell>Police Id</Table.HeadCell>
                <Table.HeadCell>Police's Name</Table.HeadCell>
                <Table.HeadCell>Police Station</Table.HeadCell>
                <Table.HeadCell>Fine State</Table.HeadCell>
                <Table.HeadCell>Fine Block</Table.HeadCell>
                <Table.HeadCell>Update</Table.HeadCell>
              </Table.Head>
              {fines.map((fine) => (
                <Table.Body key={fine._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{fine.dId}</Table.Cell>
                    <Table.Cell>{fine.dName}</Table.Cell>
                    <Table.Cell>{fine.vNo}</Table.Cell>
                    <Table.Cell>
                      {new Date(fine.issueDate).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{fine.time}</Table.Cell>
                    <Table.Cell>{fine.place}</Table.Cell>
                    <Table.Cell>
                      {new Date(fine.expireDate).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{fine.violation}</Table.Cell>
                    <Table.Cell>{fine.charge}</Table.Cell>
                    <Table.Cell>{fine.pId}</Table.Cell>
                    <Table.Cell>{fine.pName}</Table.Cell>
                    <Table.Cell>{fine.pStation}</Table.Cell>
                    <Table.Cell>{String(fine.state)}</Table.Cell>
                    <Table.Cell>{String(fine.block)}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          handleSearchFine(fine._id);
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
          <p>No block fines</p>
        )}

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />

          <Modal.Body>
            {/* {!showForm ? (
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
                    ) : ( */}
            {fine && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-4">
                  Update Information of Fine
                </h2>

                {/* <div className="flex items-center gap-5  px-3 pt-6">
                          <div className="mb-2 block">
                            <Label value="ID-:" />
                          </div>
        
                          <div>
                            <TextInput
                              id="_id"
                              type="text"
                              required
                              shadow
                              defaultValue={violation?._id || ""}
                              // onChange={handleSearchId}
                            />
                          </div>
        
                          {/* <div>
                            <Button
                              type="button"
                              gradientDuoTone="purpleToBlue"
                              size="sm"
                              outline
                              onClick={handleSearchVehicle}
                            >
                              Search
                            </Button>
                          </div> }
                        </div> */}

                <form className="space-y-4  mt-8">
                  <div>
                    <div className="mb-2 block">
                      <Label value="ID-:" />
                    </div>
                    <TextInput
                      id="_id"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={fine?._id || ""}
                      // onChange={handleSearchId}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label value="Driver Id" />
                    </div>
                    <TextInput
                      id="dId"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={fine?.dId || ""}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value="Driver Name" />
                    </div>
                    <TextInput
                      id="dName"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={fine?.dName || ""}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value="Email" />
                    </div>
                    <TextInput
                      id="email"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={fine?.email || ""}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Vehicle No" />
                    </div>
                    <TextInput
                      id="vNo"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={fine?.vNo || ""}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Issue Date" />
                    </div>
                    <TextInput
                      id="issueDate"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={new Date(
                        fine.issueDate
                      ).toLocaleDateString()}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Time" />
                    </div>
                    <TextInput
                      id="time"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={fine?.time || ""}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Place" />
                    </div>
                    <TextInput
                      id="place"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={fine?.place || ""}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Expire Date" />
                    </div>
                    <TextInput
                      id="expireDate"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={new Date(
                        fine.expireDate
                      ).toLocaleDateString()}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Violation" />
                    </div>
                    <TextInput
                      id="violation"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={fine?.violation || ""}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Police Id" />
                    </div>
                    <TextInput
                      id="pId"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={fine?.pId || ""}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Police Name" />
                    </div>
                    <TextInput
                      id="pName"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={fine?.pName || ""}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Police Station" />
                    </div>
                    <TextInput
                      id="pStation"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={fine?.pStation || ""}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Charge" />
                    </div>
                    <TextInput
                      id="charge"
                      type="text"
                      required
                      shadow
                      readOnly
                      defaultValue={fine?.charge || ""}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Fine State" />
                    </div>
                    <TextInput
                      id="state"
                      type="text"
                      required
                      shadow
                      defaultValue={String(fine?.state) || ""}
                      onChange={handleTextboxDataChange}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label value=" Fine Block" />
                    </div>
                    <TextInput
                      id="block"
                      type="text"
                      required
                      shadow
                      defaultValue={fine?.block || ""}
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
            {/* )} */}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
