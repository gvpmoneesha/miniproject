import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar fluid rounded className=" bg-opacity-0">
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
          <Navbar.Link className="text-lg text-white">Admin</Navbar.Link>
        </Link>

        <Link to="/login">
          <Navbar.Link href="#" className="text-lg text-white">
            Traffic Officer
          </Navbar.Link>
        </Link>

        <Navbar.Link href="#" className="text-lg  text-white">
          Driver
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg  text-white">
          Payment
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg  text-white">
          About Us
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg  text-white">
          Contact Us
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
