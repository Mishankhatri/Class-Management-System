import axiosInstance from "./../axios";

// export function GetPaginatedGradePromise(page = 1, previousData = []) {
//   return axiosInstance
//     .get(`/grades?page=${page}`)
//     .then(({ data }) => {
//       const { results } = data;
//       const wholeArray = [...previousData, ...results];
//       page++;
//       if (data.next === null) {
//         return wholeArray;
//       }
//       // return wholeArray;
//       return GetPaginatedGradePromise(page, wholeArray);
//     })
//     .catch((error) => {
//       if (error.response) console.log(error.response);
//       else if (error.request) console.log(error.request);
//       else console.log(error);
//     });
// }

export function GetPaginatedPromise(url, previousData = []) {
  return new Promise(function (resolve, reject) {
    axiosInstance
      .get(url)
      .then(({ data: dataPage }) => {
        for (let i = 0; i < dataPage.total_pages; i++) {
          axiosInstance.get(`/${url}?page=${i + 1}`).then(({ data }) => {
            const { results } = data;
            const wholeArray = [...previousData, ...results];
            if (data.next === null) {
              resolve(wholeArray);
            }
          });
        }
      })
      .catch((error) => {
        if (error.response) console.log(error.response);
        else if (error.request) console.log(error.request);
        else console.log(error);
      });
  });
}
export function GetPaginatedAssignedPromise(url, userid, previousData = []) {
  return new Promise(function (resolve) {
    axiosInstance
      .get(`/${url}/?user=${userid}`)
      .then(({ data: dataPage }) => {
        for (let i = 0; i < dataPage.total_pages; i++) {
          axiosInstance
            .get(`/${url}/?user=${userid}&page=${i + 1}`)
            .then(({ data }) => {
              const results = data.results;
              const wholeArray = [...previousData, ...results];
              if (data.next === null) {
                resolve(wholeArray);
              }
            });
        }
      })
      .catch((error) => {
        if (error.response) console.log(error.response);
        else if (error.request) console.log(error.request);
        else console.log(error);
      });
  });
}

export function GetPaginatedFilterPromise(
  url,
  filter,
  page = 1,
  previousData = []
) {
  return axiosInstance
    .get(`/${url}?${filter}&page=${page}`)
    .then(({ data }) => {
      const { results } = data;
      const wholeArray = [...previousData, ...results];
      page++;
      if (data.next === null) {
        return wholeArray;
      }
      // return wholeArray;
      return GetPaginatedFilterPromise(url, filter, page, wholeArray);
    })
    .catch((error) => {
      if (error.response) console.log(error.response);
      else if (error.request) console.log(error.request);
      else console.log(error);
    });
}

export function GetPaginatedGradePromise(previousData = []) {
  return new Promise(function (resolve, reject) {
    axiosInstance
      .get("grades")
      .then(({ data: dataPage }) => {
        for (let i = 0; i < dataPage.total_pages; i++) {
          axiosInstance.get(`/grades?page=${i + 1}`).then(({ data }) => {
            const { results } = data;
            const wholeArray = [...previousData, ...results];
            if (data.next === null) {
              resolve(wholeArray);
            }
          });
        }
      })
      .catch((error) => {
        if (error.response) console.log(error.response);
        else if (error.request) console.log(error.request);
        else console.log(error);
      });
  });
}
