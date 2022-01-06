import React from 'react';
import * as FaIcons from 'react-icons/fa';

const addClassValue = [
  {
    title: 'CLASS',
    input: 'text',
    icon: <FaIcons.FaBook className='mid-icon' />,
    isRequired: true,
    name: 'className',
    isCustomField: true,
    placeholder: 'Enter Class',
  },
  {
    title: 'CLASS CODE',
    input: 'text',
    icon: <FaIcons.FaCode className='mid-icon' />,
    isRequired: false,
    name: 'classCode',
    isCustomField: true,
    placeholder: 'Enter Class Code',
  },
  {
    title: 'DESCRIPTION',
    input: 'textarea',
    icon: <FaIcons.FaFile className='mid-icon' />,
    isRequired: true,
    name: 'classDescription',
    isCustomField: true,
    isTextarea: true,
    placeholder: 'Write Class Description',
  },
];

const sectionValue = [
  {
    title: 'SECTION',
    input: 'text',
    icon: <FaIcons.FaBook className='mid-icon' />,
    isRequired: true,
    name: 'sectionName',
    isCustomField: true,
    isTextarea: false,
    placeholder: 'Enter Class Section',
  },
  {
    title: 'SECTION CLASS',
    input: 'dropdown',
    icon: <FaIcons.FaFile className='mid-icon' />,
    isRequired: true,
    name: 'sectionClassName',
    isCustomField: true,
    isTextarea: true,
    options: [
      { value: '12', label: '12' },
      { value: '11', label: '11' },
      { value: '10', label: '10' },
      { value: '9', label: '9' },
      { value: '8', label: '8' },
      { value: '7', label: '7' },
      { value: '6', label: '6' },
      { value: '5', label: '5' },
    ],
  },
  {
    title: 'SECTION CODE',
    input: 'text',
    icon: <FaIcons.FaCode className='mid-icon' />,
    isRequired: false,
    name: 'sectionCode',
    isCustomField: true,
    isTextarea: false,
    placeholder: 'Enter Section Code',
  },
  {
    title: 'DESCRIPTION',
    input: 'textarea',
    icon: <FaIcons.FaFile className='mid-icon' />,
    isRequired: true,
    name: 'sectionDescription',
    isCustomField: true,
    isTextarea: true,
    placeholder: 'Write Section description',
  },
];

const subjectsValue = [
  {
    title: 'NAME',
    input: 'text',
    icon: <FaIcons.FaBook className='mid-icon' />,
    isRequired: true,
    name: 'subjectsName',
    isCustomField: true,
    placeholder: 'Write Subjects Name',
  },
  {
    title: 'SUBJECT CODE',
    input: 'text',
    icon: <FaIcons.FaCode className='mid-icon' />,
    isRequired: true,
    name: 'subjectsCode',
    isCustomField: true,
    placeholder: 'Subjects Code',
  },
  {
    title: 'CLASS',
    input: 'dropdown',
    icon: <FaIcons.FaCode className='mid-icon' />,
    isRequired: true,
    name: 'subjectsClassName',
    isCustomField: true,
    isTextarea: false,
    options: [
      { value: '5', label: '5' },
      { value: '6', label: '6' },
      { value: '7', label: '7' },
      { value: '8', label: '8' },
      { value: '9', label: '9' },
      { value: '10', label: '10' },
      { value: '11', label: '11' },
      { value: '12', label: '12' },
    ],
  },
  {
    title: 'TEACHER',
    input: 'dropdown',
    icon: <FaIcons.FaCode className='mid-icon' />,
    isRequired: true,
    name: 'subjectsTeacherName',
    isCustomField: true,
    isTextarea: false,
    options: [
      { value: 'Kushal Pangeni', label: 'Kushal Pangeni' },
      { value: 'Mishan Khatri', label: 'Mishan Khatri' },
      { value: 'Paras Panta', label: 'Paras Panta' },
      { value: 'Prabin Gautam', label: 'Prabin Gautam' },
    ],
  },
  {
    title: 'DESCRIPTION',
    input: 'textarea',
    icon: <FaIcons.FaFile className='mid-icon' />,
    isRequired: true,
    name: 'subjectsDescription',
    isCustomField: true,
    isTextarea: true,
    placeholder: 'Write Section description',
  },
];

export function getCLassValue() {
  return addClassValue;
}

export function getSectionValue() {
  return sectionValue;
}

export function getAddSubjectsValue() {
  return subjectsValue;
}
