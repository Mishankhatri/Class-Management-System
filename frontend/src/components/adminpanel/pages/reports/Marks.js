import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function Marks() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Marks'} />
      <div className='main-content'>
        <form></form>
      </div>
    </div>
  );
}

export default Marks;
