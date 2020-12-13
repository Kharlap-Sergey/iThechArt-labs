import { DISABLE_ALL, ENABLE_LOGIN, ENABLE_REGISTRATION } from "./types";

export const disableAllAction = () => ({
  type: DISABLE_ALL,
});
export const enableRegistrationActin = () => ({
  type: ENABLE_REGISTRATION,
});
export const enableLoginAction = () =>({
  type: ENABLE_LOGIN,
})

