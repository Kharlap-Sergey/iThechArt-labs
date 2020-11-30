import { REDIRECT_CLEAR, REDIRECT_TO } from "./types"

export const redirectToHomeFromAction = (path)=>
{
  return {
    type: REDIRECT_TO,
    payload: {path: path}
  }
}

export const redirectClear = () =>{
  return {
    type: REDIRECT_CLEAR
  }
}