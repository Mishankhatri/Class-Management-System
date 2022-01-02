import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

const menuValue = [
  {
    name: 'Dashboard',
    hasSubMenu: false,
    icon: <MdIcons.MdDashboard />,
    to: 'dashboard',
  },
  {
    name: 'Student',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Add',
        to: 'student/add',
      },
      {
        name: 'View Student',
        to: 'student/view',
      },
    ],
    icon: <FaIcons.FaUserGraduate />,
    to: 'student/add',
  },
  {
    name: 'Teacher',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Add',
        to: 'teacher/add',
      },
      {
        name: 'View Teacher',
        to: 'teacher/view',
      },
    ],
    icon: <FaIcons.FaUserTie />,
    to: 'teacher/add',
  },
  {
    name: 'Announcements',
    hasSubMenu: false,
    icon: <FaIcons.FaBullhorn />,
    to: 'announcements',
  },
  {
    name: 'Classes',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Add Classes',
        to: 'classes/addclass',
      },
      {
        name: 'Add Section',
        to: 'classes/addsection',
      },
      {
        name: 'View Class',
        to: 'classes/view',
      },
    ],
    icon: <FaIcons.FaFile />,
    to: 'classes/addclass',
  },
  {
    name: 'Subject',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Add Subjects',
        to: 'subject/add',
      },
      {
        name: 'View Subjects',
        to: 'subject/view',
      },
    ],
    icon: <FaIcons.FaBook />,
    to: 'subject/add',
  },
  {
    name: 'Timetables',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Create',
        to: 'timetables/create',
      },
      {
        name: 'View',
        to: 'timetables/view',
      },
    ],
    icon: <FaIcons.FaCalendar />,
    to: 'timetables/create',
  },
  {
    name: 'Reports',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Attendance',
        to: 'reports/attendance',
      },
      {
        name: 'Marks',
        to: 'reports/marks',
      },
    ],
    icon: <FaIcons.FaAddressCard />,
    to: 'reports/attendance',
  },
  {
    name: 'Create Id',
    hasSubMenu: false,
    icon: <FaIcons.FaUser />,
    to: 'createid',
  },
];

export function getValues() {
  return menuValue;
}
