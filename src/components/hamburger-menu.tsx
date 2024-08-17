import React, { useState } from 'react';
import styles from './HamburgerMenu.module.css';

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
        <span className="absolute inset-0 flex flex-col justify-center items-center">
          <span className={`bg-white h-0.5 w-5 absolute transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
          <span className={`bg-white h-0.5 w-5 absolute transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`bg-white h-0.5 w-5 absolute transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
        </span>
      </button>
      {isOpen && (
        <div className={styles.menuItems}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                className: `${child.props.className || ''} ${styles.menuItem}`.trim()
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
