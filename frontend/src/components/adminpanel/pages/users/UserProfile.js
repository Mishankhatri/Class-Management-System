import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function UserProfile() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'UserProfile'} />
    </div>
  );
}

export default UserProfile;
