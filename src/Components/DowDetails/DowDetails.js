import React, { Component } from 'react';
import { Form, Input, Col, DatePicker, Select, Row } from 'antd';
import DowTableButton from '../DowTable/DowTableButton'
// import DowField from './DowField';
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
/**
 * Form for details 
 * @param {array<object>} fields 'field settings to show
 * @param {object} model model that has all the settings
 * @param {object} changedModel model that holds all the fields and configuration of the changes
 */
class HorizontalLoginForm extends Component {
  componentDidMount = () => {
    if (this.props.validateOnInit) {
      this.validateFields();
    };
  }
  validateFields = () => {
    const { getFieldsError } = this.props.form;
    this.props.form.validateFields();
    this.props.validateFields && this.props.validateFields(!hasErrors(getFieldsError()));
  }
  onOkClick = (e) => {
    this.props.form.validateFields((err, values) => {
      if (err && this.props.validateForm) return false;
      if (!err && this.props.validateForm) {
        return this.props.onOkClick && this.props.onOkClick(e)
      }
      this.props.onOkClick && this.props.onOkClick(e);
    });
  }
  onCancelClick = (e) => {
    this.props.onCancel && this.props.onCancel(e)
  }
  fieldItem = (field, fieldIndex) => {
    let customProps = {};
    const {
      getFieldDecorator,
      // getFieldsError,
      // getFieldError,
      // isFieldTouched
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
    const {
      fields,
      form
    } = this.props;
    const {
      //   getFieldDecorator,
      getFieldsError,
      //   getFieldError,
      //   isFieldTouched
    } = form;
    console.log(this.props, 'DowDetails.js 117 ');
    return (
      <Form >
        {this.props.buttonTop && <Row>
          {!this.props.buttons &&
            <Row>
              <DowTableButton style={{
                float: 'right',
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderRadius: 0,
                fontWeight: 400,
                marginTop: 10,
                marginRight: 10,
                marginLeft: 10
              }} onButtonClick={this.onOkClick}>Ok</DowTableButton>
              <DowTableButton style={{
                float: 'right',
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderRadius: 0,
                fontWeight: 400,
                marginTop: 10,
                marginRight: 10,
                marginLeft: 10
              }} onButtonClick={this.props.onCancelClick}>Cancel</DowTableButton>
            </Row>
          }
          {this.props.buttons &&
            <Row>
              {this.props.buttons.map((button, index) =>
                <DowTableButton
                  {...button}
                  key={`tableButton${index}`}
                  style={{
                    float: 'right',
                    borderTop: 0,
                    borderLeft: 0,
                    borderRight: 0,
                    borderRadius: 0,
                    fontWeight: 400,
                    marginTop: 10,
                    marginRight: 10,
                    marginLeft: 10
                  }}
                  onButtonClick={button.onClick}
                >{button.title}</DowTableButton>
              )}
            </Row>
          }
        </Row>}
        <Row>
          {fields && fields.map((field, fieldIndex) => {
            const { title, name } = field;
            switch (this.props.containerType) {
              case "popover":
                return (
                  <Col style={field.style} sm={24} key={`${name}input${fieldIndex}`}>
                    <FormItem {...formItemLayout} label={`${title}`} >
                      {this.fieldItem(field, fieldIndex)}
                    </FormItem>
                  </Col>
                )
              default:
                return (
                  <Col style={field.style} lg={8} md={12} sm={24} xs={24} key={`${name}input${fieldIndex}`}>
                    <FormItem {...formItemLayout} label={`${title}`} >
                      {this.fieldItem(field, fieldIndex)}
                    </FormItem>
                  </Col>
                )
            }

          })}
        </Row>
        {!this.props.buttonTop && <Row>
          {!this.props.buttons &&
            <Row>
              <DowTableButton style={{
                float: 'right',
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderRadius: 0,
                fontWeight: 400,
                marginTop: 10,
                marginRight: 10,
                marginLeft: 10
              }} onButtonClick={this.onOkClick}>Ok</DowTableButton>
              <DowTableButton style={{
                float: 'right',
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderRadius: 0,
                fontWeight: 400,
                marginTop: 10,
                marginRight: 10,
                marginLeft: 10
              }} onButtonClick={this.props.onCancelClick}>Cancel</DowTableButton>
            </Row>
          }
          {this.props.buttons &&
            <Row>
              {this.props.buttons.map((button, index) =>
                <DowTableButton
                  {...button}
                  key={`tableButton${index}`}
                  style={{
                    float: 'right',
                    fontWeight: 400,
                    marginRight: 10,
                    marginLeft: 10
                  }}
                  onButtonClick={button.onClick}
                >{button.title}</DowTableButton>
              )}
            </Row>
          }
        </Row>}
        {this.props.children}
      </Form>
    );
  }
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    const changedModel = {
      ...props.model,
      ...Object.keys(changedFields)
        .map(key => {
          return {
            [key]: changedFields[key].value
          }
        })
        .reduce((accumulator, currentValue) => {
          for (let key in currentValue) accumulator[key] = currentValue[key];
          return accumulator
        }, {})
    }
    props.onChange && props.onChange(changedFields, changedModel);
  },
  mapPropsToFields(props) {
    const { model, fields, changedModel = {} } = props;
    const tmpProps = {};
    let value;
    Object.keys(model).forEach((key, index) => {
      const field = fields.find(item => item.name === key)
      if (field) {
        switch (field.fieldType) {
          case 'date':
            value = moment(model[key])
            break;
          default:
            value = model[key]
        }
      } else {
        value = model[key]
      }
      tmpProps[key] = Form.createFormField({
        ...changedModel[key],
        value
      })
    })
    return tmpProps;
  },
  onValuesChange(_, values) {
  },
})(HorizontalLoginForm);