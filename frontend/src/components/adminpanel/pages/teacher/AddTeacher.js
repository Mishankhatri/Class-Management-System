import React, { useState } from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import { getTeacherInputValues } from './TeacherInputField';
import InputField from '../../common//InputField/InputField';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

// teacher obtained values
const teacherInitialValue = {
  teacherFirstName: '',
  teacherMiddleName: '',
  teacherLastName: '',
  teacherGender: '',
  teacherDOB: '',
  teacherPhone: '',
  teacherEmail: '',
  teacherLocation: '',
  teacherPhoto: '',
};

function AddTeacher() {
  const addTeacherValues = getTeacherInputValues();

  //For Reseting Select Options while Submitting
  const [selectRef, setSelectRef] = useState(null);

  //Define requirements from useform
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    teacherInitialValue,
  });

  //Reset Value using ref for Select Options
  const refClear = (ref) => setSelectRef(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);

    //CLear Input Field Value
    e.target.reset();
    selectRef.clearValue(); // Clear Select Value
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Teacher'} />
      <div className='main-content'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className='card-section'>
            <div className='heading'>
              <span className='title-icon'>
                <FaIcons.FaUser />
              </span>
              <span className='title'>TEACHER INFO</span>
            </div>

            <div className='content-section'>
              <div className='allinputfield'>
                {addTeacherValues.map((value, index) => {
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
                          refClear={refClear}
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

export default AddTeacher;
