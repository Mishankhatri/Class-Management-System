import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import './Inputfield.css';
// import Select from 'react-select';

function InputField({
  classes,
  title,
  icon,
  input,
  placeholder,
  options,
  onChangeHandler,
  isRequired,
  name,
  value,
}) {
  const isDropdown = input === 'dropdown';

  return (
    <div className={classes}>
      <div className='label-title'>
        {icon}
        <label className='mid-title'>{title}</label>
        {isRequired && <span className='required'> *</span>}
      </div>
      <div className='label-input'>
        {!isDropdown ? (
          isRequired ? (
            <input
              type={input}
              className='input'
              placeholder={placeholder}
              onChange={onChangeHandler}
              required
              name={name}
            />
          ) : (
            <input
              type={input}
              className='input'
              placeholder={placeholder}
              onChange={onChangeHandler}
              name={name}
            />
          )
        ) : (
          // <Select
          //   options={options}
          //   className='input-select'
          //   onChange={setSelectedOption}
          //   maxMenuHeight={'120px'}
          //   required
          // />
          <select
            required
            name={name}
            defaultValue='none'
            // value={value}
            onChange={onChangeHandler}
            className='input'>
            <option value='none' disabled className='input-text'>
              -- Select --
            </option>
            {options.map((values, index) => {
              return (
                <option value={values.value} key={index}>
                  {values.label}
                </option>
              );
            })}
          </select>
        )}
      </div>
    </div>
  );
}

export default InputField;
