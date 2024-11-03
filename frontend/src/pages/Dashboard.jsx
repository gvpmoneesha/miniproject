import { Link, useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import Header from "../components/Header";
import { Sidebar } from "flowbite-react";
import { HiShoppingBag } from "react-icons/hi";
import DashOfficerSignUp from "../components/DashOfficerSignUp";
import { DashVehicleSignUp } from "../components/DashVehicleSignUp";
import { DashDriverSignUp } from "../components/DashDriverSignUp";
import DashOfficerUpdate from "../components/DashOfficerUpdate";
import { DashDriverUpdate } from "../components/DashDriverUpdate";
import { DashVehicleUpdate } from "../components/DashVehicleUpdate";
import { DashOfficerDelete } from "../components/DashOfficerDelete";
import { DashDriverDelete } from "../components/DashDriverDelete";
import { DashVehicleDelete } from "../components/DashVehicleDelete";

export const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <div>
        <div className="bg-teal-400 ">
          <Header />
        </div>
        <div className="flex flex-col  sm:flex-row">
          <div>
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className="w-full sm:w-80 "
            >
              <Sidebar.Items className="sm:min-h-screen">
                <Sidebar.ItemGroup className="p-0">
                  <Sidebar.Collapse
                    icon={HiShoppingBag}
                    label="Manage Traffic Officer"
                  >
                    <Link to="/dashboard?dash=officer-create">
                      <Sidebar.Item href="#">Add Traffic Officer</Sidebar.Item>
                    </Link>
                    <Link to="/dashboard?dash=officer-update">
                      <Sidebar.Item href="#">
                        Update Traffic Officer
                      </Sidebar.Item>
                    </Link>
                    <Link to="/dashboard?dash=officer-delete">
                      <Sidebar.Item href="#">
                        Delete Traffic officer
                      </Sidebar.Item>
                    </Link>
                  </Sidebar.Collapse>

                  <Sidebar.Collapse icon={HiShoppingBag} label="Manage Driver">
                    <Link to="/dashboard?dash=driver-create">
                      <Sidebar.Item href="#">Add Driver</Sidebar.Item>
                    </Link>
                    <Link to="/dashboard?dash=driver-update">
                      <Sidebar.Item href="#">Update Driver</Sidebar.Item>
                    </Link>
                    <Link to="/dashboard?dash=driver-delete">
                      <Sidebar.Item href="#">Delete Driver</Sidebar.Item>
                    </Link>
                  </Sidebar.Collapse>

                  <Sidebar.Collapse icon={HiShoppingBag} label="Manage Vehicle">
                    <Link to="/dashboard?dash=vehicle-create">
                      <Sidebar.Item href="#">Add Vehicle</Sidebar.Item>
                    </Link>
                    <Link to="/dashboard?dash=vehicle-update">
                      <Sidebar.Item href="#">Update Vehicle</Sidebar.Item>
                    </Link>
                    <Link to="/dashboard?dash=vehicle-delete">
                      <Sidebar.Item href="#">Delete Vehicle</Sidebar.Item>
                    </Link>
                  </Sidebar.Collapse>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
          <div className="   w-full sm:max-w-8xl bg-cover h-screen bg-no-repeat bg-center relative overflow-hidden bg-[url('G:\miniproject\frontend\src\assets\signup.jpg')]  ">
            <div className="bg-slate-200 bg-opacity-80">
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
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
