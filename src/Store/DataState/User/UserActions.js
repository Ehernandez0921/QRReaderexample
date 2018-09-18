import { fetchUser, fetchADUsers } from './UserAPI'
import userConsts from './UserConsts';
import localDb from '../../localDb';
import { isEqual, omit } from 'lodash';

const _getMe = () => localDb.users.get({ isMe: 1 });

const _updateLocalMe = (values) => {
  const newUser = { ...values, isMe: 1 }
  _getMe()
    .then(user => {
      if (user && !isEqual(omit(user, 'id'), newUser)) localDb.users.update(user.id, newUser)
    })
    .catch(err => localDb.users.put({ ...values, isMe: 1 }))
}

const _localFetchMe = () => (dispatch, getState) => {
  _getMe()
    .then(user => {
      if (user) dispatch(loadUser(user))
    })
    .catch(err => dispatch(errorLoadingUser(err.message)));
}

export const fetchMe = () => (dispatch, getState) => {
  dispatch(_localFetchMe());
  fetchUser()
    .then(response => {
      if (!response.ok) dispatch(errorLoadingUser(response.statusText));
      return response.json();
    })
    .then(user => dispatch(loadUser(user))
    ).catch((error) => dispatch(errorLoadingUser(error)));
}
export const lookupADUsers = (searchString) => async (dispatch, getState) => {
  try {

    const response = await fetchADUsers(searchString);
    const data = await response.json();
    dispatch(loadAdUsers(data));
  } catch (err) {

  }
}
export const loadUser = (user) => {
  _updateLocalMe(user);
  return {
    type: userConsts.LOAD_USER,
    payload: { user, error: false }
  }
}
export const loadAdUsers = users => {
  return {
    type: userConsts.LOAD_AD_USERS,
    payload: users
  }
}
export const errorLoadingUser = (errorMessage) => {
  return {
    type: userConsts.ERROR_LOADING,
    payload: { currentUser: null, error: { message: errorMessage } }
  }
}

export default {
  fetchMe,
  lookupADUsers
}