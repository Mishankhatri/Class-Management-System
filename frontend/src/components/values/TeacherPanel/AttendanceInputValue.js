import * as FaIcons from "react-icons/fa";

function AttendanceInputValue() {
  return [
    {
      title: "Student Name",
      input: "text",
      icon: <FaIcons.FaUser className="mid-icon" />,
      placeholder: "Student Name",
      name: "studentName",
      isRequired: false,
      disabled: true,
    },
    {
      title: "Roll No",
      input: "text",
      icon: <FaIcons.FaUserAltSlash className="mid-icon" />,
      placeholder: "Student Name",
      name: "rollNo",
      isRequired: false,
      disabled: true,
    },
    {
      title: "Student Class",
      input: "text",
      icon: <FaIcons.FaCode className="mid-icon" />,
      placeholder: "Roll No",
      name: "studentClass",
      isRequired: false,
      disabled: true,
    },
    {
      title: "Date",
      input: "text",
      icon: <FaIcons.FaCalendar className="mid-icon" />,
      placeholder: "Date",
      name: "date",
      isRequired: false,
      disabled: true,
    },
    {
      title: "Subject",
      input: "text",
      icon: <FaIcons.FaBook className="mid-icon" />,
      placeholder: "Subject",
      name: "studentSubject",
      isRequired: false,
      disabled: true,
    },
    {
      title: "Attendance",
      input: "dropdown",
      icon: <FaIcons.FaProcedures className="mid-icon" />,
      placeholder: "Student Attendance",
      name: "attendance",
      isRequired: false,
      options: [
        { value: "Present", label: "Present" },
        { value: "Absent", label: "Absent" },
      ],
    },
  ];
}
export default AttendanceInputValue;
