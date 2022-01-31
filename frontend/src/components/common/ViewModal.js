import React from 'react';
import { HeaderInputField } from './../adminpanel/common/InputField/HeaderInputField';

function ViewModal({ title, value }) {
  return (
    <div className='info'>
      <div className='mid-content'>
        <HeaderInputField title={title} />
        <div className='label-input'>
          <input type='text' className='input' disabled value={value} />
        </div>
      </div>
    </div>
  );
}

export default ViewModal;
