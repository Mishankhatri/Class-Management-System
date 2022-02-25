import React, { useEffect, useState } from "react";
import InnerHeader from "./../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import { useParams } from "react-router-dom";
import ChangeInput from "./../../common/Modal/ChangeInput";
import { AssignmentInputValue } from "./../../values/TeacherPanel/AssignmentInputValue";
import { Controller, useForm } from "react-hook-form";
import { FileInput } from "../../common/InputField/FileInput";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { AssignmentGivenById } from "../../../redux/actions/teacher/teacheractions";
import Loading from "../../common/Loading";

function UploadAssignment() {
  const [click, setClick] = useState(false);
  const { handleSubmit, control } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AssignmentGivenById(id));
  }, []);

  const { assignmentId, submittedAssignment } = useSelector(
    (state) => state.teachers
  );

  const date =
    assignmentId && assignmentId.date_due + "T" + assignmentId.time_due;

  const isOnTime = assignmentId && moment(date).isSameOrAfter(new Date());

  const onSubmit = (data) => {
    console.log(data);
    setClick(false);
  };

  const onSubmitAssignment = (data) => {
    console.log(data);
  };

  return assignmentId ? (
    <React.Fragment>
      {click && (
        <ChangeInput
          onSubmit={onSubmit}
          valueArray={AssignmentInputValue()}
          click={click}
          setClick={setClick}
          heading={"Edit Assignment"}
          isCustom2={true}
          hasFile={true}
          fileName={"assignmentFile"}
          fileTitle={"Upload File"}
          fileIcon={<MdIcons.MdFileUpload className="mid-icon" />}
        />
      )}

      <InnerHeader
        icon={<MdIcons.MdUploadFile />}
        name={`Assignments No: ${id}`}
      />
      <div className="main-content">
        <div className="card-section">
          <h2 className="assignment_id">Assignment - 0{id}</h2>
          <div className="content-section assignment_mid">
            <div className="grid_assignment">
              <div className="assignment_left">
                <div className="info">
                  <h4>Course</h4>
                  <div className="content">{assignmentId.subject}</div>
                </div>
                <div className="info">
                  <h4>Class</h4>
                  <div className="content">
                    {assignmentId.for_grade.class_name}
                  </div>
                </div>
                <div className="info">
                  <h4>Section</h4>
                  <div className="content">
                    {assignmentId.for_grade.section}
                  </div>
                </div>
                <div className="info">
                  <h4>Teacher</h4>
                  <div className="content">
                    {assignmentId.created_by.username}
                  </div>
                </div>
              </div>
              <div className="assignment_right">
                <div className="info">
                  <h4>Title</h4>
                  <div className="content">{assignmentId.title}</div>
                </div>
                <div className="info">
                  <h4>Date Due</h4>
                  <div className="content">{assignmentId.date_due}</div>
                </div>
                <div className="info">
                  <h4>Time Due</h4>
                  <div className="content">
                    {moment(assignmentId.time_due, "HH").format("LT")}
                  </div>
                </div>
                <div className="info">
                  <h4>File</h4>
                  <div className="content">
                    <a
                      href={assignmentId.related_files}
                      style={{ textDecoration: "none" }}
                      className="btn-edit">
                      Preview File
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="instruction_info">
              <h4>Instruction</h4>
              <div className="content">{assignmentId.instructions}</div>
            </div>
            <div className="instruction_info">
              <h4>Upload Assignment</h4>
              {isOnTime ? (
                <form onSubmit={handleSubmit(onSubmitAssignment)}>
                  <Controller
                    name={"assigmentFile"}
                    control={control}
                    defaultValue=""
                    render={(props) => (
                      <FileInput
                        name={"assigmentFile"}
                        title={"Upload File"}
                        icon={<MdIcons.MdFileCopy className="mid-icon" />}
                        isRequired={true}
                        isImageFile={false}
                        onChange={(event) =>
                          props.field.onChange(event.target.files)
                        }
                      />
                    )}
                  />
                  <button className="btn-edit" style={{ marginTop: 20 }}>
                    Submit
                  </button>
                </form>
              ) : (
                <h5
                  style={{
                    marginTop: 20,
                    color: "#a94442",
                    backgroundColor: "#f2dede",
                    padding: 10,
                    borderRadius: 4,
                  }}>
                  Submitted Date has already Passed. Please consult respective
                  teacher.
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Loading />
  );
}
export default UploadAssignment;
