import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

const menuadminValue = [
  {
    name: 'Dashboard',
    hasSubMenu: false,
    icon: <MdIcons.MdDashboard />,
    to: '/admin/dashboard',
  },
  {
    name: 'Student',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View Student',
        to: '/admin/student/view',
      },
      {
        name: 'Add',
        to: '/admin/student/add',
      },
    ],
    icon: <FaIcons.FaUserGraduate />,
    to: '/admin/student/view',
  },
  {
    name: 'Teacher',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View Teacher',
        to: '/admin/teacher/view',
      },
      {
        name: 'Add',
        to: '/admin/teacher/add',
      },
    ],
    icon: <FaIcons.FaUserTie />,
    to: '/admin/teacher/view',
  },

  {
    name: 'Classes',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View Class',
        to: '/admin/classes/view',
      },
      {
        name: 'Add Classes',
        to: '/admin/classes/addclass',
      },
      {
        name: 'Add Section',
        to: '/admin/classes/addsection',
      },
    ],
    icon: <FaIcons.FaFile />,
    to: '/admin/classes/view',
  },
  {
    name: 'Subject',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View Subjects',
        to: '/admin/subject/view',
      },
      {
        name: 'Add Subjects',
        to: '/admin/subject/add',
      },
    ],
    icon: <FaIcons.FaBook />,
    to: '/admin/subject/view',
  },
  {
    name: 'Timetables',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View',
        to: '/admin/timetables/view',
      },
      {
        name: 'Create',
        to: '/admin/timetables/create',
      },
    ],
    icon: <FaIcons.FaCalendar />,
    to: '/admin/timetables/view',
  },
  {
    name: 'Reports',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Attendance',
        to: '/admin/reports/attendance',
      },
      {
        name: 'Marks',
        to: '/admin/reports/marks',
      },
    ],
    icon: <FaIcons.FaAddressCard />,
    to: '/admin/reports/attendance',
  },

  {
    name: 'Create Id',
    hasSubMenu: false,
    icon: <FaIcons.FaUser />,
    to: '/admin/createid',
  },
  {
    name: 'Announcements',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Create',
        to: '/admin/announcements/create',
      },
      {
        name: 'View',
        to: '/admin/announcements/view',
      },
    ],
    icon: <FaIcons.FaBullhorn />,
    to: '/admin/announcements/create',
  },
];

const menuTeacherValue = [
  {
    name: 'Dashboard',
    hasSubMenu: false,
    icon: <MdIcons.MdDashboard />,
    to: '/teacher/dashboard',
  },
  {
    name: 'Assignment',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Download',
        to: '/teacher/assignment/download',
      },
      {
        name: 'Create',
        to: '/teacher/assignment/create',
      },
    ],
    icon: <FaIcons.FaCode />,
    to: '/teacher/assignment/download',
  },
  {
    name: 'Attendance',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View',
        to: '/teacher/attendance/view',
      },
      {
        name: 'Mark',
        to: '/teacher/attendance/mark',
      },
    ],
    icon: <FaIcons.FaChartBar />,
    to: '/teacher/attendance/view',
  },

  {
    name: 'Announcement',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View',
        to: '/teacher/announcement/view',
      },
      {
        name: 'Create',
        to: '/teacher/announcement/create',
      },
    ],
    icon: <FaIcons.FaBullhorn />,
    to: '/teacher/announcement/view',
  },
  {
    name: 'Timetables',
    hasSubMenu: false,
    icon: <FaIcons.FaCalendar />,
    to: '/teacher/timetables/view',
  },
  {
    name: 'Reports',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Attendance',
        to: '/teacher/reports/presence',
      },
      {
        name: 'Marks',
        to: '/teacher/reports/marks',
      },
    ],
    icon: <FaIcons.FaAddressCard />,
    to: '/teacher/reports/presence',
  },

  {
    name: 'Lecture note',
    hasSubMenu: false,
    icon: <FaIcons.FaStickyNote />,
    to: '/teacher/notes',
  },
];

const menuStudentValue = [
  {
    name: 'Dashboard',
    hasSubMenu: false,
    icon: <MdIcons.MdDashboard />,
    to: '/student/dashboard',
  },
  {
    name: 'Assignment',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View',
        to: '/student/assignment/view',
      },
      {
        name: 'Upload',
        to: '/student/assignment/upload',
      },
    ],
    icon: <FaIcons.FaCode />,
    to: '/student/assignment/view',
  },
  {
    name: 'Reports',
    hasSubMenu: true,
    submenus: [
      {
        name: 'View Attendance',
        to: '/student/reports/attendance',
      },
      {
        name: 'View Marks',
        to: '/student/reports/marks',
      },
    ],
    icon: <FaIcons.FaAddressCard />,
    to: '/student/reports/attendance',
  },
  {
    name: 'View Timetables',
    hasSubMenu: false,
    icon: <FaIcons.FaCalendar />,
    to: '/student/timetables/view',
  },
  {
    name: 'Announcement',
    hasSubMenu: false,
    icon: <FaIcons.FaBullhorn />,
    to: '/student/announcements',
  },

  {
    name: 'Examination',
    hasSubMenu: true,
    submenus: [
      {
        name: 'Internal Marks',
        to: '/student/examination/internal',
      },
      {
        name: 'Final Results',
        to: '/student/examination/final',
      },
    ],
    icon: <FaIcons.FaExpand />,
    to: '/student/examination/internal',
  },
];

export function getMenuValues() {
  return menuadminValue;
}

export { menuTeacherValue, menuStudentValue };
