import React, { useState } from 'react';

export type HamburgerMenuProps = {
  children: React.ReactNode;
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sm:hidden">
      <button
        onClick={toggleMenu}
        className="text-white focus:outline-none relative w-6 h-6"
        aria-label="Toggle menu"
      >
        <span className={`hamburger-icon ${isOpen ? 'open' : ''}`}></span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg py-1">
          {children}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
