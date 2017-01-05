import React, { Component, PropTypes } from 'react';
import { withRouter, Link } from 'react-router';
import Parse from 'parse';

class Header extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  // eslint-disable-next-line class-methods-use-this
  getCurrentUser() {
    return Parse.User.current();
  }

  logout = () => {
    Parse.User.logOut().then(() => {
      this.props.router.replace('/');
    });
  }

  renderAuthenticatedNav() {
    const currentUser = this.getCurrentUser();

    if (!currentUser) {
      return null;
    }

    return (
      <nav>
        <ul className="row collapsed-xs align-center-xs">
          <li className="m-r-sm">Hi, {currentUser.getUsername()}</li>
          <li><button className="btn btn-danger-outline" onClick={this.logout}>Logout</button></li>
        </ul>
      </nav>
    );
  }

  render() {
    if (!this.getCurrentUser()) {
      return null;
    }

    return (
      <header className="app-header">
        <div className="row">
          <Link to="/">
            <h2>Websnap</h2>
          </Link>

          <div className="col-xs" />

          { this.renderAuthenticatedNav() }
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
