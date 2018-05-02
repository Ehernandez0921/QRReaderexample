import { DrawerActions } from '../../Store/UiState/UiActions';
export const mapStateToProps = (state) => {
  return state;
};
export const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: show => dispatch(DrawerActions.toggleDrawer(show)),
    updateMenuItems: menuItems => dispatch(DrawerActions.updateMenuItems(menuItems))
    // fetchData: (url) => dispatch(itemsFetchData(url))
  };
};
export default {
  mapStateToProps,
  mapDispatchToProps
}