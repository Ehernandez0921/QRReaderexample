import moment from 'moment';
import { FormActions } from '../../Store/UiState/UiActions';
export const mapTableStateToProps = (state) => {
  return state;
};
export const mapTableDispatchToProps = (dispatch) => {
  return {
    formActions: {
      validateFields: isValid => dispatch(FormActions.validateFields(isValid)),
    }
  };
};
export default {

  fields: [
    {
      title: 'Test Field',
      name: 'name',
      fieldType: 'input',
      rules: [
        {
          required: true,
          message: 'Please input your name',
        },
        {
          message: 'Wrong Length',
          min: 5,
          max: 7
        }
      ]
    },
    {
      title: 'Id',
      name: 'id',
      fieldType: 'textArea',
      rules: [

      ]
    },
    {
      title: 'Birth day',
      name: 'birthDay',
      fieldType: 'date',
      format: 'DD/MM/YYYY'
    },
    {
      title: 'Department',
      name: 'department',
      fieldType: 'select',
      selectOptions: [
        {
          title: 'Test 1',
          value: 'test1'
        },
        {
          title: 'Test 2',
          value: 'test2'
        },
        {
          title: 'Test 3',
          value: 'test3'
        }
      ]
    }
  ],
  model: {
    id: 1,
    name: 'Eddy Hernandez',
    birthDay: '01/01/2015',
    department: 'test3'
  },
  buttons: [
    { name: 'test1', title: 'Test 1', onClick: () => { console.log('detailsSettings.js 73 '); } },
    { name: 'test2', title: 'Test 2', onClick: () => { console.log('detailsSettings.js 74 '); } },
  ],
  buttonTop: true
}