import React, { useEffect, useState } from "react";
import InnerHeader from "./../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import { useParams } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import { FileInput } from "../../common/InputField/FileInput";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { AssignmentGivenById } from "../../../redux/actions/teacher/teacheractions";
import Loading from "../../common/Loading";
import {
  AddStudentSubmitAssignment,
  ChangeSubmittedAssignment,
  GetSubmittedAssignmentFilter,
} from "../../../redux/actions/student/studentactions";

function UploadAssignment() {
  const { handleSubmit, control } = useForm();
  const { handleSubmit: reHandleSubmit, control: reControl } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  let submittedFiles = [];

  useEffect(() => {
    dispatch(AssignmentGivenById(id));
    dispatch(
      GetSubmittedAssignmentFilter(`student=${user.id}&assignment=${id}`)
    );
  }, []);

  const { assignmentId } = useSelector((state) => state.teachers);
  const { filterStudentAssignment } = useSelector((state) => state.students);

  const date =
    assignmentId && assignmentId.date_due + "T" + assignmentId.time_due;

  const isOnTime = assignmentId && moment(date).isSameOrAfter(new Date());

  if (filterStudentAssignment && filterStudentAssignment.count !== 0) {
    submittedFiles = filterStudentAssignment.results[0];
  }

  const onSubmitAssignment = (data, e) => {
    const postData = new FormData();
    postData.append("submitted_files", data.assigmentFile);
    postData.append("assignment", id);
    postData.append("student", user.id);
    dispatch(AddStudentSubmitAssignment(postData, user, id));
    e.target.reset();
  };

  const reSubmitAssignment = (data, e) => {
    const postData = new FormData();
    postData.append("submitted_files", data.reSubmitFile);
    dispatch(
      ChangeSubmittedAssignment(
        postData,
        filterStudentAssignment.results[0].id,
        user.id,
        id
      )
    );
    e.target.reset();
  };

  return assignmentId ? (
    <React.Fragment>
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
                    {assignmentId.related_files ? (
                      <a
                        href={assignmentId.related_files}
                        style={{ textDecoration: "none" }}
                        className="btn-edit">
                        Preview File
                      </a>
                    ) : (
                      <p>No file Provided</p>
                    )}
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

              {filterStudentAssignment &&
              filterStudentAssignment.count === 0 ? (
                isOnTime ? (
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
                            props.field.onChange(event.target.files[0])
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
                )
              ) : (
                <>
                  <h5 className="message">
                    Assignment has been submitted already. Wanna change
                    submitted files?
                    <a
                      href={submittedFiles.submitted_files}
                      target="_blank"
                      style={{ marginLeft: 10, textDecoration: "none" }}
                      className="btn-custom btn-primary">
                      View Submitted Files
                    </a>
                  </h5>

                  {isOnTime ? (
                    <form onSubmit={reHandleSubmit(reSubmitAssignment)}>
                      <Controller
                        name={"reSubmitFile"}
                        control={reControl}
                        defaultValue=""
                        render={(props) => (
                          <FileInput
                            name={"reSubmitFile"}
                            isImageFile={false}
                            onChange={(event) =>
                              props.field.onChange(event.target.files[0])
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
                        color: "#428aa9",
                        backgroundColor: "#deedf2",
                        padding: 10,
                        borderRadius: 4,
                      }}>
                      Submitted Date has already Passed. You can't resubmited
                      the files.
                    </h5>
                  )}
                </>
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
