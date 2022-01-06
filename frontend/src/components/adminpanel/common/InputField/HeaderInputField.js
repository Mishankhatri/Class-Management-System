// import React from 'react';

export function HeaderInputField({
  title,
  icon,
  isRequired,
  errors,
  ErrorMessage,
  name,
}) {
  return (
    <div className='label-title'>
      {icon}
      <label className='mid-title'>{title}</label>
      {isRequired && <span className='required'> *</span>}
      {/* <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <span className='errors'>{message}</span>}
      /> */}
    </div>
  );
}
