import React from "react";
import { Alert, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export const DashDriversView = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/v1/user/getalldrivers");
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

  const getUser = async () => {
    try {
      if (userIdToDelete === "") {
        return setError("Fill Serach field");
      }
      const res = await fetch(`/api/v1/user/getuser/${userIdToDelete}`);
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

  return (
    <div className="min-h-screen">
      <div>
        <div className="text-center text-teal-700">
          <h2 className="font-bold text-3xl sm:text-5xl pt-10">View Drivers</h2>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center gap-10 mb-14 px-5 pt-10">
          <div className="mb-2 block">
            <Label value="id" />
          </div>

          <div>
            <TextInput
              id="id"
              type="text"
              required
              shawod
              onChange={(e) => {
                setUserIdToDelete(e.target.value);
              }}
            />
          </div>

          <div>
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={getUser}
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
        {users.length > 0 ? (
          <>
            <Table hoverable className="shadow-md ">
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Profile Picture</Table.HeadCell>
                <Table.HeadCell>User Name</Table.HeadCell>
                <Table.HeadCell>Vehicle Type</Table.HeadCell>
                <Table.HeadCell>Vehicle Model</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>NIC</Table.HeadCell>
                <Table.HeadCell>Date of Birth</Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>
                <Table.HeadCell>Phone Number</Table.HeadCell>
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
                    <Table.Cell>{user.vType}</Table.Cell>
                    <Table.Cell>{user.model}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.nic}</Table.Cell>
                    <Table.Cell>
                      {new Date(user.dob).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{user.address}</Table.Cell>
                    <Table.Cell>{user.phoneNumber}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </>
        ) : (
          <p>No officers</p>
        )}
      </div>
    </div>
  );
};
