import React from "react";
import HamburgerMenu from "./hamburger-menu";

export type NavProps = {
  children: React.ReactNode;
};

const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <>
      <nav aria-label="Main Navigation" className="hidden sm:flex space-x-4">
        {children}
      </nav>
      <HamburgerMenu>{children}</HamburgerMenu>
    </>
  );
};

export default Nav;
