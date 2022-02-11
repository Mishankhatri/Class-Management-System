import React, { useEffect, useMemo } from "react";
import { SelectColumnFilter } from "../../../common/Table/filters";
import TableContainer from "../../../common/Table/TableContainer";
import { useSelector, useDispatch } from "react-redux";
import { GetClass } from "../../../../redux/actions/classactions";

const ClassTableData = ({ click, setClick }) => {
  const { classes } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetClass());
  }, []);

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
        Header: "Class",
        accessor: "class_name",
        SearchAble: true,
        Filter: SelectColumnFilter,
      },
      {
        Header: "Section",
        accessor: "section",
        SearchAble: true,
        Filter: SelectColumnFilter,
      },
      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <button
                onClick={() => setClick(!click)}
                className="btn-primary btn-1 btn-custom">
                Edit
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
      {/* <div style={{ margin: "20px 30px", marginBottom: 50, width: "40rem" }}>
        <TableContainer columns={columns} data={classes} />
      </div> */}

      <div className="main-content">
        <div className="card-section">
          <div className="heading">
            <span className="title-icon"></span>
            <span className="title">View Class With Section</span>
          </div>
          <div className="content-section" style={{ margin: "20px 30px" }}>
            <TableContainer columns={columns} data={classes} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassTableData;
