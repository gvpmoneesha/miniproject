import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Datepicker,
  Select,
  FileInput,
  Alert,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

export const DashFineIssue = () => {
  const navigate = useNavigate();

  const [officer, setOfficer] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [rules, setRules] = useState(null);
  const [selectedRule, setSelectedRule] = useState(null);
  const [driverId, setDriverId] = useState(null);
  const [driver, setDriver] = useState(null);
  const [formData, setFormData] = useState({
    pId: officer.id,
    pName: officer.name,
    pStation: officer.pStation,
  });

  useEffect(() => {
    const getAllRules = async () => {
      await fetch("/api/v1/violation/getallrules")
        .then((res) => res.json())
        .then((data) => setRules(data));
    };
    getAllRules();
  }, []);

  useEffect(() => {
    const getDriver = async () => {
      await fetch(`/api/v1/user/getuser/${driverId}`)
        .then((res) => res.json())
        .then((data) => {
          setDriver(data);
          setFormData({ ...formData, dName: data.name });
        });
    };
    getDriver();
  }, [driverId]);

  useEffect(() => {
    setFormData({
      ...formData,
      violation: selectedRule?.type,
      charge: selectedRule?.price,
    });
  }, [selectedRule]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/v1/fine/fineissue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(res);

      if (res.ok) {
        navigate("/officerDashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formData);

  return (
    <div className=" min-h-screen  max-w-lg p-3 mx-auto ">
      <div>
        <div className="text-center text-teal-700 ">
          <h2 className=" font-bold text-3xl sm:text-5xl pt-10">
            Issue Fine Sheet
          </h2>
        </div>
      </div>

      <div className=" pt-14 ">
        <div>
          <form className="gap-4  max-w-screen-2xl" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label value="Driver Id" />
              </div>
              <TextInput
                id="dId"
                type="text"
                required
                shadow
                onChange={(e) => {
                  setDriverId(e.target.value);
                  setFormData({ ...formData, [e.target.id]: e.target.value });
                }}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Driver Name" />
              </div>
              <TextInput
                id="dName"
                type="text"
                readOnly
                value={driver?.name || ""}
                required
                shadow
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Vehicle Number" />
              </div>
              <TextInput
                id="vNo"
                type="text"
                required
                shadow
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.id]: e.target.value });
                }}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Place" />

                <TextInput
                  id="place"
                  type="text"
                  onChange={(e) => {
                    setFormData({ ...formData, [e.target.id]: e.target.value });
                  }}
                  required
                  shadow
                />
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="violation" value="Violation" />
              </div>
              <Select
                id="violation"
                required
                onChange={(e) => {
                  setSelectedRule(rules.find((v) => v.type === e.target.value));
                }}
              >
                <option>Select rule</option>
                {rules &&
                  rules.map((rule) => (
                    <option key={rule._id}>{rule.type}</option>
                  ))}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="state" value="Amount of Fine" />
              </div>
              <Select id="state" required>
                <option>{selectedRule?.price}</option>
              </Select>
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Police Officer Id" />
              </div>
              <TextInput
                id="pId"
                type="text"
                value={officer?.id}
                readOnly
                required
                shadow
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Police Officer Name" />
              </div>
              <TextInput
                id="pName"
                type="text"
                readOnly
                value={officer?.name}
                required
                shadow
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Police Station" />
              </div>
              <TextInput
                id="pStation"
                type="text"
                readOnly
                value={officer?.pStation}
                required
                shadow
              />
            </div>

            <div className="mb-2 block pt-4">
              <Button type="submit" className="w-full">
                Issue Fine Sheet
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
