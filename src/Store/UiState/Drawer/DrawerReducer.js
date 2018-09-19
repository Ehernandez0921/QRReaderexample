import drawerConsts from "./DrawerConstants";
import drawerModel from './DrawerModel';
const DrawerReducer = (state = drawerModel, action) => {
  switch (action.type) {
    case drawerConsts.UPDATE_USER:
      return { ...state, ...{ user: action.payload } }
    case drawerConsts.TOGGLE_DRAWER:
    console.log( 'DrawerReducer.js Line-8')
      return { ...state, ...action.payload }
    case drawerConsts.UPDATE_MENU_ITEMS:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}
export default DrawerReducer;