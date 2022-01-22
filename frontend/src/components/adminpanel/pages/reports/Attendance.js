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
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <CustomController
            title={'MAKE SELECTION'}
            icon={<FaIcons.FaUser />}
            ValueArray={attendanceValue}
            // refClear={refClearStudent}
            control={control}
            Controller={Controller}
            errors={errors}
            ErrorMessage={ErrorMessage}
            isCustom={true}
          />
          <button className='morebutton btn'>Select</button>
        </form>
        <div className='card-section'>
          <div className='heading'>
            <span className='title-icon'>
              <FaIcons.FaSearch />
            </span>
            <span className='title'>Attendance List</span> {/*Custom  */}
          </div>
          <div className='content-section'>
            <table className='table-striped'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Rollno</th>
                  <th>Class</th>
                  <th>Attendance</th>
                  <th>Total Absent</th>
                  <th>Total Present</th>
                </tr>
              </thead>
              <tbody>
                {attendanceDetail.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.name}</td>
                      <td>{value.roll}</td>
                      <td>{value.class}</td>
                      <td>{value.attendance}</td>
                      <td>{value.totalAbsent}</td>
                      <td>{value.totalPresent}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Attendance;
