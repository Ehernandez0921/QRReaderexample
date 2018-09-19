import drawerConsts from "./DrawerConstants";
import drawerModel from './DrawerModel';
const DrawerReducer = (state = drawerModel, action) => {
  switch (action.type) {
    case drawerConsts.TOGGLE_RIGHT_DRAWER:
    console.log( 'DrawerReducer.js Line-6')
      return { ...state, ...action.payload }
    case drawerConsts.SET_DRAWER_MODEL:
      return { ...state, model: action.payload }
    default:
      return state;
  }
}
export default DrawerReducer;