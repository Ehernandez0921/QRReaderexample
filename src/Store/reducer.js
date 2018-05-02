import { combineReducers } from 'redux';
import UiReducers from "./UiState/UiReducers";
import DataReducers from './DataState/DataReducers';
export default combineReducers({
  ...UiReducers,
  ...DataReducers
});