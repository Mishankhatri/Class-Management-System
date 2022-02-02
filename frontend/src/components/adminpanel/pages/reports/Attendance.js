import React from 'react';
import InnerHeader from './../../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

import { useForm, Controller } from 'react-hook-form';
import { getAcademicValues } from '../../../values/AdminPanel/StudentInputField';

import AttendanceTableData from './AttendanceTableData';

function Attendance() {
  return (
    <>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Attendance'} />
      <div className='main-content'>
        <AttendanceTableData />
      </div>
    </>
  );
}

export default Attendance;
