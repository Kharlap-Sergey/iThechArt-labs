import { CHENGE} from "./types";

export function chengeFormInputAction(newValue){
  return {
    type: CHENGE,
    value: newValue
  }
}