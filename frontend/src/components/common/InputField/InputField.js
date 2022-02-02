import React from 'react';
import Select from 'react-select';
import TextAreaInput from './TextAreaInput';
import NormalInputField from './NormalInputField';
import { HeaderInputField } from './HeaderInputField';

function InputField({
  title,
  icon,
  input,
  placeholder,
  options,
  onChangeHandler,
  isRequired,
  name,
  isCustomInput,
  isTextArea,
  refClear,
  ErrorMessage,
  errors,
  isImageFile,
}) {
  const isDropdown = input === 'dropdown';

  return (
    <div className='mid-content'>
      {/* //Heading File  */}
      <HeaderInputField
        title={title}
        icon={icon}
        isRequired={isRequired}
        ErrorMessage={ErrorMessage}
        errors={errors}
        name={name}
      />

      {/* Input Field  */}
      <div className='label-input'>
        {!isDropdown ? (
          isTextArea ? (
            <TextAreaInput
              name={name}
              placeholder={placeholder}
              isCustomInput={isCustomInput}
              onChangeHandler={onChangeHandler}
              isRequired={isRequired}
            />
          ) : (
            <NormalInputField
              input={input}
              placeholder={placeholder}
              onChangeHandler={onChangeHandler}
              name={name}
              isCustomInput={isCustomInput}
              isRequired={isRequired}
              isImageFile={isImageFile}
            />
          )
        ) : (
          <Select
            menuPortalTarget={document.body}
            ref={refClear}
            options={options}
            className='input-select custom-input'
            onChange={onChangeHandler}
            maxMenuHeight={200}
            menuPlacement={'auto'}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 10002 }) }}
          />
        )}
        {/* <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <span className='errors'>{message}</span>}
        /> */}
      </div>
    </div>
  );
}

export default InputField;