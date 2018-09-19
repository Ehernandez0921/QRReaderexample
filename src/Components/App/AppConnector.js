import { DrawerActions, HeaderActions, RightDrawerActions } from '../../Store/UiState/UiActions';
import { PageActions, UserActions } from '../../Store/DataState/DataActions';
export const mapStateToProps = (state) => {
  return state;
};
export const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: show => dispatch(DrawerActions.toggleDrawer(show)),
    updateMenuItems: menuItems => dispatch(DrawerActions.updateMenuItems(menuItems)),
    setPageSettings: pageSettings => dispatch(PageActions.setPageSettings(pageSettings)),
    setSearchValue: searchValue => dispatch(HeaderActions.setSearchValue(searchValue)),
    rightDrawerActions: {
      toggleDrawer: show => dispatch(RightDrawerActions.toggleDrawer(show)),
      setModelColumns: columns => dispatch(RightDrawerActions.setDrawerModelColumns(columns))
    },
    userActions: {
      fetchMe: () => dispatch(UserActions.fetchMe())
    }
    // fetchData: (url) => dispatch(itemsFetchData(url))
  };
};
export default {
  mapStateToProps,
  mapDispatchToProps
}