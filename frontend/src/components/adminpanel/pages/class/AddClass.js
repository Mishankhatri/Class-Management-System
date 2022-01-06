import React, { useState } from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import InputField from './../../common//InputField/InputField';
import { getCLassValue } from './ClassValue';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const addClassInitialValue = {
  className: '',
  classCode: '',
  classDescription: '',
};  

function AddClass() {
  const classValue = getCLassValue();

  //For Reseting Select Options while Submitting
  const [selectRef, setSelectRef] = useState(null);

  //Define requirements from useform
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    addClassInitialValue,
  });

  //Reset Value using ref for Select Options
  const refClear = (ref) => setSelectRef(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);

    //CLear Input Field Value
    e.target.reset();
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Class'} />
      <div className='main-content'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className='card-section custom-width'>
            <div className='heading'>
              <span className='title-icon'>
                <FaIcons.FaUser />
              </span>
              <span className='title'>ADD CLASS</span>
            </div>

            <div className='content-section custom-content'>
              {classValue.map((value, index) => {
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
          <button className='morebutton btn'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddClass;
