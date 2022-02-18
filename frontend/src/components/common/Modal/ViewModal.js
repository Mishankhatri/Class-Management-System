import React from "react";
import { HeaderInputField } from "../../common/InputField/HeaderInputField";

function ViewModal({
  title,
  value,
  disabled = true,
  name = "",
  register,
  type = "text",
}) {
  return (
    <div className="info">
      <div className="mid-content">
        <HeaderInputField title={title} />
        <div className="label-input">
          {register ? (
            <input
              type={type}
              className="input"
              disabled={disabled}
              defaultValue={value}
              name={name}
              {...register(name)}
            />
          ) : (
            <div className="input">{value}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewModal;
