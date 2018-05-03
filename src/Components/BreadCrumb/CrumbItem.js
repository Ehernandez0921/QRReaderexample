import React, { Component } from 'react';
export default class CrumbItem extends Component {
  onCrumbClick = () => {
    this.props.onCrumbClick && this.props.onCrumbClick(this.props.item, this.props.index)
  }
  render() {
    return <span onClick={this.onCrumbClick}>{this.props.children}</span>
  }
}