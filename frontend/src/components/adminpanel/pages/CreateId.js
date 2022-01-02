import React from 'react';
import InnerHeader from '../common/InnerHeader';
import * as MdIcons from 'react-icons/md';

function CreateID() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={'Create ID'} />
    </div>
  );
}

export default CreateID;
