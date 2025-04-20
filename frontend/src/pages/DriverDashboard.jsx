import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Sidebar } from "flowbite-react";
import { HiDocumentText, HiUser, HiCreditCard } from "react-icons/hi"; // Importing appropriate icons
import { DashOfficersView } from "../components/DashOfficersView";
import { Payment } from "./Payment";
import { useNavigate } from "react-router-dom";
import { DashDriverFineView } from "../components/DashDriverFineView";

export const DriverDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-cyan-50">
      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <div>
          <Sidebar
            aria-label="Sidebar with logo branding example"
            className="w-full sm:w-64 bg-white shadow-lg"
          >
            <Sidebar.Items className="sm:min-h-screen">
              <Sidebar.ItemGroup className="p-4">
                {/* Past Violation Information */}
                <Link to="/driverdashboard?dash=fine-view">
                  <Sidebar.Item
                    icon={HiDocumentText} // Changed to a document icon
                    className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors duration-300"
                  >
                    Fine Information
                  </Sidebar.Item>
                </Link>

                {/* Police Officer Information */}
                <Link to="/driverdashboard?dash=officer-view">
                  <Sidebar.Item
                    icon={HiUser} // Changed to user icon for officer information
                    className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors duration-300"
                  >
                    Officer Information
                  </Sidebar.Item>
                </Link>

                {/* Pay Payment */}
                <Link to="/driverdashboard?dash=payment">
                  <Sidebar.Item
                    icon={HiCreditCard} // Changed to credit card icon for payment
                    className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors duration-300"
                  >
                    Pay Payment
                  </Sidebar.Item>
                </Link>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-cover bg-no-repeat bg-center relative overflow-hidden bg-[url('H:\miniproject\frontend\src\assets\signup.jpg')] ">
          <div className="bg-slate-200 bg-opacity-80 p-6">
            {(searchParams.get("dash") === "fine-view" && (
              <DashDriverFineView />
            )) ||
              (searchParams.get("dash") === "officer-view" && (
                <DashOfficersView />
              )) ||
              (searchParams.get("dash") === "payment" && navigate("/payment"))}
          </div>
        </div>
      </div>
    </div>
  );
};
