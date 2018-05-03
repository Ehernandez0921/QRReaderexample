import headerConsts from './HeaderConstants';

export const setSearchValue = (value) => {
  console.log(value, 'HeaderActions.js 4 ');
  return { type: headerConsts.SET_SEARCH_VALUE, payload: value }
}
export default {
  setSearchValue
}