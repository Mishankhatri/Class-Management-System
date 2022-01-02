import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function CreateTimetables() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Create Timetables'} />
    </div>
  );
}

export default CreateTimetables;
