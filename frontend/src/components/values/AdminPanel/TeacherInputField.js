import React from "react";
import * as FaIcons from "react-icons/fa";

const TeacherFieldValue = [
  {
    title: "TRN",
    input: "text",
    icon: <FaIcons.FaCode className="mid-icon" />,
    placeholder: "TRN Number",
    name: "teacherTRN",
    isRequired: true,
  },
  {
    title: "FIRST NAME",
    input: "text",
    icon: <FaIcons.FaUser className="mid-icon" />,
    placeholder: "First Name",
    name: "teacherFirstName",
    isRequired: true,
  },
  {
    title: "MIDDLE NAME",
    input: "text",
    icon: <FaIcons.FaUser className="mid-icon" />,
    placeholder: "Middle Name",
    name: "teacherMiddleName",
    isRequired: false,
  },
  {
    title: "LAST NAME",
    input: "text",
    icon: <FaIcons.FaUser className="mid-icon" />,
    placeholder: "Last Name",
    name: "teacherLastName",
    isRequired: true,
  },
  {
    title: "GENDER",
    input: "dropdown",
    icon: <FaIcons.FaVenus className="mid-icon" />,
    placeholder: "Gender",
    name: "teacherGender",
    isRequired: true,

    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    title: "DATE OF BIRTH",
    input: "date",
    icon: <FaIcons.FaCalendar className="mid-icon" />,
    isRequired: true,
    name: "teacherDOB",
  },
  {
    title: "PHONE",
    input: "number",
    icon: <FaIcons.FaPhone className="mid-icon" />,
    placeholder: "98********",
    isRequired: true,
    name: "teacherPhone",
  },
  {
    title: "LOCATION",
    input: "text",
    icon: <FaIcons.FaLocationArrow className="mid-icon" />,
    placeholder: "Enter Location",
    isRequired: true,
    name: "teacherLocation",
  },
];

export function getTeacherInputValues() {
  return TeacherFieldValue;
}
