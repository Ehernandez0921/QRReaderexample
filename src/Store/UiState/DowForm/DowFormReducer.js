import formConsts from "./DowFormConsts";
import formModel from './DowFormModel';
const FormReducer = (state = formModel, action) => {
  switch (action.type) {
    case formConsts.VALIDATE_FIELDS:
      return { ...state, ...{ fieldsValid: action.payload } }
    default:
      return state;
  }
}
export default FormReducer;