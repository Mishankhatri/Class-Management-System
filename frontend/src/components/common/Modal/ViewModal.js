import React from "react";
import { HeaderInputField } from "../../common/InputField/HeaderInputField";

function ViewModal({ title, value, disabled = true, name = "", register }) {
  return (
    <div className="info">
      <div className="mid-content">
        <HeaderInputField title={title} />
        <div className="label-input">
          {register ? (
            <input
              type="text"
              className="input"
              disabled={disabled}
              defaultValue={value}
              name={name}
              {...register(name)}
            />
          ) : (
            <input
              type="text"
              className="input"
              disabled={disabled}
              defaultValue={value}
              name={name}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewModal;
