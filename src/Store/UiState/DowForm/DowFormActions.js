import formConsts from './DowFormConsts'
export const validateFields = (isValid) => {
  return { type: formConsts.VALIDATE_FIELDS, payload: isValid }
}
export default {
  validateFields
}