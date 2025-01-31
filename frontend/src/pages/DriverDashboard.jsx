import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { Sidebar } from "flowbite-react";
import { HiShoppingBag } from "react-icons/hi";
import { DashOfficersView } from "../components/DashOfficersView";
import { DashFineView } from "../components/DashFineView";
import { Payment } from "./Payment";
import { useNavigate } from "react-router-dom";

export const DriverDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className="bg-teal-400 ">
          <Header />
        </div>

        <div className="flex flex-col  sm:flex-row">
          <div>
            <Sidebar aria-label="Sidebar with logo branding example">
              <Sidebar.Items className="sm:min-h-screen">
                <Sidebar.ItemGroup className="p-0">
                  <Link to="/driverdashboard?dash=fine-view">
                    <Sidebar.Item href="#" icon={HiShoppingBag}>
                      Past Violation Information
                    </Sidebar.Item>
                  </Link>
                  <Link to="/driverdashboard?dash=officer-view">
                    <Sidebar.Item icon={HiShoppingBag}>
                      Police officer information
                    </Sidebar.Item>
                  </Link>
                  <Link to="/driverdashboard?dash=payment">
                    <Sidebar.Item href="#" icon={HiShoppingBag}>
                      Pay Payment
                    </Sidebar.Item>
                  </Link>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>

          <div className="   w-full sm:max-w-8xl bg-cover  bg-no-repeat bg-center relative overflow-hidden bg-[url('G:\miniproject\frontend\src\assets\signup.jpg')]  ">
            <div className="bg-slate-200  bg-opacity-80">
              {(searchParams.get("dash") === "fine-view" && <DashFineView />) ||
                (searchParams.get("dash") === "officer-view" && (
                  <DashOfficersView />
                )) ||
                (searchParams.get("dash") === "payment" &&
                  navigate("/payment"))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
