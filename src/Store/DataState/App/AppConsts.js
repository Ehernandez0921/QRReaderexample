export const appName = "Default App"
export const SET_APP_SETTINGS = 'SET_APP_SETTINGS';
export const API = process.env.NODE_ENV === 'production' ? 'http://vrtx.dow.com/' : 'http://vrtx.dow.com/';
export default {
  appName,
  SET_APP_SETTINGS,
  API
}