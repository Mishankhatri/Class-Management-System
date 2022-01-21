import React, { useState } from 'react';
import InnerHeader from '../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

import { useForm, Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { getCreateIdInputField } from './CreateIdInputField';
import CustomController from './../../common/Controller';

// // teacher obtained values For references
// const createIdInitialValue = {
//   teacherFirstName: '',
//   teacherMiddleName: '',
//   teacherLastName: '',
//   teacherGender: '',
//   teacherDOB: '',
//   teacherPhone: '',
//   teacherEmail: '',
//   teacherLocation: '',
//   teacherPhoto: '',
// };

function CreateID() {
  //For Reseting Select Options while Submitting
  const [selectRef, setSelectRef] = useState(null);

  //Define requirements from useform
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
      <InnerHeader icon={<MdIcons.MdDashboard />} name={'Create ID'} />
      <div className='main-content'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <CustomController
            title={'CREATE USER LOGIN ID'}
            icon={<FaIcons.FaUser />}
            ValueArray={getCreateIdInputField()}
            refClear={refClear}
            control={control}
            Controller={Controller}
            errors={errors}
            ErrorMessage={ErrorMessage}
            isCustom={true}
          />
          <button className='morebutton btn' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateID;
