import React, { useState, useEffect } from "react";
import InnerHeader from "./../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import { useParams } from "react-router-dom";
import AssignmentStudentTable from "./AssignmentStudentTable";
import ChangeInput from "./../../common/Modal/ChangeInput";
import { AssignmentInputValue } from "../../values/TeacherPanel/AssignmentInputValue";
import { useDispatch, useSelector } from "react-redux";
import {
  AssignmentGivenById,
  GetStudentSubmittedAssignment,
} from "./../../../redux/actions/teacher/teacheractions";
import Loading from "../../common/Loading";
import moment from "moment";

function AssignmentDetail() {
  const [click, setClick] = useState(false);
  const [remarkClick, setRemarkClick] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { assignmentId, submittedAssignment } = useSelector(
    (state) => state.teachers
  );

  // const filterSubmittedViaClass = submittedAssignment.filter(value => )

  useEffect(() => {
    dispatch(AssignmentGivenById(id));
    dispatch(GetStudentSubmittedAssignment());
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    setClick(false);
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
      {remarkClick && (
        <ChangeInput
          onSubmit={onSubmit}
          valueArray={[]}
          click={remarkClick}
          setClick={setRemarkClick}
          heading={"Give Remarks"}
          isCustom2={true}
          placeholder={"Write Remark"}
          title="Remark"
        />
      )}
      <InnerHeader icon={<MdIcons.MdUploadFile />} name={`Assignments`} />
      <div className="main-content">
        <div className="card-section">
          <h2 className="assignment_id">
            {`Assignment : ${id > 9 ? id : "0" + id}`}
          </h2>
          <div className="content-section assignment_mid">
            <div className="grid_assignment">
              <div className="assignment_left">
                <div className="info">
                  <h4>Course</h4>
                  <div className="content">
                    {assignmentId.subject.subject_name}
                  </div>
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
                    {assignmentId.created_by.fullname}
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
          </div>
        </div>
        <button className="btn-edit" onClick={() => setClick(!click)}>
          Edit
        </button>

        <div className="card-section">
          <h2 className="heading">Student Performance</h2>
          <div className="content-section">
            <AssignmentStudentTable
              remarkClick={remarkClick}
              setRemarkClick={setRemarkClick}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Loading />
  );
}
export default AssignmentDetail;
