import pageConsts from './PageConsts';
import { DrawerActions } from '../../UiState/UiActions';
import {isEqual} from 'lodash';
export const setPageSettings = (pageSettings) => {
  return (dispatch, getState) => {
    if(!isEqual(getState().drawer.menuItems,pageSettings.menuItems)){
      dispatch(DrawerActions.updateMenuItems(pageSettings.menuItems || []));
    }
    dispatch(updatePageSettings(pageSettings));
  }
}
export const updatePageSettings = (pageSettings) => {
  return { type: pageConsts.SET_PAGE_SETTINGS, payload: pageSettings }
}
export default {
  setPageSettings
}