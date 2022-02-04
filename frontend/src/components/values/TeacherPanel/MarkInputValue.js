import * as FaIcons from "react-icons/fa";

function MarkInputValue() {
  return [
    {
      title: "Student Class",
      input: "text",
      icon: <FaIcons.FaBookReader className="mid-icon" />,
      placeholder: "Student Class",
      name: "studentClass",
      isRequired: false,
      disabled: true,
    },
    {
      title: "Section",
      input: "text",
      icon: <FaIcons.FaCode className="mid-icon" />,
      placeholder: "Section",
      name: "section",
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
      placeholder: "Student Roll",
      name: "rollNo",
      isRequired: false,
      disabled: true,
    },
    {
      title: "Mark",
      input: "number",
      icon: <FaIcons.FaProcedures className="mid-icon" />,
      placeholder: "Student Mark",
      name: "mark",
      isRequired: false,
    },
  ];
}
export default MarkInputValue;
