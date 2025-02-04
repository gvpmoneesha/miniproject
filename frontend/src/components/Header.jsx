import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <Navbar fluid rounded className="top-0 z-10  bg-teal-400 ">
      <Navbar.Brand href="https://flowbite-react.com">
        <Link to="/">
          <img
            src="https://png.pngtree.com/png-vector/20220226/ourmid/pngtree-policeman-fine-icon-punish-concept-notification-vector-png-image_16152142.jpg"
            className="mr-3 h-6 sm:h-9"
            alt="Logo"
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link to="/login">
          <Navbar.Link
            active={location.pathname == "/login"}
            className="text-lg text-white"
          >
            Admin
          </Navbar.Link>
        </Link>

        <Link to="/login-officer">
          <Navbar.Link
            active={location.pathname == "/login-officer"}
            href="#"
            className="text-lg text-white"
          >
            Traffic Officer
          </Navbar.Link>
        </Link>

        <Link to="/login-driver">
          <Navbar.Link
            active={location.pathname == "/login-driver"}
            href="#"
            className="text-lg text-white"
          >
            Driver
          </Navbar.Link>
        </Link>

        <Link to="/payment">
          <Navbar.Link
            active={location.pathname == "/payment"}
            href="#"
            className="text-lg text-white"
          >
            Payment
          </Navbar.Link>
        </Link>

        <Link to="/search">
          <Navbar.Link
            active={location.pathname == "/search"}
            href="#"
            className="text-lg text-white"
          >
            Search
          </Navbar.Link>
        </Link>

        <Link to="/contact">
          <Navbar.Link
            active={location.pathname == "/contact"}
            href="#"
            className="text-lg text-white"
          >
            Contact Us
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
