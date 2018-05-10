import { userApi } from "./UserConsts";
export const fetchUser = (userId) => {
  return fetch(userApi, {
    credentials: 'include'
  })
}