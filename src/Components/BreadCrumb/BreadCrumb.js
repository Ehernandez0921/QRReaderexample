import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import CrumbItem from './CrumbItem'

class BreadCrumb extends Component {
  onCrumbClick = (item, index) => {
    if (this.props.location) {
      if (item === 'Home') return this.props.goTo("");
      const pathName = this.props.location.pathname.split('/');
      const paths = pathName.filter((path) => path !== '');
      const toPathArray = paths.slice(0, index + 1);
      const toPath = `/${toPathArray.join('/')}`;
      this.props.goTo && this.props.goTo(toPath);
    }
  }
  render() {
    const { location } = this.props;
    const pathName = location.pathname.split('/');
    const paths = pathName.filter((path) => path !== '');
    return (
      <Breadcrumb style={{ padding: '0 24px', margin: '16px 0px' }}>
        <Breadcrumb.Item key={`breadCrumbHome`}>
          <CrumbItem
            item={'Home'}
            index={0}
            onCrumbClick={this.onCrumbClick}
          >Home</CrumbItem>
        </Breadcrumb.Item>
        {paths && paths.map((path, index) =>
          <Breadcrumb.Item key={`breadCrumb${index}`}>
            <CrumbItem
              item={path}
              index={index}
              onCrumbClick={this.onCrumbClick}
            >{path}</CrumbItem>
          </Breadcrumb.Item>
        )
        }
      </Breadcrumb>
    );
  }
}
export default BreadCrumb;