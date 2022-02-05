import React from "react";
import { HeaderInputField } from "./HeaderInputField";
import Select from "react-select";

function SelectInputField({
  title,
  icon,
  name,
  value,
  hasValue = false,
  options,
  onChange,
}) {
  return (
    <React.Fragment>
      <div className="mid-content">
        <HeaderInputField title={title.toUpperCase()} icon={icon} />
        <div className="label-input">
          {hasValue ? (
            <Select
              menuPortalTarget={document.body}
              name={name}
              options={options}
              className="input-select custom-input"
              onChange={onChange}
              maxMenuHeight={200}
              value={value}
              menuPlacement={"auto"}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 10002 }) }}
            />
          ) : (
            <Select
              menuPortalTarget={document.body}
              options={options}
              name={name}
              className="input-select custom-input"
              onChange={onChange}
              maxMenuHeight={200}
              menuPlacement={"auto"}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 10002 }) }}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default SelectInputField;
