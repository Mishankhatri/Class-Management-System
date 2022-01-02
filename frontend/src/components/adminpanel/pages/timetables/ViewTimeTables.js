import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function ViewTimetables() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Timetables'} />
    </div>
  );
}

export default ViewTimetables;
