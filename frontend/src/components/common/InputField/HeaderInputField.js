// import React from 'react';

export function HeaderInputField({ title, icon, isRequired }) {
  return (
    <div className="label-title">
      {icon}
      <label className="mid-title">{title}</label>
      {isRequired && <span className="required"> *</span>}
    </div>
  );
}
