import React, { useState, useEffect, useRef } from 'react';
import { IconUserCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref to track the dropdown

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleView = () => {
    navigate('/profile');
  };

  const handleEdit = () => {
    console.log('Logout');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuVisible(false); // Close the menu if clicked outside
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className='mt-1 lg:m-3 flex justify-end text-black' ref={dropdownRef}>
      <button
        className='mr-2 lg:mr-1 p-2 rounded-lg font-bold flex gap-1'
        onClick={toggleMenu}
      >
        <div>
          <p>{'Profile Name'}</p>
        </div>
        <div className='bg-[#99E9F5] rounded-full p-1'>
          <IconUserCircle stroke={2} className='' />
        </div>
      </button>
      
      {menuVisible && (
        <div className="absolute top-12 right-3 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul>
            <li
              onClick={handleView}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Edit Profile
            </li>
            <li
              onClick={handleEdit}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
