import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TableContainer from "./../../../common/Table/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { TeacherDetail } from "../../../../redux/actions/teacher/teacheractions";

const TeacherTableData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const

  const data = [];

  useEffect(() => {
    dispatch(TeacherDetail());
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
        Header: "User Name",
        accessor: "username",
        SearchAble: true,
      },
      {
        Header: "Name",
        accessor: "name",
        SearchAble: true,
      },
      {
        Header: "Phone",
        accessor: "phone",
        SearchAble: true,
      },
      {
        Header: "Email",
        accessor: "email",
        SearchAble: true,
      },
      {
        Header: "City",
        accessor: "address.city",
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
        <TableContainer columns={columns} data={data} />
      </div>
    </>
  );
};

export default TeacherTableData;
