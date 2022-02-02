import React, { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import InnerHeader from '../../../common/InnerHeader';

import AnnouncementTableData from './AnnouncementTableData';
import { useForm, Controller } from 'react-hook-form';
import './../users/UserProfile.css';
import InputField from '../../../common/InputField/InputField';

function ViewAnnouncements() {
  const [click, setClick] = useState(false);

  const [selectRefType, setSelectRefType] = useState(null);
  const [selectRefFor, setSelectRefFor] = useState(null);

  const refClearType = (select) => setSelectRefType(select);
  const refClearFor = (select) => setSelectRefFor(select);

  const { handleSubmit, control } = useForm();

  const onSubmit = (data, e) => {
    e.target.reset();
    selectRefFor.clearValue();
    selectRefType.clearValue();
    console.log(data);
    setClick(false);
  };
  return (
    <div>
      <div className='modal'>
        <div className={click ? 'model-section visible' : 'model-section'}>
          {/* Add class visible to above element to see modal  */}
          <div className='modal-content'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <span className='close' onClick={() => setClick(!click)}>
                &times;
              </span>
              <div className='content'>
                <h2>Edit Announcement</h2>
                <div className='content-section'>
                  <div className='custom-modal-input'>
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
                          refClear={refClearType}
                          options={[
                            { value: 'Academic', label: 'Academic' },
                            { value: 'Admistration', label: 'Admistration' },
                            { value: 'Admission', label: 'Admission' },
                            { value: 'Others', label: 'Others' },
                          ]}
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
                          refClear={refClearFor}
                          options={[
                            { value: 'All', label: 'All' },
                            { value: 'Teacher', label: 'Teacher' },
                            { value: 'Student', label: 'Student' },
                          ]}
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
                        />
                      )}
                    />
                  </div>
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
                        isTextArea={true}
                        isCustomInput={true}
                      />
                    )}
                  />
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
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Announcements'} />
      <div className='main-content'>
        <AnnouncementTableData click={click} setClick={setClick} />
      </div>
    </div>
  );
}

export default ViewAnnouncements;
