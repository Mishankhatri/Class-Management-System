import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputField from './../../adminpanel/common/InputField/InputField';

function ChangeInput({ valueArray, onSubmit, click, setClick }) {
  const { handleSubmit, control } = useForm();

  return (
    <div className='modal'>
      <div className={click ? 'model-section visible' : 'model-section'}>
        {/* Add class visible to above element to see modal  */}
        <div className='modal-content'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className='close' onClick={() => setClick(!click)}>
              &times;
            </span>
            <div className='content'>
              <h2>Update Student Info</h2>
              <h3>Students Info</h3>
              <div className='content-section allinputfield'>
                {valueArray.map((value, index) => {
                  return (
                    value.input != 'file' && (
                      <Controller
                        name={value.name}
                        control={control}
                        key={index}
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
                            isImageFile={value?.isImageFile}
                            options={value?.options}
                          />
                        )}
                      />
                    )
                  );
                })}
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
  );
}

export default ChangeInput;
