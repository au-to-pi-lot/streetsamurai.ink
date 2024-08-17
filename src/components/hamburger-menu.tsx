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
    <div className="lg:hidden">
      <button
        onClick={toggleMenu}
        className="text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
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
