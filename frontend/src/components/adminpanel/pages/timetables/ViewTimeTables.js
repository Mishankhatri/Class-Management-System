import React, { useState } from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import InputField from '../../common//InputField/InputField';

import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { timeTable_value } from '../../../values/AdminPanel/TimetableValues';
import { getAcademicValues } from '../../../values/AdminPanel/StudentInputField';

function ViewTimetables() {
  const addAcademicValues = getAcademicValues();

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
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Timetables'} />
      <div className='main-content'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className='card-section'>
            <div className='heading'>
              <span className='title-icon'>
                <FaIcons.FaBook />
              </span>
              <span className='title'>MAKE SELECTION</span>
            </div>
            <div className='content-section'>
              <div className='custom-selection'>
                <Controller
                  name={'studentSelectionClass'}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: `Student Class is required`,
                    },
                  }}
                  defaultValue=''
                  render={({ field }) => (
                    <InputField
                      title={'Class'.toUpperCase()}
                      input={'dropdown'}
                      icon={<FaIcons.FaPhotoVideo className='mid-icon' />}
                      name={'studentClass'}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                      options={optionsClass}
                      errors={errors}
                      // refClear={refClearAcademicFirst}
                      ErrorMessage={ErrorMessage}
                    />
                  )}
                />
                <Controller
                  name={'studentSelectionSection'}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: `Student Section is required`,
                    },
                  }}
                  defaultValue=''
                  render={({ field }) => (
                    <InputField
                      title={'Student Section'.toUpperCase()}
                      input={'dropdown'}
                      icon={<FaIcons.FaPhotoVideo className='mid-icon' />}
                      name={'studentClass'}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                      options={optionsClass}
                      errors={errors}
                      // refClear={refClearAcademicFirst}
                      ErrorMessage={ErrorMessage}
                    />
                  )}
                />
              </div>
              <button
                className='morebutton btn btn-custom-selection'
                type='submit'>
                <span>Select</span>
              </button>
            </div>
          </div>
        </form>
        <div className='card-section'>
          <div className='heading'>
            <span className='title-icon'>
              <FaIcons.FaSlidersH />
            </span>
            <span className='title'>All Slots</span>
          </div>
          <div className='content-section'>
            <table className='table-striped'>
              <thead>
                <tr>
                  <th>Timings</th>
                  <th>Sunday</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thurday</th>
                  <th>Friday</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {timeTable_value.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.day}</td>
                      <td>{value.time}</td>
                      <td>{value.classes}</td>
                      <td>{value.section}</td>
                      <td>{value.subject}</td>
                      <td>{value.teacher}</td>

                      <td>
                        <div>Lecture: BIO</div>
                        <div>Room: 302</div>
                        <div>Teacher: John</div>
                      </td>

                      <td>
                        <button className='btn-custom btn-primary btn-1'>
                          Edit
                        </button>
                        <button className='btn-custom btn-danger'>
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTimetables;
