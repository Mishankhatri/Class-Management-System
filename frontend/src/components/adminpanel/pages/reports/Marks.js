import React, { useState } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import InputField from "../../../common//InputField/InputField";

import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { getAcademicValues } from "../../../values/AdminPanel/StudentInputField";
import MarksTableData from "./MarksTableData";
import { marksValue } from "../../../values/AdminPanel/AttendanceInput";
import "./../users/UserProfile.css";
import ChangeInput from "./../../../common/Modal/ChangeInput";

function Marks() {
  const addAcademicValues = getAcademicValues();
  const [click, setClick] = useState(false);

  const onSubmitEdit = (data, e) => {
    e.target.reset();
    console.log(data);
    setClick(false);
  };

  const [selectRefClass, setSelectRefClass] = useState(null);
  const [selectRefSection, setSelectRefSection] = useState(null);
  const [selectRefResults, setSelectRefResults] = useState(null);

  const refClearClass = (ref) => setSelectRefClass(ref);
  const refClearSection = (ref) => setSelectRefSection(ref);
  const refClearResults = (ref) => setSelectRefResults(ref);

  //Define requirements from useform
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //Getting options for academic info
  const optionsClass = addAcademicValues[0].options;
  const optionsSection = addAcademicValues[1].options;

  const onSubmitForm = (data, e) => {
    console.log(data);

    //CLear Input Field Value
    e.target.reset();
    selectRefClass.clearValue();
    selectRefSection.clearValue();
    selectRefResults.clearValue();
  };

  return (
    <div>
      {click && (
        <ChangeInput
          onSubmit={onSubmitEdit}
          valueArray={marksValue}
          click={click}
          setClick={setClick}
          heading={"Edit Marks"}
          isCustom1={false} //For showing grid 3
        />
      )}
      <InnerHeader
        icon={<MdIcons.MdPersonAdd />}
        name={"Assign Results of Students"}
      />
      <div className="main-content">
        {/* // custom-grid */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="card-section ">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaBook />
              </span>
              <span className="title">ASSIGN RESULTS</span>
            </div>
            <div className="content-section allinputfield">
              <Controller
                name={"studentSelectionClass"}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `Student Class is required`,
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Class".toUpperCase()}
                    input={"dropdown"}
                    icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                    name={"studentClass"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    options={optionsClass}
                    errors={errors}
                    refClear={refClearClass}
                    ErrorMessage={ErrorMessage}
                  />
                )}
              />
              <Controller
                name={"studentSelectionSection"}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `Student Class is required`,
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Section".toUpperCase()}
                    input={"dropdown"}
                    icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                    name={"studentClass"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    options={optionsSection}
                    errors={errors}
                    refClear={refClearSection}
                    ErrorMessage={ErrorMessage}
                  />
                )}
              />
              <Controller
                name={"studentName"}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `Student Class is required`,
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Student Name".toUpperCase()}
                    input={"text"}
                    icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                    name={"studentClass"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    options={optionsSection}
                    errors={errors}
                    ErrorMessage={ErrorMessage}
                  />
                )}
              />
              <Controller
                name={"studentResult"}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `Student Class is required`,
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Results".toUpperCase()}
                    input={"dropdown"}
                    icon={<FaIcons.FaList className="mid-icon" />}
                    name={"studentResults"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    options={[
                      { value: "Passed", label: "Passed" },
                      { value: "Failed", label: "Failed" },
                    ]}
                    errors={errors}
                    refClear={refClearResults}
                    ErrorMessage={ErrorMessage}
                  />
                )}
              />
            </div>
          </div>
          <button className="morebutton btn" type="submit">
            Assign
          </button>
        </form>

        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <FaIcons.FaBook />
            </span>
            <span className="title">View Marks</span>
          </div>
          <div className="content-section">
            <MarksTableData click={click} setClick={setClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marks;
