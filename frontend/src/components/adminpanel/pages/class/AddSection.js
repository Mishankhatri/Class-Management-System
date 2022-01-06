import React, { useState } from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import InputField from './../../common/InputField/InputField';
import { getSectionValue } from './ClassValue';

import { useForm, Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

/*
1) Added usestate to import
2) Import React Hook Form
3) Define Initial Value Globally
*/

const addClassSectionInitialValue = {
  sectionName: '',
  sectionClassName: '',
  sectionCode: '',
  sectionDescription: '',
};

function AddSection() {
  //Get Initial Value from componenets
  const sectionValue = getSectionValue();

  //For Reseting Select Options while Submitting
  const [selectRef, setSelectRef] = useState(null);

  //Define requirements from useform
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    addClassSectionInitialValue,
  });

  //Reset Value using ref for Select Options
  const refClear = (ref) => setSelectRef(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);

    //CLear Input Field Value
    e.target.reset();

    //Clear Select Value
    selectRef.clearValue();
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Section'} />
      <div className='main-content'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className='card-section custom-width'>
            <div className='heading'>
              <span className='title-icon'>
                <FaIcons.FaUser />
              </span>
              <span className='title'>ADD SECTION</span>
            </div>

            <div className='content-section custom-content'>
              {sectionValue.map((value, index) => {
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

export default AddSection;
