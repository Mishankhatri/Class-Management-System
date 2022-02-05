import React from "react";
import "./../../common/css/ToggleOption.css";

const ToggleSwitch = ({ id, name, onChangeHandler, optionLabels }) => {
  return (
    <div className={"toggle-switch"}>
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        onChange={(e) => {
          onChangeHandler(id, e.target.checked);
        }}
      />
      {id ? (
        <label className="toggle-switch-label" htmlFor={id}>
          <span
            className={"toggle-switch-inner"}
            data-true={optionLabels[0]}
            data-false={optionLabels[1]}
          />
          <span className={"toggle-switch-switch"} />
        </label>
      ) : null}
    </div>
  );
};

export default ToggleSwitch;
