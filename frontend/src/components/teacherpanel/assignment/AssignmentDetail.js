import React, { useState } from "react";
import InnerHeader from "./../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import { useParams } from "react-router-dom";
import AssignmentStudentTable from "./AssignmentStudentTable";
import ChangeInput from "./../../common/Modal/ChangeInput";
import { AssignmentInputValue } from "../../values/TeacherPanel/AssignmentInputValue";

function AssignmentDetail() {
  const [click, setClick] = useState(false);
  const { id } = useParams();

  const onSubmit = (data) => {
    console.log(data);
    setClick(false);
  };

  return (
    <React.Fragment>
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
                  <div className="content">Social</div>
                </div>
                <div className="info">
                  <h4>Class</h4>
                  <div className="content">12</div>
                </div>
                <div className="info">
                  <h4>Section</h4>
                  <div className="content">A</div>
                </div>
                <div className="info">
                  <h4>Teacher</h4>
                  <div className="content">Mishan Khatri</div>
                </div>
              </div>
              <div className="assignment_right">
                <div className="info">
                  <h4>Title</h4>
                  <div className="content">Title</div>
                </div>
                <div className="info">
                  <h4>Date Due</h4>
                  <div className="content">2022-12-02</div>
                </div>
                <div className="info">
                  <h4>Time Due</h4>
                  <div className="content">12:59 PM</div>
                </div>
                <div className="info">
                  <h4>File</h4>
                  <div className="content">
                    <a
                      className="btn-edit"
                      onClick={() => window.location.reload()}>
                      Preview File
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="instruction_info">
              <h4>Instruction</h4>
              <div className="content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                possimus deleniti ratione molestiae commodi, ipsam ipsa
                perferendis voluptatum voluptatibus impedit obcaecati ullam
                doloremque, aspernatur saepe non nisi nobis ab excepturi!
              </div>
            </div>
          </div>
        </div>
        <button className="btn-edit" onClick={() => setClick(!click)}>
          Edit
        </button>

        <div className="card-section">
          <h2 className="heading">Student Performance</h2>
          <div className="content-section">
            <AssignmentStudentTable />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AssignmentDetail;
