import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function MaterialTableContainer({ columns, url }) {
  const urlCopy = url;
  return (
    <>
      <MaterialTable
        options={{
          debounceInterval: 700,
          padding: "dense",
          search: true,
          pageSize: 10,
          pageSizeOptions: [10],
          filtering: true,
          exportButton: true,
          headerStyle: {
            fontFamily: "Open Sans",
            fontSize: 18,
            fontWeight: "bold",
          },
          searchFieldStyle: {
            paddingBottom: 10,
          },
          hideFilterIcons: true,
          filterRowStyle: {
            paddingBottom: 10,
          },
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "DownloadPdf"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "DownloadCSV"),
            },
          ],
        }}
        data={(query) =>
          new Promise((resolve, reject) => {
            console.log(query);
            if (query.search) {
              url = urlCopy + "&search=" + query.search;
            }
            url = url + "&page=" + (query.page + 1);
            fetch(url)
              .then((resp) => resp.json())
              .then((response) => {
                resolve({
                  data: response.results,
                  page: query.page,
                  totalCount: response.count,
                });
              });
          })
        }
        title={"Assign Teachers"}
        columns={columns}
      />
    </>
  );
}
export default MaterialTableContainer;
