import React from "react";
import MaterialTable from "@material-table/core";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadDataTable,
  SaveQueryData,
} from "../redux/actions/admin/adminaction";

function MaterialTableContainer({
  columns,
  deleteid,
  // dataSources,
  url,
  title,
  sorting = false,
}) {
  const dispatch = useDispatch();

  const getData = (query) =>
    new Promise((resolve) => {
      dispatch(SaveQueryData(query));
      dispatch(LoadDataTable(url, query)).then((dataSources) => {
        resolve({
          data: dataSources.results,
          page: query.page,
          totalCount: dataSources.count,
        });
      });
    });

  return (
    <>
      <MaterialTable
        options={{
          debounceInterval: 700,
          padding: "dense",
          search: true,
          pageSize: 10,
          pageSizeOptions: [10],
          sorting,
          headerStyle: {
            fontFamily: "Open Sans",
            fontSize: 18,
            fontWeight: "bold",
          },
          searchFieldStyle: {
            paddingBottom: 10,
          },
        }}
        data={getData}
        title={title}
        columns={columns}
      />
    </>
  );
}

export default MaterialTableContainer;
