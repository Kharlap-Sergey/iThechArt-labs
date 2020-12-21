import { CLEAR, SET} from "./types";

export const clearProfileImgAction = () => ({type: CLEAR})

export const setProfileImgAction = (file, profId) => ({
    type: SET,
    payload: {
        file,
        id: profId
    }
})
