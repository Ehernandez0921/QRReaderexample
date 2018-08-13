import { API } from '../App/AppConsts'
export const LOAD_USER = 'LOAD_USER';
export const ERROR_LOADING = 'ERROR_LOADING';
export const userApi = `${API}gmitUtilities/api/adUsers`;
export default {
  userApi,
  LOAD_USER,
  ERROR_LOADING
}