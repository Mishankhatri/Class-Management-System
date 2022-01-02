import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function ViewTeacher() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Teacher'} />
    </div>
  );
}

export default ViewTeacher;
