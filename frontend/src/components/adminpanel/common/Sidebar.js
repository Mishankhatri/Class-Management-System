import React from 'react';
import MenuItem from './MenuItem';
import './Sidebar.css';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

function Sidebar({ show }) {
  const sidebarValue = [
    {
      name: 'Dashboard',
      hasSubMenu: false,
      icon: <MdIcons.MdDashboard />,
    },
    {
      name: 'Student',
      hasSubMenu: true,
      submenus: ['Add', 'All Student'],
      icon: <FaIcons.FaUserGraduate />,
    },
    {
      name: 'Teacher',
      hasSubMenu: true,
      submenus: ['Add', 'All Teacher'],
      icon: <FaIcons.FaUserTie />,
    },
    {
      name: 'Announcements',
      hasSubMenu: false,
      icon: <FaIcons.FaBullhorn />,
    },
    {
      name: 'Classes',
      hasSubMenu: true,
      submenus: ['Add Classes', 'Add Section', 'View Class'],
      icon: <FaIcons.FaFile />,
    },
    {
      name: 'Subject',
      hasSubMenu: true,
      submenus: ['Add Subjects', 'View Subjects'],
      icon: <FaIcons.FaBook />,
    },
    {
      name: 'Timetables',
      hasSubMenu: true,
      submenus: ['Create', 'View'],
      icon: <FaIcons.FaCalendar />,
    },
    {
      name: 'Reports',
      hasSubMenu: true,
      submenus: ['Attendance', 'Marks'],
      icon: <FaIcons.FaAddressCard />,
    },
    {
      name: 'Create Id',
      hasSubMenu: false,
      icon: <FaIcons.FaUser />,
    },
  ];
  return (
    <div className={show ? 'sidemenu active' : 'sidemenu'}>
      <ul>
        {sidebarValue.map((values, index) => {
          if (values.hasSubMenu) {
            return (
              <MenuItem
                name={values.name}
                submenus={values.submenus}
                key={index}
                icons={values.icon}
                hasSubMenus={values.hasSubMenu}
              />
            );
          } else {
            return (
              <MenuItem
                name={values.name}
                key={index}
                icons={values.icon}
                hasSubMenus={values.hasSubMenu}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
