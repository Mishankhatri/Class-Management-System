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
        name: 'Add',
        to: 'admin/student/add',
      },
      {
        name: 'View Student',
        to: 'admin/student/view',
      },
    ],
    icon: <FaIcons.FaUserGraduate />,
    to: 'student',
  },
  {
    name: 'Teacher',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Add',
        to: 'admin/teacher/add',
      },
      {
        name: 'View Teacher',
        to: 'admin/teacher/view',
      },
    ],
    icon: <FaIcons.FaUserTie />,
    to: 'teacher',
  },

  {
    name: 'Classes',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Add Classes',
        to: 'admin/classes/addclass',
      },
      {
        name: 'Add Section',
        to: 'admin/classes/addsection',
      },
      {
        name: 'View Class',
        to: 'admin/classes/view',
      },
    ],
    icon: <FaIcons.FaFile />,
    to: 'classes',
  },
  {
    name: 'Subject',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Add Subjects',
        to: 'admin/subject/add',
      },
      {
        name: 'View Subjects',
        to: 'admin/subject/view',
      },
    ],
    icon: <FaIcons.FaBook />,
    to: 'subject',
  },
  {
    name: 'Timetables',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Create',
        to: 'admin/timetables/create',
      },
      {
        name: 'View',
        to: 'admin/timetables/view',
      },
    ],
    icon: <FaIcons.FaCalendar />,
    to: 'timetables',
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
    to: 'reports',
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
