import React, { Component } from 'react';
import {
  Layout,
  Button,
  Row,
  Col
} from 'antd';
const { Header } = Layout;
export default class DowHeader extends Component {
  render() {
    return (
      <Header style={{ padding: 0 }}>
        <Row>
          <Col
            onClick={this.props.toggleDrawer}
            xs={3} sm={2} md={2} lg={1} xl={1}
            style={{ 'textAlign': 'center' }}
          >
            <Button
              ghost
              icon={false ? 'menu-unfold' : 'menu-fold'}
              size={'large'}
              style={{ 'borderStyle': 'none' }}
            />
          </Col>
          <Col
            xs={0} sm={5} md={4} lg={2} xl={2}
            style={{ 'textAlign': 'center' }}
          >
            Logo goes here
          </Col>
          <Col
            xs={12} sm={8} md={6} lg={6} xl={4}
          >
            <h1>{this.props.appName || "Default App"}</h1>
          </Col>
          <Col
            xs={0} sm={7} md={6} lg={4} xl={4}
            style={{ 'textAlign': 'center', 'float': 'right' }}
          >
            Search Bar goes here
          </Col>
        </Row>
      </Header>
    )
  }
}