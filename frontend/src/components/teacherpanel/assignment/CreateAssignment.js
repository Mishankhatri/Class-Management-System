import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";

import InnerHeader from "../../common/InnerHeader";
import InputField from "../../common/InputField/InputField";
import { FileInput } from "../../common/InputField/FileInput";

function CreateAssignment() {
  const [selectRefClass, setSelectRefClass] = useState(null);
  const [selectRefSection, setSelectRefSection] = useState(null);
  const [selectRefCourse, setSelectRefCourse] = useState(null);

  const { handleSubmit, control } = useForm();

  const refClearClass = (ref) => setSelectRefClass(ref);
  const refClearSection = (ref) => setSelectRefSection(ref);
  const refClearCourse = (ref) => setSelectRefCourse(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);

    //CLear Input Field Value
    e.target.reset();
    selectRefClass.clearValue(); // Clear Select Value
    selectRefSection.clearValue(); // Clear Select Value
    selectRefCourse.clearValue(); // Clear Select Value
  };

  return (
    <React.Fragment>
      <InnerHeader
        icon={<MdIcons.MdUploadFile />}
        name={"Create Assignments"}
      />
      <div className="main-content">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaFileArchive />
              </span>
              <span className="title">CREATE HOMEWORK</span>
            </div>
            <div className="content-section">
              <div className="allinputfield">
                <Controller
                  name={"assignmentTitle"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Title".toUpperCase()}
                      input={"text"}
                      icon={<FaIcons.FaCogs className="mid-icon" />}
                      name={"assignmentTitle"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                    />
                  )}
                />

                <Controller
                  name={"studentClass"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Student Class".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaChess className="mid-icon" />}
                      name={"studentClass"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                      options={[
                        { value: "12", label: "12" },
                        { value: "11", label: "11" },
                        { value: "10", label: "10" },
                        { value: "9", label: "9" },
                        { value: "8", label: "8" },
                        { value: "7", label: "7" },
                        { value: "6", label: "6" },
                        { value: "5", label: "5" },
                      ]}
                      refClear={refClearClass}
                    />
                  )}
                />

                <Controller
                  name={"studentSection"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Student Section".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaCode className="mid-icon" />}
                      name={"studentSection"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                      options={[
                        { value: "A", label: "A" },
                        { value: "B", label: "B" },
                        { value: "C", label: "C" },
                      ]}
                      refClear={refClearSection}
                    />
                  )}
                />

                <Controller
                  name={"studentCourse"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Student Course".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaBookOpen className="mid-icon" />}
                      name={"studentCourse"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                      options={[
                        { value: "Social", label: "Social" },
                        { value: "Science", label: "Science" },
                        { value: "Math", label: "Math" },
                      ]}
                      refClear={refClearCourse}
                    />
                  )}
                />

                <Controller
                  name={"dateDue"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Date Due".toUpperCase()}
                      input={"date"}
                      icon={<FaIcons.FaCalendar className="mid-icon" />}
                      name={"dateDue"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                    />
                  )}
                />

                <Controller
                  name={"timeDue"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Time Due".toUpperCase()}
                      input={"time"}
                      icon={<FaIcons.FaClock className="mid-icon" />}
                      name={"timeDue"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                    />
                  )}
                />

                <Controller
                  name={"assigmentFile"}
                  control={control}
                  defaultValue=""
                  render={(props) => (
                    <FileInput
                      name={"assigmentFile"}
                      title={"Upload File"}
                      icon={<FaIcons.FaFile className="mid-icon" />}
                      isRequired={true}
                      isImageFile={false}
                      onChange={(event) =>
                        props.field.onChange(event.target.files)
                      }
                    />
                  )}
                />
              </div>

              <Controller
                name={"assignmentInstruction"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Instruction".toUpperCase()}
                    input={"textarea"}
                    icon={<FaIcons.FaBookOpen className="mid-icon" />}
                    name={"assignmentInstruction"}
                    onChangeHandler={field.onChange}
                    isRequired={false}
                    isTextArea={true}
                  />
                )}
              />
            </div>
          </div>
          <button className="morebutton btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
export default CreateAssignment;