import React, { useMemo } from "react";
import TableContainer from "./../../common/Table/TableContainer";
import moment from "moment";

const AssignmentStudentTable = ({ remarkClick, setRemarkClick, data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "SN",
        Cell: ({ row }) => {
          return row.index + 1;
        },
      },
      {
        Header: "Photo",
        accessor: (d) => {
          return (
            <div className="profilephoto">
              <img src={d.student.profile_image} alt="profile" />
            </div>
          );
        },
        SearchAble: false,
      },
      {
        Header: "Student Name",
        accessor: "student.username",
        SearchAble: true,
      },
      {
        Header: "Email",
        accessor: "student.email",
        SearchAble: true,
      },

      {
        Header: "Submitted Date",
        accessor: (d) => {
          return d.created_at.slice(0, 10);
        },
        SearchAble: false,
      },
      {
        Header: "Submitted Time",
        accessor: (d) => {
          const time = moment(d.created_at.slice(11, 19), "HH:mm").format("LT");
          return time;
        },
        SearchAble: false,
      },
      {
        Header: "File",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <a
              href={row.original.submitted_files}
              target="_blank"
              className="btn-primary btn-custom"
              style={{ textDecoration: "none" }}>
              View
            </a>
          );
        },
      },
      // {
      //   Header: "Remark",
      //   SearchAble: false,
      //   className: "col_remark",
      //   Cell: ({ row }) => {
      //     return (
      //       <>
      //         <button
      //           className="btn-custom btn-danger"
      //           style={{ backgroundColor: "teal" }}
      //           onClick={() => setRemarkClick(!remarkClick)}>
      //           Remark
      //         </button>
      //       </>
      //     );
      //   },
      // },
    ],
    []
  );

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <TableContainer columns={columns} data={data} />
      </div>
    </>
  );
};

export default AssignmentStudentTable;
