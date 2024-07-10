import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/_header.scss';
import { selectMenu } from '../redux/menuSlice';

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState< { [key: string]: boolean}>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

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

        <div className="dropdown" onMouseEnter={() => toggleDropdown()} onMouseLeave={() => toggleDropdown()}>
          Menu
          {dropdownOpen && (
            <div className="dropdown-content">
              <div className="dropdown-item" onMouseEnter={() => toggleSubmenu('a')} onMouseLeave={() => toggleSubmenu('a')}>View
                {/* {submenuOpen['a'] && (
                  <div className='submenu-content'>
                  <div className="submenu-item" onClick={() => dispatch(selectMenu('Perspective View'))}>Perspective view</div>
                  <div className="submenu-item" onClick={() => dispatch(selectMenu('Orthographic View'))}>Orthographic view</div>
                  <div className="submenu-item" onClick={() => dispatch(selectMenu('View interpolation'))}>View interpolation</div>
                  <div className="submenu-item" onClick={() => dispatch(selectMenu('Skewing'))}>Skewing</div>
                  </div>
                )} */}
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
