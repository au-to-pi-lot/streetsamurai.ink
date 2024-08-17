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
        <span className={`${styles.hamburgerIcon} ${isOpen ? styles.open : ''}`}></span>
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
