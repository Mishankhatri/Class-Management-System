import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectColumnFilter } from "../../common/Table/filters";
import TableContainer from "../../common/Table/TableContainer";
import Moment from "react-moment";

import reverseArray from "../../common/ReverseArray";

import { GetTeacherAnnouncement } from "./../../../redux/actions/teacher/teacheractions";
import Loading from "./../../common/Loading";

const AnnouncementTeacher = () => {
  const { teachernotices: data } = useSelector((state) => state.teachers);

  const { user } = useSelector((state) => state.auth);
  const { student } = useSelector((state) => state.students);

  const filterStudent =
    student && student.find((value) => value.user.id === user.id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetTeacherAnnouncement());
  }, [dispatch]);

  const newArray =
    data &&
    reverseArray(data).filter(
      (value) =>
        value.announcement_for_class.class_name ==
          filterStudent.current_grade.class_name &&
        value.announcement_for_class.section ==
          filterStudent.current_grade.section
    );

  // console.log(data.reverse());
  const columns = useMemo(
    () => [
      {
        Header: "SN",
        SearchAble: false,
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Details",
        className: "detail-column",
        accessor: (rowData) => {
          const dates = <Moment fromNow>{rowData.created_at}</Moment>;

          return (
            <div className="announcementtable">
              <div>
                <div className="title">Title : {rowData.title}</div>
                <div className="subjects">Subjects: {rowData.details}</div>

                <div className="createdate">
                  <div className="info">
                    <span className="date">
                      Date: {rowData.created_at.slice(0, 10)}
                    </span>
                    <span className="announced">
                      Announced By:{"  "}
                      <span className="createdby">
                        {rowData.created_by.fullname}
                      </span>
                    </span>
                    <span>
                      <span className="createdat">{dates}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="profilephoto">
                <img src={rowData.created_by.profile_image} alt="profile" />
              </div>
            </div>
          );
        },
      },
      {
        Header: "Files",
        accessor: (rowData) => {
          return rowData.files_by_teachers ? (
            <a
              href={rowData.files_by_teachers}
              target="_blank"
              className="btn-primary btn-custom"
              style={{ textDecoration: "none" }}>
              Download
            </a>
          ) : (
            <p>No file Provided</p>
          );
        },
      },
    ],
    []
  );

  return student ? (
    <>
      <div>
        {data && (
          <TableContainer
            columns={columns}
            data={newArray}
            showSearch={false}
          />
        )}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default AnnouncementTeacher;
