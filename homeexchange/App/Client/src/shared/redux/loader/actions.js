import { DISABLE_ALL, ENABLE_ADFORM, ENABLE_LOGIN, ENABLE_PAGE_LIST, ENABLE_REGISTRATION } from "./constants";

export const disableAllAction = () => ({
  type: DISABLE_ALL,
});
export const enableRegistrationActin = () => ({
  type: ENABLE_REGISTRATION,
});
export const enablePageListActin = () => ({
  type: ENABLE_PAGE_LIST,
});
export const enableAdFromtActin = () => ({
  type: ENABLE_ADFORM,
});
export const enableLoginAction = () =>({
  type: ENABLE_LOGIN,
})

