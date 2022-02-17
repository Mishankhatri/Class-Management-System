import axiosInstance from "./../axios";

export function GetPaginatedGradePromise(page = 1, previousData = []) {
  return axiosInstance
    .get(`/grades?page=${page}`)
    .then(({ data }) => {
      const { results } = data;
      const wholeArray = [...previousData, ...results];
      page++;
      if (data.next === null) {
        return wholeArray;
      }
      // return wholeArray;
      return GetPaginatedGradePromise(page, wholeArray);
    })
    .catch((error) => {
      if (error.response) console.log(error.response);
      else if (error.request) console.log(error.request);
      else console.log(error);
    });
}
