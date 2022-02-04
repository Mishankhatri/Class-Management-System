import React, { useMemo } from "react";
import InnerHeader from "../../common/InnerHeader";
import * as MdIcons from "react-icons/md";

import InternalMark from "../../values/StudentPanel/InternalMarksValue";
import TableContainer from "./../../common/Table/TableContainer";
import { NumberRangeColumnFilter } from "../../common/Table/filters";

function ViewInternalMark() {
  const data = InternalMark();

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
        accessor: "class",
        SearchAble: true,
      },
      {
        Header: "Subject",
        accessor: "subject",
        SearchAble: true,
      },
      {
        Header: "Marks",
        accessor: "marks",
        SearchAble: true,
        Filter: NumberRangeColumnFilter,
        filter: "between",
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <InnerHeader
        icon={<MdIcons.MdPersonAdd />}
        name={"View Internal Marks"}
      />
      <div className="main-content">
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <MdIcons.MdVerifiedUser />
            </span>
            <span className="title">View Internal Marks</span> {/*Custom  */}
          </div>

          <div className="content-section">
            <div className="mid-content">
              <TableContainer data={data} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ViewInternalMark;
