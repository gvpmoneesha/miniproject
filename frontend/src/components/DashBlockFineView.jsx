import { useEffect } from "react";
import { Alert, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import React, { useState } from "react";

export const DashBlockFineView = () => {
  const [fine, setFine] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const res = await fetch("/api/v1/fine/getblockfines");
        const data = await res.json();

        if (res.ok) {
          setFine(data);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchFines();
  }, []);

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
        {fine.length > 0 ? (
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
              </Table.Head>
              {fine.map((fines) => (
                <Table.Body key={fines._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{fines.dId}</Table.Cell>
                    <Table.Cell>{fines.dName}</Table.Cell>
                    <Table.Cell>{fines.vNo}</Table.Cell>
                    <Table.Cell>
                      {new Date(fines.issueDate).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{fines.time}</Table.Cell>
                    <Table.Cell>{fines.place}</Table.Cell>
                    <Table.Cell>
                      {new Date(fines.expireDate).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{fines.violation}</Table.Cell>
                    <Table.Cell>{fines.charge}</Table.Cell>
                    <Table.Cell>{fines.pId}</Table.Cell>
                    <Table.Cell>{fines.pName}</Table.Cell>
                    <Table.Cell>{fines.pStation}</Table.Cell>
                    <Table.Cell>{String(fines.state)}</Table.Cell>
                    <Table.Cell>{String(fines.block)}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </>
        ) : (
          <p>No block fines</p>
        )}
      </div>
    </div>
  );
};
