import { userApi } from "./UserConsts";
export const fetchUser = (userId) => {
  return fetch(userApi, {
    credentials: 'include'
  })
}
export const fetchADUsers = searchString => {
  return fetch(`${userApi}/${searchString}`, {
    credentials: 'include'
  })
}