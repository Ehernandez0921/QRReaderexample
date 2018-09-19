import drawerConsts from "./DrawerConstants";
import drawerModel from './DrawerModel';
const DrawerReducer = (state = drawerModel, action) => {
  switch (action.type) {
    case drawerConsts.TOGGLE_RIGHT_DRAWER:
      return { ...state, ...action.payload }
    case drawerConsts.SET_DRAWER_MODEL:
      return { ...state, model: action.payload }
    case drawerConsts.SET_DRAWER_MODEL_COLUMNS:
      return { ...state, modelColumns: action.payload }
    case drawerConsts.SET_RIGHT_DRAWER_PROPS:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}
export default DrawerReducer;