import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { signIn } from '../services/user.service';

class LoginForm extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    signIn(this.state.email, this.state.password)
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
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-element"
            placeholder="Enter your email"
            value={this.state.email}
            required
            onChange={e => this.setState({ email: e.target.value })}
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
            required
            onChange={e => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="text-center">
          <input
            type="submit"
            value={loading ? 'Signing In...' : 'Sign In'}
            className="btn btn-primary"
            disabled={loading}
          />
        </div>

      </form>
    );
  }
}

export default withRouter(LoginForm);
