import headerConsts from "./HeaderConstants";
import headerModel from './HeaderModel';
const HeaderReducer = (state = headerModel, action) => {
  switch (action.type) {
    case headerConsts.SET_SEARCH_VALUE:
      console.log(action.payload, 'HeaderReducer.js 6 ');
      return { ...state, searchValue: action.payload }
    default:
      return state;
  }
}
export default HeaderReducer;