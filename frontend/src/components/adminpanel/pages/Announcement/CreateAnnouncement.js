import React, { useState, useEffect } from "react";
import InnerHeader from "../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import { ErrorMessage } from "@hookform/error-message";
import { FileInput } from "../../../common/InputField/FileInput";

function CreateAnnouncement() {
  const [selectRefType, setSelectRefType] = useState(null);
  const [selectRefFor, setSelectRefFor] = useState(null);
  const [selectRefForClass, setSelectRefForClass] = useState(null);
  const [selectRefForSection, setSelectRefForSection] = useState(null);

  const [student, setStudent] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const refClearFor = (ref) => setSelectRefFor(ref);
  const refClearForClass = (ref) => setSelectRefForClass(ref);
  const refClearForSection = (ref) => setSelectRefForSection(ref);
  const refClearType = (ref) => setSelectRefType(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);
    setStudent(false);

    //CLear Input Field Value
    // e.target.reset();
    selectRefType.clearValue();
    selectRefFor.clearValue();

    if (student) {
      selectRefForClass.clearValue();
      selectRefForSection.clearValue();
    }
  };

  function checkStudent(data) {
    // data && data.value === 'Student' ? setStudent(true) : setStudent(false);
  }
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={"Announcements"} />
      <div className="main-content">
        {/* // custom-grid */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaBook />
              </span>
              <span className="title">CREATE ANNOUNCEMENTS</span>
            </div>
            <div className="content-section">
              <div className="custom-announcementCreate">
                <Controller
                  name={"announcementTypeName"}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: `Announcement Type is required`,
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Type".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaCogs className="mid-icon" />}
                      name={"announcementTypeName"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                      options={[
                        { value: "Academic", label: "Academic" },
                        { value: "Admistration", label: "Admistration" },
                        { value: "Admission", label: "Admission" },
                        { value: "Others", label: "Others" },
                      ]}
                      errors={errors}
                      refClear={refClearType}
                      ErrorMessage={ErrorMessage}
                    />
                  )}
                />

                <Controller
                  name={"announcementFor"}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: `Announcement For is required`,
                    },
                  }}
                  defaultValue=""
                  render={(props) => (
                    <InputField
                      title={"For".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                      name={"announcementFor"}
                      onChangeHandler={(event) => {
                        checkStudent(event);
                        return props.field.onChange(event);
                      }}
                      isRequired={true}
                      options={[
                        { value: "All", label: "All" },
                        { value: "Teacher", label: "Teacher" },
                        { value: "Student", label: "Student" },
                      ]}
                      errors={errors}
                      refClear={refClearFor}
                      ErrorMessage={ErrorMessage}
                    />
                  )}
                />

                {student && (
                  <>
                    <Controller
                      name={"announcementForClass"}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <InputField
                          title={"Class".toUpperCase()}
                          input={"dropdown"}
                          icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                          name={"announcementForClass"}
                          onChangeHandler={field.onChange}
                          isRequired={false}
                          options={[
                            { value: "12", label: "12" },
                            { value: "11", label: "11" },
                            { value: "10", label: "10" },
                          ]}
                          errors={errors}
                          refClear={refClearForClass}
                          ErrorMessage={ErrorMessage}
                        />
                      )}
                    />

                    <Controller
                      name={"announcementForSection"}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <InputField
                          title={"Section".toUpperCase()}
                          input={"dropdown"}
                          icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                          name={"announcementForSection"}
                          onChangeHandler={field.onChange}
                          isRequired={true}
                          options={[
                            { value: "A", label: "A" },
                            { value: "B", label: "B" },
                            { value: "C", label: "C" },
                          ]}
                          errors={errors}
                          refClear={refClearForSection}
                          ErrorMessage={ErrorMessage}
                        />
                      )}
                    />
                  </>
                )}
              </div>
              <Controller
                name={"announcementSubjects"}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `Announcement Subjects is required`,
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Subjects".toUpperCase()}
                    input={"textarea"}
                    icon={<FaIcons.FaCode className="mid-icon" />}
                    name={"announcementSubjects"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    errors={errors}
                    isTextArea={true}
                    isCustomInput={true}
                    ErrorMessage={ErrorMessage}
                  />
                )}
              />

              <Controller
                name={"announcemntFile"}
                control={control}
                defaultValue=""
                render={(props) => (
                  <FileInput
                    name={"announcemntFile"}
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
          </div>
          <button className="morebutton btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAnnouncement;
