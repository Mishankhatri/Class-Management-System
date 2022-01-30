import React, { useState } from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

import CustomController from '../../../common/Controller';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {
  timeTables_Time,
  addSlot,
  timeTable_value,
} from '../../../values/AdminPanel/TimetableValues';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Table, Button } from 'react-bootstrap';

function CreateTimetables() {
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
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Create Timetables'} />
      <div className='main-content'>
        <div className='timetable'>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <CustomController
              title={'ADD SLOT'}
              icon={<FaIcons.FaUser />}
              ValueArray={addSlot}
              refClear={refClear}
              control={control}
              Controller={Controller}
              errors={errors}
              ErrorMessage={ErrorMessage}
              isCustom={false}
            />
            <button className='morebutton btn' type='submit'>
              Submit
            </button>
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
                    <th>Day</th>
                    <th>Time</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Subject</th>
                    <th>Teacher</th>
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
                          <button className='btn-custom btn-primary btn-1'>
                            Edit
                          </button>
                          <button className='btn-custom btn-danger'>
                            Delete
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
    </div>
  );
}

export default CreateTimetables;
