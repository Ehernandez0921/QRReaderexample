import React, { Component } from 'react';
import HomePageSettings from './HomePageSettings'
class Home extends Component {
  componentDidMount = (props) => {
    this.props.setPageSettings(HomePageSettings)
  }
  render() {
    return (
      <div >
        This is the Home page. Edit the Hompepage and add any routes and settings at '/src/Routes' foder in the project. Will add guide to readMe in the folder. just browse in explorer
      </div>
    );
  }
}
export default Home;