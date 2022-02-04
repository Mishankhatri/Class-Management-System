import React from "react";
import { HeaderInputField } from "./HeaderInputField";

export const FileInput = ({
  name,
  title,
  icon,
  isRequired,
  isCustomInput,
  isImageFile,
  onChange,
}) => {
  return (
    <>
      <div className="mid-content">
        <HeaderInputField
          title={title}
          icon={icon}
          isRequired={isRequired}
          name={name}
        />

        <div className="label-input">
          {isImageFile ? (
            <input
              type="file"
              className={isCustomInput ? "input custom-input" : "input"}
              required={isRequired}
              onChange={onChange}
              name={name}
              accept="image/*"
              //
            />
          ) : (
            <input
              type="file"
              className={isCustomInput ? "input custom-input" : "input"}
              required={isRequired}
              onChange={onChange}
              name={name}
            />
          )}
        </div>
      </div>
    </>
  );
};
