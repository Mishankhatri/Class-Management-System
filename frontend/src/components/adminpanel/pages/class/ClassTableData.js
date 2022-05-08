import React, { useMemo } from "react";
import MaterialTableContainer from "../../../../common/MaterialTableContainer";

const ClassTableData = () => {
  const columns = useMemo(
    () => [
      {
        title: "SN",
        render: ({ tableData: { id: index } }) => {
          return index + 1;
        },
      },
      {
        title: "Class",
        field: "class_name",
      },
      {
        title: "Section",
        field: "section",
      },
    ],
    []
  );

  return (
    <div style={{ margin: "20px 30px" }}>
      <MaterialTableContainer
        columns={columns}
        url="grades"
        title="View Class"
      />
    </div>
  );
};

export default ClassTableData;
