import { path } from './../../utils/path';

export function loginUserPost(user) {
  return async (dispatch) => {
    dispatch(startLoadingAction())
    try {
      const url = path.account.login();
      const response = await requestWrapper.post(url, user);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        auth.setToken(data.jwt);
        dispatch(
          loginUserAction({
            email: data.user.email,
            userId: data.user.id,
          })
        );
        dispatch(redirectToAction("/"));
      } else {
        console.log("some");
        const data = await response.json();
        toastr.error(data.errorText, "");
        console.log(data.errorText)
      }
    } catch (e) {
      console.log(e);
      toastr.error("try again later", e.toString());
    }
    dispatch(endLoadingAction())
  }; 
}