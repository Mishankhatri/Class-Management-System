import React from "react";
import * as FaIcons from "react-icons/fa";

const addClassValue = [
  {
    title: "Class",
    input: "text",
    icon: <FaIcons.FaBook className="mid-icon" />,
    isRequired: true,
    name: "className",
    isCustomField: true,
    placeholder: "Enter Class",
  },
  {
    title: "Class Code",
    input: "text",
    icon: <FaIcons.FaCode className="mid-icon" />,
    isRequired: false,
    name: "classCode",
    isCustomField: true,
    placeholder: "Enter Class Code",
  },
  {
    title: "Description",
    input: "textarea",
    icon: <FaIcons.FaFile className="mid-icon" />,
    isRequired: true,
    name: "classDescription",
    isCustomField: true,
    isTextarea: true,
    placeholder: "Write Class Description",
  },
];

const sectionValue = [
  {
    title: "Section",
    input: "text",
    icon: <FaIcons.FaBook className="mid-icon" />,
    isRequired: true,
    name: "sectionName",
    isCustomField: true,
    isTextarea: false,
    placeholder: "Enter Class Section",
  },
  {
    title: "Section Class",
    input: "dropdown",
    icon: <FaIcons.FaFile className="mid-icon" />,
    isRequired: true,
    name: "sectionClassName",
    isCustomField: true,
    isTextarea: true,
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
];

const subjectsValue = [
  {
    title: "Name",
    input: "text",
    icon: <FaIcons.FaBook className="mid-icon" />,
    isRequired: true,
    name: "subjectsName",
    isCustomField: true,
    placeholder: "Write Subjects Name",
  },
  {
    title: "Subject Code",
    input: "text",
    icon: <FaIcons.FaCode className="mid-icon" />,
    isRequired: true,
    name: "subjectsCode",
    isCustomField: true,
    placeholder: "Subjects Code",
  },
  {
    title: "Class",
    input: "dropdown",
    icon: <FaIcons.FaCode className="mid-icon" />,
    isRequired: true,
    name: "subjectsClassName",
    isCustomField: true,
    isTextarea: false,
    options: [
      { value: "5", label: "5" },
      { value: "6", label: "6" },
      { value: "7", label: "7" },
      { value: "8", label: "8" },
      { value: "9", label: "9" },
      { value: "10", label: "10" },
      { value: "11", label: "11" },
      { value: "12", label: "12" },
    ],
  },
  {
    title: "Section",
    input: "dropdown",
    icon: <FaIcons.FaCode className="mid-icon" />,
    isRequired: false,
    name: "subjectsSection",
    isCustomField: true,
    isTextarea: false,
    options: [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "C", label: "C" },
    ],
  },

  {
    title: "Description",
    input: "textarea",
    icon: <FaIcons.FaFile className="mid-icon" />,
    isRequired: true,
    name: "subjectsDescription",
    isCustomField: true,
    isTextarea: true,
    placeholder: "Write Subject description",
  },
];

export function getCLassValue() {
  return addClassValue;
}

export function getSectionValue() {
  return sectionValue;
}

export function getAddSubjectsValue() {
  return [subjectsValue[0], subjectsValue[1]];
}

//Exporting for Modal
export function getClassSectionMerge() {
  return [addClassValue[0], sectionValue[0]];
}

export function getSubjectModal() {
  return [
    subjectsValue[0],
    subjectsValue[1],
    subjectsValue[2],
    subjectsValue[3],
  ];
}
