import React from "react";
import * as FaIcons from "react-icons/fa";

function SettingsInput() {
  return [
    {
      title: "Email",
      input: "email",
      icon: <FaIcons.FaEnvelope className="mid-icon" />,
      placeholder: "Your Email",
      name: "settingsEmail",
      isRequired: true,
    },
    {
      title: "Username",
      input: "text",
      icon: <FaIcons.FaCode className="mid-icon" />,
      placeholder: "Your Username",
      name: "settingsUsername",
      isRequired: true,
    },
  ];
}

function SettingsPasswordInput() {
  return [
    {
      title: "Current Password",
      input: "password",
      icon: <FaIcons.FaCode className="mid-icon" />,
      placeholder: "Your Password",
      name: "settingsCurrentPassword",
      isRequired: true,
      values: "prabeen122@gmail.com",
    },
    {
      title: "New Password",
      input: "password",
      icon: <FaIcons.FaCode className="mid-icon" />,
      placeholder: "New Password",
      name: "settingsNewPassword",
      isRequired: true,
      values: "prabeen122@gmail.com",
    },
    {
      title: "Re-enter Password",
      input: "password",
      icon: <FaIcons.FaCode className="mid-icon" />,
      placeholder: "Renter New Password",
      name: "settingsRePassword",
      isRequired: true,
      values: "prabeen122@gmail.com",
    },
  ];
}

export { SettingsInput, SettingsPasswordInput };
