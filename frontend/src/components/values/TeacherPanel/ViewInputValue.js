import * as FaIcons from "react-icons/fa";

function ViewInputValue() {
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
  ];
}
export default ViewInputValue;
