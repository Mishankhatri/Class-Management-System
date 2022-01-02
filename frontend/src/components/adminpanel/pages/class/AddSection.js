import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function AddSection() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Section'} />
    </div>
  );
}

export default AddSection;
