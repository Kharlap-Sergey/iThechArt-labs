import { CLEAR, SET} from "./types";

export const clearProfileImgAction = () => ({type: CLEAR})

export const setProfileImgAction = (file, profileId) => ({
    type: SET,
    payload: {
        file,
        profileId: profileId
    }
})
