import React, { useState } from "react";
import InnerHeader from "../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";

import { FileInput } from "../../../common/InputField/FileInput";
import { useDispatch, useSelector } from "react-redux";
import { CreateAdminAnnouncement } from "./../../../../redux/actions/admin/announcementaction";
import { createMessage } from "../../../../redux/actions/alertactions";

function CreateAnnouncement() {
  const [selectRefType, setSelectRefType] = useState(null);
  const [selectRefFor, setSelectRefFor] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { handleSubmit, control } = useForm();

  const refClearFor = (ref) => setSelectRefFor(ref);
  const refClearType = (ref) => setSelectRefType(ref);

  const onSubmitForm = (data, e) => {
    const postData = new FormData();

    if (!data.announcementTypeName) {
      dispatch(createMessage({ typeRequired: "Type Field is Required" }));
    } else if (!data.announcementFor) {
      dispatch(createMessage({ forRequired: "For field is Required" }));
    } else {
      postData.append("created_by", user.id);
      postData.append("type", data.announcementTypeName.value);
      postData.append("title", data.announcementTitle);
      postData.append("details", data.announcementSubjects);
      postData.append("announcement_for", data.announcementFor.value);
      postData.append("files_by_admin", data.announcementFile);

      dispatch(CreateAdminAnnouncement(postData));

      e.target.reset();
      selectRefType.clearValue();
      selectRefFor.clearValue();
    }
  };

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
                  defaultValue=""
                  render={(props) => (
                    <InputField
                      title={"For".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                      name={"announcementFor"}
                      onChangeHandler={(event) => {
                        return props.field.onChange(event);
                      }}
                      isRequired={true}
                      options={[
                        { value: "all", label: "All" },
                        { value: "teachers", label: "Teachers" },
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
                  name={"announcementFile"}
                  control={control}
                  defaultValue=""
                  render={(props) => (
                    <FileInput
                      name={"announcementFile"}
                      title={"Upload File"}
                      icon={<FaIcons.FaFile className="mid-icon" />}
                      isRequired={false}
                      isImageFile={false}
                      onChange={(event) =>
                        props.field.onChange(event.target.files[0])
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
