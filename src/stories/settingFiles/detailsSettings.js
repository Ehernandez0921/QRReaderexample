import moment from 'moment'
export default {

  fields: [
    {
      title: 'Test Field',
      name: 'name',
      fieldType: 'input',
      disabled: true,
      rules: [
        {
          required: true,
          message: 'Please input your name',
          min: 5,
          max: 50
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
  }
}