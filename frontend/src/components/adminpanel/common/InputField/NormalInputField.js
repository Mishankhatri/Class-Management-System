import React from 'react';

function NormalInputField({
  input,
  isCustomInput,
  placeholder,
  onChangeHandler,
  name,
  isRequired,
}) {
  const isFile = input === 'file';

  return isFile ? (
    <input
      type={input}
      className={isCustomInput ? 'input custom-input' : 'input'}
      placeholder={placeholder}
      onChange={onChangeHandler}
      required={isRequired}
      name={name}
      accept='image/*'
    />
  ) : (
    <input
      type={input}
      className={isCustomInput ? 'input custom-input' : 'input'}
      placeholder={placeholder}
      onChange={onChangeHandler}
      required={isRequired}
      name={name}
    />
  );
}

export default NormalInputField;
