import React from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import { timeTables } from './TimetableValues';

function CreateTimetables() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Create Timetables'} />
      <div className='main-content'>
        <form>
          <div className='timetable'>
            <div>Timetable of Class 6</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTimetables;
