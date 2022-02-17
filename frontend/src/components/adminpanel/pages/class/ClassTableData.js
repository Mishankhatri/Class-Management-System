import React, { useEffect, useState, useMemo } from "react";
import { SelectColumnFilter } from "../../../common/Table/filters";
import TableContainer from "../../../common/Table/TableContainer";
import { useSelector, useDispatch } from "react-redux";
import CustomConfirm from "./../../../common/CustomConfirm";
import Loading from "./../../../common/Loading";
import {
  DeleteClassSec,
  GetClass,
} from "../../../../redux/actions/classactions";

const ClassTableData = ({ click, setClick }) => {
  const { grades: classes } = useSelector((state) => state.classes);
  const dispatch = useDispatch();
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  useEffect(() => {
    dispatch(GetClass());
  }, []);

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
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
              <button
                className="btn-danger btn-custom"
                onClick={() => handleDelete(row.original.id)}>
                Delete
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      {clickDelete && (
        <CustomConfirm
          title={"Delete User"}
          msg={"Are you sure you want to delete?"}
          trueActivity={"Yes"}
          falseActivity={"Cancel"}
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={DeleteClassSec}
        />
      )}
      <div className="main-content">
        <div className="card-section">
          <div className="heading">
            <span className="title-icon"></span>
            <span className="title">View Class With Section</span>
          </div>
          <div className="content-section" style={{ margin: "20px 30px" }}>
            {classes ? (
              <TableContainer columns={columns} data={classes} />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassTableData;
