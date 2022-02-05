import React from "react";
import { HeaderInputField } from "./HeaderInputField";

function TextInput({
  title,
  icon,
  disabled = false,
  name,
  value,
  hasValue = false,
}) {
  return (
    <React.Fragment>
      <div className="mid-content">
        <HeaderInputField title={title.toUpperCase()} icon={icon} />
        <div className="label-input">
          {hasValue ? (
            <input
              type="text"
              className="input"
              disabled={disabled}
              name={name}
              value={value}
            />
          ) : (
            <input
              type="text"
              className="input"
              disabled={disabled}
              name={name}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default TextInput;
