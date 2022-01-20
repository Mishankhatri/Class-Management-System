import React, { useState } from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

import { getCLassValue } from './ClassValue';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import CustomController from '../../../common/Controller';

const addClassInitialValue = {
  className: '',
  classCode: '',
  classDescription: '',
};

function AddClass() {
  //For Reseting Select Options while Submitting
  const [selectRef, setSelectRef] = useState(null);

  //Define requirements from useform
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    addClassInitialValue,
  });

  //Reset Value using ref for Select Options
  const refClear = (ref) => setSelectRef(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);
    //CLear Input Field Value
    e.target.reset();
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'Add Class'} />
      <div className='main-content'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <CustomController
            title={'ADD CLASS'}
            icon={<FaIcons.FaUser />}
            ValueArray={getCLassValue()}
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

export default AddClass;
