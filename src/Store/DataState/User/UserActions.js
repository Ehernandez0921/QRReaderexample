import { fetchUser } from './UserAPI'
import userConsts from './UserConsts';
export const fetchMe = () => (dispatch, getState) => {
  fetchUser().then(response => response.json()).then(user => dispatch(loadUser(user)))
}
export const loadUser = (user) => {
  return {
    type: userConsts.LOAD_USER,
    payload: user
  }
}
export default {
  fetchMe
}