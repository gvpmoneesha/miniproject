import { Link, useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import Header from "../components/Header";
import { Sidebar } from "flowbite-react";
import { HiShoppingBag } from "react-icons/hi";
import { DashFineIssue } from "../components/DashFineIssue";
import { DashDriversView } from "../components/DashDriversView";
import { DashVehiclesView } from "../components/DashVehiclesView";
import { DashFineView } from "../components/DashFineView";
import { FooterPage } from "../components/FooterPage";

import { DashGroupMessage } from "../components/DashGroupMessage";

export const OfficerDashboard = () => {
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
                  <Sidebar.Collapse icon={HiShoppingBag} label="Fine Sheet">
                    <Link to="/officerdashboard?dash=fine-issue">
                      <Sidebar.Item href="#">Issue Fine Sheet</Sidebar.Item>
                    </Link>
                  </Sidebar.Collapse>

                  <Sidebar.Collapse icon={HiShoppingBag} label="Information">
                    <Link to="/officerdashboard?dash=fine-view">
                      <Sidebar.Item href="#">View Fines</Sidebar.Item>
                    </Link>
                    <Link to="/officerdashboard?dash=driver-view">
                      <Sidebar.Item href="#">View Drivers</Sidebar.Item>
                    </Link>
                    <Link to="/officerdashboard?dash=vehicle-view">
                      <Sidebar.Item href="#">View Vehicles</Sidebar.Item>
                    </Link>
                  </Sidebar.Collapse>

                  <Sidebar.Collapse icon={HiShoppingBag} label="Message">
                    <Link to="/officerdashboard?dash=all">
                      <Sidebar.Item>All Chat</Sidebar.Item>
                    </Link>
                    <Link to="/officerdashboard?dash=message-group">
                      <Sidebar.Item>Group Chat</Sidebar.Item>
                    </Link>
                  </Sidebar.Collapse>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>

          <div className=" w-full sm:max-w-8xl h-screen bg-cover bg-no-repeat bg-center relative  bg-[url('G:\miniproject\frontend\src\assets\police.png')]  ">
            <div className="bg-slate-200 bg-opacity-80 ">
              {(searchParams.get("dash") === "fine-issue" && (
                <DashFineIssue />
              )) ||
                (searchParams.get("dash") === "fine-view" && (
                  <DashFineView />
                )) ||
                (searchParams.get("dash") === "driver-view" && (
                  <DashDriversView />
                )) ||
                (searchParams.get("dash") === "vehicle-view" && (
                  <DashVehiclesView />
                )) ||
                (searchParams.get("dash") === "all" && <DashGroupMessage />) ||
                (searchParams.get("dash") === "message-group" && (
                  <DashGroupMessage />
                ))}
            </div>
          </div>
        </div>
      </div>

      <FooterPage />
    </div>
  );
};
