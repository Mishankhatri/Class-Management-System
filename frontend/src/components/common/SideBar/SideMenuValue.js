import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

const menuadminValue = [
  {
    name: "Dashboard",
    hasSubMenu: false,
    icon: <MdIcons.MdDashboard />,
    to: "/admin/dashboard",
  },
  {
    name: "Student",
    hasSubMenu: true,
    submenus: [
      {
        name: "View Student",
        to: "/admin/student/view",
      },
      {
        name: "Add",
        to: "/admin/student/add",
      },
    ],
    icon: <FaIcons.FaUserGraduate />,
    to: "/admin/student/view",
  },
  {
    name: "Teacher",
    hasSubMenu: true,
    submenus: [
      {
        name: "View Teacher",
        to: "/admin/teacher/view",
      },
      {
        name: "Add Teacher",
        to: "/admin/teacher/add",
      },
      {
        name: "Assign Teacher",
        to: "/admin/teacher/assign",
      },
    ],
    icon: <FaIcons.FaUserTie />,
    to: "/admin/teacher/view",
  },

  {
    name: "Classes",
    hasSubMenu: true,
    submenus: [
      {
        name: "View Class",
        to: "/admin/classes/view",
      },
      {
        name: "Add Classes",
        to: "/admin/classes/addclass",
      },
      {
        name: "Add Section",
        to: "/admin/classes/addsection",
      },
    ],
    icon: <FaIcons.FaFile />,
    to: "/admin/classes/view",
  },
  {
    name: "Subject",
    hasSubMenu: true,
    submenus: [
      {
        name: "View Subjects",
        to: "/admin/subject/view",
      },
      {
        name: "Add Subjects",
        to: "/admin/subject/add",
      },
    ],
    icon: <FaIcons.FaBook />,
    to: "/admin/subject/view",
  },
  {
    name: "Timetables",
    hasSubMenu: true,
    submenus: [
      {
        name: "View",
        to: "/admin/timetables/view",
      },
      {
        name: "Create",
        to: "/admin/timetables/create",
      },
    ],
    icon: <FaIcons.FaCalendar />,
    to: "/admin/timetables/view",
  },
  {
    name: "Attendance",
    hasSubMenu: false,
    icon: <FaIcons.FaAddressCard />,
    to: "/admin/reports/attendance",
  },

  {
    name: "Create Id",
    hasSubMenu: false,
    icon: <FaIcons.FaUser />,
    to: "/admin/createid",
  },
  {
    name: "Announcements",
    hasSubMenu: true,
    submenus: [
      {
        name: "Create",
        to: "/admin/announcements/create",
      },
      {
        name: "View",
        to: "/admin/announcements/view",
      },
    ],
    icon: <FaIcons.FaBullhorn />,
    to: "/admin/announcements/create",
  },
];

const menuTeacherValue = [
  {
    name: "Dashboard",
    hasSubMenu: false,
    icon: <MdIcons.MdDashboard />,
    to: "/teacher/dashboard",
  },
  {
    name: "Assignment",
    hasSubMenu: true,
    submenus: [
      {
        name: "View",
        to: "/teacher/assignment/view",
      },
      {
        name: "Create",
        to: "/teacher/assignment/create",
      },
    ],
    icon: <FaIcons.FaCode />,
    to: "/teacher/assignment/view",
  },
  {
    name: "Attendance",
    hasSubMenu: true,
    submenus: [
      {
        name: "View",
        to: "/teacher/attendance/view",
      },
      {
        name: "Mark",
        to: "/teacher/attendance/mark",
      },
    ],
    icon: <FaIcons.FaChartBar />,
    to: "/teacher/attendance/view",
  },

  {
    name: "Announcement",
    hasSubMenu: true,
    submenus: [
      {
        name: "View",
        to: "/teacher/announcement/view",
      },
      {
        name: "Create",
        to: "/teacher/announcement/create",
      },
    ],
    icon: <FaIcons.FaBullhorn />,
    to: "/teacher/announcement/view",
  },
  {
    name: "Timetables",
    hasSubMenu: false,
    icon: <FaIcons.FaCalendar />,
    to: "/teacher/timetables/view",
  },

  {
    name: "Notes",
    hasSubMenu: true,
    submenus: [
      {
        name: "View Notes",
        to: "/teacher/notes/view",
      },
      {
        name: "Upload Notes",
        to: "/teacher/notes/upload",
      },
    ],
    icon: <FaIcons.FaStickyNote />,
    to: "/teacher/notes/view",
  },
];

const menuStudentValue = [
  {
    name: "Dashboard",
    hasSubMenu: false,
    icon: <MdIcons.MdDashboard />,
    to: "/student/dashboard",
  },

  {
    name: "View Attendance",
    hasSubMenu: false,
    icon: <FaIcons.FaAddressCard />,
    to: "/student/reports/attendance",
  },
  {
    name: "View Timetables",
    hasSubMenu: false,
    icon: <FaIcons.FaCalendar />,
    to: "/student/timetables/view",
  },
  {
    name: "Announcement",
    hasSubMenu: false,
    icon: <FaIcons.FaBullhorn />,
    to: "/student/announcements",
  },
  {
    name: "Assignment",
    hasSubMenu: false,
    icon: <FaIcons.FaCode />,
    to: "/student/assignment/view",
  },

  {
    name: "Lecture note",
    hasSubMenu: false,
    icon: <FaIcons.FaStickyNote />,
    to: "/student/notes",
  },
];

export function getMenuValues() {
  return menuadminValue;
}

export { menuTeacherValue, menuStudentValue };
