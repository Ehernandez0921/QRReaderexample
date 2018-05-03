import { DrawerActions, HeaderActions } from '../../Store/UiState/UiActions';
import { PageActions } from '../../Store/DataState/DataActions';
export const mapStateToProps = (state) => {
  return state;
};
export const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: show => dispatch(DrawerActions.toggleDrawer(show)),
    updateMenuItems: menuItems => dispatch(DrawerActions.updateMenuItems(menuItems)),
    setPageSettings: pageSettings => dispatch(PageActions.setPageSettings(pageSettings)),
    setSearchValue: searchValue => dispatch(HeaderActions.setSearchValue(searchValue))
    // fetchData: (url) => dispatch(itemsFetchData(url))
  };
};
export default {
  mapStateToProps,
  mapDispatchToProps
}