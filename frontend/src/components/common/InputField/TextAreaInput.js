import React from "react";

export default function TextAreaInput({
  name,
  placeholder,
  isCustomInput,
  onChangeHandler,
  isRequired,
}) {
  return (
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
