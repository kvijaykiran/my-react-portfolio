import React, { useState, useRef, useEffect } from 'react';
import '../styles/_header.scss';

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">Logo</div>
      <div className="dropdown-container" ref={dropdownRef}>

        <div className="dropdown" onClick={toggleDropdown}>
          Menu
          {dropdownOpen && (
            <div className="dropdown-content">
              <div className="dropdown-item">Views</div>
              <div className="dropdown-item">Geometries</div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
