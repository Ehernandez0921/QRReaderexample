import drawerConsts from "./DrawerConstants";
export const updateUser = user => {
  return { type: drawerConsts.UPDATE_USER, payload: user }
}
export const toggleDrawer = show => {
  return { type: drawerConsts.TOGGLE_DRAWER, payload: { show } }
}
export const updateMenuItems = (menuItems) => {
  return { type: drawerConsts.UPDATE_MENU_ITEMS, payload: { menuItems } }
}
export default {
  updateUser,
  toggleDrawer,
  updateMenuItems
}