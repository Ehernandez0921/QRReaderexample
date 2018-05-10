import userConst from "./UserConsts";
import userModel from './UserModel';
const UserReducer = (state = userModel, action) => {
  switch (action.type) {
    case userConst.LOAD_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}
export default UserReducer;