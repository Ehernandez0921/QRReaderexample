import React, { Component } from 'react';
import { Button } from "antd";
class DowTableButtons extends Component {
  onButtonClick = (e) => {
    this.props.onButtonClick && this.props.onButtonClick(e, this.props)
  }
  render() {
    const { title, name, onButtonClick, parent, ...restOfProps } = this.props;
    if (!parent) {
      return (
        <Button style={{
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,
          borderRadius: 0,
          fontWeight: 400,
          marginTop: 10,
          marginRight: 10,
          marginLeft: 10
        }}
          {...restOfProps}
          onClick={this.onButtonClick}
        >{title || this.props.children}</Button>)
    } else {
      const Parent = parent.Component;
      return (
        <Parent>
          <Button style={{
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            borderRadius: 0,
            fontWeight: 400,
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10
          }}
            {...restOfProps}
            onClick={this.onButtonClick}
          >{title || this.props.children}</Button>
        </Parent>)
    }
  }
}

export default DowTableButtons;