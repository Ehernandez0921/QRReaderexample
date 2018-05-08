import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;
class DowField extends Component {
  render() {
    const { title, name, fieldType, rule = [] } = this.props;
    switch (fieldType) {
      case 'input':
      default:
        return <Input />
    }
  }
}

export default DowField;