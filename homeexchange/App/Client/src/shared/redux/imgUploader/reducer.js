import { CLEAR, SET} from "./constants";
import { produce } from 'immer';

const initialState = {};

export const profileImgReducer = (state = initialState, action) => {
  return produce(state, draft=>{
    switch (action.type) {
      case SET:
        const id = action.payload.profileId;
        const file = action.payload.file;
        draft[id] = file;
        break;
      case CLEAR:
        draft = initialState;
        break;
    }
  })
};
