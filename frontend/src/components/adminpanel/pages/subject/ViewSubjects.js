import React, { useState } from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import SubjectDataTable from './SubjectDataTable';

import './../users/UserProfile.css';
import ChangeInput from './../../../common/Modal/ChangeInput';
import { getSubjectModal } from './../../../values/AdminPanel/ClassValue';

function ViewSubjects() {
  const [click, setClick] = useState(false);

  const onSubmit = (data, e) => {
    e.target.reset();
    console.log(data);
    setClick(false);
  };
  return (
    <div>
      <ChangeInput
        onSubmit={onSubmit}
        valueArray={getSubjectModal()}
        click={click}
        setClick={setClick}
        heading={'View Class'}
        isCustom1={false} //For showing grid 3
        isCustom2={true} //For showing description
      />
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'View Subject'} />
      <SubjectDataTable click={click} setClick={setClick} />
    </div>
  );
}

export default ViewSubjects;
