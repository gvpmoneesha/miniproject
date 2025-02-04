import { Link, useSearchParams } from "react-router-dom";
import React, { useState } from "react";

import { Sidebar } from "flowbite-react";
import { HiShoppingBag } from "react-icons/hi";
import { DashFineIssue } from "../components/DashFineIssue";
import { DashDriversView } from "../components/DashDriversView";
import { DashVehiclesView } from "../components/DashVehiclesView";
import { DashFineView } from "../components/DashFineView";

import { DashGroupMessage } from "../components/DashGroupMessage";
import { DashBlockFineView } from "../components/DashBlockFineView";

export const OfficerDashboard = () => {
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
                {/* Fine Sheet Section */}
                <Sidebar.Collapse
                  icon={HiShoppingBag}
                  label="Fine Sheet"
                  className="text-cyan-600 hover:text-cyan-700"
                >
                  <Link to="/officerdashboard?dash=fine-issue">
                    <Sidebar.Item
                      href="#"
                      className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors duration-300"
                    >
                      Issue Fine
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                {/* Information Section */}
                <Sidebar.Collapse
                  icon={HiShoppingBag}
                  label="Information"
                  className="text-cyan-600 hover:text-cyan-700"
                >
                  <Link to="/officerdashboard?dash=fine-view">
                    <Sidebar.Item
                      href="#"
                      className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors duration-300"
                    >
                      View Fines
                    </Sidebar.Item>
                  </Link>
                  <Link to="/officerdashboard?dash=block-view">
                    <Sidebar.Item
                      href="#"
                      className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors duration-300"
                    >
                      View Block Fines
                    </Sidebar.Item>
                  </Link>
                  <Link to="/officerdashboard?dash=driver-view">
                    <Sidebar.Item
                      href="#"
                      className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors duration-300"
                    >
                      View Drivers
                    </Sidebar.Item>
                  </Link>
                  <Link to="/officerdashboard?dash=vehicle-view">
                    <Sidebar.Item
                      href="#"
                      className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors duration-300"
                    >
                      View Vehicles
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                {/* Message Section */}
                <Sidebar.Collapse
                  icon={HiShoppingBag}
                  label="Message"
                  className="text-cyan-600 hover:text-cyan-700"
                >
                  <Link to="/officerdashboard?dash=all">
                    <Sidebar.Item className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors duration-300">
                      All Chat
                    </Sidebar.Item>
                  </Link>
                  <Link to="/officerdashboard?dash=message-group">
                    <Sidebar.Item className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors duration-300">
                      Group Chat
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-cover bg-no-repeat bg-center relative overflow-hidden bg-[url('G:\miniproject\frontend\src\assets\police.png')]">
          <div className="bg-slate-200 bg-opacity-80 p-6">
            {(searchParams.get("dash") === "fine-issue" && <DashFineIssue />) ||
              (searchParams.get("dash") === "fine-view" && <DashFineView />) ||
              (searchParams.get("dash") === "block-view" && (
                <DashBlockFineView />
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
  );
};
