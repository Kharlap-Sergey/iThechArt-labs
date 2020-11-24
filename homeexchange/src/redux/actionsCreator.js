import { CHENGE_LOGIN, CHENGE_REG } from "./types";

export function chengeLogFormInputAction(newValue){
  return {
    type: CHENGE_LOGIN,
    value: newValue
  }
}

export function chengeRegFormInputAction(newValue){
  return {
    type: CHENGE_REG,
    value: newValue
  }
}