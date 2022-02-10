import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TableContainer from "./../../../common/Table/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  StudentDetail,
  CLassList,
} from "../../../../redux/actions/student/studentactions";

const StudentTableData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { student: fetchData } = useSelector((state) => state.students);
  const { classes: classSec } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(StudentDetail());
    dispatch(CLassList());
  }, []);

  const onOpen = (post) => {
    navigate(`${post.id}`);
  };

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        SearchAble: false,
        Cell: ({ row: { index } }) => {
          return index + 1;
        },
      },
      {
        Header: "Full Name",
        accessor: (d) => {
          if (d.middleName == null) {
            d.middleName = "";
          }
          return `${d.first_name} ${d.middleName} ${d.last_name}`;
        },
        SearchAble: true,
      },

      {
        Header: "Phone",
        accessor: "contact_no",
        SearchAble: true,
      },
      {
        Header: "Email",
        accessor: "email",
        SearchAble: true,
      },
      {
        Header: "Class",
        accessor: (d) => {
          const filterData =
            classSec && classSec.find((value) => value.id == d.current_grade);

          return `${filterData?.class_name} : ${filterData?.section?.section}`;
        },
        SearchAble: true,
      },
      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <button
                onClick={() => onOpen(row.original)}
                className="btn-primary btn-1 btn-custom">
                Open
              </button>
              <button className="btn-danger btn-custom">Delete</button>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {fetchData && <TableContainer columns={columns} data={fetchData} />}
      </div>
    </>
  );
};

export default StudentTableData;
