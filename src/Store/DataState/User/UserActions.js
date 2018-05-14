import { fetchUser } from './UserAPI'
import userConsts from './UserConsts';
export const fetchMe = () => (dispatch, getState) => {
  fetchUser()
    .then(response => {
      if (!response.ok) dispatch(errorLoadingUser(response.statusText));
      return response.json();
    })
    .then(user => dispatch(loadUser(user))
    ).catch((error) => dispatch(errorLoadingUser(error)));
}
export const loadUser = (user) => {
  return {
    type: userConsts.LOAD_USER,
    payload: { user, error: false }
  }
}
export const errorLoadingUser = (errorMessage) => {
  return {
    type: userConsts.ERROR_LOADING,
    payload: { currentUser: null, error: { message: errorMessage } }
  }
}
export default {
  fetchMe
}