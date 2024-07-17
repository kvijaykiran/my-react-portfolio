import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/_header.scss';
import { selectMenu } from '../redux/menuSlice';

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<{ [key: string]: boolean }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSubmenu = (key: string) => {
    setSubmenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
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

        <div className="dropdown" onClick={() => dispatch(selectMenu('home_base'))}>Homebase</div>

        <div className="separator">|</div>

        <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          Menu
          {dropdownOpen && (
            <div className="dropdown-content">
              <div className="dropdown-item" onMouseEnter={() => toggleSubmenu('a')} onMouseLeave={() => toggleSubmenu('a')} onClick={() => dispatch(selectMenu('CameraProjectionMode'))}>
                View Options
                {/* {submenuOpen['a'] && (
                  <div className="submenu-content">
                    <div className="submenu-item" onClick={() => dispatch(selectMenu('CameraProjectionMode'))}>Perspective/Ortho</div>
                  </div>
                )} */}
              </div>

              <div className="dropdown-item" onMouseEnter={() => toggleSubmenu('b')} onMouseLeave={() => toggleSubmenu('b')}>
                2D Vectors
                {submenuOpen['b'] && (
                  <div className="submenu-content">
                    <div className="submenu-item" onClick={() => dispatch(selectMenu('Vectors_example_1'))}>Example 1</div>
                    <div className="submenu-item" onClick={() => dispatch(selectMenu('Vectors_example_2'))}>Example 2</div>
                    <div className="submenu-item" onClick={() => dispatch(selectMenu('Vectors_example_3'))}>Example 3</div>
                    <div className="submenu-item" onClick={() => dispatch(selectMenu('Vectors_example_4'))}>Example 4</div>
                    <div className="submenu-item" onClick={() => dispatch(selectMenu('Vectors_example_5'))}>Example 5</div>
                    <div className="submenu-item" onClick={() => dispatch(selectMenu('Vectors_example_6'))}>Example 6</div>
                    <div className="submenu-item" onClick={() => dispatch(selectMenu('Vectors_example_7'))}>Example 7</div>
                    <div className="submenu-item" onClick={() => dispatch(selectMenu('Vectors_example_8'))}>Example 8</div>
                    <div className="submenu-item" onClick={() => dispatch(selectMenu('Vectors_example_9'))}>Example 9</div>
                    <div className="submenu-item" onClick={() => dispatch(selectMenu('Vectors_example_10'))}>Example 10</div>
                  </div>
                )}
              </div>

              <div className="dropdown-item" onMouseEnter={() => toggleSubmenu('c')} onMouseLeave={() => toggleSubmenu('c')}>
                3D Geometries
                {submenuOpen['c'] && (
                  <div className="submenu-content">
                    <div className="submenu-item">Shell</div>
                    <div className="submenu-item">Revolve extrusion</div>
                    <div className="submenu-item">Assembly</div>
                  </div>
                )}
              </div>

              <div className="dropdown-item" onMouseEnter={() => toggleSubmenu('d')} onMouseLeave={() => toggleSubmenu('d')}>
                GPU Shaders
                {submenuOpen['d'] && (
                  <div className="submenu-content">
                    <div className="submenu-item">Simple</div>
                    <div className="submenu-item">Rim lighting</div>
                    <div className="submenu-item">Light model</div>
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
