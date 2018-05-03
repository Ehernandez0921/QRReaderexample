import headerConsts from './HeaderConstants';

export const setSearchValue = (value) => {
  return { type: headerConsts.SET_SEARCH_VALUE, payload: value }
}
export default {
  setSearchValue
}