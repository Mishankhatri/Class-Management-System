import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import '../users/UserProfile.css';
import { Controller, useForm } from 'react-hook-form';
import InputField from './../../common/InputField/InputField';
import { ErrorMessage } from '@hookform/error-message';

import {
  getAcademicValues,
  getStudentInputValues,
  getParentInfoValues,
} from './../../../values/AdminPanel/StudentInputField';

function ViewStudent() {
  const { handleSubmit, setValue, control, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <div className='modal'>
        <div className='model-section'>
          {/* Add class visible to above element to see modal  */}
          <div className='modal-content'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <span className='close'>&times;</span>
              <div className='content'>
                <h2>Update Student Info</h2>
                <h3>Students Info</h3>
                <div className='content-section modal-inputfield'>
                  {getStudentInputValues().map((value, index) => {
                    return (
                      <Controller
                        name={value.name}
                        control={control}
                        key={index}
                        rules={{
                          required: {
                            value: value.isRequired,
                            message: `${value.title} is required`,
                          },
                        }}
                        defaultValue=''
                        render={({ field }) => (
                          <InputField
                            title={value.title.toUpperCase()}
                            input={value.input}
                            icon={value.icon}
                            placeholder={value?.placeholder}
                            name={value.name}
                            onChangeHandler={field.onChange}
                            isCustomInput={value.isCustomField}
                            isTextArea={value?.isTextarea}
                            isRequired={value.isRequired}
                            isImageFile={value?.isImageFile}
                            options={value?.options}
                            errors={errors}
                            ErrorMessage={ErrorMessage}
                          />
                        )}
                      />
                    );
                  })}
                </div>

                <h3>Parents Info</h3>
                <div className='content-section modal-inputfield'>
                  {getStudentInputValues().map((value, index) => {
                    return (
                      <Controller
                        name={value.name}
                        control={control}
                        key={index}
                        rules={{
                          required: {
                            value: value.isRequired,
                            message: `${value.title} is required`,
                          },
                        }}
                        defaultValue=''
                        render={({ field }) => (
                          <InputField
                            title={value.title.toUpperCase()}
                            input={value.input}
                            icon={value.icon}
                            placeholder={value?.placeholder}
                            name={value.name}
                            onChangeHandler={field.onChange}
                            isCustomInput={value.isCustomField}
                            isTextArea={value?.isTextarea}
                            isRequired={value.isRequired}
                            isImageFile={value?.isImageFile}
                            options={value?.options}
                            errors={errors}
                            ErrorMessage={ErrorMessage}
                          />
                        )}
                      />
                    );
                  })}
                </div>

                <h3>Academic Info</h3>
                <div className='content-section modal-inputfield'>
                  {getAcademicValues().map((value, index) => {
                    return (
                      <Controller
                        name={value.name}
                        control={control}
                        key={index}
                        rules={{
                          required: {
                            value: value.isRequired,
                            message: `${value.title} is required`,
                          },
                        }}
                        defaultValue=''
                        render={({ field }) => (
                          <InputField
                            title={value.title.toUpperCase()}
                            input={value.input}
                            icon={value.icon}
                            placeholder={value?.placeholder}
                            name={value.name}
                            onChangeHandler={field.onChange}
                            isCustomInput={value.isCustomField}
                            isTextArea={value?.isTextarea}
                            isRequired={value.isRequired}
                            isImageFile={value?.isImageFile}
                            options={value?.options}
                            errors={errors}
                            ErrorMessage={ErrorMessage}
                          />
                        )}
                      />
                    );
                  })}
                </div>
                <button
                  className='btn-submit'
                  style={{ marginLeft: '40px', marginTop: '20px' }}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Student'} />
    </div>
  );
}

export default ViewStudent;
