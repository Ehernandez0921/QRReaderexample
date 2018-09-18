import React, { Component } from 'react';
import { Form, Icon, Input, Button, DatePicker, Select } from 'antd';
const FormItem = Form.Item;
class DowField extends Component {
  render() {
    const { title, name, fieldType, rule = [] } = this.props;
    switch (fieldType) {
      case 'date':
        return <DatePicker />;
      case 'select':
        return <Select {...this.otherProps} rule={rule} />
      case 'input':
      default:
        return <Input />;
    }
  }
}

export default DowField;