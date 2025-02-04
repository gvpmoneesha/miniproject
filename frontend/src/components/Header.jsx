import { Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <Navbar
      fluid
      rounded
      className="top-0 z-10 bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg"
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <NavLink to="/">
          <img
            src="https://png.pngtree.com/png-vector/20220226/ourmid/pngtree-policeman-fine-icon-punish-concept-notification-vector-png-image_16152142.jpg"
            className="mr-3 h-8 sm:h-10 transition-transform duration-300 transform hover:scale-110"
            alt="Logo"
          />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle className="text-white hover:text-teal-200 focus:ring-2 focus:ring-teal-300" />
      <Navbar.Collapse>
        {/* Use NavLink instead of Link */}
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `text-lg text-white hover:text-teal-200 transition-colors duration-300 ${
              isActive ? "font-bold underline" : ""
            }`
          }
        >
          Admin
        </NavLink>

        <NavLink
          to="/login-officer"
          className={({ isActive }) =>
            `text-lg text-white hover:text-teal-200 transition-colors duration-300 ${
              isActive ? "font-bold underline" : ""
            }`
          }
        >
          Traffic Officer
        </NavLink>

        <NavLink
          to="/login-driver"
          className={({ isActive }) =>
            `text-lg text-white hover:text-teal-200 transition-colors duration-300 ${
              isActive ? "font-bold underline" : ""
            }`
          }
        >
          Driver
        </NavLink>

        <NavLink
          to="/payment"
          className={({ isActive }) =>
            `text-lg text-white hover:text-teal-200 transition-colors duration-300 ${
              isActive ? "font-bold underline" : ""
            }`
          }
        >
          Payment
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `text-lg text-white hover:text-teal-200 transition-colors duration-300 ${
              isActive ? "font-bold underline" : ""
            }`
          }
        >
          Search
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `text-lg text-white hover:text-teal-200 transition-colors duration-300 ${
              isActive ? "font-bold underline" : ""
            }`
          }
        >
          Contact Us
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}
