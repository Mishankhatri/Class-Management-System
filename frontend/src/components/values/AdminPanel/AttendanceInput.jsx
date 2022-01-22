import * as FaIcons from 'react-icons/fa';

const attendanceValue = [
  {
    title: 'Class',
    input: 'dropdown',
    icon: <FaIcons.FaBook className='mid-icon' />,
    isRequired: true,
    name: 'classSelectionName',
    isCustomField: true,
    placeholder: 'Choose Class',
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
    title: 'Section',
    input: 'dropdown',
    icon: <FaIcons.FaBook className='mid-icon' />,
    isRequired: true,
    name: 'sectionSelectionName',
    isCustomField: true,
    placeholder: 'Choose Section',
    options: [
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
      { value: 'C', label: 'C' },
    ],
  },
  {
    title: 'Date',
    input: 'date',
    icon: <FaIcons.FaBook className='mid-icon' />,
    isRequired: true,
    name: 'dateSelectionName',
    isCustomField: true,
    placeholder: 'Choose Date',
  },
];

const attendanceDetail = [
  {
    name: 'Prabin Gautam',
    roll: '29',
    class: '12 A',
    attendance: 'Present',
    totalAbsent: '20',
    totalPresent: '46',
  },
  {
    name: 'Prabin Gautam',
    roll: '29',
    class: '12 A',
    attendance: 'Present',
    totalAbsent: '20',
    totalPresent: '46',
  },
  {
    name: 'Prabin Gautam',
    roll: '29',
    class: '12 A',
    attendance: 'Present',
    totalAbsent: '20',
    totalPresent: '46',
  },
  {
    name: 'Prabin Gautam',
    roll: '29',
    class: '12 A',
    attendance: 'Present',
    totalAbsent: '20',
    totalPresent: '46',
  },
  {
    name: 'Prabin Gautam',
    roll: '29',
    class: '12 A',
    attendance: 'Present',
    totalAbsent: '20',
    totalPresent: '46',
  },
];

export { attendanceValue, attendanceDetail };
