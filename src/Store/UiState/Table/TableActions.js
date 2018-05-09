import tableConsts from './TableConsts';

export const setLoading = (loading) => {
  return { type: tableConsts.SET_LOADING, payload: loading }
}
export const setFilteredRecords = (filteredRecords) => {
  return { type: tableConsts.SET_FILTERED_RECORDS, payload: filteredRecords }
}

export default {
  setLoading,
  setFilteredRecords
}