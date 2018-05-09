import tableConsts from "./TableConsts";
import tableModel from './TableModel';
const HeaderReducer = (state = tableModel, action) => {
  switch (action.type) {
    case tableConsts.SET_LOADING:
      return { ...state, loading: action.payload };
    case tableConsts.SET_FILTERED_RECORDS:
      action.payload;
      return { ...state, filteredRecords: action.payload };
    default:
      return state;
  }
}
export default HeaderReducer;