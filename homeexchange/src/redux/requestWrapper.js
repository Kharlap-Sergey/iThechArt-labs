export const requestWrapper = {
  get: (url, token="") => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
    return fetch(url, options);
  },
  post: (url, dataJson, token="") => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(dataJson),
    }
    return  fetch(url, options);
  },
  deleteByIdQueryParam:
  (url,token="") => {
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
    return  fetch(url, options);
  },
}