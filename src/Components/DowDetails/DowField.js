import React, { Component } from 'react';
import { Form, Icon, Input, Button, DatePicker, Select } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
class DowField extends Component {
  render() {
    const { title, name, fieldType, rule = [], items } = this.props;
    switch (fieldType) {
      case 'date':
        return <DatePicker />;
      case 'select':
        const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
        return <Select {...this.otherProps} rule={rule} >{options}</Select>
      case 'input':
      default:
        return <Input />;
    }
  }
}

export default DowField;