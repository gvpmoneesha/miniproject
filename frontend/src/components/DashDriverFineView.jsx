import React from "react";
import { Alert, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export const DashDriverFineView = () => {
  const [fine, setFine] = useState([]);
  const [error, setError] = useState(null);
  const [fineIdToView, setFineIdToView] = useState("");

  const getFine = async () => {
    try {
      if (fineIdToView === "") {
        return setError("Fill Serach field");
      }
      const res = await fetch(`/api/v1/fine/getfine/${fineIdToView}`);
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        return setError(data.messaage);
      }
      if (res.ok) {
        setFine(Array.isArray(data) ? data : []);

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
          <h2 className="font-bold text-3xl sm:text-5xl pt-10">View Fines</h2>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center gap-10 mb-14 px-5 pt-10">
          <div className="mb-2 block">
            <Label value="Id-:" />
          </div>

          <div>
            <TextInput
              id="id"
              type="text"
              required
              shawod
              onChange={(e) => {
                setFineIdToView(e.target.value);
              }}
            />
          </div>

          <div>
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={getFine}
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

      <div>
        <div>
          {fine && (
            <div className="table-auto overflow-x-auto md:w-full md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
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
                      <Table.HeadCell>State</Table.HeadCell>
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
                          <Table.Cell>{fines.state}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    ))}
                  </Table>
                </>
              ) : (
                <p>No fines</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
