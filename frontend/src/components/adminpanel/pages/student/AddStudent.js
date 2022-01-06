import React, { useState, useEffect } from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import InputField from '../../common//InputField/InputField';
import {
  getParentInfoValues,
  getStudentInputValues,
  getAcademicValues,
} from './StudentInputField';

import { useForm, Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

// student obtained values
const studentInitialValue = {
  //Student Info
  studentFirstName: '',
  studentMiddleName: '',
  studentLastName: '',
  studentGender: '',
  studentDOB: '',
  studentPhone: '',
  studentEmail: '',
  studentLocation: '',
  studentPhoto: '',

  //Parent Info
  studentFatherName: '',
  studentMotherName: '',
  parentAddress: '',
  parentState: '',
  parentContact: '',
  parentAdditionalContact: '',
  parentEmail: '',
  parentPhoto: '',

  //Academic Info
  studentClass: '',
  studentSection: '',
  studentRoll: '',
};

function AddStudent() {
  const addStudentValues = getStudentInputValues();
  const addParentValues = getParentInfoValues();
  const addAcademicValues = getAcademicValues();

  //For Reseting Select Options while Submitting
  const [selectRefStudent, setSelectRefStudent] = useState(null);
  const [selectRefParent, setSelectRefParent] = useState(null);
  const [selectRefAcademic, setSelectRefAcademic] = useState(null);

  //Define requirements from useform
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    studentInitialValue,
  });

  //Reset Value using ref for Select Options
  const refClearStudent = (ref) => setSelectRefStudent(ref);
  const refClearParent = (ref) => setSelectRefParent(ref);
  const refClearAcademic = (ref) => setSelectRefAcademic(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);

    //CLear Input Field Value
    e.target.reset();
    selectRefStudent.clearValue();
    selectRefParent.clearValue();
    selectRefAcademic.clearValue();
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Student'} />
      <div className='main-content'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          {/* Student Info  */}
          <div className='card-section'>
            <div className='heading'>
              <span className='title-icon'>
                <FaIcons.FaUser />
              </span>
              <span className='title'>STUDENT INFO</span>
            </div>
            <div className='content-section'>
              <div className='allinputfield'>
                {addStudentValues.map((value, index) => {
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
                          options={value?.options}
                          errors={errors}
                          refClear={refClearStudent}
                          ErrorMessage={ErrorMessage}
                        />
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Parent Info  */}
          <div className='card-section'>
            <div className='heading'>
              <span className='title-icon'>
                <FaIcons.FaUser />
              </span>
              <span className='title'>PARENT INFO</span>
            </div>
            <div className='content-section'>
              <div className='allinputfield'>
                {addParentValues.map((value, index) => {
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
                          options={value?.options}
                          errors={errors}
                          refClear={refClearParent}
                          ErrorMessage={ErrorMessage}
                        />
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {/* Parent Info  */}
          <div className='card-section'>
            <div className='heading'>
              <span className='title-icon'>
                <FaIcons.FaBook />
              </span>
              <span className='title'>ACADEMIC INFO</span>
            </div>
            <div className='content-section'>
              <div className='allinputfield'>
                {addAcademicValues.map((value, index) => {
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
                          options={value?.options}
                          errors={errors}
                          refClear={refClearAcademic}
                          ErrorMessage={ErrorMessage}
                        />
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <button className='morebutton btn' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
