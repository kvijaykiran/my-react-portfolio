import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setPosition, setTarget } from '../redux/cameraSlice';
// import { setPosition } from '../redux/cameraSlice';
import '../styles/_header.scss';
// import { Vector3 } from '@babylonjs/core/Maths/math.vector';

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState< { [key: string]: boolean}>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSubmenu = (key: string) => {
    setSubmenuOpen(prev => ({ ...prev, [key]: !prev[key]}));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
      setSubmenuOpen({});
    }
  };

  // const handleMenuClick = (item: string) => {
  //   if (item === 'Front') {
  //     dispatch(setPosition(new Vector3(0, 0, 10))); // Front view position
  //     dispatch(setTarget(new Vector3(0, 0, 0))); // Target position
  //   }
  //   // Add more conditions for other menu items if needed
  // };

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
              <div className="dropdown-item" onMouseEnter={() => toggleSubmenu('a')} onMouseLeave={() => toggleSubmenu('a')}>Views
                {submenuOpen['a'] && (
                  <div className='submenu-content'>
                  <div className="submenu-item">Front</div>
                  <div className="submenu-item">Left</div>
                  <div className="submenu-item">Top</div>
                  <div className="submenu-item">Isometric</div>
                  </div>
                )}
              </div>

              <div className="dropdown-item" onMouseEnter={() => toggleSubmenu('b')} onMouseLeave={() => toggleSubmenu('b')}>Geometries
              {submenuOpen['b'] && (
                  <div className='submenu-content'>
                  <div className="submenu-item">Shell</div>
                  <div className="submenu-item">Revolve extrusion</div>
                  <div className="submenu-item">Assembly</div>
                  <div className="submenu-item">Shaded</div>
                  </div>
                )}

              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
