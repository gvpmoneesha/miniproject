import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {
  HiDocumentText,
  HiUser,
  HiCreditCard,
  HiHome,
  HiOutlineLogout,
  HiBell,
  HiChartBar,
  HiChevronDown,
  HiChevronUp,
  HiExclamationCircle,
} from "react-icons/hi";
import { DashOfficersView } from "../components/DashOfficersView";
import { DashDriverFineView } from "../components/DashDriverFineView";
import { useNavigate } from "react-router-dom";

export const DriverDashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState({
    totalFines: 3,
    unpaidFines: 1,
    points: 2,
    recentViolations: 1,
  });

  const getPageTitle = (dashParam) => {
    const titles = {
      "fine-view": "Fine Information",
      "officer-view": "Officer Information",
      payment: "Payment",
    };
    return titles[dashParam] || "Driver Dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <div
          className={`${
            collapsed ? "sm:w-20" : "sm:w-64"
          } transition-all duration-300`}
        >
          <Sidebar
            aria-label="Driver Dashboard Sidebar"
            className={`h-full bg-white dark:bg-gray-800 shadow-xl ${
              collapsed ? "px-2" : "px-4"
            }`}
          >
            <div className="flex justify-between items-center p-4 mb-4 border-b border-gray-200 dark:border-gray-700">
              {!collapsed && (
                <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                  Driver Portal
                </h2>
              )}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {collapsed ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  </svg>
                )}
              </button>
            </div>

            <Sidebar.Items>
              <Sidebar.ItemGroup>
                {/* Home Link */}
                <Link to="/driverdashboard">
                  <Sidebar.Item
                    icon={HiHome}
                    className="mb-2 hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {!collapsed && "Dashboard Home"}
                  </Sidebar.Item>
                </Link>

                {/* Fine Information */}
                <Link to="/driverdashboard?dash=fine-view">
                  <Sidebar.Item
                    icon={HiDocumentText}
                    className="hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {!collapsed && "Fine Information"}
                  </Sidebar.Item>
                </Link>

                {/* Officer Information */}
                <Link to="/driverdashboard?dash=officer-view">
                  <Sidebar.Item
                    icon={HiUser}
                    className="hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {!collapsed && "Officer Information"}
                  </Sidebar.Item>
                </Link>

                {/* Pay Payment */}
                <Link to="/driverdashboard?dash=payment">
                  <Sidebar.Item
                    icon={HiCreditCard}
                    className="hover:bg-cyan-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {!collapsed && "Pay Payment"}
                  </Sidebar.Item>
                </Link>

                <Sidebar.Item
                  icon={HiOutlineLogout}
                  className="mt-6 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {!collapsed && "Logout"}
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
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
                    <HiUser className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      Driver Name
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      License Holder
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-100 dark:border-gray-600">
              {(searchParams.get("dash") === "fine-view" && (
                <DashDriverFineView />
              )) ||
                (searchParams.get("dash") === "officer-view" && (
                  <DashOfficersView />
                )) ||
                (searchParams.get("dash") === "payment" &&
                  navigate("/payment")) || (
                  <div className="space-y-6">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl p-6 text-white shadow-lg">
                      <h2 className="text-2xl font-bold mb-2">
                        Welcome Back, Driver!
                      </h2>
                      <p className="opacity-90">
                        {stats.unpaidFines > 0
                          ? `You have ${stats.unpaidFines} unpaid fines.`
                          : "All fines are currently paid."}
                      </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Total Fines Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-center">
                          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                            <HiDocumentText className="h-6 w-6" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Total Fines
                            </p>
                            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                              {stats.totalFines}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link
                            to="/driverdashboard?dash=fine-view"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            View All →
                          </Link>
                        </div>
                      </div>

                      {/* Unpaid Fines Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-center">
                          <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400">
                            <HiExclamationCircle className="h-6 w-6" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Unpaid Fines
                            </p>
                            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                              {stats.unpaidFines}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link
                            to="/driverdashboard?dash=payment"
                            className="text-sm text-red-600 dark:text-red-400 hover:underline"
                          >
                            Pay Now →
                          </Link>
                        </div>
                      </div>

                      {/* License Points Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-center">
                          <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
                            <HiChartBar className="h-6 w-6" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              License Points
                            </p>
                            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                              {stats.points}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link
                            to="/driverdashboard?dash=fine-view"
                            className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
                          >
                            View Details →
                          </Link>
                        </div>
                      </div>

                      {/* Recent Violations Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-center">
                          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
                            <HiBell className="h-6 w-6" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Recent Violations
                            </p>
                            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                              {stats.recentViolations}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link
                            to="/driverdashboard?dash=fine-view"
                            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                          >
                            View All →
                          </Link>
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
