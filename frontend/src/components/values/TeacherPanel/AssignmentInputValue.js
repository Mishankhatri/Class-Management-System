import React from "react";

function AssignmentInputValue() {
  return [
    {
      title: "First Name",
      input: "text",
      icon: <FaIcons.FaUser className="mid-icon" />,
      placeholder: "First Name",
      name: "studentFirstName",
      isRequired: true,
    },
  ];
}
