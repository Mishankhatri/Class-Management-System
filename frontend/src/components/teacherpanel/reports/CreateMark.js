import React, { useState, useEffect } from "react";
import InnerHeader from "../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import { ErrorMessage } from "@hookform/error-message";
import { FileInput } from "../../common/InputField/FileInput";

function CreateMark() {
  const [selectRefSubject, setSelectRefSubject] = useState(null);
  const [selectRefStudent, setSelectRefStudent] = useState(null);
  const [selectRefForClass, setSelectRefForClass] = useState(null);
  const [selectRefForSection, setSelectRefForSection] = useState(null);

  const { handleSubmit, control } = useForm();

  const refClearForClass = (ref) => setSelectRefForClass(ref);
  const refClearForSection = (ref) => setSelectRefForSection(ref);
  const refClearSubject = (ref) => setSelectRefSubject(ref);
  const refClearStudent = (ref) => setSelectRefStudent(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);

    e.target.reset();
    selectRefSubject.clearValue();
    selectRefForClass.clearValue();
    selectRefForSection.clearValue();
    selectRefStudent.clearValue();
  };
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={"Add Marks"} />
      <div className="main-content">
        {/* // custom-grid */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaBook />
              </span>
              <span className="title">GIVE MARKS</span>
            </div>
            <div className="content-section">
              <Controller
                name={"selectClass"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Class".toUpperCase()}
                    input={"dropdown"}
                    icon={<FaIcons.FaCogs className="mid-icon" />}
                    name={"selectClass"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    options={[
                      { value: "12", label: "12" },
                      { value: "11", label: "11" },
                      { value: "11", label: "11" },
                      { value: "10", label: "10" },
                    ]}
                    refClear={refClearForClass}
                  />
                )}
              />

              <Controller
                name={"selectSection"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Section".toUpperCase()}
                    input={"dropdown"}
                    icon={<FaIcons.FaCode className="mid-icon" />}
                    name={"selectSection"}
                    onChangeHandler={field.onChange}
                    isRequired={false}
                    options={[
                      { value: "A", label: "A" },
                      { value: "B", label: "B" },
                      { value: "C", label: "C" },
                    ]}
                    refClear={refClearForSection}
                  />
                )}
              />

              <Controller
                name={"selectSubject"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Subject".toUpperCase()}
                    input={"dropdown"}
                    icon={<FaIcons.FaBook className="mid-icon" />}
                    name={"selectSubject"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    options={[
                      { value: "Social", label: "Social" },
                      { value: "Subject", label: "Subject" },
                      { value: "Mathematics", label: "Mathematics" },
                    ]}
                    refClear={refClearSubject}
                  />
                )}
              />

              <Controller
                name={"selectStudent"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Students".toUpperCase()}
                    input={"dropdown"}
                    icon={<FaIcons.FaUsers className="mid-icon" />}
                    name={"selectStudent"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    options={[
                      { value: "Anish", label: "Anish" },
                      { value: "Anu", label: "Anu" },
                      { value: "Prabin", label: "Prabin" },
                    ]}
                    refClear={refClearStudent}
                  />
                )}
              />

              <Controller
                name={"markValue"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Marks".toUpperCase()}
                    input={"number"}
                    icon={<FaIcons.FaSortNumericDown className="mid-icon" />}
                    name={"selectStudent"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                  />
                )}
              />
            </div>
          </div>

          <button className="morebutton btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
export default CreateMark;
