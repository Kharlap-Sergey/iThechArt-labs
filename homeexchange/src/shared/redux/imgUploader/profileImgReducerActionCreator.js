import { CLEAR, SET} from "./types";

export const clearProfileImgAction = () => ({type: CLEAR})

export const setProfileImgAction = (file) => ({
    type: SET,
    payload: file
})
