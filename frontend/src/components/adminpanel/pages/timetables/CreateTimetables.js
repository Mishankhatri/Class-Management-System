import React, { useState } from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

import CustomController from '../../../common/Controller';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { addSlot } from '../../../values/AdminPanel/TimetableValues';
import ViewTimetable_Table from './ViewTimetable_Table';

import './../users/UserProfile.css';
import ChangeInput from './../../../common/Modal/ChangeInput';

function CreateTimetables() {
  const [selectRef, setSelectRef] = useState(null);

  const {
    handleSubmit: handleSubmit_1,
    control: control_1,
    formState: { errors: errors_1 },
  } = useForm();

  const refClear = (ref) => setSelectRef(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);
    e.target.reset();
    selectRef.clearValue();
  };

  const [click, setClick] = useState(false);

  const onSubmit = (data, e) => {
    e.target.reset();
    console.log(data);
    setClick(false);
  };
  return (
    <div>
      {click && (
        <ChangeInput
          onSubmit={onSubmit}
          valueArray={addSlot}
          click={click}
          setClick={setClick}
          heading={'View Class'}
          isCustom1={false} //For showing grid 3
          isCustom2={false} //For showing description
        />
      )}
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Create Timetables'} />
      <div className='main-content'>
        <div className='timetable'>
          <form onSubmit={handleSubmit_1(onSubmitForm)}>
            <CustomController
              title={'ADD SLOT'}
              icon={<FaIcons.FaUser />}
              ValueArray={addSlot}
              refClear={refClear}
              control={control_1}
              Controller={Controller}
              errors={errors_1}
              ErrorMessage={ErrorMessage}
              isCustom={false}
            />
            <button className='morebutton btn' type='submit'>
              Submit
            </button>
          </form>

          <h2 className='h3'>View All Slots</h2>
          <ViewTimetable_Table click={click} setClick={setClick} />
        </div>
      </div>
    </div>
  );
}

export default CreateTimetables;
