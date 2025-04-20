import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import {
  HiTicket,
  HiInformationCircle,
  HiChat,
  HiUser,
  HiTruck,
  HiBell,
  HiChartBar,
  HiHome,
  HiOutlineLogout,
} from "react-icons/hi";
import { useEffect, useState } from "react";

import { Sidebar } from "flowbite-react";
import { HiShoppingBag } from "react-icons/hi";
import { DashFineIssue } from "../components/DashFineIssue";
import { DashDriversView } from "../components/DashDriversView";
import { DashVehiclesView } from "../components/DashVehiclesView";
import { DashFineView } from "../components/DashFineView";
import { DashGroupMessage } from "../components/DashGroupMessage";
import { DashBlockFineView } from "../components/DashBlockFineView";

export const OfficerDashboard = () => {
  const [searchParams] = useSearchParams();
  const [stats, setStats] = useState({
    finesIssued: 0,
    activeDrivers: 0,
    vehiclesRegistered: 0,
    violationsToday: 0,
  });
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState(
    searchParams.get("dash") || "home"
  );

  // Simulate fetching data
  useEffect(() => {
    // In a real app, fetch from your backend API
    setStats({
      finesIssued: 42,
      activeDrivers: 156,
      vehiclesRegistered: 89,
      violationsToday: 12,
    });

    setNotifications([
      {
        id: 1,
        type: "warning",
        message: "Speeding violation reported in Zone 3",
        time: "10 mins ago",
      },
      {
        id: 2,
        type: "info",
        message: "New traffic regulations updated",
        time: "2 hours ago",
      },
      {
        id: 3,
        type: "alert",
        message: "System maintenance scheduled tonight",
        time: "5 hours ago",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <div className="w-full sm:w-64">
          <Sidebar
            aria-label="Traffic Officer Dashboard"
            className="h-full bg-white dark:bg-gray-800 shadow-xl"
          >
            <div className="flex items-center justify-between p-4 mb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                  <HiTicket className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />
                </div>
                <span className="text-xl font-bold text-cyan-600 dark:text-cyan-300">
                  Traffic Control
                </span>
              </div>
            </div>

            <Sidebar.Items className="overflow-y-auto">
              <Sidebar.ItemGroup>
                {/* Dashboard Home */}
                <Link to="/officerdashboard">
                  <Sidebar.Item
                    icon={HiHome}
                    active={activeTab === "home"}
                    className={`mb-2 hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                      activeTab === "home"
                        ? "bg-cyan-50 dark:bg-gray-700 text-cyan-600 dark:text-cyan-300"
                        : ""
                    }`}
                    onClick={() => setActiveTab("home")}
                  >
                    Dashboard
                  </Sidebar.Item>
                </Link>

                {/* Fine Sheet Section */}
                <Sidebar.Collapse
                  icon={HiTicket}
                  label="Fine Management"
                  className="text-cyan-600 dark:text-cyan-300 hover:text-cyan-700 dark:hover:text-cyan-200"
                >
                  <Link to="/officerdashboard?dash=fine-issue">
                    <Sidebar.Item
                      active={activeTab === "fine-issue"}
                      className={`hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                        activeTab === "fine-issue"
                          ? "bg-cyan-50 dark:bg-gray-700 text-cyan-600 dark:text-cyan-300"
                          : ""
                      }`}
                      onClick={() => setActiveTab("fine-issue")}
                    >
                      Issue Fine
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                {/* Information Section */}
                <Sidebar.Collapse
                  icon={HiInformationCircle}
                  label="Information Center"
                  className="text-cyan-600 dark:text-cyan-300 hover:text-cyan-700 dark:hover:text-cyan-200"
                >
                  <Link to="/officerdashboard?dash=fine-view">
                    <Sidebar.Item
                      active={activeTab === "fine-view"}
                      className={`hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                        activeTab === "fine-view"
                          ? "bg-cyan-50 dark:bg-gray-700 text-cyan-600 dark:text-cyan-300"
                          : ""
                      }`}
                      onClick={() => setActiveTab("fine-view")}
                    >
                      View Fines
                    </Sidebar.Item>
                  </Link>
                  <Link to="/officerdashboard?dash=block-view">
                    <Sidebar.Item
                      active={activeTab === "block-view"}
                      className={`hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                        activeTab === "block-view"
                          ? "bg-cyan-50 dark:bg-gray-700 text-cyan-600 dark:text-cyan-300"
                          : ""
                      }`}
                      onClick={() => setActiveTab("block-view")}
                    >
                      View Block Fines
                    </Sidebar.Item>
                  </Link>
                  <Link to="/officerdashboard?dash=driver-view">
                    <Sidebar.Item
                      active={activeTab === "driver-view"}
                      className={`hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                        activeTab === "driver-view"
                          ? "bg-cyan-50 dark:bg-gray-700 text-cyan-600 dark:text-cyan-300"
                          : ""
                      }`}
                      onClick={() => setActiveTab("driver-view")}
                    >
                      View Drivers
                    </Sidebar.Item>
                  </Link>
                  <Link to="/officerdashboard?dash=vehicle-view">
                    <Sidebar.Item
                      active={activeTab === "vehicle-view"}
                      className={`hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                        activeTab === "vehicle-view"
                          ? "bg-cyan-50 dark:bg-gray-700 text-cyan-600 dark:text-cyan-300"
                          : ""
                      }`}
                      onClick={() => setActiveTab("vehicle-view")}
                    >
                      View Vehicles
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                {/* Message Section */}
                <Sidebar.Collapse
                  icon={HiChat}
                  label="Communication"
                  className="text-cyan-600 dark:text-cyan-300 hover:text-cyan-700 dark:hover:text-cyan-200"
                >
                  <Link to="/officerdashboard?dash=all">
                    <Sidebar.Item
                      active={activeTab === "all"}
                      className={`hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                        activeTab === "all"
                          ? "bg-cyan-50 dark:bg-gray-700 text-cyan-600 dark:text-cyan-300"
                          : ""
                      }`}
                      onClick={() => setActiveTab("all")}
                    >
                      All Chat
                    </Sidebar.Item>
                  </Link>
                  <Link to="/officerdashboard?dash=message-group">
                    <Sidebar.Item
                      active={activeTab === "message-group"}
                      className={`hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                        activeTab === "message-group"
                          ? "bg-cyan-50 dark:bg-gray-700 text-cyan-600 dark:text-cyan-300"
                          : ""
                      }`}
                      onClick={() => setActiveTab("message-group")}
                    >
                      Group Chat
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                {/* Logout */}
                <Sidebar.Item
                  icon={HiOutlineLogout}
                  className="mt-6 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Logout
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 min-h-[calc(100vh-3rem)]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {getPageTitle(searchParams.get("dash"))}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="relative">
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <HiBell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
                    <HiUser className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      Officer Name
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Traffic Department
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-100 dark:border-gray-600">
              {(searchParams.get("dash") === "fine-issue" && (
                <DashFineIssue />
              )) ||
                (searchParams.get("dash") === "fine-view" && (
                  <DashFineView />
                )) ||
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
                )) || (
                  <div className="space-y-6">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl p-6 text-white shadow-lg">
                      <h2 className="text-2xl font-bold mb-2">
                        Welcome Back, Officer!
                      </h2>
                      <p className="opacity-90">
                        Here's what's happening with your traffic control
                        activities today.
                      </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Fines Issued */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Fines Issued
                            </p>
                            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                              {stats.finesIssued}
                            </p>
                          </div>
                          <div className="p-3 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-300">
                            <HiTicket className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link
                            to="/officerdashboard?dash=fine-view"
                            className="text-sm text-cyan-600 dark:text-cyan-300 hover:underline flex items-center"
                          >
                            View all fines <span className="ml-1">→</span>
                          </Link>
                        </div>
                      </div>

                      {/* Active Drivers */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Active Drivers
                            </p>
                            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                              {stats.activeDrivers}
                            </p>
                          </div>
                          <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-300">
                            <HiUser className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link
                            to="/officerdashboard?dash=driver-view"
                            className="text-sm text-teal-600 dark:text-teal-300 hover:underline flex items-center"
                          >
                            View drivers <span className="ml-1">→</span>
                          </Link>
                        </div>
                      </div>

                      {/* Vehicles Registered */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Vehicles
                            </p>
                            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                              {stats.vehiclesRegistered}
                            </p>
                          </div>
                          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300">
                            <HiTruck className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link
                            to="/officerdashboard?dash=vehicle-view"
                            className="text-sm text-purple-600 dark:text-purple-300 hover:underline flex items-center"
                          >
                            View vehicles <span className="ml-1">→</span>
                          </Link>
                        </div>
                      </div>

                      {/* Violations Today */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Violations Today
                            </p>
                            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                              {stats.violationsToday}
                            </p>
                          </div>
                          <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300">
                            <HiChartBar className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link
                            to="/officerdashboard?dash=fine-issue"
                            className="text-sm text-red-600 dark:text-red-300 hover:underline flex items-center"
                          >
                            Issue fine <span className="ml-1">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity and Notifications */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                      {/* Recent Activity */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                          <HiChartBar className="h-5 w-5 text-cyan-600 dark:text-cyan-300 mr-2" />
                          Recent Activity
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-300 mt-1">
                              <HiTicket className="h-4 w-4" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-800 dark:text-white">
                                Issued fine #TC-2023-0456
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                30 minutes ago
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-300 mt-1">
                              <HiUser className="h-4 w-4" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-800 dark:text-white">
                                Updated driver DL-789456
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                2 hours ago
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 mt-1">
                              <HiTruck className="h-4 w-4" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-800 dark:text-white">
                                Registered vehicle KL-07-AB-1234
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Yesterday
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Notifications */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                          <HiBell className="h-5 w-5 text-cyan-600 dark:text-cyan-300 mr-2" />
                          Notifications
                        </h3>
                        <div className="space-y-4">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="flex items-start"
                            >
                              <div
                                className={`p-2 rounded-full mt-1 ${
                                  notification.type === "warning"
                                    ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300"
                                    : notification.type === "alert"
                                    ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300"
                                    : "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"
                                }`}
                              >
                                <HiBell className="h-4 w-4" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-800 dark:text-white">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get page title
function getPageTitle(dashParam) {
  const titles = {
    "fine-issue": "Issue Traffic Fine",
    "fine-view": "View Fines",
    "block-view": "Block Fine Regulations",
    "driver-view": "Driver Records",
    "vehicle-view": "Vehicle Records",
    all: "Communication Center",
    "message-group": "Group Messages",
    home: "Officer Dashboard",
  };
  return titles[dashParam] || "Officer Dashboard";
}
