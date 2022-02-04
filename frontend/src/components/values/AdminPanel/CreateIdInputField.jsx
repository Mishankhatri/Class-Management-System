import React from "react";
import * as FaIcons from "react-icons/fa";

const createIdFieldValue = [
  {
    title: "Email",
    input: "email",
    icon: <FaIcons.FaEnvelope className="mid-icon" />,
    placeholder: "Enter Email",
    name: "registerEmail",
    isRequired: true,
  },
  {
    title: "Full Name",
    input: "text",
    icon: <FaIcons.FaUser className="mid-icon" />,
    placeholder: "Enter FullName",
    name: "registerFullName",
    isRequired: false,
  },
  {
    title: "Username",
    input: "text",
    icon: <FaIcons.FaUser className="mid-icon" />,
    placeholder: "Enter Username",
    name: "registerUsername",
    isRequired: false,
  },
  {
    title: "Password",
    input: "password",
    icon: <FaIcons.FaCode className="mid-icon" />,
    placeholder: "Enter Password",
    name: "registerPassword",
    isRequired: true,
  },

  {
    title: "Re-enter Password",
    input: "password",
    icon: <FaIcons.FaCode className="mid-icon" />,
    placeholder: "ReEnter Password",
    name: "registerReEnterPassword",
    isRequired: true,
  },
  {
    title: "Select Role",
    input: "dropdown",
    icon: <FaIcons.FaVenus className="mid-icon" />,
    placeholder: "Enter Role",
    name: "registerRole",
    isRequired: true,

    options: [
      { value: "admin", label: "Admin" },
      { value: "teacher", label: "Teacher" },
      { value: "student", label: "Student" },
    ],
  },
];

export function getCreateIdInputField() {
  return createIdFieldValue;
}
