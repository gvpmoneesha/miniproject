import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

export const FooterPage = () => {
  return (
    <Footer container className="py-4 ">
      <Link to="/">
        <Footer.Copyright href="#" by="Sri Lankan Police" year={2025} />
      </Link>

      <Footer.LinkGroup className="gap-4">
        <Link to="/about">
          <Footer.Link>About</Footer.Link>
        </Link>

        <Link to="/about">
          <Footer.Link>Privacy Policy</Footer.Link>
        </Link>

        <Link to="/about">
          <Footer.Link>Licensing</Footer.Link>
        </Link>

        <Link to="/contact">
          <Footer.Link>Contact</Footer.Link>
        </Link>
      </Footer.LinkGroup>
    </Footer>
  );
};
