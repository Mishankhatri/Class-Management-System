import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

const menuValue = [
  {
    name: 'Dashboard',
    hasSubMenu: false,
    icon: <MdIcons.MdDashboard />,
    to: 'admin/dashboard',
  },
  {
    name: 'Student',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View Student',
        to: 'admin/student/view',
      },
      {
        name: 'Add',
        to: 'admin/student/add',
      },
    ],
    icon: <FaIcons.FaUserGraduate />,
    to: 'admin/student/view',
  },
  {
    name: 'Teacher',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View Teacher',
        to: 'admin/teacher/view',
      },
      {
        name: 'Add',
        to: 'admin/teacher/add',
      },
    ],
    icon: <FaIcons.FaUserTie />,
    to: 'admin/teacher/view',
  },

  {
    name: 'Classes',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View Class',
        to: 'admin/classes/view',
      },
      {
        name: 'Add Classes',
        to: 'admin/classes/addclass',
      },
      {
        name: 'Add Section',
        to: 'admin/classes/addsection',
      },
    ],
    icon: <FaIcons.FaFile />,
    to: 'admin/classes/view',
  },
  {
    name: 'Subject',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View Subjects',
        to: 'admin/subject/view',
      },
      {
        name: 'Add Subjects',
        to: 'admin/subject/add',
      },
    ],
    icon: <FaIcons.FaBook />,
    to: 'admin/subject/view',
  },
  {
    name: 'Timetables',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View',
        to: 'admin/timetables/view',
      },
      {
        name: 'Create',
        to: 'admin/timetables/create',
      },
    ],
    icon: <FaIcons.FaCalendar />,
    to: 'admin/timetables/view',
  },
  {
    name: 'Reports',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Attendance',
        to: 'admin/reports/attendance',
      },
      {
        name: 'Marks',
        to: 'admin/reports/marks',
      },
    ],
    icon: <FaIcons.FaAddressCard />,
    to: 'admin/reports/attendance',
  },

  {
    name: 'Create Id',
    hasSubMenu: false,
    icon: <FaIcons.FaUser />,
    to: 'admin/createid',
  },
  {
    name: 'Announcements',
    hasSubMenu: false,
    icon: <FaIcons.FaBullhorn />,
    to: 'admin/announcements',
  },
];

export function getValues() {
  return menuValue;
}
