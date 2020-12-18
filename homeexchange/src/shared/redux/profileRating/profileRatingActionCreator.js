import { CLEAR, SET, UPDATE } from "./types";

export const clearProfileRatingAction = () => ({type: CLEAR})

export const setProfileRatingAction = (votes) => ({
    type: SET,
    payload: votes
})

export const updateProfileRatingAction = (vote) => ({
    type: UPDATE,
    payload: vote
})