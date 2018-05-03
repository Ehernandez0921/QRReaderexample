import React, { Component } from 'react';
import HomePageSettings from './HomePageSettings'
class Home extends Component {
  componentDidMount = (props) => {
    this.props.setPageSettings(HomePageSettings)
  }
  render() {
    return (
      <div onClick={this.props.toggleDrawer}>
        test
      </div>
    );
  }
}
export default Home;