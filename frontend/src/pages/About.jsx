import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Label, Table, TextInput } from "flowbite-react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export const About = () => {
  const [fineData, setFineData] = useState([]);
  const [rules, setRules] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fechData = async () => {
      await fetch(`api/v1/violation/search?searchText=${searchText}`)
        .then((res) => res.json())
        .then((data) => setRules(data));
    };
    fechData();
  }, [searchText]);

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await fetch("api/v1/fine/getallfine");
        const data = await response.json();
        setFineData(data);
      } catch (error) {
        console.error("Error fetching fines:", error);
      }
    };

    fetchFines();
  }, []);

  const processBarData = () => {
    const violationCounts = {};
    fineData.forEach((fine) => {
      violationCounts[fine.violation] =
        (violationCounts[fine.violation] || 0) + 1;
    });

    const labels = Object.keys(violationCounts); // Store original labels
    const dataValues = Object.values(violationCounts);

    return {
      labels: labels.map((_, index) => index + 1), // Show numbers instead of long text
      datasets: [
        {
          label: "Number of Violations",
          data: dataValues,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(76, 175, 80, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
          borderColor: "#1292DB",
          borderWidth: 1,
        },
      ],
      originalLabels: labels,
    };
  };

  const barData = processBarData();

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return barData.originalLabels[index];
          },
        },
      },
    },
  };

  const processData = () => {
    const stationCounts = {};

    fineData.forEach((fine) => {
      stationCounts[fine.pStation] = (stationCounts[fine.pStation] || 0) + 1;
    });

    return {
      labels: Object.keys(stationCounts),
      datasets: [
        {
          data: Object.values(stationCounts),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4CAF50",
            "#9966FF",
          ],
          hoverBackgroundColor: [
            "#FF4364",
            "#1292DB",
            "#E6B800",
            "#3C8F40",
            "#7755DD",
          ],
        },
      ],
    };
  };

  return (
    <div className="bg-teal-50 min-w-screen">
      <h1 className="text-5xl p-10 font-semibold text-slate-700 md:pl-36">
        Violation Monitoring
      </h1>
      <div className="lg:flex justify-between mx-auto p-10 lg:pl-20 lg:pr-20 bg-teal-50">
        <div className="w-100 lg:w-3/5  lg:pt-0">
          {fineData.length > 0 ? (
            <Bar data={processBarData()} options={options} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className=" w-100 md:p-20 lg:w-2/5 md:pt-0  lg:pt-0">
          {fineData.length > 0 ? (
            <Pie data={processData()} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="pb-20">
        <div>
          <form className="flex w-3/5 flex-col gap-4 mx-auto mb-10">
            <div>
              <div className="mb-2 block">
                <Label value="Search rule" />
              </div>
              <TextInput
                id="_id"
                type="text"
                value={searchText}
                placeholder="Search rule here..."
                onChange={(e) => setSearchText(e.target.value)}
                shadow
              />
            </div>
          </form>
        </div>
        <div>
          {searchText != "" && rules.length >= 1 && (
            <Table hoverable className="shadow-md w-4/5 mx-auto ">
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Amount</Table.HeadCell>
              </Table.Head>

              {rules &&
                rules.length >= 1 &&
                rules.map((rule) => (
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{rule._id}</Table.Cell>
                      <Table.Cell>{rule.type}</Table.Cell>
                      <Table.Cell>{rule.description}</Table.Cell>
                      <Table.Cell>{rule.price}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};
