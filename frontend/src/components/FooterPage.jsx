import React from "react";
import { Footer } from "flowbite-react";

export const FooterPage = () => {
  return (
    <Footer container className="py-4">
      <Footer.Copyright href="#" by="Sri Lankan Police" year={2025} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
};
