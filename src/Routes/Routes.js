import React, { Component } from 'react';
import { Route } from "react-router-dom";
import ComponentLoader from '../Components/ComponentLoader/ComponentLoader';
import Loadable from 'react-loadable';
import Authenticator from "../Components/ComponentAuthenticator/ComponentAuthenticator";
const LoadableHome = Loadable({
  loader: () => import('./Home/Home'),
  loading: ComponentLoader
});
const LoadableMaggieScreen = Loadable({
  loader: () => import('./MaggieScreen/MaggieScreen'),
  loading: ComponentLoader
});
class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={props => <Authenticator WrappedComponent={LoadableHome}{...this.props} {...props} />} />
        <Route exact path="/maggieScreen" render={props => <Authenticator WrappedComponent={LoadableMaggieScreen}{...this.props} {...props} />} />
      </div>
    );
  }
};

export default Routes;