import { DISABLE_ALL, ENABLE_LOGIN } from "./types";

export const disableAllAction = () => ({
  type: DISABLE_ALL,
});

export const enableLoginAction = () =>({
  type: ENABLE_LOGIN,
})

