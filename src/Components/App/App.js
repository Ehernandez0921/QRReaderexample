import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from './AppConnector';
import { Layout, Row, Col } from 'antd';
import DowHeader from '../DowHeader/DowHeader';
import DowDrawer from '../DowDrawer/DowDrawer';
import Breadcrumb from '../BreadCrumb/BreadCrumb'
import AppConsts from '../../Store/DataState/App/AppConsts';
import Routes from '../../Routes/Routes';
import {  notification } from 'antd';
const { Content } = Layout;

class App extends Component {
  componentDidMount = () => {
    this.props.userActions.fetchMe();
  }
  toggleDrawer = () => {
    this.props.toggleDrawer(!this.props.drawer.show)
  };
  goTo = (path) => {
    this.props.history.push(path);
  }
  showNotification=(type,{message,description})=>{
    notification[type]({
      message: message||'Notification Title',
      description: description||'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  }
  goHome = (message) => {
    //TODO: will create message to show
    this.props.history.push('/')
  }
  onHeaderSearch = (e) => {
    this.props.pageSettings.onSearch && this.props.pageSettings.onSearch(e, this)
  }
  render() {
    const drawerProps = {
      ...this.props.drawer,
      toggleDrawer: this.toggleDrawer
    }
    const headerProps = {
      ...this.props.header,
      toggleDrawer: this.toggleDrawer,
      appName: AppConsts.appName,
      setSearchValue: this.props.setSearchValue,
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <DowDrawer {...drawerProps} />
        <Layout>
          <DowHeader
            {...headerProps}
            {...this.props.pageSettings}
            onSearch={this.props.pageSettings.onSearch ? this.onHeaderSearch : undefined} />
          <Row>
            <Col xs={0} sm={24}>
              <Breadcrumb location={this.props.location} goTo={this.goTo} />
            </Col>
          </Row>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Routes {...this.props} goTo={this.goTo} showNotification={this.showNotification} goHome={this.goHome} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
