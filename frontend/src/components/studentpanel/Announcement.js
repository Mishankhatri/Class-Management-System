import React, { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import InnerHeader from '../common/InnerHeader';

import AnnouncementTableData from './../adminpanel/pages/Announcement/AnnouncementTableData';

function Announcement() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Announcements'} />
      <div className='main-content'>
        <AnnouncementTableData />
      </div>
    </div>
  );
}

export default Announcement;
