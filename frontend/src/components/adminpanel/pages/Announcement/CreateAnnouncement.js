import React, { useState } from 'react';
import InnerHeader from '../../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

import { useForm, Controller } from 'react-hook-form';
import InputField from '../../../common/InputField/InputField';
import { ErrorMessage } from '@hookform/error-message';

function CreateAnnouncement() {
  const [selectRefType, setSelectRefType] = useState(null);
  const [selectRefFor, setSelectRefFor] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const refClearFor = (ref) => setSelectRefFor(ref);
  const refClearType = (ref) => setSelectRefType(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);

    //CLear Input Field Value
    e.target.reset();
    selectRefType.clearValue();
    selectRefFor.clearValue();
  };
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={'Announcements'} />
      <div className='main-content'>
        {/* // custom-grid */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className='card-section'>
            <div className='heading'>
              <span className='title-icon'>
                <FaIcons.FaBook />
              </span>
              <span className='title'>CREATE ANNOUNCEMENTS</span>
            </div>
            <div className='content-section'>
              <Controller
                name={'announcementTypeName'}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `Announcement Type is required`,
                  },
                }}
                defaultValue=''
                render={({ field }) => (
                  <InputField
                    title={'Type'.toUpperCase()}
                    input={'dropdown'}
                    icon={<FaIcons.FaCogs className='mid-icon' />}
                    name={'announcementTypeName'}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    options={[
                      { value: 'Academic', label: 'Academic' },
                      { value: 'Admistration', label: 'Admistration' },
                      { value: 'Admission', label: 'Admission' },
                      { value: 'Others', label: 'Others' },
                    ]}
                    errors={errors}
                    refClear={refClearType}
                    ErrorMessage={ErrorMessage}
                  />
                )}
              />

              <Controller
                name={'announcementFor'}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `Announcement For is required`,
                  },
                }}
                defaultValue=''
                render={({ field }) => (
                  <InputField
                    title={'For'.toUpperCase()}
                    input={'dropdown'}
                    icon={<FaIcons.FaPhotoVideo className='mid-icon' />}
                    name={'announcementFor'}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    options={[
                      { value: 'All', label: 'All' },
                      { value: 'Teacher', label: 'Teacher' },
                      { value: 'Student', label: 'Student' },
                    ]}
                    errors={errors}
                    refClear={refClearFor}
                    ErrorMessage={ErrorMessage}
                  />
                )}
              />

              <Controller
                name={'announcementSubjects'}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `Announcement Subjects is required`,
                  },
                }}
                defaultValue=''
                render={({ field }) => (
                  <InputField
                    title={'Subjects'.toUpperCase()}
                    input={'textarea'}
                    icon={<FaIcons.FaCode className='mid-icon' />}
                    name={'announcementSubjects'}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    errors={errors}
                    isTextArea={true}
                    isCustomInput={true}
                    ErrorMessage={ErrorMessage}
                  />
                )}
              />

              <Controller
                name={'studenannouncementFiletClass'}
                control={control}
                rules={{
                  required: {
                    value: false,
                  },
                }}
                defaultValue=''
                render={({ field }) => (
                  <InputField
                    title={'Files'.toUpperCase()}
                    input={'file'}
                    icon={<FaIcons.FaFile className='mid-icon' />}
                    name={'announcementFile'}
                    onChangeHandler={field.onChange}
                    isRequired={false}
                    errors={errors}
                    ErrorMessage={ErrorMessage}
                  />
                )}
              />
            </div>
          </div>
          <button className='morebutton btn' type='submit'>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAnnouncement;
