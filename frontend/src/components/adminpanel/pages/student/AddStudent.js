import React, { useState, useEffect } from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import InputField from '../../common/InputField';
import {
  getParentInfoValues,
  getStudentInputValues,
} from './StudentInputField';

function AddStudent() {
  const addStudentValues = getStudentInputValues();
  const addParentValues = getParentInfoValues();

  // student obtained values
  const studentInitialValue = {
    studentFirstName: '',
    studentMiddleName: '',
    studentLastName: '',
    studentGender: '',
    studentDate: '',
    studentPhone: '',
    studentEmail: '',
    studentLocation: '',
    studentPhoto: '',
  };

  //teachers obtains value
  const ParentInitialValue = {
    parentFatherName: '',
    parentMotherName: '',
    parentAddress: '',
    parentState: '',
    parentContact: '',
    parentAdditionalContact: '',
    parentEmail: '',
    parentPhoto: '',
  };

  //To see and set parents value as obtained from input
  const [formStudentValues, setFormStudentValues] =
    useState(studentInitialValue);

  //To see and set parents value as obtained from input
  const [formParentValues, setFormParentValues] = useState(ParentInitialValue);

  //Merge Final Values
  const [finalValues, setFinalValus] = useState();

  //To check is Submit or not
  const [isSubmit, setIsSubmit] = useState(false);

  //Student Input Handling function
  const inputStudentEventHandler = (event) => {
    const { name, value } = event.target;
    setFormStudentValues({ ...formStudentValues, [name]: value });
  };

  //Parent Input Handling function
  const inputParentEventHandler = (event) => {
    const { name, value } = event.target;
    setFormParentValues({ ...formParentValues, [name]: value });
  };

  //On submit handler
  const submitHandler = function (event) {
    event.preventDefault();
    setIsSubmit(true);
    setFinalValus({ ...setFormStudentValues, ...setFormParentValues });
  };

  //To fetch add data properly ()
  useEffect(() => {
    if (isSubmit) {
      console.log(formStudentValues);
      console.log(formParentValues);
    }
  });

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Student'} />
      <div className='main-content'>
        <form onSubmit={submitHandler}>
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
                    <InputField
                      classes={'mid-content'}
                      title={value.title}
                      input={value.input}
                      icon={value.icon}
                      placeholder={value?.placeholder}
                      name={'student' + value.name}
                      options={value?.options}
                      key={index}
                      onChangeHandler={inputStudentEventHandler}
                      isRequired={value.isRequired}
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
                    <InputField
                      classes={'mid-content'}
                      title={value.title}
                      input={value.input}
                      icon={value.icon}
                      placeholder={value?.placeholder}
                      options={value?.options}
                      key={index}
                      onChangeHandler={inputParentEventHandler}
                      isRequired={value.isRequired}
                      name={'parent' + value.name}
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
