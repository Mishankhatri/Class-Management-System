import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { getAcademicValues } from '../../../values/AdminPanel/StudentInputField';
import CustomController from './../../../common/Controller';

import {
  attendanceValue,
  attendanceDetail,
} from '../../../values/AdminPanel/AttendanceInput';
import AttendanceTableData from './AttendanceTableData';

function Attendance() {
  const addAcademicValues = getAcademicValues(); //For Selection Option

  //Define requirements from useform
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //Getting options for academic info
  const optionsClass = addAcademicValues[0].options;
  const optionsSection = addAcademicValues[1].options;

  const onSubmitForm = (data, e) => {
    console.log(data);

    //CLear Input Field Value
    e.target.reset();
  };
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
