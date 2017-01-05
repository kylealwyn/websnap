import React, { Component, PropTypes } from 'react';
import { timeSince } from '../lib/date';

class MessageRow extends Component {
  static propTypes = {
    sender: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  }

  render() {
    const { sender, message } = this.props;

    return (
      <article className="message">
        <header className="row collapsed-xs">
          <h3 className="message-username">{sender.getUsername()}</h3>
          <div className="col-xs" />
          <time className="message-timestamp">{timeSince(message.get('createdAt'))}</time>
        </header>

        <div className="message-body">
          {message.get('text')}
        </div>

        <div className="message-photo">
          <img src={message.getPhotoUrl()} role="presentation" />
        </div>
      </article>
    );
  }
}

export default MessageRow;
