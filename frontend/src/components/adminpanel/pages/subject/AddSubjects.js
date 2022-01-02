import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function AddSubjects() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Subjects'} />
    </div>
  );
}

export default AddSubjects;
