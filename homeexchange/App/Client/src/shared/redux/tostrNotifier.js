import { toastr } from "react-redux-toastr";

export const toastrNotifier = {
  alertBadResponse: async (response) => {
    try {
      const data = await response.json();
      toastr.error("something went wrong", data.Message);
    } catch {
      toastr.error("something went wrong", "please try again later");
    }
  },
  tryAgainLater: () => {
    toastr.error("something went wrong", "please try again later");
  },
};
