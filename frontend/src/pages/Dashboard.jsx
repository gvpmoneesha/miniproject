import { Link, useSearchParams } from "react-router-dom";
import React, { useState } from "react";

import { Sidebar } from "flowbite-react";
import {
  HiUserGroup,
  HiUsers,
  HiTruck,
  HiExclamationCircle,
  HiDocumentText,
} from "react-icons/hi";
import DashOfficerSignUp from "../components/DashOfficerSignUp";
import { DashVehicleSignUp } from "../components/DashVehicleSignUp";
import { DashDriverSignUp } from "../components/DashDriverSignUp";
import DashOfficerUpdate from "../components/DashOfficerUpdate";
import { DashDriverUpdate } from "../components/DashDriverUpdate";
import { DashVehicleUpdate } from "../components/DashVehicleUpdate";
import { DashOfficerDelete } from "../components/DashOfficerDelete";
import { DashDriverDelete } from "../components/DashDriverDelete";
import { DashVehicleDelete } from "../components/DashVehicleDelete";
import { DashViolationTypeCreate } from "../components/DashViolationTypeCreate";
import { DashViolationTypeUpdate } from "../components/DashViolationTypeUpdate";
import { DashViolationTypeDelete } from "../components/DashViolationTypeDelete";
import { DashBlockFineUpdate } from "../components/DashBlockFineUpdate";
import DashReport from "../components/DashReport";

export const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-cyan-50">
      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <div>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="w-full sm:w-64 bg-white shadow-lg"
          >
            <Sidebar.Items className="sm:min-h-screen">
              <Sidebar.ItemGroup className="p-4">
                {/* Manage Traffic Officer */}
                <Sidebar.Collapse
                  icon={() => <HiUserGroup className="w-6 h-6" />} // Pass icon as a function
                  label="Manage Officer"
                  className="text-cyan-600 hover:text-cyan-700"
                >
                  <Link to="/dashboard?dash=officer-create">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Add Traffic Officer
                    </Sidebar.Item>
                  </Link>
                  <Link to="/dashboard?dash=officer-update">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Update Traffic Officer
                    </Sidebar.Item>
                  </Link>
                  <Link to="/dashboard?dash=officer-delete">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Delete Traffic Officer
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                {/* Manage Driver */}
                <Sidebar.Collapse
                  icon={() => <HiUsers className="w-6 h-6" />} // Pass icon as a function
                  label="Manage Driver"
                  className="text-cyan-600 hover:text-cyan-700"
                >
                  <Link to="/dashboard?dash=driver-create">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Add Driver
                    </Sidebar.Item>
                  </Link>
                  <Link to="/dashboard?dash=driver-update">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Update Driver
                    </Sidebar.Item>
                  </Link>
                  <Link to="/dashboard?dash=driver-delete">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Delete Driver
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                {/* Manage Vehicle */}
                <Sidebar.Collapse
                  icon={() => <HiTruck className="w-6 h-6" />} // Pass icon as a function
                  label="Manage Vehicle"
                  className="text-cyan-600 hover:text-cyan-700"
                >
                  <Link to="/dashboard?dash=vehicle-create">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Add Vehicle
                    </Sidebar.Item>
                  </Link>
                  <Link to="/dashboard?dash=vehicle-update">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Update Vehicle
                    </Sidebar.Item>
                  </Link>
                  <Link to="/dashboard?dash=vehicle-delete">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Delete Vehicle
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                {/* Manage Violation Type */}
                <Sidebar.Collapse
                  icon={() => <HiExclamationCircle className="w-6 h-6" />} // Pass icon as a function
                  label="Manage Violation"
                  className="text-cyan-600 hover:text-cyan-700"
                >
                  <Link to="/dashboard?dash=violationType-create">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Add Violation Type
                    </Sidebar.Item>
                  </Link>
                  <Link to="/dashboard?dash=violationType-update">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Update Violation Type
                    </Sidebar.Item>
                  </Link>
                  <Link to="/dashboard?dash=violationType-delete">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Delete Violation Type
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                {/* Manage Fine */}
                <Sidebar.Collapse
                  icon={() => <HiDocumentText className="w-6 h-6" />} // Pass icon as a function
                  label="Manage Fine"
                  className="text-cyan-600 hover:text-cyan-700"
                >
                  <Link to="/dashboard?dash=blockFine-update">
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-cyan-50 rounded-lg"
                    >
                      Update Block/State Fine
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                <Link to="/dashboard?dash=report">
                  <Sidebar.Item
                    icon={() => <HiDocumentText className="w-6 h-6" />}
                    href="#"
                    className="text-cyan-600 hover:text-cyan-700"
                  >
                    Generate Report
                  </Sidebar.Item>
                </Link>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-cover bg-no-repeat bg-center relative overflow-hidden bg-[url('H:\miniproject\frontend\src\assets\signup.jpg')]">
          <div className="bg-slate-200 bg-opacity-80 p-6">
            {(searchParams.get("dash") === "officer-create" && (
              <DashOfficerSignUp />
            )) ||
              (searchParams.get("dash") === "officer-update" && (
                <DashOfficerUpdate />
              )) ||
              (searchParams.get("dash") === "officer-delete" && (
                <DashOfficerDelete />
              )) ||
              (searchParams.get("dash") === "vehicle-create" && (
                <DashVehicleSignUp />
              )) ||
              (searchParams.get("dash") === "vehicle-update" && (
                <DashVehicleUpdate />
              )) ||
              (searchParams.get("dash") === "vehicle-delete" && (
                <DashVehicleDelete />
              )) ||
              (searchParams.get("dash") === "driver-create" && (
                <DashDriverSignUp />
              )) ||
              (searchParams.get("dash") === "driver-update" && (
                <DashDriverUpdate />
              )) ||
              (searchParams.get("dash") === "driver-delete" && (
                <DashDriverDelete />
              )) ||
              (searchParams.get("dash") === "violationType-create" && (
                <DashViolationTypeCreate />
              )) ||
              (searchParams.get("dash") === "violationType-update" && (
                <DashViolationTypeUpdate />
              )) ||
              (searchParams.get("dash") === "violationType-delete" && (
                <DashViolationTypeDelete />
              )) ||
              (searchParams.get("dash") === "blockFine-update" && (
                <DashBlockFineUpdate />
              )) ||
              (searchParams.get("dash") === "report" && <DashReport />)}
          </div>
        </div>
      </div>
    </div>
  );
};
