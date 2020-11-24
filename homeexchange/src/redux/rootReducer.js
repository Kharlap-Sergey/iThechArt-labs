import {coombineReducers} from 'redux'
import { accautFormReducer } from './accautFormReducer'
export const rootReducer = coombineReducers({
  accauntForm: accautFormReducer
})