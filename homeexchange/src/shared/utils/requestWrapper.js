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
  post: (url, dataJson, contentType) => {
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
  delete: (url) => {
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + requestWrapper.getToken(),
      },
    };
    return fetch(url, options);
  },

  postFiles: (url, data) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + requestWrapper.getToken(),
      },
      body: data,
    };
    return fetch(url, options);
  },

  getFile: (url) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + requestWrapper.getToken(),
      },
    };
    return fetch(url, options);
  },
};
