import React from "react";
import { HeaderInputField } from "./../../../common/InputField/HeaderInputField";

function CustomSettingsInput({
  title,
  icon,
  required,
  type,
  placeholder,
  name,
  register,
  value,
}) {
  return (
    <React.Fragment>
      <div className="inputfield">
        <HeaderInputField
          title={title}
          icon={icon}
          isRequired={required}
          className="headerinputfield"
        />
        <div className="">
          <input
            type={type}
            className="input"
            placeholder={placeholder}
            {...register(name)}
            required
            name={name}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CustomSettingsInput;
