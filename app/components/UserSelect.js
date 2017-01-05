import React, { Component, PropTypes } from 'react';
import Spinner from 'react-spinkit';
import { fetchUsers } from '../services/user.service';

class MessageList extends Component {
  static propTypes = {
    onSelectionChange: PropTypes.func.isRequired,
  }

  state = {
    users: [],
    selected: [],
  }

  componentDidMount() {
    this.fetchUsers();
  }

  handleCheckboxChange = (event) => {
    const userId = event.target.id;
    const user = this.state.users.find(u => u.id === userId);
    const idx = this.state.selected.indexOf(user);

    if (idx === -1) {
      this.state.selected.push(user);
    } else {
      this.state.selected.splice(idx, 1);
    }

    this.props.onSelectionChange(this.state.selected);
  }

  fetchUsers() {
    this.setState({ loading: true });

    fetchUsers()
      .then(users => this.setState({ users }))
      .catch(error => this.setState({ error }))
      .then(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.loading) {
      return <Spinner spinnerName="rotating-plane" />;
    }

    if (!this.state.users || !this.state.users.length) {
      return <div>No users found.</div>;
    }

    return (
      <div className="user-select">
        <ul className="user-select-list">
          {this.state.users.map((user, idx) => (
            <li key={idx}>
              <label htmlFor={user.id}>
                <input
                  id={user.id}
                  type="checkbox"
                  onChange={this.handleCheckboxChange}
                  checked={this.state.isChecked}
                />
                {user.getUsername()}
              </label>
            </li>
          ))}
        </ul>
      </div>

    );
  }
}

export default MessageList;
