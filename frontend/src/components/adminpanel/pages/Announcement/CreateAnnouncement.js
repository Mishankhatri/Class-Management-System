import React, { useState, useEffect } from "react";
import InnerHeader from "../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";

import { FileInput } from "../../../common/InputField/FileInput";
import { useDispatch, useSelector } from "react-redux";
import { CreateAdminAnnouncement } from "./../../../../redux/actions/admin/announcementaction";

function CreateAnnouncement() {
  const [selectRefType, setSelectRefType] = useState(null);
  const [selectRefFor, setSelectRefFor] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [student, setStudent] = useState(false);

  const { handleSubmit, control } = useForm();

  const refClearFor = (ref) => setSelectRefFor(ref);
  const refClearType = (ref) => setSelectRefType(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);
    dispatch(CreateAdminAnnouncement(data, user));
    //CLear Input Field Value
    // e.target.reset();
    selectRefType.clearValue();
    selectRefFor.clearValue();
  };

  function checkStudent(data) {}
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
                      refClear={refClearType}
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
                        { value: "all", label: "All" },
                        { value: "teachers", label: "Teachers" },
                        { value: "students", label: "Student" },
                      ]}
                      refClear={refClearFor}
                    />
                  )}
                />

                <Controller
                  name={"announcementTitle"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Title".toUpperCase()}
                      input={"text"}
                      icon={<FaIcons.FaTintSlash className="mid-icon" />}
                      name={"announcementTitle"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
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
                      isRequired={false}
                      isImageFile={false}
                      onChange={(event) =>
                        props.field.onChange(event.target.files)
                      }
                    />
                  )}
                />
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
                    isTextArea={true}
                    isCustomInput={true}
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
