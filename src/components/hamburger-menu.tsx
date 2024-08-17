import React, { useState } from 'react';
import Image from 'next/image';

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
        className="text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <Image
          src="/hamburger-icon.svg"
          width={24}
          height={24}
          alt="Menu"
          className="w-6 h-6"
        />
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
