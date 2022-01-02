import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function AddStudent() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Student'} />
    </div>
  );
}

export default AddStudent;
