import React, { Component } from 'react';
import { isEmpty } from 'lodash'
import { Form, Input, Col, DatePicker, Select } from 'antd';
import DowField from './DowField';
import moment from 'moment';
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 10 },
    lg: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 14 },
    lg: { span: 17 }
  },
};
class HorizontalLoginForm extends Component {
  fieldItem = (field, fieldIndex) => {
    let customProps = {};
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const {
      name,
      fieldType,
      rules = [],
      disabled,
      format
    } = field;
    let FieldItem;
    switch (fieldType) {
      case "date":
        FieldItem = DatePicker;
        break;
      case 'select':
        FieldItem = Select;
        break;
      case 'textArea':
        FieldItem = TextArea;
        customProps = {
          ...customProps,
          autosize: { maxRows: 10 }
        }
        break
      default:
        FieldItem = Input;
    }
    if (fieldType === 'select') {
      return (
        getFieldDecorator(name, {
          rules: [...rules],
        })(<Select placeholder="Select a person" >
          {field.selectOptions.map((option, index) =>
            <Option key={`${name}select${index}`} value={option.value}>{option.title || option.value}</Option>
          )}
        </Select>)
      )
    }
    return getFieldDecorator(name, {
      rules: [...rules],
    })(<FieldItem disabled={disabled} format={format} {...customProps} />)
  }
  handleSubmit = (e) => {
    this.props.onFormSubmit && this.props.onFormSubmit(e);
  }
  render() {
    const { fields, form, model } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
        {fields && fields.map((field, fieldIndex) => {
          const { title, name } = field;
          return (
            <Col lg={8} md={12} sm={24} xs={24} key={`${name}input${fieldIndex}`}>
              <FormItem {...formItemLayout} label={`${title}`} >
                {this.fieldItem(field, fieldIndex)}
              </FormItem>
            </Col>
          )
        })}
        {this.props.children}
      </Form>
    );
  }
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange && props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    const { model, fields } = props;
    const tmpProps = {};
    let value;
    Object.keys(props.model).forEach((key, index) => {
      const field = fields.find(item => item.name === key)
      if (field) {
        switch (field.fieldType) {
          case 'date':
            value = moment(props.model[key])
            break;
          default:
            value = props.model[key]
        }
      } else {
        value = props.model[key]
      }
      tmpProps[key] = Form.createFormField({
        value
      })
    })
    return tmpProps;
  },
  onValuesChange(_, values) {
    console.log(_, values, 'DowDetails.js 125 ');
  },
})(HorizontalLoginForm);