import React, { useEffect, useMemo, useState } from "react";
import { GetPaginatedFilterPromise } from "../../GetOptions";
import TableContainer from "./../../common/Table/TableContainer";

const AssignmentPendingList = ({ data, assignment }) => {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      const studentList = await GetPaginatedFilterPromise(
        "student",
        `grade=${assignment.for_grade.id}`
      );
      if (data.length === 0) return setStudent(studentList);
      else {
        let studentCopy = [...studentList];
        for (let i = 0; i < data.length; i++) {
          const filterList = studentCopy.filter(
            (value) => value.user.id !== data[i].student.id
          );

          if (i != data.length - 1) studentCopy = [...filterList];
          else setStudent(filterList);
        }
      }
    };
    getOptions();
  }, []);

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
              <img src={d.user.profile_image} alt="profile" />
            </div>
          );
        },
        SearchAble: false,
      },
      {
        Header: "Student Name",
        accessor: (d) =>
          `${d.first_name} ${d.middle_name ? d.middle_name : ""} ${
            d.last_name
          }`,
        SearchAble: true,
      },
      {
        Header: "Username",
        accessor: "user.username",
        SearchAble: true,
      },
      {
        Header: "Email",
        accessor: "user.email",
        SearchAble: true,
      },
    ],
    []
  );

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {student && <TableContainer columns={columns} data={student} />}
      </div>
    </>
  );
};

export default AssignmentPendingList;
