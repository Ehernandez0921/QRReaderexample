import drawerConsts from "./DrawerConstants";
export const toggleDrawer = show => {
  return { type: drawerConsts.TOGGLE_RIGHT_DRAWER, payload: { show } }
}
export const setDrawerModelColumns = columns => {
  return {
    type: drawerConsts.SET_DRAWER_MODEL_COLUMNS,
    payload: columns
  }
}
export const setDrawerModel = model => {
  return {
    type: drawerConsts.SET_DRAWER_MODEL,
    payload: model
  }
}
export default {
  toggleDrawer,
  setDrawerModel,
  setDrawerModelColumns
}