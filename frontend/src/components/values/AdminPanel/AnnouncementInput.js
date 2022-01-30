import * as FaIcons from 'react-icons/fa';

const announcementValue = [
  {
    title: 'Type',
    input: 'dropdown',
    icon: <FaIcons.FaCogs className='mid-icon' />,
    isRequired: true,
    name: 'announcementTypeName',
    isCustomField: true,
    placeholder: 'Select Topic',
    options: [
      { value: 'Academic', label: 'Academic' },
      { value: 'Admistration', label: 'Admistration' },
      { value: 'Admission', label: 'Admission' },
      { value: 'Others', label: 'Others' },
    ],
  },
  {
    title: 'For',
    input: 'dropdown',
    icon: <FaIcons.FaUser className='mid-icon' />,
    isRequired: true,
    name: 'announcementFor',
    isCustomField: true,
    placeholder: 'Choose Options',
    options: [
      { value: 'All', label: 'All' },
      { value: 'Teacher', label: 'Teacher' },
      { value: 'Student', label: 'Student' },
    ],
  },
];

export { announcementValue };
