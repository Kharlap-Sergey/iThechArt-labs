export const auth = {
  setToken: (token) => {
    localStorage.setItem("token", token);
  },
  clearToken: () => {
    localStorage.removeItem("token");
  },
  getToken: () => {
    return localStorage.getItem("token");
  },
  isAuth: () => {
    return Boolean(this.getToken());
  },
};
