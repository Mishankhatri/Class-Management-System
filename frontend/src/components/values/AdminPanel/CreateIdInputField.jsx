import React from "react";
import * as FaIcons from "react-icons/fa";

const createIdFieldValue = [
  {
    title: "Email",
    input: "email",
    icon: <FaIcons.FaEnvelope className="mid-icon" />,
    placeholder: "Enter Email",
    name: "email",
    isRequired: true,
  },
  {
    title: "Username",
    input: "text",
    icon: <FaIcons.FaUser className="mid-icon" />,
    placeholder: "Enter Username",
    name: "username",
    isRequired: true,
  },
  {
    title: "Password",
    input: "password",
    icon: <FaIcons.FaCode className="mid-icon" />,
    placeholder: "*****************",
    name: "password",
    isRequired: true,
  },

  {
    title: "Confirm Password",
    input: "password",
    icon: <FaIcons.FaCode className="mid-icon" />,
    placeholder: "Confirm Password",
    name: "confirmPassword",
    isRequired: true,
  },
];

export function getCreateIdInputField() {
  return createIdFieldValue;
}
