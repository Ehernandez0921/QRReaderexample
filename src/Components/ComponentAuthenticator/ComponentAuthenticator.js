import React, { Component } from "react";
/**
 * @param {React.Node} WrappedComponent Component to Render
 * @param {boolean} authenticated if true this.props.user.currentUser must exist
 * @param {array<string>} allowedRoles allowed roles for the route ['admin','general']
 */
class Authenticator extends Component {
  isAuthorized = () => {
    const { allowedRoles, users } = this.props;
    const { currentUser } = users;
    if (!currentUser || !currentUser.roles || !allowedRoles) return false;
    return currentUser.roles.some(role => allowedRoles.includes(role));
  }
  isAuthenticated = () => {
    return this.props.users.currentUser ? true : false;
  }
  render() {
    const { WrappedComponent, authenticated, allowedRoles, ...restOfProps } = this.props;
    if (this.authentication && !this.isAuthenticated()) return <div>Couldn't authenticate</div>
    if (this.allowedRoles && !this.isAuthorized) return <div>Couldnt authorize</div>
    return <WrappedComponent {...restOfProps} />
  }
}

export default Authenticator