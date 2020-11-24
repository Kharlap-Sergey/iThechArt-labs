import {combineReducers} from 'redux'
import { accountFormReducer } from './accountFormReducer'
export const rootReducer = combineReducers({
  accauntForm: accountFormReducer
})