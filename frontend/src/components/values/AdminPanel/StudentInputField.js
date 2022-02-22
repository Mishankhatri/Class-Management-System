import React from "react";
import * as FaIcons from "react-icons/fa";

const StudentFieldValue = [
  {
    title: "SRN",
    input: "text",
    icon: <FaIcons.FaCode className="mid-icon" />,
    placeholder: "SRN Number",
    name: "studentSRN",
    isRequired: true,
  },
  {
    title: "First Name",
    input: "text",
    icon: <FaIcons.FaUser className="mid-icon" />,
    placeholder: "First Name",
    name: "studentFirstName",
    isRequired: true,
  },
  {
    title: "Middle Name",
    input: "text",
    icon: <FaIcons.FaUser className="mid-icon" />,
    placeholder: "Middle Name",
    name: "studentMiddleName",
    isRequired: false,
  },
  {
    title: "Last Name",
    input: "text",
    icon: <FaIcons.FaUser className="mid-icon" />,
    placeholder: "Last Name",
    name: "studentLastName",
    isRequired: true,
  },
  {
    title: "Gender",
    input: "dropdown",
    icon: <FaIcons.FaVenus className="mid-icon" />,
    placeholder: "Gender",
    name: "studentGender",
    isRequired: false,

    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    title: "Date Of Birth",
    input: "date",
    icon: <FaIcons.FaCalendar className="mid-icon" />,
    isRequired: true,
    name: "studentDOB",
  },
  {
    title: "Phone",
    input: "number",
    icon: <FaIcons.FaPhone className="mid-icon" />,
    placeholder: "98********",
    isRequired: true,
    name: "studentPhone",
  },
  {
    title: "Address",
    input: "text",
    icon: <FaIcons.FaLocationArrow className="mid-icon" />,
    placeholder: "Enter Location",
    isRequired: true,
    name: "studentLocation",
  },
];

const ParentInfoField = [
  {
    title: "Father Name",
    input: "text",
    icon: <FaIcons.FaUser className="mid-icon" />,
    placeholder: "Father Name",
    isRequired: true,
    name: "studentFatherName",
  },
  {
    title: "Mother Name",
    input: "text",
    icon: <FaIcons.FaUser className="mid-icon" />,
    placeholder: "Mother Name",
    isRequired: true,
    name: "studentMotherName",
  },
  {
    title: "Address",
    input: "text",
    icon: <FaIcons.FaLocationArrow className="mid-icon" />,
    placeholder: "Enter Location",
    isRequired: true,
    name: "parentAddress",
  },
  {
    title: "State",
    input: "dropdown",
    icon: <FaIcons.FaLocationArrow className="mid-icon" />,
    options: [
      { value: "Province 1", label: "Province 1" },
      { value: "Province 2", label: "Province 2" },
      { value: "Bagmati", label: "Bagmati" },
      { value: "Gandaki", label: "Gandaki" },
      { value: "Lumbini", label: "Lumbini" },
      { value: "Karnali", label: "Karnali" },
      { value: "Sudurpashchim", label: "Sudurpashchim" },
    ],
    isRequired: true,
    name: "parentState",
  },
  {
    title: "Contact No",
    input: "number",
    icon: <FaIcons.FaPhone className="mid-icon" />,
    placeholder: "98********",
    isRequired: true,
    name: "parentContact",
  },
  {
    title: "Alternate Contact",
    input: "number",
    icon: <FaIcons.FaPhone className="mid-icon" />,
    placeholder: "98********",
    isRequired: false,
    name: "parentAdditionalContact",
  },
  // {
  //   title: 'NATIONALITY',
  //   input: 'dropdown',
  //   icon: <FaIcons.FaFlag className='mid-icon' />,
  //   options: [
  //     { value: 'Nepali', label: 'Nepalese' },
  //     { value: 'Afghan', label: 'Afghan' },
  //     { value: 'Bangladeshi', label: 'Bangladeshi' },
  //     { value: 'Indian', label: 'Indian' },
  //     { value: 'Pakistani', label: 'Pakistani' },
  //     { value: 'Sri Lankan', label: 'Sri Lankan' },
  //     { value: 'others', label: 'Others' },
  //   ],
  // },

  {
    title: "Email",
    input: "email",
    icon: <FaIcons.FaEnvelope className="mid-icon" />,
    placeholder: "example@domain.com",
    isRequired: false,
    name: "parentEmail",
  },
];

const AcademicInfoField = [
  {
    title: "Class",
    input: "dropdown",
    icon: <FaIcons.FaPhotoVideo className="mid-icon" />,
    // isRequired: true,
    name: "studentClass",
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
    icon: <FaIcons.FaPhotoVideo className="mid-icon" />,
    // isRequired: true,
    name: "studentSection",
    options: [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "C", label: "C" },
    ],
  },
  {
    title: "Roll No",
    input: "text",
    icon: <FaIcons.FaPhotoVideo className="mid-icon" />,
    // isRequired: true,
    name: "studentRoll",
    placeholder: "Enter Roll No",
  },
];

export function getStudentInputValues() {
  return StudentFieldValue;
}

export function getParentInfoValues() {
  return ParentInfoField;
}

export function getAcademicValues() {
  return AcademicInfoField;
}
