import React from "react";
import InnerHeader from "../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import SelectInputField from "./../../../common/InputField/SelectInputField";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AssignTeacherSubjects } from "../../../../redux/actions/teacher/teacheractions";

function AssignTeacher() {
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  const onSubmitData = (data) => {
    console.log(data);
    let postData = new FormData();

    postData.append("grade", 18);
    postData.append("subject", 19);
    postData.append("teacher", 50);
    dispatch(AssignTeacherSubjects(postData));
  };
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Assign Teacher"} />
      <div className="main-content card-section">
        <div className="heading">
          <span className="title-icon">
            <MdIcons.MdVerifiedUser />
          </span>
          <span className="title">ASSIGN TEACHERS</span> {/*Custom  */}
        </div>
        <div className="content-section">
          <form onSubmit={handleSubmit(onSubmitData)}>
            <div className="allinputfield">
              <Controller
                name="selectClass"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <SelectInputField
                    title={"Select Class"}
                    icon={<MdIcons.MdDepartureBoard className="mid-icon" />}
                    name={"selectClass"}
                    onChangeHandler={field.onChange}
                    options={[{ label: "12 ", value: "12" }]}
                  />
                )}
              />

              <Controller
                name="selectSection"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <SelectInputField
                    title={"Select Section"}
                    icon={<MdIcons.MdCode className="mid-icon" />}
                    name={"selectSection"}
                    onChangeHandler={field.onChange}
                    options={[{ label: "A ", value: "A" }]}
                  />
                )}
              />

              <Controller
                name="selectSubject"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <SelectInputField
                    title={"Select Subject"}
                    icon={<MdIcons.MdSubject className="mid-icon" />}
                    options={[{ label: "Social", value: "Social" }]}
                    name={"selectSubject"}
                    onChangeHandler={field.onChange}
                  />
                )}
              />

              <Controller
                name="selectTeacher"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <SelectInputField
                    title={"Assign Teacher"}
                    icon={<MdIcons.MdVerified className="mid-icon" />}
                    name={"selectTeacher"}
                    onChangeHandler={field.onChange}
                    options={[{ label: "Mishan ", value: "Mishan" }]}
                  />
                )}
              />
            </div>
            <button className="btn-edit" style={{ marginTop: 20 }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AssignTeacher;
