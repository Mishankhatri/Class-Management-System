import React from "react";
import * as FaIcons from "react-icons/fa";

export function AssignmentInputValue() {
  return [
    {
      title: "Title",
      input: "text",
      icon: <FaIcons.FaCogs className="mid-icon" />,
      placeholder: "Title",
      name: "assignmentTitle",
      isRequired: true,
    },
    {
      title: "Class",
      input: "dropdown",
      icon: <FaIcons.FaUps className="mid-icon" />,
      placeholder: "Assignment Class",
      name: "assignmentClass",
      isRequired: true,
      options: [
        { value: "12", label: "12" },
        { value: "11", label: "11" },
        { value: "10", label: "10" },
        { value: "9", label: "9" },
        { value: "8", label: "8" },
        { value: "7", label: "7" },
        { value: "6", label: "6" },
        { value: "5", label: "5" },
      ],
    },
    {
      title: "Section",
      input: "dropdown",
      icon: <FaIcons.FaCode className="mid-icon" />,
      placeholder: "Student Section",
      name: "assignmentSection",
      isRequired: true,
      options: [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
      ],
    },
    {
      title: "Subject",
      input: "dropdown",
      icon: <FaIcons.FaBook className="mid-icon" />,
      placeholder: "Subject",
      name: "assignmentSubject",
      isRequired: true,
      options: [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
      ],
    },
    {
      title: "Date due",
      input: "date",
      icon: <FaIcons.FaCalendar className="mid-icon" />,
      placeholder: "Date",
      name: "assignmentDate",
      isRequired: true,
    },
    {
      title: "Time due",
      input: "time",
      icon: <FaIcons.FaClock className="mid-icon" />,
      placeholder: "Time",
      name: "assignmentTime",
      isRequired: true,
    },
  ];
}
