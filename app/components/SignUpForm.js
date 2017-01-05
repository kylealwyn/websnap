import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { signUp } from '../services/user.service';

class SignUpForm extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  state = {
    username: '',
    password: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    signUp(this.state.username, this.state.password)
      .then(() => {
        this.props.router.replace('/');
      })
      .catch((error) => {
        this.setState({
          error,
          loading: false,
        });
      });
  }

  render() {
    const { error, loading } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {error ? <div className="alert alert-danger">{error.message}</div> : null}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="form-element"
            placeholder="Enter a username"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-element"
            placeholder="••••••••"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="text-center">
          <input
            type="submit"
            value={loading ? 'Signing Up...' : 'Sign Up'}
            className="btn btn-primary"
          />
        </div>

      </form>
    );
  }
}

export default withRouter(SignUpForm);
