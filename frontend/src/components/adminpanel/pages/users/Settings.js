import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function Settings() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Settings'} />
    </div>
  );
}

export default Settings;
