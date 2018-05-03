import pageConsts from "./PageConsts";
import pageModel from './PageModel';
const PageReducer = (state = pageModel, action) => {
  switch (action.type) {
    case pageConsts.SET_PAGE_SETTINGS:
      return action.payload;
    default:
      return state;
  }
}
export default PageReducer;