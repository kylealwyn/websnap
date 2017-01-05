import React, { Component } from 'react';
import MessageRow from './MessageRow';
import { getCurrentUserActivities } from '../services/activity.service';


// import Spinner from 'react-spinkit';

class MessageList extends Component {
  state = {
    messages: [],
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    this.setState({ loading: true });

    getCurrentUserActivities()
      .then((activities) => {
        this.setState({
          activities,
          messages: activities.map(a => ({
            message: a.get('message'),
            sender: a.get('actor'),
          })),
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    if (!this.state.messages || !this.state.messages.length) {
      return (<div>You have no messages.</div>);
    }

    return (
      <div>
        {
          this.state.messages.map((m, idx) => {
            const { sender, message } = m;
            return (<MessageRow key={idx} sender={sender} message={message} />);
          })
        }
      </div>
    );
  }
}

export default MessageList;
