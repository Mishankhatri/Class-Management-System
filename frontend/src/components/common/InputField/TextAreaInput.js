import React from "react";

export default function TextAreaInput({
  name,
  placeholder,
  isCustomInput,
  onChangeHandler,
  isRequired,
  hasValue,
  value,
}) {
  return hasValue ? (
    <textarea
      rows="4"
      cols="50"
      defaultValue={value}
      name={name}
      required={isRequired}
      placeholder={placeholder}
      onChange={onChangeHandler}
      className={
        isCustomInput ? "input custom-input textarea" : "input textarea"
      }
    />
  ) : (
    <textarea
      rows="4"
      cols="50"
      name={name}
      required={isRequired}
      placeholder={placeholder}
      onChange={onChangeHandler}
      className={
        isCustomInput ? "input custom-input textarea" : "input textarea"
      }
    />
  );
}
