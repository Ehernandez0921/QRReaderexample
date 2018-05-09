import React, { Component } from 'react';
import { Button } from "antd";
class DowTableButtons extends Component {
  onButtonClick = (e) => {
    this.props.onClick && this.props.onButtonClick(e, this.props)
  }
  render() {
    const { title, name } = this.props;
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

        onClick={this.onButtonClick}
      >{title}</Button>
    );
  }
}

export default DowTableButtons;