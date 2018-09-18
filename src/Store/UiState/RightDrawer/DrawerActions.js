import drawerConsts from "./DrawerConstants";
export const toggleDrawer = show => {
  return { type: drawerConsts.TOGGLE_DRAWER, payload: { show } }
}
export const setDrawerModel = model => {
  return {
    type: drawerConsts.SET_DRAWER_MODEL,
    payload: model
  }
}
export default {
  toggleDrawer,
  setDrawerModel
}