import React from 'react';
import InnerHeader from '../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function Announcement() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={'Announcements'} />
    </div>
  );
}

export default Announcement;
