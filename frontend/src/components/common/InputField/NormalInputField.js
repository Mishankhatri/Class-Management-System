import React from "react";

function NormalInputField({
  input,
  isCustomInput,
  placeholder,
  onChangeHandler,
  name,
  isRequired,
  isImageFile,
  disabled,
}) {
  const isFile = input === "file";

  return isFile && isImageFile ? (
    <>
      {console.log()}
      <input
        type={input}
        className={isCustomInput ? "input custom-input" : "input"}
        placeholder={placeholder}
        onChange={onChangeHandler}
        required={isRequired}
        name={name}
        disabled={disabled}
        accept="image/*"
      />
    </>
  ) : (
    <input
      type={input}
      className={isCustomInput ? "input custom-input" : "input"}
      placeholder={placeholder}
      onChange={onChangeHandler}
      required={isRequired}
      disabled={disabled}
      name={name}
    />
  );
}

export default NormalInputField;
