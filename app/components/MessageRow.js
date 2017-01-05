import React, { Component, PropTypes } from 'react';
import moment from 'moment';

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
          <time className="message-timestamp">{moment(message.get('createdAt')).fromNow()}</time>
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
