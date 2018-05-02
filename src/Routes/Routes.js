import React, { Component } from 'react';
import { Route } from "react-router-dom";
import ComponentLoader from '../Components/ComponentLoader/ComponentLoader';
import Loadable from 'react-loadable';

const LoadableHome = Loadable({
  loader: () => import('./Home/Home'),
  loading: ComponentLoader
});

class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={props => <LoadableHome {...this.props} />} />
      </div>
    );
  }
};

export default Routes;