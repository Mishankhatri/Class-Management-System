import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function AddTeacher() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Teacher'} />
    </div>
  );
}

export default AddTeacher;
