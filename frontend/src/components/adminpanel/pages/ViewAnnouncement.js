import React from 'react';
import * as MdIcons from 'react-icons/md';
import InnerHeader from '../common/InnerHeader';
import * as FaIcons from 'react-icons/fa';

import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import CustomController from '../../common/Controller';
import { announcementValue } from '../../values/AdminPanel/AnnouncementInput';
import { attendanceDetail } from '../../values/AdminPanel/AttendanceInput'; // Temporary Purposes

function ViewAnnouncements() {
  //Define requirements from useform
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmitForm = (data, e) => {
    console.log(data);
    //CLear Input Field Value
    e.target.reset();
  };
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Announcements'} />
      <div className='main-content'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <CustomController
            title={'MAKE SELECTION'}
            icon={<FaIcons.FaUser />}
            ValueArray={announcementValue}
            // refClear={refClearStudent}
            control={control}
            Controller={Controller}
            errors={errors}
            ErrorMessage={ErrorMessage}
            isCustom={false}
          />
          <button className='morebutton btn'>Select</button>
        </form>

        <div className='card-section'>
          <div className='heading'>
            <span className='title-icon'>
              <FaIcons.FaSearch />
            </span>
            <span className='title'>Announcement List</span> {/*Custom  */}
          </div>
          <div className='content-section'>
            <table className='table-striped'>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>For</th>
                  <th>Subject</th>
                  <th>File</th>
                  <th>Created By</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {attendanceDetail.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.name}</td>
                      <td>{value.roll}</td>
                      <td>{value.class}</td>
                      <td>{value.attendance}</td>
                      <td>{value.totalAbsent}</td>
                      <td>{value.totalPresent}</td>
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

export default ViewAnnouncements;
