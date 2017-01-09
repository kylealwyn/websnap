import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import MessageRow from './MessageRow';
import { getCurrentUserActivities } from '../services/activity.service';


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
          messages: activities.map(activity => ({
            activity,
            message: activity.get('message'),
            sender: activity.get('actor'),
          })),
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  markAsViewed = (message) => {
    const messagesClone = this.state.messages.slice();
    const messageIdx = messagesClone.indexOf(message);
    const { activity } = messagesClone[messageIdx];

    activity.set('viewed', true);
    activity.save();

    this.setState({
      messages: messagesClone,
    });
  }

  render() {
    if (this.state.loading) {
      return <Spinner spinnerName="rotating-plane" />;
    }

    if (!this.state.messages.length) {
      return (
        <div className="text-center">
          <p>No one has sent you any messages yet 😭</p>
        </div>
      );
    }

    return (
      <div className="message-list">
        {
          this.state.messages.map((msg, idx) => {
            const { sender, message, activity } = msg;

            return (
              <MessageRow
                key={idx}
                sender={sender}
                message={message}
                viewed={activity.get('viewed')}
                onViewed={() => this.markAsViewed(msg)}
              />
            );
          })
        }
      </div>
    );
  }
}

export default MessageList;
