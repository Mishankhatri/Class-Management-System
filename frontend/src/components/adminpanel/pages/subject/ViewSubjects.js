import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function ViewSubjects() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Subject'} />
    </div>
  );
}

export default ViewSubjects;
