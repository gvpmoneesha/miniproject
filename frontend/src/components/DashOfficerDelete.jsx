import React from "react";
import { Alert, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

import {
  HiOutlineExclamationCircle,
  HiSearch,
  HiTrash,
  HiOutlineX,
} from "react-icons/hi";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 text-center relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10"></div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white relative z-10">
            Officer Management System
          </h2>
          <p className="text-cyan-100 font-medium">Delete Officer Records</p>
        </div>

        {/* Search Section - Now perfectly aligned */}
        <div className="p-6 border-b border-gray-200">
          <div className="max-w-3xl mx-auto">
            <Label
              value="Search Officer by ID"
              className="block text-sm font-medium text-cyan-700 mb-2"
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter officer ID"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg 
                        focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                        sm:text-sm h-[42px]"
                  value={userIdToDelete}
                  onChange={(e) => setUserIdToDelete(e.target.value)}
                />
                {userIdToDelete && (
                  <button
                    onClick={() => setUserIdToDelete("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <HiOutlineX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              <button
                onClick={getDeleteUser}
                className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent 
                      text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-cyan-500 to-blue-500
                      hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
                      focus:ring-cyan-500 h-[42px] transition-all duration-200"
              >
                <HiSearch className="mr-2 h-5 w-5" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-6 pt-2">
            <div className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              <svg
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="p-4 md:p-6">
          {users.length > 0 ? (
            <div className="relative overflow-x-auto shadow-md rounded-lg border border-gray-200">
              <div className="horizontal-scroll-container">
                <table className="min-w-[1000px] md:min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Officer ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Profile
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Full Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Station
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        NIC
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        DOB
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            className="w-10 h-10 rounded-full border-2 border-cyan-100"
                            src={user.profilePicture}
                            alt={user.name}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.pStation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-600">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                          {user.nic}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.dob).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              setShowModal(true);
                              setUserIdToDelete(user._id);
                            }}
                            className="flex items-center justify-center text-white bg-red-600 hover:bg-red-700 
                                  px-3 py-1.5 rounded-md text-sm transition-colors"
                          >
                            <HiTrash className="mr-1.5 h-4 w-4" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-4 py-2 text-center text-xs text-gray-500">
                ← Scroll horizontally to view all columns →
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-20 w-20 text-gray-300 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700">
                No officers found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {userIdToDelete
                  ? "No officer matches your search criteria"
                  : "The officer database is currently empty"}
              </p>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900">
              Confirm Deletion
            </h3>
          </Modal.Header>
          <Modal.Body className="px-6 py-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <HiOutlineExclamationCircle className="h-10 w-10 text-red-600" />
              </div>
              <p className="text-sm text-gray-500 mb-6">
                This action will permanently delete the officer record. This
                cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteUser}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md
                        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <style jsx>{`
        .horizontal-scroll-container {
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: #06b6d4 #e5e7eb;
        }
        .horizontal-scroll-container::-webkit-scrollbar {
          height: 8px;
        }
        .horizontal-scroll-container::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 4px;
        }
        .horizontal-scroll-container::-webkit-scrollbar-thumb {
          background-color: #06b6d4;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};
