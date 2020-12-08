import { auth } from "./auth";
export const requestWrapper = {
  getToken: () => {
    return auth.getToken() ?? "";
  },
  get: (url) => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + requestWrapper.getToken(),
      },
    };
    return fetch(url, options);
  },
  post: (url, dataJson) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + requestWrapper.getToken(),
      },
      body: JSON.stringify(dataJson),
    };
    return fetch(url, options);
  },
  deleteByIdQueryParam: (url) => {
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + requestWrapper.getToken(),
      },
    };
    return fetch(url, options);
  },
};
