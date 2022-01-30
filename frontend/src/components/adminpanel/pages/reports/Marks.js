import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

import InputField from '../../common//InputField/InputField';

import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { timeTable_value } from '../../../values/AdminPanel/TimetableValues';
import { getAcademicValues } from '../../../values/AdminPanel/StudentInputField';
import { HeaderInputField } from '../../common/InputField/HeaderInputField';

function Marks() {
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
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Upload Marks'} />
      <div className='main-content'>
        {/* // custom-grid */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className='card-section '>
            <div className='heading'>
              <span className='title-icon'>
                <FaIcons.FaBook />
              </span>
              <span className='title'>MAKE SELECTION</span>
            </div>
            <div className='content-section allinputfield'>
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
                    options={optionsSection}
                    errors={errors}
                    // refClear={refClearAcademicFirst}
                    ErrorMessage={ErrorMessage}
                  />
                )}
              />
              <Controller
                name={'studentName'}
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
                    title={'Student Name'.toUpperCase()}
                    input={'text'}
                    icon={<FaIcons.FaPhotoVideo className='mid-icon' />}
                    name={'studentClass'}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    options={optionsSection}
                    errors={errors}
                    // refClear={refClearAcademicFirst}
                    ErrorMessage={ErrorMessage}
                  />
                )}
              />
              <Controller
                name={'studentResult'}
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
                    title={'Results'.toUpperCase()}
                    input={'dropdown'}
                    icon={<FaIcons.FaList className='mid-icon' />}
                    name={'studentResults'}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    options={[
                      { value: 'Passed', label: 'Passed' },
                      { value: 'Failed', label: 'Failed' },
                    ]}
                    errors={errors}
                    // refClear={refClearAcademicFirst}
                    ErrorMessage={ErrorMessage}
                  />
                )}
              />
            </div>
          </div>
          <button className='morebutton btn' type='submit'>
            Select
          </button>
        </form>

        <div className='card-section'>
          <div className='heading'>
            <span className='title-icon'>
              <FaIcons.FaBook />
            </span>
            <span className='title'>View Marks</span>
          </div>
          <div className='content-section'>
            <table className='table-striped'>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Secction</th>
                  <th>Name</th>
                  <th>Results</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6].map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>12</td>
                      <td>A</td>
                      <td>Prabin Gautam</td>
                      <td>Passed</td>

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

export default Marks;
