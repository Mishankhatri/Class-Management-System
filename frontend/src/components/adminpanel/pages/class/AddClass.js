import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function AddClass() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Class'} />
    </div>
  );
}

export default AddClass;
