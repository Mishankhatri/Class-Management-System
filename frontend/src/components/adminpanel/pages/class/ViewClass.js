import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function ViewClass() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Class'} />
    </div>
  );
}

export default ViewClass;
