import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from './AppConnector';
import { Layout } from 'antd';
import DowHeader from '../DowHeader/DowHeader';
import DowDrawer from '../DowDrawer/DowDrawer';
import AppConsts from '../../Store/DataState/App/AppConsts';
import Routes from '../../Routes/Routes'
const { Content } = Layout;

class App extends Component {
  toggleDrawer = () => {
    this.props.toggleDrawer(!this.props.drawer.show)
  };
  onHeaderSearch = (e) => {
    console.log(e, 'App.js 17 ');
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
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <DowDrawer {...drawerProps} />
          <Layout>
            <DowHeader {...headerProps}{...this.props.pageSettings} />
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Routes {...this.props} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
