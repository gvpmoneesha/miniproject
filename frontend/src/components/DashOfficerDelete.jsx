import React from "react";
import { Alert, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export const DashOfficerDelete = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/v1/user/getallofficers");
        const data = await res.json();

        if (res.ok) {
          setUsers(data);
        }
      } catch (error) {
        setError(error);
      }
    };
    if (userIdToDelete === "") {
      fetchUsers();
    }
  }, [userIdToDelete]);

  const getDeleteUser = async () => {
    try {
      if (userIdToDelete === "") {
        return setError("Fill Serach field");
      }
      const res = await fetch(`/api/v1/user/getofficer/${userIdToDelete}`);
      const data = await res.json();
      if (data.success == false) {
        return setError(data.messaage);
      }
      if (res.ok) {
        setUsers([data]);
        setError("");
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      console.log(userIdToDelete);

      const res = await fetch(`/api/v1/user/delete-officer/${userIdToDelete}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.messaage);
      } else {
        setError(data.messaage);
        setUserIdToDelete("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(users);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Page Heading */}
        <div className="text-center text-teal-700 py-10">
          <h2 className="font-bold text-3xl sm:text-5xl">Officer Delete</h2>
        </div>

        {/* Search Section */}
        <div className="flex justify-center p-6">
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="mb-2 block">
              <Label value="ID" className="text-cyan-600 font-medium" />
            </div>
            <TextInput
              id="id"
              type="text"
              required
              className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
              onChange={(e) => setUserIdToDelete(e.target.value)}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={getDeleteUser}
              className="transition-all duration-300 transform hover:scale-105"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert color="failure" className="m-4">
            {error}
          </Alert>
        )}

        {/* Table Section */}
        <div className="table-auto overflow-x-scroll md:w-full md:mx-auto p-6 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
          {users.length > 0 ? (
            <>
              <Table hoverable className="shadow-md">
                <Table.Head>
                  <Table.HeadCell className="bg-cyan-600 text-white">
                    ID
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-600 text-white">
                    Profile Picture
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-600 text-white">
                    User Name
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-600 text-white">
                    Station
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-600 text-white">
                    Email
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-600 text-white">
                    NIC
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-600 text-white">
                    Date of Birth
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-600 text-white">
                    Address
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-600 text-white">
                    Phone Number
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-600 text-white">
                    Delete
                  </Table.HeadCell>
                </Table.Head>

                {users.map((user) => (
                  <Table.Body key={user._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt={user.name}
                          className="w-10 h-10 object-cover rounded-full bg-gray-500"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.pStation}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.nic}</Table.Cell>
                      <Table.Cell>
                        {new Date(user.dob).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>{user.address}</Table.Cell>
                      <Table.Cell>{user.phoneNumber}</Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setUserIdToDelete(user._id);
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
            <p className="text-center text-gray-500">No officers found.</p>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-gray-400 dark:text-gray-200 mb-4" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-center gap-5">
                <Button
                  color="failure"
                  onClick={handleDeleteUser}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Yes, I'm sure
                </Button>
                <Button
                  color="gray"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-600"
                >
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
