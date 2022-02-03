import React, { useState } from 'react';
import InnerHeader from './../../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import CustomController from '../../../common/Controller';
import { getSectionValue } from '../../../values/AdminPanel/ClassValue';
/*
1) Added usestate to import
2) Import React Hook Form
3) Define Initial Value Globally
*/

const addClassSectionInitialValue = {
  sectionName: '',
  sectionClassName: '',
  sectionCode: '',
  sectionDescription: '',
};

function AddSection() {
  //For Reseting Select Options while Submitting
  const [selectRef, setSelectRef] = useState(null);

  //Define requirements from useform
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    addClassSectionInitialValue,
  });

  //Reset Value using ref for Select Options
  const refClear = (ref) => setSelectRef(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);

    //CLear Input Field Value
    e.target.reset();

    //Clear Select Value
    selectRef.clearValue();
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Section'} />
      <div className='main-content'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <CustomController
            title={'ADD SUBJECT'}
            icon={<FaIcons.FaUser />}
            ValueArray={getSectionValue()}
            refClear={refClear}
            control={control}
            Controller={Controller}
            errors={errors}
            ErrorMessage={ErrorMessage}
            isCustom={true}
          />
          <button className='morebutton btn'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddSection;
