import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import InputField from './../../common//InputField/InputField';
import { getAddSubjectsValue } from './../class/ClassValue';

function AddSubjects() {
  const subjectsValue = getAddSubjectsValue();

  const addSubjectsInitialValue = {
    subjectsName: '',
    subjectsCode: '',
    subjectsClassName: '',
    subjectsTeacherName: '',
    subjectsDescription: '',
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Subjects'} />
      <div className='main-content'>
        <div className='card-section custom-width'>
          <div className='heading'>
            <span className='title-icon'>
              <FaIcons.FaUser />
            </span>
            <span className='title'>ADD SECTION</span>
          </div>

          <div className='content-section custom-content'>
            {subjectsValue.map((value, index) => {
              return (
                <InputField
                  title={value.title}
                  input={value.input}
                  icon={value.icon}
                  placeholder={value?.placeholder}
                  name={value.name}
                  options={value?.options}
                  key={index}
                  // onChangeHandler={inputTeacherEventHandler}
                  isRequired={value.isRequired}
                  isCustomInput={value.isCustomField}
                  isTextArea={value?.isTextarea}
                />
              );
            })}
          </div>
          <button className='morebutton btn'>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default AddSubjects;
