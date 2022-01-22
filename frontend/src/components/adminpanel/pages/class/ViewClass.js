import React from 'react';
import * as MdIcons from 'react-icons/md';
import InnerHeader from '../../common/InnerHeader';

function ViewClass() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Class'} />
    </div>
  );
}

export default ViewClass;
