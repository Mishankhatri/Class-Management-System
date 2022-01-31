import React from 'react';
import * as FaIcons from 'react-icons/fa';

function SettingsInput() {
  return [
    {
      title: 'Email',
      input: 'email',
      icon: <FaIcons.FaEnvelope className='mid-icon' />,
      placeholder: 'Your Email',
      name: 'settingsEmail',
      isRequired: true,
      values: 'prabeen122@gmail.com',
    },
    {
      title: 'Username',
      input: 'text',
      icon: <FaIcons.FaCode className='mid-icon' />,
      placeholder: 'Your Username',
      name: 'settingsUsername',
      isRequired: true,
      values: 'PrabinGautam',
    },
    {
      title: 'Date of Birth',
      input: 'date',
      icon: <FaIcons.FaCalendar className='mid-icon' />,
      placeholder: 'Your DOB',
      name: 'settingsDOB',
      isRequired: true,
      values: '2020-12-20',
    },
    {
      title: 'Phone',
      input: 'number',
      icon: <FaIcons.FaPhone className='mid-icon' />,
      placeholder: 'Your Phone number',
      name: 'settingsPhone',
      isRequired: true,
      values: '9846915836',
    },
    {
      title: 'Address',
      input: 'text',
      icon: <FaIcons.FaLocationArrow className='mid-icon' />,
      placeholder: 'Your Address',
      name: 'settingsAddress',
      isRequired: true,
      values: 'Lamachaur',
    },
  ];
}

function SettingsPasswordInput() {
  return [
    {
      title: 'Current Password',
      input: 'password',
      icon: <FaIcons.FaCode className='mid-icon' />,
      placeholder: 'Your Password',
      name: 'settingsCurrentPassword',
      isRequired: true,
      values: 'prabeen122@gmail.com',
    },
    {
      title: 'New Password',
      input: 'password',
      icon: <FaIcons.FaCode className='mid-icon' />,
      placeholder: 'New Password',
      name: 'settingsNewPassword',
      isRequired: true,
      values: 'prabeen122@gmail.com',
    },
    {
      title: 'Re-enter Password',
      input: 'password',
      icon: <FaIcons.FaCode className='mid-icon' />,
      placeholder: 'Renter New Password',
      name: 'settingsRePassword',
      isRequired: true,
      values: 'prabeen122@gmail.com',
    },
  ];
}

export { SettingsInput, SettingsPasswordInput };
