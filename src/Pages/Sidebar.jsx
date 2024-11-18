import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconMenuDeep, IconSmartHome, IconWallet, IconSearch, IconUserScan, IconDental } from '@tabler/icons-react';
import '../index.css';

function Sidebar() {
    const [open, setOpen] = useState(true);
    const [activeItem, setActiveItem] = useState('dashboard'); // Initialize activeItem
    const navigate = useNavigate();
    const location = useLocation();

    // Set active item based on current location
    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = menuItems.find(item => item.path === currentPath)?.name || 'dashboard';
        setActiveItem(activeItem);
    }, [location.pathname]);

    const menuItems = [
        { name: 'dashboard', label: 'Dashboard', icon: <IconSmartHome stroke={1} />, path: '/dashboard' },
        { name: 'dentist', label: 'Dentist', icon: <IconDental stroke={1} />, path: '/table1' },
        { name: 'search', label: 'Searches', icon: <IconSearch stroke={1} />, path: '/table2' },
        { name: 'subscription', label: 'Subscriptions', icon: <IconWallet stroke={1} />, path: '/table3' },
        { name: 'admin', label: 'Admin', icon: <IconUserScan stroke={1} />, path: '/table4' },
        { name: 'feedback', label: 'Feedback', icon: <IconUserScan stroke={1} />, path: '/table5' },
    ];

    const handleItemClick = (itemName, path) => {
        setActiveItem(itemName); // Update active item
        navigate(path);
    };

    return (
        <div className="lg:relative relative">
            <div className={`${open ? "lg:w-[220px] w-[150px] h-screen lg:static absolute" : "lg:w-[0px] w-[0px] h-[0px]"} duration-300 lg:bg-[#001F2A] bg-[#001F2A] lg:h-screen roboto-regular`}>
                <div className='flex justify-between relative'>
                    {open && (
                        <img src='./Frame 68.png' alt='Primary Icon' className="lg:h-[80px] lg:w-[150px] lg:mt-3 ml-12 hidden lg:block" />
                    )}
                    <IconMenuDeep stroke={2} className={`absolute ${open ? "lg:left-56 lg:top-2 lg:text-black text-white" : "lg:top-2 lg:text-black lg:left-2"} left-2 top-2`} onClick={() => setOpen(!open)} />
                </div>
                <div className='flex lg:justify-end'>
                    <ul className='lg:pt-1 lg:pl-2 pt-11 pl-2 flex flex-col lg:gap-2 gap-4 text-white justify-items-center'>
                        {menuItems.map((item) => (
                            <li
                                key={item.name}
                                className={`flex items-center ${activeItem === item.name ? 'bg-[#EEF1F6] text-black rounded-s-full' : 'text-opacity-40'} ${open ? 'lg:text-[20px] text-[14px]' : 'hidden lg:text-[14px]'} font-[Century Gothic] font-medium opacity-[1] p-2 cursor-pointer`}
                                onClick={() => handleItemClick(item.name, item.path)}
                            >
                                <span className='flex items-center w-full'>
                                    <span className='mr-2'>
                                        {React.cloneElement(item.icon, {
                                            className: `w-6 h-6 ${activeItem === item.name ? 'text-black' : 'text-opacity-40'}`,
                                        })}
                                    </span>
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
