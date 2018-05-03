import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from './AppConnector';
import { Layout, Row, Col } from 'antd';
import DowHeader from '../DowHeader/DowHeader';
import DowDrawer from '../DowDrawer/DowDrawer';
import Breadcrumb from '../BreadCrumb/BreadCrumb'
import AppConsts from '../../Store/DataState/App/AppConsts';
import Routes from '../../Routes/Routes'
const { Content } = Layout;

class App extends Component {
  toggleDrawer = () => {
    this.props.toggleDrawer(!this.props.drawer.show)
  };
  goTo = (path) => {
    this.props.history.push(path);
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
            <Routes {...this.props} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
