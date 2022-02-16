import axiosInstance from "./../axios";

export function GetGradeOptions(page = 1, previousResponse = []) {
  return axiosInstance.get(`/grades?page=${page}`).then(({ results }) => {
    const response = [...previousResponse, ...results];
    if (results.length !== 0) {
      page++;
      return GetGradeOptions(page, response);
    }
    return response;
  });
}
