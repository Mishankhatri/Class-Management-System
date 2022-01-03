import React from 'react';
import * as FaIcons from 'react-icons/fa';

const StudentFieldValue = [
  {
    title: 'FIRST NAME',
    input: 'text',
    icon: <FaIcons.FaUser className='mid-icon' />,
    placeholder: 'First Name',
    name: 'FirstName',
    isRequired: true,
  },
  {
    title: 'MIDDLE NAME',
    input: 'text',
    icon: <FaIcons.FaUser className='mid-icon' />,
    placeholder: 'Middle Name',
    name: 'MiddleName',
    isRequired: false,
  },
  {
    title: 'LAST NAME',
    input: 'text',
    icon: <FaIcons.FaUser className='mid-icon' />,
    placeholder: 'Last Name',
    name: 'LastName',
    isRequired: true,
  },
  {
    title: 'GENDER',
    input: 'dropdown',
    icon: <FaIcons.FaVenus className='mid-icon' />,
    placeholder: 'Gender',
    name: 'Gender',
    isRequired: true,

    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    title: 'DATE OF BIRTH',
    input: 'date',
    icon: <FaIcons.FaCalendar className='mid-icon' />,
    isRequired: true,
    name: 'Date',
  },
  {
    title: 'PHONE',
    input: 'text',
    icon: <FaIcons.FaPhone className='mid-icon' />,
    placeholder: '98********',
    isRequired: true,
    name: 'Phone',
  },
  {
    title: 'EMAIL',
    input: 'email',
    icon: <FaIcons.FaEnvelope className='mid-icon' />,
    placeholder: 'example@example.com',
    isRequired: true,
    name: 'Email',
  },
  {
    title: 'LOCATION',
    input: 'text',
    icon: <FaIcons.FaLocationArrow className='mid-icon' />,
    placeholder: 'Enter Location',
    isRequired: true,
    name: 'Location',
  },
  {
    title: 'UPLOAD PHOTO',
    input: 'file',
    icon: <FaIcons.FaPhotoVideo className='mid-icon' />,
    isRequired: true,
    name: 'Photo',
  },
];

const ParentInfoField = [
  {
    title: 'FATHER NAME',
    input: 'text',
    icon: <FaIcons.FaUser className='mid-icon' />,
    placeholder: 'Father Name',
    isRequired: true,
    name: 'FatherName',
  },
  {
    title: 'MOTHER NAME',
    input: 'text',
    icon: <FaIcons.FaUser className='mid-icon' />,
    placeholder: 'Mother Name',
    isRequired: true,
    name: 'MotherName',
  },
  {
    title: 'ADDRESS',
    input: 'text',
    icon: <FaIcons.FaLocationArrow className='mid-icon' />,
    placeholder: 'Enter Location',
    isRequired: true,
    name: 'Address',
  },
  {
    title: 'STATE',
    input: 'dropdown',
    icon: <FaIcons.FaLocationArrow className='mid-icon' />,
    options: [
      { value: 'Province 1', label: 'Province 1' },
      { value: 'Province 2', label: 'Province 2' },
      { value: 'Bagmati', label: 'Bagmati' },
      { value: 'Gandaki', label: 'Gandaki' },
      { value: 'Lumbini', label: 'Lumbini' },
      { value: 'Karnali', label: 'Karnali' },
      { value: 'Sudurpashchim', label: 'Sudurpashchim' },
    ],
    isRequired: true,
    name: 'State',
  },
  {
    title: 'CONTACT NO',
    input: 'text',
    icon: <FaIcons.FaPhone className='mid-icon' />,
    placeholder: '98********',
    isRequired: true,
    name: 'Contact',
  },
  {
    title: 'ALTERNATE CONTACT',
    input: 'text',
    icon: <FaIcons.FaPhone className='mid-icon' />,
    placeholder: '98********',
    isRequired: false,
    name: 'AdditionalContact',
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
    title: 'EMAIL',
    input: 'email',
    icon: <FaIcons.FaEnvelope className='mid-icon' />,
    placeholder: 'example@domain.com',
    isRequired: false,
    name: 'Email',
  },

  {
    title: 'UPLOAD PHOTO',
    input: 'file',
    icon: <FaIcons.FaPhotoVideo className='mid-icon' />,
    isRequired: false,
    name: 'File',
  },
];

export function getStudentInputValues() {
  return StudentFieldValue;
}

export function getParentInfoValues() {
  return ParentInfoField;
}
