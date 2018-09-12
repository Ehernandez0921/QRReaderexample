import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;
const { Sider } = Layout;
export default class DowDrawer extends Component {
  render() {
    return (
      <Sider
        collapsible
        collapsed={!this.props.show}
        collapsedWidth={0}
        trigger={null}
        breakpoint="lg"
        defaultCollapsed={this.props.show}
      >
        <Menu mode="inline" >
          {this.props.menuItems && this.props.menuItems.map((item, itemIndex) => {
            if (!item.menuItems) {
              return (
                <Menu.Item key={`menuItem${itemIndex}`}>
                  <Link to={item.path} >
                    {item.icon && <Icon type={item.icon} />}
                    <span>{item.title}</span>
                  </Link>
                </Menu.Item>
              )
            } else {
              return (
                <SubMenu
                  key={`subMenu${itemIndex}`}
                  title={
                    <span>
                      {item.icon && <Icon type={item.icon} />}
                      <span>
                        {item.title}
                      </span>
                    </span>
                  }
                >
                  {item.menuItems.map((subItem, subItemIndex) => {
                    return <Menu.Item key={`subMenuItem${subItemIndex}`}>
                      <Link to={subItem.path}>
                        {subItem.icon && <Icon type={subItem.icon} />}
                        <span>{subItem.title}</span>
                      </Link>
                    </Menu.Item>
                  })}
                </SubMenu>
              )
            }
          }
          )}
        </Menu>
      </Sider>
    )
  }
}