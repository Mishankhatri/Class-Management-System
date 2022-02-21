import React from "react";
import { HeaderInputField } from "../../common/InputField/HeaderInputField";

function ViewModal({
  title,
  value,
  disabled = true,
  name = "",
  register,
  type = "text",
  icon = "",
  file = false,
}) {
  return (
    <div className="info">
      <div className="mid-content">
        <HeaderInputField title={title} icon={icon} />
        <div className="label-input">
          {register ? (
            file ? (
              <div className="image-component">
                <input
                  type={"file"}
                  className="input upload-image"
                  disabled={disabled}
                  defaultValue={value}
                  accept="image/*"
                  name={name}
                  {...register(name)}
                />
              </div>
            ) : (
              <input
                type={type}
                className="input"
                disabled={disabled}
                defaultValue={value}
                name={name}
                {...register(name)}
              />
            )
          ) : (
            <div className="input">{value}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewModal;
