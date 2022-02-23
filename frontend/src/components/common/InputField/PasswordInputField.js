import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";
import { HeaderInputField } from "./HeaderInputField";

function PasswordInputField({
  name,
  title,
  isRequired = true,
  placeholder = "Enter Password",
  onChangeHandler,
  disabled = false,
  id_name,
  hasHeader = true,
}) {
  const [showPass, setShowPass] = useState(true);
  return (
    <React.Fragment>
      <div className="mid-content">
        {hasHeader && (
          <HeaderInputField
            title={title}
            icon={<MdIcons.MdPassword className="mid-icon" />}
            isRequired={isRequired}
          />
        )}
        <div className="label-input">
          <div className="input-icon-container">
            <input
              type={showPass ? "password" : "text"}
              className={"input"}
              placeholder={placeholder}
              id={id_name}
              onChange={onChangeHandler}
              required={isRequired}
              disabled={disabled}
              name={name}
            />
            <button
              className="fa eye-button"
              onClick={(e) => {
                e.preventDefault();
                setShowPass(!showPass);
              }}>
              {showPass ? <FiIcons.FiEye /> : <FiIcons.FiEyeOff />}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default PasswordInputField;
